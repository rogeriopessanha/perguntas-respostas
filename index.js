const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/:nome/:lang', (req, res) =>{
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome: 'biscoito', preco: 3.20},
        {nome: 'refrigerante', preco: 5.10},
        {nome: 'leite', preco: 4},
        {nome: 'pão', preco: 1.05},
        {nome: 'queijo', preco: 7.30},
        {nome: 'presunto', preco: 6.65}
    ]

    res.render('index.ejs',{
        nome: nome,
        lang: lang,
        empresa: 'Guia do programador',
        inscritos: 1000,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(8080, ()=>{console.log('App rodando')
});