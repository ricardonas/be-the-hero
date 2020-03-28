const connection = require('../database/connection');

//Módulos que serão exportados.
module.exports = {

    //Método assíncrono GET para retornar uma lista de INCIDENTS.
    async index(request, response) {
        
        //Retorna a quantidade total de casos.
        //a const está entre colchetes para que o retorno seja apenas de um valor, não de um array ex: {32}.
        const [count] = await connection('incidents').count();

        //Retorna no header da resposta a propriedade 'X-Total-Count' 
        //com o número total de casos.
        response.header('X-Total-Count', count['count(*)']);

        //Paginação, ex: localhost:3333/incidents?page=1
        const { page = 1 } = request.query;
        
        //Função assíncrona que aguarda o retorno com sucesso do SELECT da INCIDENTS.
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //Junta à tabela ongs.
            .limit(5) //Limita a exibição de 5 resultados.
            .offset((page - 1) * 5) //Define o indice inicial. Ex: 1, 5, 10, 15, 20...
            .select([ //Select de todos os dados da tabela incidents e alguns dados da tabela ongs.
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);
    
        //Retorna o SELECT do INCIDENTS em um JSON.
        return response.json(incidents);
    },

    //Método assíncrono POST para criar uma INCIDENTS.
    async create(request, response) {
        const { title, description, value } = request.body;

        //Acessa o cabeçalho da requisição. 
        const ong_id = request.headers.authorization;

        //Executa a const e armazena o valor do indíce do json.
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        //Retorna um json contendo "id":"id";
        return response.json({ id });

    },

    //DELETAR UM CASO DA TABELA INCIDENTS.
    async delete(request, response) {
        
        //ID do caso.
        const { id } = request.params;

        //ID da ONG.
        const ong_id = request.headers.authorization;

        //Seleciona o ong_id do caso recebido no id na tabela Incidents.
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        //Caso o número da ONG seja diferente do ONG ID recebido na incident.
        //Isso evita que pessoas que não sejam dessa ong excluam um caso.
        if(incident.ong_id != ong_id) {
            //  Código 401 = unathourized.
            return response.status(401).json({error: "Operation not permitted."});
        }

        //Deleta o caso de ID x da tabela Incidents.
        await connection('incidents').where('id', id).delete();
        
        //204 -> Resposta com sucesso mas não há nenhum conteúdo para retornar.
        return response.status(204).send();

    }
}
