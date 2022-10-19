
const { Pokemon } = require('../db/sequelize');
const auth = require('../auth/auth');


module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, (req,res) => {
        Pokemon.findByPk( req.params.id )
            .then( pokemon => {
                if( pokemon == null ){
                    const message = 'NOT FOUND';
                    return res.status(404).json({message});
                }
                const message = `pokemon ${req.params.id}`;
                res.json( { message,data: pokemon } );
            }).catch( error => {
                const message = 'BUG SERVEUR';
                res.status(500).json({message, data: error});
            })
    });
}