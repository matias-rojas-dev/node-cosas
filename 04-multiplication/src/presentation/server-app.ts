interface RunOptionsProps {
  base: number
  limit: number
  showTable: boolean
}

export class ServerApp {
  static async run(options: RunOptionsProps) {
    console.log("Server running ...")
    console.log(options)
  }
}
