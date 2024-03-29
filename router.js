var handler = require('./handler')



var router = function(server){
    server.get('/api/cookie',handler.cookie);
    server.post('/api/upload', handler.uploader);
    server.get('/api/countarticle',handler.countarticle)
    server.get('/api/counttags',handler.counttags)
    server.get('/api/tagsinit',handler.tagsinit)
    server.post('/api/sortarticle',handler.sortarticle)
    server.get('/api/test',handler.testhandler)
    server.post('/api/uploadimg',handler.uploadimg)
    server.post('/api/findtag',handler.findtag)
    server.post('/api/findarticle',handler.findarticle)
    server.post('/api/writecomment',handler.writecomment)
    server.post('/api/deletecomment',handler.deletecomment)
    server.get('/418', handler.fouroneeight)
    server.post('/api/login',handler.login)
}

module.exports={
    router:router
}