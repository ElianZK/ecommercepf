const {Product, User, WishList} = require("../../../../db");


const postUserWishList = async (req,res,next)=>{
  try{
    const {UserId, ProductId} = req.params;

    //[Busco al usuario
    let user = await User.findByPk(UserId);
    //! console.log(usuario.toJSON());
    

    //[Busco el producto que agregaré a la lista.
    let product = await Product.findOne({
      where:{
        idProduct: ProductId
      }
    })

    //[ Agrego el producto a la lista
    let add = await user.addFavourite(product);

    //[Los vuelvo a pedir para enviar todos los nuevos productos de la lista
    let products = await user.getFavourites({
      attributes: ["idProduct","name", "price", "stock","thumbnail"]
    });
    products = products.map(el=>{
      const{idProduct, name, price, stock,thumbnail} = el.toJSON()
      return{idProduct, name, price, stock, thumbnail};
    })

    return res.status(200).json({created: Boolean(add), wishList:  products});
  }catch(err){
    console.log("POST users/wishlist/:UserId/:ProductId", err);
    next(err)
  }
};

module.exports = {postUserWishList};

/*
Foo.belongsToMany(Bar, { through: Baz })
The same ones from Foo.hasMany(Bar):

fooInstance.getBars()
fooInstance.countBars()
fooInstance.hasBar()
fooInstance.hasBars()
fooInstance.setBars()
fooInstance.addBar()
fooInstance.addBars()
fooInstance.removeBar()
fooInstance.removeBars()
fooInstance.createBar()
*/