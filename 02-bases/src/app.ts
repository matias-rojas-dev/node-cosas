import { buildLogger } from "./plugins/logger.plugin"

const logger = buildLogger("app.ts")

logger.log("Hola mundo")
logger.error("This is bad y muy feo")
