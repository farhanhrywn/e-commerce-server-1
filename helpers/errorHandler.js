module.exports = function errorHandler(err, req, res, next) {
    // console.log(err)
    let statusCode = 500
    let errMsg = 'Internal Server Error'
    if(err.name == "SequelizeValidationError") {
        let temp = ''
        temp += err.errors[0].message
        statusCode = 401
        errMsg = temp
    } else if(err.name == "SequelizeUniqueConstraintError") {
        statusCode = 400
        errMsg = err.errors[0].message
    } else if(err.name == "Not Found") {
        statusCode = 404
        errMsg = 'Data not found'
    } else if(err.name == "Wrong Data") {
        statusCode = 400
        errMsg = "Wrong email / password"
    }
    res.status(statusCode).json({ message: errMsg })
}