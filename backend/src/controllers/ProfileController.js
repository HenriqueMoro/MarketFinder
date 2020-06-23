const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
      const market_id = request.headers.authorization;

      const product = await connection('product')
        .where('market_id', market_id)
        .select('*');

      return response.json(product);
    }
}