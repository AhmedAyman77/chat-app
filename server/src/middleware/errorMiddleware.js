// error middleware to handle errors globally
export const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong! Please try again later."
    });
};

// 404 middleware to handle not found routes
export const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: "Route not found."
    });
};