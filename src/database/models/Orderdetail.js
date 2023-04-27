module.exports = function (sequelize, dataTypes){

    let alias= "Orderdetail"; //como sequelize va a llamar a esta tabla.

    let cols = { //las columnas que sequelize va a leer de la base de datos y asi podemos leerlas.

        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId:{
            type:dataTypes.INTEGER,
            references:{
                model: "Order",
                 key: "id" } 
        },
        productId:{
            type:dataTypes.STRING,
            references:{
                model: "Product",
                 key: "id" }
        },
        quantity:{
            type:dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "orderdetail",
        timestamps: false
    }
    
    let Orderdetail = sequelize.define (alias,cols,config);

        
/*     Category.associate = function (models){
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "categoryId",
        });
    } */

    return Orderdetail;
}