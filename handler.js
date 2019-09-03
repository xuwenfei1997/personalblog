var indexhandler = function(req,res,next){
    res.send(200,"helloworld");
    res.end();
    next();
}
var uploader = function(req,res,next){
    console.log(req.params)
    res.send(200,req.params);
    res.end();
    next();
}


module.exports={
    indexhandler:indexhandler,
    uploader:uploader
}