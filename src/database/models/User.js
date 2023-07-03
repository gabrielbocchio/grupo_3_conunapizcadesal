module.exports = function (sequelize, dataTypes){

    let alias= "Users"; //como sequelize va a llamar a esta tabla.

    let cols = { //las columnas que sequelize va a leer de la base de datos y asi podemos leerlas.

        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname:{
            type:dataTypes.STRING
        },
        lastname:{
            type:dataTypes.STRING
        },
         password: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        avatars: {
            type: dataTypes.STRING
        },
        address: {
            type:dataTypes.STRING
        }

    }

    let config = {
        tableName: "users",
        timestamps: false
    }
    
    let User = sequelize.define (alias,cols,config);


    return User;
}