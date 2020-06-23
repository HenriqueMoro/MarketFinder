const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const MarketController = require('./controllers/MarketController');
const ProfileController = require('./controllers/ProfileController');
const ProductController = require('./controllers/ProductController');
const SessionController = require('./controllers/SessionController');
const SearchingController = require('./controllers/SearchingController')
const router = express.Router();


router.post('/busca', SearchingController.SearchUf)


router.get('/', function(req, res) {
    res.send('hello world from routes.js');
});

router.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.create);

router.get('/market', MarketController.index);

router.post('/market', celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(8).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
    
  })
}), MarketController.create);

router.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
}), ProfileController.index);

router.get('/product', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), ProductController.index);

router.post('/product', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}), ProductController.create);

router.delete('/product/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), ProductController.delete);

module.exports = router;