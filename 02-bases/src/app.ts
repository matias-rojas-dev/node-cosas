import { getPokemonById } from "./js-foundation/06-promises"
import { buildLogger } from "./plugins/logger.plugin"

const logger = buildLogger("app.ts")

const pokemon = getPokemonById(2)

console.log(pokemon)

logger.log("Hola mundo")
logger.error("This is bad y muy feo")
