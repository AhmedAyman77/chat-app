import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId, io } from "../config/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllContacts = async(req, res) => {
    try {
        const loggedInUserId = req.user._id
        const contacts = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(contacts);
    } catch (error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getMessagesByUserId = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const otherUserId = req.params.id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: loggedInUserId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages in ascending order by creation time

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessagesByUserId:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const sendMessage = async(req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const { text, image } = req.body;

        if (!text && !image) {
            return res.status(400).json({ message: "image or text are required" });
        }

        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "You cannot send message to yourself" });
        }

        const recieverUser = await User.findById(receiverId);
        if (!recieverUser) {
            return res.status(404).json({ message: "Receiver user not found" });
        }

        // save image to cloudinary
        let imageUrl = "";
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        // socket.io logic to emit the message to the receiver if online
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.emit sends to all connected clients
            // to send to a specific client, we use io.to(socketId).emit()
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getChatPartners = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const partnersId = [
            ...new Set(messages.map((msg) => {
                return msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId : msg.senderId;
            }))
        ];

        const partners = await User.find({ _id: { $in: partnersId } }).select("-password");

        res.status(200).json(partners);
    } catch (error) {
        console.log("Error in getChatPartners:", error);
        res.status(500).json({ message: "Server Error" });
    }
}