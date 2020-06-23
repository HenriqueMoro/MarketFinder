const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    
    const market = await connection('market').select('*')

    return response.json(market);
  },

  async create (request, response) {
    const { nome, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection('market').insert({
        id,
        nome,
        email,
        whatsapp,
        city,
        uf,
        
    })

    return response.json({ id });
  }
};