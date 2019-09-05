var handler = require('./handler')



var router = function(server){
    // server.get('/', handler.indexhandler);
    server.post('/api/upload', handler.uploader);
    server.get('/api/countarticle',handler.countarticle)
    server.get('/api/counttags',handler.counttags)
    server.get('/api/tagsinit',handler.tagsinit)
    server.get('/api/sortarticle',handler.sortarticle)

}

module.exports={
    router:router
}