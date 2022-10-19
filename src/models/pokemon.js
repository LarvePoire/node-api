const validTypes = [ 'Plante', 'Poison', 'Feu', 'Eau', 'Foudre', 'Insecte', 'Vol'];


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { msg: "this name already exist" },
            validate: {
                notEmpty: { msg: "this field can\'t be EMPTY"},
                notNull: { msg: "this field can\'t be NULL"},
            }
        },
        hp : {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "this field must be INT"},
                notNull: { msg: "this field can\'t be NULL"},
                min: {
                    args: [0],
                    message: "this field can\'t be 0",
                },
                max: {
                    args: [100],
                    message: "this field can\'t over 100",
                }
            }
        },
        cp : {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "this field must be INT"},
                notNull: { msg: "this field can\'t be NULL"},
                min: {
                    args: [0],
                    message: "this field can\'t be 0",
                },
                max: {
                    args: [100],
                    message: "this field can\'t over 100",
                }
            }
        },
        picture : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: "this field must be URL"},
                notEmpty: { msg: "this field can\'t be EMPTY"},
                notNull: { msg: "this field can\'t be NULL"},
            }
        },
        types : {
            type: DataTypes.STRING,
            allowNull: false,
            get(){
                return this.getDataValue('types').split(',');
            },
            set(types){
                this.setDataValue('types',types.join());
            },
            validate: {
                isTypesValid(value) {
                    if( !value ){
                        throw new Error('This field can\'t be EMPTY');
                    }
                    if(value.split(',').length > 4){
                        throw new Error('This field can\'t over 4 elements ');
                    }
                    value.split(',').forEach(type => {
                        if( !validTypes.includes(type)){
                            throw new Error(`This field must be type valid : ${validTypes}`);
                        }
                    })
                }
            },
        },
    })
}