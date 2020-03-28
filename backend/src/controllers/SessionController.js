/* 
    SessionController é responsável pelo Login.
*/

const connection = require('../database/connection');

module.exports = {
    
    //Verifica se a ONG existe na DB para validar o login.
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first(); //Assim ele não retorna um array, retorna apenas um resultado.

        //Caso a ONG não seja encontrada na DB, ele retorna um Bad Request (400), com uma mensagem de erro.
        if (!ong) {
            return response.status(400).json({ error: "No ong found with this ID" });
        }

        return response.json(ong);
    }
}