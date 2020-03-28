//Import do Knex.
const knex = require('knex');

//Import das configurações do Knex.
const configuration = require('../../knexfile');

/*
*   Cria-se uma conexão com o banco enviando ao knex as 
*   configurações do banco de dados de desenvolvimento.
*/
const connection = knex(configuration.development);

module.exports = connection;