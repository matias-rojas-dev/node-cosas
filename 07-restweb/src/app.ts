import { envs } from './config/envs'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'
;(() => {
  main()
})()

function main() {
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    file_name: envs.FILE_NAME,
    router: AppRoutes.routes,
  })
  server.start()
}
