const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const produtoController = require('./controller/produto.controller')
const usuarioController = require('./controller/usuario.controller')
const movimentoController = require('./controller/movimento.controller')
const relatVwController = require('./controller/relatVW.controller')
const authController = require('./controller/auth.controller')
const { autenticar } = require('./middleware/auth')
const hostname =  'localhost' // 127.0.0.1
const PORT = 3000
// ------------ Middleware ----------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//--------------- Rotas --------------

// rotas públicas
app.post('/login', authController.login)
app.post('/usuario', usuarioController.cadastrar)

// rotas protegidas (exigem token válido)
app.get('/usuarios', autenticar, usuarioController.listar)
app.get('/usuario/:id', autenticar, usuarioController.buscarPorCod)
app.get('/usuario/buscar/:nome', autenticar, usuarioController.buscarPorNome)
app.delete('/usuario/:id',autenticar, usuarioController.excluir)
app.put('/usuario/:id',autenticar, usuarioController.atualizar)

app.post('/produto', autenticar, produtoController.cadastrar)
app.get('/produtos', autenticar, produtoController.listar)
app.get('/produto/:id', autenticar, produtoController.buscarPorCod)
app.get('/produto/buscar/:nome', autenticar, produtoController.buscarPorNome)
app.delete('/produto/:id',autenticar, produtoController.excluir)
app.put('/produto/:id',autenticar, produtoController.atualizar)

app.post('/movimento', autenticar, movimentoController.cadastrar)
app.get('/movimentos', autenticar, movimentoController.listar)

// rotas de relatórios (views)
app.get('/relatorio/categorias', autenticar, relatVwController.listarPorCategorias)
app.get('/relatorio/saidas', autenticar, relatVwController.listarHistoricoSaidas)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!!!'})
})

// -------------- Server -------------
conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro de conexão com o banco de dados!',err)
})