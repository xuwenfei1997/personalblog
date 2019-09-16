var restify = require('restify');
var config  = require('./config')
var router  = require('./router')
var os      = require('os')
var handler = require('./handler')

var server = restify.createServer(
    {name:config.name,
     url : config.url

    }

);
server.listen(config.port,function(){
    console.log('restify server is listening at '+config.url+':'+config.port)
})
server.use(restify.plugins.bodyParser({
    maxBodySize: 0,
    mapParams: true,
    mapFiles: true,
    overrideParams: false,
  //   multipartHandler: function(part) {
  //       part.on('data', function(data) {
  //         // do something with the multipart data
  //       });
  //   },
  //  multipartFileHandler: function(part) {
  //       part.on('data', function(data) {
         
  //       });
  //   },
    keepExtensions: false,
    uploadDir: os.tmpdir(),
    multiples: false,
    hash: 'sha1',
    rejectUnknown: true,
    requestBodyOnGet: false,
    reviver: undefined,
    maxFieldsSize: 2 * 1024 * 1024
 }));
router.router(server);