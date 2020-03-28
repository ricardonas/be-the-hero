//  Import do OngController
const OngController = require('./controllers/OngController');

//  Import do IncidentController
const IncidentController = require('./controllers/IncidentController');

// Import do ProfileController
const ProfileController = require('./controllers/ProfileController');

// Import do SessionController
const SessionController = require('./controllers/SessionController');

//  Import do Express
const express = require('express');

//  Atribui a routes uma chamada do Router do Express. Declarando que a mesma é uma rota.
const routes = express.Router();

//-----------------------ONGS ROUTES

//Método GET para retornar todos os dados da ONG que foi cadastrada.
routes.get('/ongs', OngController.index);

//  Define a rota e executa o Controller que foi importado.
routes.post('/ongs', OngController.create);

//---------------------INCIDENTS ROUTES

//Método GET para listar todos os casos.
routes.get('/incidents', IncidentController.index);

//  Método POST para criar um caso/incident.
routes.post('/incidents', IncidentController.create);

//  Método DELETE para remover um caso.
routes.delete('/incidents/:id', IncidentController.delete);

//  Método GET para listar todos os casos que uma ONG possui.
routes.get('/profile', ProfileController.index);

//-----------------------ONGS PROFILES

// Método GET para sessões.
routes.post('/sessions', SessionController.create);

//Exporta todos os módulos routes.
module.exports = routes;
