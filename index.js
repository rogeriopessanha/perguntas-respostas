const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
//Database

connection.authenticate()
    .then(() => {
        console.log('conectado com o banco de dados')
    })
    .catch((error) => {
        console.log(error)
    })

//estou dizendo para o express usar o ejs como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//rotas
app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] //ASC = ordem crescente / DESC ordem decrescente
        ]
    })
        .then(perguntas => {
            res.render('index', {
                perguntas: perguntas
            })
        })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo;
    var assunto = req.body.assunto;

    Pergunta.create({
        titulo: titulo,
        assunto: assunto
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: { id: id }
    })
        .then(pergunta => {
            if (pergunta != undefined) { //pergunta encontrada

                Resposta.findAll({
                    where: { perguntaId: pergunta.id },
                    order: [
                        ['id', 'DESC']
                    ]
                }).then(respostas => {
                    res.render('pergunta', {
                        pergunta: pergunta,
                        respostas: respostas
                    })
                })
            } else { //não encontrada
                res.redirect('/')
            }
        })
})

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.perguntaId
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
})

app.listen(8080, () => {
    console.log('App rodando')
})