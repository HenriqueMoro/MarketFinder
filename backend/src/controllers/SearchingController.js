const connection = require('../database/connection');
 module.exports = {
     async SearchValue(request,response){
        const { value } = request.body;
        

        const product = await connection('product')
        // .join('market', 'market.id', '=', 'product.market_id')
          .where(function(){
              this.where('value','<',value)
         })
        
            return response.json(product)
         },
         async SearchUf(request,response){
            const {uf} = request.body;

            const product = await connection('market').where('uf', 'like',uf)
            
            return response.json(product)

         }
 }