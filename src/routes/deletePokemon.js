const { Pokemon } = require('../db/sequelize');
const pokemon = require('../models/pokemon');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req,res) => {
        Pokemon.findByPk( re.params.id )
        .then( pokemon => {
            if( pokemon == null ){
                const message = 'NOT FOUND';
                return res.status(404).json({message});
            }
            const pokemonDeleted = pokemon;
            return Pokemon.destroy({
                where : { id: pokemon.id }
            })
            .then(_ => {
                const message = `pokemon ${req.params.id} deleted`;
                res.json({ message , data : pokemonDeleted });
            })
        })
        .catch( error => {
            const message = 'BUG SERVEUR';
            res.status(500).json({message, data: error});
        });
    });
}