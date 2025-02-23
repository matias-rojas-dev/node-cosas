const { getPokemonById } = require("./js-foundation/06-promises")

getPokemonById(2)
  .then((pokemon) => console.log(pokemon))
  .catch((err) => console.log(err))
  .finally(() => console.log("FInalmente"))
