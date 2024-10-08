
const logTime = (req, res, next) => {
    console.log(Date.now())
    next();
}

module.exports = {
    logTime
}