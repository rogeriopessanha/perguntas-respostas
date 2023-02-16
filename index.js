const express =  require('express')
const app = express()

//estou dizendo para o express usar o ejs como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/perguntar', (req, res) =>{
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) =>{

})

app.listen(8080, () => {
    console.log('App rodando')
})