// 创建表
const tables = require('./config/table-config/create-table.js')
tables.createTable()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { port } = require('./config/domain.js')
const router = require('./router/index.js')
const cors = require('./middleware/cors.js')

const app = new Koa()

// 跨域
app.use(cors())

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
  formLimit: '5mb',
  jsonLimit: '5mb',
  textLimit: '5mb'
}))

app.use(router.routes(), router.allowedMethods())

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

app.listen(port)
