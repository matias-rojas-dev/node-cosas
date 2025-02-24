import { httpClientPlugin } from "../plugins"

export const getPokemonById = async (id: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemon = await httpClientPlugin.GET_AXIOS(url)

  return pokemon.name
}
