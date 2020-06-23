const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
      const { id } = request.body;

      const market = await connection('market')
        .where('id', id)
        .select('nome')
        .first()

      if (!market) {
        return response.status(400).json({ error: 'No Market found with this ID'});
      }

      return response.json(market);
    }
}