var database = require('./database')


var indexhandler = function(req,res,next){
    res.send(200,"helloworld");
    res.end();
    next();
}
var uploader = function(req,res,next){
    database.writearticle(req.params)
    res.send(200,"created");
    res.end();
    next();
}
var countarticle = function(req,res,next){
    database.countarticle((err, count) => {
        if (err) {
            res.send(406, 'error')
            return res.end();
        }
        res.send(200,count)
        res.end();
    })

}

var counttags = function(req,res,next){
    
    res.send(200,database.setA.size);
    res.end();

}
var tagsinit = function(req,res,next){
    database.tagsinit((err,tags)=>{
        if (err){res.send(406,err);return res.end();}
        else {res.send(200,tags);res.end();}})
}

var sortarticle = function(req,res,next){


 
    database.sortarticle((err,articles)=>{
        if (err){res.send(406,err);return res.end();}
        else {res.send(200,articles);res.end();}
    });
    

}

var testhandler=function(req,res,next){
    console.log(req)
    res.send(200)
    res.end()
}





module.exports={
    indexhandler:indexhandler,
    uploader:uploader,
    countarticle:countarticle,
    counttags:counttags,
    tagsinit:tagsinit,
    sortarticle:sortarticle,
    testhandler:testhandler
}