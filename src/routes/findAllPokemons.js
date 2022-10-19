
const pokemons = require('../db/pokemons');
const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req,res) => {
        const limit = parseInt(req.query.limit) || 5;
        if( req.query.name ){
            const name = req.query.name;
            if( name.length < 2 ){   
                const message = 'Research need minimun 2 caractere';
                return res.status(400).json({message});
            }
            return Pokemon.findAndCountAll({ 
                where: {
                     name: {
                        [Op.like]: `%${name}%`
                     } 
                },
                order: ['name'],
                limit: limit
            })
            .then( ({count, rows}) => {
                const message = `${count} pokemons finds`;
                res.json( { message , data : rows })
            })
        }else{ 
            Pokemon.findAll( {
                 order: ['name'],
                 limit: limit
            } )
            .then( pokemons => {
                const message = "list pokemons";
                res.json( { message,data: pokemons } );
            })
            .catch( error => {
                const message = 'BUG SERVEUR';
                res.status(500).json({message, data: error});
            })
        }
    });
}


