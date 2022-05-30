require('dotenv').config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const connectToDb = require("./database/db");

connectToDb();

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// cria um vetor global para conter as entradas
let entries = [];
let cardAmount = entries.length
let activeDetailsCard = { title: '', content: '', subtitle: '' }
// torna o vetor acessível em todas as views
app.locals.entries = entries;
app.locals.cardAmount = cardAmount;
app.locals.activeDetailsCard = activeDetailsCard;

// inicializa o logger com nível dev
app.use(logger('dev'));
// inicializa uma variável req.body, caso o usuário
// submeta um formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// definição dos roteadores (rotas)

app.get('/', (request, response) => {
    // views/index.ejs
    response.render('index');
});

app.get('/new-entry', (request, response) => {
    response.render('new-entry');
});

app.post('/new-entry', (request, response) => {
    if (!request.body.title || !request.body.body) {
        resonse.status(400).send('As postagens devem ter um título de um corpo.');
        return;
    }

    entries.push({
        id: Date.now(),
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    });

    response.redirect('/');
});


app.get('/details', (request, response) => {
    response.render('details')
});

app.post('/set-details', (request, response) => {
    activeDetailsCard.title = request.body.title    
    activeDetailsCard.subtitle = request.body.subtitle    
    activeDetailsCard.content = request.body.content    
    response.redirect('/details')
});

app.use((request, response) => {
    response.status(404).render('404');
});




app.listen(3000, () => { console.log('App rodando na porta ' + 3000); });
