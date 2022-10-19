const {Sequelize, DataTypes}  = require('sequelize');   //ORM 
const PokemonModel = require('../models/pokemon');
const user = require('../models/user');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');      

const pokemons = require('./pokemons');

console.log(process.env.NODE_ENV);

let sequelize;
if(process.env.NODE_ENV === 'production'){
    sequelize = new Sequelize(
        '', //name DB
        '', //id DB
        '', //pass DB
        {
            host: '',
            dialect: 'mysql',
            logging: false
        },
    )
}else{
    sequelize = new Sequelize(
    'api_node',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            socketPath: '/tmp/mysql.sock' //  Specify the socket file path 
        },
        logging: false
    },
)}

sequelize.authenticate()
    .then( _ => console.log("connexion with BDD ready !"))
    .catch( error => console.error(`fail connexion with BDD ${error}`));

const Pokemon = PokemonModel(sequelize,DataTypes);
const User = UserModel(sequelize,DataTypes);

const initDB = () => {
    let refreshBDD = process.env.NODE_ENV === 'production' ? null : {force:true} ;
    return sequelize.sync( refreshBDD ).then(_ => {
        console.log('Pokedex database sync' );

        pokemons.map( pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types, //join = toString
            }).then( 
                //x => console.log(x.toJSON() )
            );
        });

        bcrypt.hash('admin',10)
            .then( hash => {
                User.create({
                    username: 'admin',
                    password: hash
                });
            })
            .then( //x => console.log(x.toJSON() )
            );
        

        console.log('BDD is init');
    });
}

module.exports = {
    initDB, Pokemon, User
}

