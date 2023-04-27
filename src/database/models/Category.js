module.exports = function (sequelize, dataTypes){

    let alias= "Category"; //como sequelize va a llamar a esta tabla.

    let cols = { //las columnas que sequelize va a leer de la base de datos y asi podemos leerlas.

        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:dataTypes.STRING
        }
    }

    let config = {
        tableName: "category",
        timestamps: false
    }
    
    let Category = sequelize.define (alias,cols,config);

        
    Category.associate = function (models){
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "categoryId",
        });
    }

    return Category;
}