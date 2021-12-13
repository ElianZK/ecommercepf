const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getProducts} =require('./src/Controllers/DbLoading/getProds');
const {Product, CategoryBrand, Brand, Category} =require('./src/db');




// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  try{
    //[si ya hay elementos en la base de datos no hago fetch a la api
    let aux = await Product.count();
    //! console.log(aux)
    if(!aux){

      //[Busco los productos al endpoint de internet
      let products =await getProducts();
      //! console.log(products)
    
      //[Agrego los productos a la base de datos
      for(let prod of products){
        //! console.log("PROD-DATA: ", prod.data)
        
        //| BUSCO CATEGORY
        let category = await Category.findOne({
          where:{
            name:prod.relation.category,
          },
          include:{
            model: Brand,
            where:{ name: prod.relation.brand},
            attributes: ['name'],
            through:{
              attributes: ["idRelation"],
            }
          } 
        });
        //|BUSCO la fila de CategoryBrand que tiene el ID correspondiente
        let relId= category.toJSON().brands[0].categoryBrand.idRelation; //extraigo el idRelation de la búsqueda asociativa de categorías
        let relation = await CategoryBrand.findOne({
          where: {idRelation: relId}
        });
         //! console.log("category: ", category.toJSON());
         //! console.log("RELATION: ", relation.toJSON());
         //! console.log("REL ID: ", relId)
        //[Agrego al producto el id de la relación.
        let product = await Product.create({
          ...prod.data, idRelation:relId},
        )
      }
    }

    //[Inicializo el servidor
    server.listen(3001,  () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });

  }catch(err){
    console.log("INDEX: ", err)
  }
});
