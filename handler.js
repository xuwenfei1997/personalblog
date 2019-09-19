var database = require('./database')
var fs = require('fs')
var moment = require('moment');

moment.locale('zh-cn');

var indexhandler = function(req,res,next){
    res.send(200,"helloworld");
    res.end();
    next();
}
var uploader = function(req,res,next){
    database.writearticle(req.params)
    // console.log(req.params)
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
        else {
            var cachearray=new Array;
            
            for (var i = -1 ; i<= articles.length;i++){
                var cache =articles.shift();
                cache.content=cache.content.replace(/<[^>]*>/g,"")
                cache.content=cache.content.substring(0,400)
                cachearray.push(cache)
                
            }
           

            
            res.send(200,cachearray);
            res.end();}
    });
    

}

var testhandler=function(req,res,next){
    console.log(req)
    res.send(200)
    res.end()
}

var uploadimg=function(req,res,next){

    
    var id = Object.keys(req.params);
    var timer=moment().format();
    var filename = timer+'.png';
    var cache = req.params[id]
    // console.log(cache)
    // console.log(filename)
    fs.writeFile(filename,cache,function (err) {
        if (err)
            console.log(err);
     })
    var response={
        "errno": 0,
        "data": [
            "./"+filename
        ]
    }
    res.send(200,response);
    res.end();
}





module.exports={
    indexhandler:indexhandler,
    uploader:uploader,
    countarticle:countarticle,
    counttags:counttags,
    tagsinit:tagsinit,
    sortarticle:sortarticle,
    testhandler:testhandler,
    uploadimg:uploadimg
}