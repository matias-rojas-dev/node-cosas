import { ServerApp } from './presentation/server'

// IIFE asíncrona (Immediately Invoked Function Expression)
/*
En resumen, este patrón se utiliza para encapsular y ejecutar código asíncrono 
de forma inmediata, permitiendo aprovechar las ventajas de async/await 
en un contexto de ejecución global o de módulo. En este caso, lo que 
hace es llamar inmediatamente a la función main(), que a su vez inicia 
el servidor mediante ServerApp.start().

*/
;(async () => {
  main()
})()

function main() {
  ServerApp.start()
}
