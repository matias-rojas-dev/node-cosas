import { yarg } from './config/plugins/yargs.plugin'
import { ServerApp } from './presentation/server-app'
;(async () => {
  await main()
})()

async function main() {
  const { b: base, l: limit, s: showTable, n: name, d: destination } = yarg
  ServerApp.run({ base, limit, showTable, name, destination })
}
