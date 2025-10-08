export async function fetchPokemonData(name) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
    if (!res.ok) throw new Error('No Pokémon found: ' + name)
    return await res.json()
}