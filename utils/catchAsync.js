module.exports = func => {
    return(req, res, nexts) => {
        func(req, res, next).catch(next);
    }
}