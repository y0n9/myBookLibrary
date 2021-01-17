// 在开发环境中
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 加载路由
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

// 基础设置
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/views')
app.set('layout', 'layouts/layout')

// 加载中间件
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}))
app.use(methodOverride('_method'))

// Mongo数据库连接及配置
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})

const db = mongoose.connection
    // 打印错误
db.on('error', error => console.error(error))
    // 第一次连接，打印日志
db.once('open', () => console.log('正在连接 Mongoose'))

// 使用路由
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)