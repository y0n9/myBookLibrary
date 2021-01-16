// 在开发环境中
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV !== 'production' });

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import indexRouter from './routes/index.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/views')
app.set('layouts', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Mongo数据库连接及配置
import mongoose from 'mongoose'
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

app.listen(process.env.PORT || 3000)