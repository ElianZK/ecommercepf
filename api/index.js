const server = require('./src/app.js');
// const { conn } = require('./src/db.js');
const { getProducts} =require('./src/Controllers/DbLoading/getProds');
let { Category, Order, Product, User, Cart, Details, Brand, CategoryBrand, Reviews, WishList} = require('./src/db');

const startServer= async()=>{
  try {
    
    let variable = false;

    await Brand.sync({force:variable});
    await Category.sync({force:variable});
    await CategoryBrand.sync({force:variable});
    await Product.sync({force:variable});
    await User.sync({force:variable});
    await Order.sync({force:variable});
    await Cart.sync({force:variable});
    await Details.sync({force:variable});
    await WishList.sync({force:variable});
    await Reviews.sync({force:variable});
    
    let aux = await Product.count();
    console.log("Products Registered in the DB: ",aux);
    if(!aux){
      console.log("Ceating default Products database...");
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
        // let relation = await CategoryBrand.findOne({
        //   where: {idRelation: relId}
        // });
          //! console.log("category: ", category.toJSON());
          //! console.log("RELATION: ", relation.toJSON());
          //! console.log("REL ID: ", relId)
          
        //[Agrego al producto el id de la relación.
        await Product.create({
          ...prod.data, idRelation:relId},
        )
      }
    }
    
    //[Inicializo el servidor
    server.listen(3001,  () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });

  } catch (error) {
    console.log("INDEX: ",error);
  }
};


startServer();
