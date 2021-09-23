module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    console.log(err)
    res.json({"Error":"An unexpected error occured"});
    
}