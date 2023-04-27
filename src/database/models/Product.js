module.exports = function (sequelize, dataTypes){

    let alias= "Product"; //como sequelize va a llamar a esta tabla.

    let cols = { //las columnas que sequelize va a leer de la base de datos y asi podemos leerlas.

        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:dataTypes.STRING
        },
        description:{
            type:dataTypes.STRING
        },
         price: {
            type: dataTypes.INTEGER
        },
        imagen: {
            type: dataTypes.STRING,
        },
        categoryId: {
            type: dataTypes.INTEGER,
            references:{
               model: "Category",
                key: "id" } 
        },
        discount: {
            type:dataTypes.INTEGER
        }

    }

    let config = {
        tableName: "products",
        timestamps: false
    }
    
    let Product = sequelize.define (alias,cols,config);

    Product.associate = function (models){
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryId"
        });
    }

    return Product;
}