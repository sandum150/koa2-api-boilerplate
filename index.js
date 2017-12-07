const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const errorHandler = require('./libraries/error_handler')

require('rootpath')();

// static files
app.use(require('koa-static')('./public'));

// request parameters parser
app.use(require('koa-body')({
    formidable:{
        uploadDir: __dirname + '/public/uploads',
        keepExtensions: true
    },    //This is where the files would come
    multipart: true,
    urlencoded: true,
}));

// error handler
app.use(errorHandler);

// validator
require('koa-validate')(app);

// set routes
fs.readdirSync('./app').filter( file => fs.statSync(path.join('./app', file)).isDirectory()).map(moduleName => {
    fs.readdirSync('./app/' + moduleName).filter( file => fs.statSync(path.join('./app/' + moduleName, file)).isFile()).map(route => {
        app.use(require('./app/' + moduleName + '/' + route).routes());
    })
});

let string = require('./libraries/string')
console.log(string.generatePasswordHash('test'))

app.listen(3000);