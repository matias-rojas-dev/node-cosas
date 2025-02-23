const { getPokemonById } = require("./js-foundation/06-promises")

getPokemonById(0)
  .then((pokemon) => console.log(pokemon))
  .catch((err) => console.log(`Por favor, intente de nuevo: ${err}`))
