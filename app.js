const express = require('express');                     //expresss for request HTTP 
const favicon = require('serve-favicon');               //serve-favicon midleware favicon
const bodyParser = require('body-parser');              //bodyparser convert request in json 
const Sequelize = require('./src/db/sequelize');        //            
const cors = require('cors');                           //

const app = express();
//const port = 3000;                                    //DEV
const port = process.env.PORT                           //PROD
 
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(cors());

Sequelize.initDB()

//USELESS JUST FOR CHECK 
app.get('/', (req, res) => {
    res.json('Hello');
});

//Ici nos futur points de terminaison.
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

// gestion des erreurs
app
    .use( ({res}) => {
        const message = "UNKNOW REQUEST";
        res.status(404).json({message});
    })

if(process.env.NODE_ENV === 'production')
    app.listen(port, () => console.log(`notre app node : http://localhost:${port}`));
else{
    app.listen(port, () => console.log(`notre app node : ${port}`));
}
















/*
*    LOGGER MAISON l'ordre des midleware est important 
*   midleware appeler a chaque requete / 
*       app.use((req, res, next) => {
*       console.log(`URL ${req.url}`);
*       next();
*   });
*/


/*
app.get('/', (req,res) => res.send('hello, express 2 !'));

app.get('/api/pokemons', (req,res) => {
    const message = "";
    //res.json( helper.success(message,pokemons.length));
    res.json( success(message,pokemons));
});

app.post('/api/pokemons', (req,res) => {
    const id = getUniqueId(pokemons);
    const new_pokemon = { ...req.body, ...{id : id, created: new Date()}};
    pokemons.push(new_pokemon);
    const message = "add pokemon";
    res.json( success(message,new_pokemon));
});

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find( pokemon => pokemon.id === id);
    const message = 'pokemon find';
    res.json( success(message,pokemon));
});

app.put('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id};
    pokemons = pokemons.map( pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    });
    const message = 'pokemon updated';
    res.json( success(message,pokemonUpdated));
});

app.delete('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find( pokemon => pokemon.id === id);
    pokemons.filter( pokemon => pokemon.id !== id );
    const message = 'pokemon deleted';
    res.json( success(message,pokemonDeleted));
});
*/


/*
app.get('/pokemons/1', (req, res) => res.send ('Les informations du pokémon n°1 !'));
app.post ('/pokemons', (req, res) => res. send ('Vous venez d\'ajouter un nouveau pokémon au pokédex !'));
app.put('/pokemons/1', (req, res) => res.send ('Vous souhaitez modifier le pokémon n°1.'));
app.delete('/pokemons/1', (req, res) => res.send ('Le pokémon n°1 vient d\'être supprimé.'));
app.delete('/pokemons', (rea, res) => res.send ('Oh mince ! Vous venez de supprimer tous les pokémons !'));
*/