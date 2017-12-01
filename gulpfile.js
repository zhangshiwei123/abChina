const gulp = require('gulp')
const webserver = require('gulp-webserver')
const urlTool = require('url')
const qs = require('qs') //qs => querystring


gulp.task('mock', function () {
    gulp.src('.')
        .pipe(webserver({
            host: '127.0.0.1',
            port: 8008,
            livereload: true,
            //中间键，有三个参数，request，response，next 
            middleware: function (req, res, next) {
                //console.log(req.method)
                const method = req.method

                const pathName = urlTool.parse(req.url)


                //console.log(method, url, pathName, params)
                console.log(pathName)
                //统一对所有请求允许跨域
                res.setHeader('Access-Control-Allow-Origin', '*')

                if (method === 'GET') {
                    if (pathName.pathname === '/abChina') {
                        res.setHeader('content-type', 'application/json;charset=utf-8;')
                        res.end(require('fs').readFileSync('data.json'))
                    } else {
                        res.end('No Such')
                    }
                }

            }
        }))
})
