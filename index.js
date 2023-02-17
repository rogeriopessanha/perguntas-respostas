const express =  require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
//Database

connection.authenticate()
.then(() => {
    console.log('conectado com o banco de dados')
})
.catch((error) =>{
    console.log(error)
})

//estou dizendo para o express usar o ejs como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//rotas
app.get('/', (req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC'] //ASC = ordem crescente / DESC ordem decrescente
    ]})
    .then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})

app.get('/perguntar', (req, res) =>{
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) =>{
    var titulo = req.body.titulo;
    var assunto = req.body.assunto;

    Pergunta.create({
        titulo: titulo,
        assunto: assunto
    }).then(() => {
        res.redirect('/')
    })
})

app.listen(8080, () => {
    console.log('App rodando')
})