const fs = require("fs");
const path = require("path");
const productosFilePath = path.join(__dirname, "../database/productos.json");
let db= require ("../database/models");
const Op = db.Sequelize.Op;

const productos={
/* ---------------------------------------------------------------- */
// main de producto (productDetail), muestra todo el listado de productos desde el json
    produ: function(req,res){
      db.Product.findAll()
          .then (function(productos){
              res.render ("product/productDetail", {productos:productos})
          })
        },
/* ---------------------------------------------------------------- */
      produCategoria: (req, res) => {
        const category = req.params.category;
        db.Product.findAll({
          where: category ? { '$category.name$': category } : {},
          include: [{ model: db.Category, as: 'category' }]
        })
          .then(productosFiltrados => {
            res.render('product/productDetail', { productos: productosFiltrados });
          })
      },
      
  // pagina individual del producto, toma por params el producto seleccionado, requiere json y busca el que coincide y lo muestra a travez de la renderizacion
/* ---------------------------------------------------------------- */    
        productInfo: function (req,res) {
        db.Product.findByPk (req.params.id)
        .then(function(comida){
            res.render ("product/productInfo",{comida:comida})
        })
    },
/* ---------------------------------------------------------------- */
// carrito
    carrito: (req, res) => {
        return res.render("product/productCart");
    },
/* ---------------------------------------------------------------- */
// crear
    // simplemente renderiza la pagina de creacion de producto
      crearProducto: function (req,res){
      db.Category.findAll ()
      .then (function(category){
          return res.render ("product/crear-producto", {category:category});
      })
  },
/* --------- */   

    guardarProducto: function (req,res) {
      db.Product.create ({
          name: req.body.name, //aca va titulo porque es el nombre del campo del formulario
          categoryId:req.body.category ,
          description: req.body.description,
          price:req.body.price,
          imagen:req.file ? req.file.filename : "default-image.png",
      })
      .then(() => {
        res.redirect("/productDetail");
      })
      
  },

      /* ---------------------------------------- */
      // editar
    
      editarProducto: function(req,res) { //aca estoy haciendo dos pedidos asincronicos, ya que para editar tengo qeu llamar todos los datos de la pelicula y tambien todas las opciones de genero para que al editar elija.
        let pedidoProducto= db.Product.findByPk(req.params.id);
    
        let pedidoCategorias= db.Category.findAll();
    
        Promise.all([pedidoProducto,pedidoCategorias]) //el then se va a ejecutar cuando se cumplan los dos pedidos.  
            .then(function([product, category]){
              res.render("product/editar-producto", {product:product, category:category})
            })
    },
      /* --------- */
      productoEditado: function (req,res){
        db.Product.update ({
          name: req.body.name, //aca va titulo porque es el nombre del campo del formulario
          categoryId:req.body.categoryId,
          description: req.body.description,
          price:req.body.price,
          imagen:req.file ? req.file.filename : "default-image.png",
        }, {
            where: {
                id: req.params.id
            }
        }) 
        .then(() => {
          res.redirect("/productDetail");
        })
  
    },
    
      /* ---------------------------------------------------------------- */
      // eliminar
     
      productoEliminado: function (req,res) {
        db.Product.destroy ({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
          res.redirect("/productDetail");
        })
    },
    
      /* ---------------------------------------------------------------- */
      // buscar
      buscarProducto: (req, res)=>{
        const search = req.query.search;
        db.Product.findAll({
          where: {
            name: {
              [Op.like]: '%' + search + '%'
            }            
          }
        }).then(function(productos) {
          res.render('product/search-producto', { productoResults: productos });
        });
    }

  }
    module.exports = productos;