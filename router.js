var handler = require('./handler')

var router = function(server){
    server.get('/', handler.indexhandler);
    server.post('/api/upload', handler.uploader);
    //server.post('/api')
}

module.exports={
    router:router
}