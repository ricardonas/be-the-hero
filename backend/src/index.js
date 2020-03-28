//Micro framework para criar aplicações NodeJS
const express = require('express');

//Declara quem terá acesso à aplicação, qual url acessará a aplicação.
const cors = require('cors');

//Import das rotas/endereços URL e seus métodos GET/POST e etc
const routes = require('./routes');

//Atribui-se o express a uma constante.
const app = express();

/*
*   Método "use" diz o que será usado na aplicação.
*   Express.json() permite que o javascript receba um json no método post.
*   routes: executa as rotas configuradas e seus métodos HTTP.
*/
app.use(express.json());
app.use(routes);
app.use(cors());

//Método "listen" recebe em porta o app deverá ser executado.
app.listen(3333);
