interface ChechServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class ChechService implements ChechServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) throw new Error(`Error on check service ${url}`)
      console.log(`${url} is ok`)
      this.successCallback()
      return true
    } catch (error) {
      console.log(`Error: ${error}`)
      this.errorCallback(`Error: ${error}`)
      return false
    }
  }
}
