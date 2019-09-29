var mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/articles');


var schema = new mongoose.Schema({
    title: 'string',
    content: 'string' ,
    hashtags:Array,
    comment:Array
    },{timestamps: {createdAt: 'createdtime', updatedAt: 'updatedtime'},versionKey: false,useNewUrlParser: true });


var Article = mongoose.model('Article', schema);


var setA = new Set();



var tagsinit = function(func){
    var query=Article.find({})
    query.select('hashtags')
         .exec(function(err,tags){
            // console.log(tags.pop().hashtags.pop())
            for (var i=0;i=tags.length;i++){
                let array=new Array;
                array[i]=tags.pop();
                for (var a=0;a=array[i].hashtags.length;a++){
                    setA.add(array[i].hashtags.pop())
                }
                
            }
            func(err,Array.from(setA))
            
})}


var writearticle = function(data){
    var newarticle = new Article(data);
    Article.create(newarticle,function(err,newarticle){
        if (err) return handleError(err);
    })
}


var countarticle = function(handleError){
    var article=Article.find();
    var cache=article.countDocuments(handleError)
}


var sortarticle = function(func,skip){
    
    Article.find({}, {}, { skip: skip ,  limit: 10 }).sort('-createdtime').exec(function(err, docs) {
        func(err,docs)
    });
}

var findtag = function(tag,func){
    
    Article.find({'hashtags':tag}).sort('-createdtime').exec(function(err, docs) {
        // console.log(docs)


        func(err,docs)
    });

}


var findarticle = function(id,func){
    
    Article.find({'_id':id}).sort('-createdtime').exec(function(err, docs) {
        


        func(err,docs)
    });

}

var writecomment=function(data){
    var id = data.id
    var content = {$push: {comment:data.comment}}
    
    Article.findOneAndUpdate({_id:id},content, () => {

    })

    }





module.exports={
    tagsinit:tagsinit,
    writearticle:writearticle,
    countarticle:countarticle,
    sortarticle:sortarticle,
    setA:setA,
    findtag:findtag,
    findarticle:findarticle,
    writecomment:writecomment
}