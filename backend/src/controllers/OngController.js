//Import do arquivo que permitirá a conexão com o banco de dados.
const connection = require('../database/connection');

//Através da biblioteca Crypto do Node, podemos gerar um ID aleatório para identificar a ONG.
const crypto = require('crypto');

//Módulos que serão exportados.
module.exports = {

    //Método assíncrono GET para retornar uma lista de ONGs.
    async index(request, response) {
        //Função assíncrona que aguarda o retorno com sucesso do SELECT da ONG.
        const ongs = await connection('ongs').select('*');
    
        //Retorna o SELECT da ONG em um JSON.
        return response.json(ongs);
    },

    //Método assíncrono POST para criar uma ONG.
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        /*
        *   Usa-se a biblioteca crypto para gerar 4 bytes de 
        *   caracteres aleatórios e os converte em uma string hexadecimal.
        */
        const id = crypto.randomBytes(4).toString('HEX');
    
        /*
        *   INSERT para a tabela com os dados recebidos no POST da rota '/ongs'.
        *   connection("nome da tabela").insert({ variáveis da tabela })
        *   await diz para o javascript aguardar a execução do INSERT finalizar para
        *   executar o return do método
        */
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        //Ao concluir o registro da ONG o método retorna um json com o ID da ONG criada.
        return response.json({ id });
    }
}