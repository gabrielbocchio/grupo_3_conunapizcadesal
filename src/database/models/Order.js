module.exports = function (sequelize, dataTypes){

    let alias= "Order"; //como sequelize va a llamar a esta tabla.

    let cols = { //las columnas que sequelize va a leer de la base de datos y asi podemos leerlas.

        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type:dataTypes.INTEGER,
            references:{
                model: "User",
                 key: "id" } 
        },
        total:{
            type:dataTypes.INTEGER
        },
        fecha:{
            type:dataTypes.DATE
        }
    }

    let config = {
        tableName: "orders",
        timestamps: false
    }
    
    let Order = sequelize.define (alias,cols,config);

        
/*     Category.associate = function (models){
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "categoryId",
        });
    } */

    return Order;
}