const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('product').count();

    const product = await connection('product')
      .join('market', 'market.id', '=', 'product.market_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'product.*',
        'market.nome',
        'market.email',
        'market.whatsapp',
        'market.city',
        'market.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(product);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const market_id = request.headers.authorization;

    const [id] = await connection('product').insert({
      title,
      description,
      value,
      market_id
    });

    return response.json({ id });
  },

  async delete (request, response) {
    const { id } = request.params;
    const market_id = request.headers.authorization;

    const product = await connection('product')
      .where('id', id)
      .select('market_id')
      .first();

    if (product.market_id !== market_id) {
      return response.status(401).json({ erro: 'Operation not permitted'});
    }

    await connection('product').where('id', id).delete();

    return response.status(204).send();
  }
};