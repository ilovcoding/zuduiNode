const Koa = require('koa');
const router = require('koa-router')
const koa_body = require('koa-body')
const path = require('path')
const static = require('koa-static')
const app = new Koa();
const Router = new router();
//zudui -- static --start
const actimg_static = static(path.join(__dirname, '/act_img'))
const cardimg_static = static(path.join(__dirname, '/card_img'))
const gfimg = static(path.join(__dirname, '/gfimg'))
app.use(gfimg)
app.use(actimg_static)
app.use(cardimg_static)
//zudui -- static --end
app.use(koa_body({
    multipart: true

}));
app.use(Router.routes());
//zudui--start
const zudui = require('./zudui')
const zuduifunction = zudui.zuduifunction
const zuduirouter = zudui.zuidurouter
zuduirouter.forEach((value, index, input) => {
    Router.all(value, zuduifunction[index])
})
//zudui -- end

//newsapi -- start
const api = require('./api')
const apifunction = api.newsfunction
const apirouter = api.newsrouter
apirouter.forEach((value, index, input) => {
    Router.all(value, apifunction[index])
})
//newsapi -- end

//album --start

//album -- end
//测试
// const fs = require('fs')
// fs.access(path.join(__dirname, 'cece'), (err) => {
//     if (err) {
//         console.log(err)
//         fs.mkdir(path.join(__dirname, 'cece'), (err) => {
//             console.log(err)
//         })
//     } else {
//         fs.mkdir(path.join(__dirname, 'cece',`${(new Date).getTime()}`), (err) => {
//             console.log(err)
//         })
//     }
// })
//
app.listen(8001)
console.log('app started at port 8001...')