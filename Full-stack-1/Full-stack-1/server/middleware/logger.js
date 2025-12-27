const logger = (req, res, next) => {
    console.log(`request mothod:${req.method} from ${req.url}`);
    next();
};
export default logger;