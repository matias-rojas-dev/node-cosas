import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').default(3000).asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  FILE_NAME: get('FILE_NAME').default('index.html').asString(),
}
