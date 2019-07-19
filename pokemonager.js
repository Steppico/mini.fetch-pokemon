(() => {
  class Pokemonager {
    // This should return an array of all the names of n Pokemon from the Pokemon API.
    async findNames(n) {
      let pokeData;
      await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${n}`)
        .then((res) => res.json())
        .then((res2) => (pokeData = res2));
      return pokeData.results.map((pokemon) => pokemon.name);
    }

    // This should return an array of all the Pokemon that are under a particular weight.

    async findUnderWeight(weight) {
      const getPokemon = async (url) => {
        return fetch(url).then((res) => res.json());
      };

      let allPokemon;
      await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10")
        .then((res) => res.json())
        .then((data) => (allPokemon = data.results));
      let result = [];
      await Promise.all([
        getPokemon(allPokemon[0].url),
        getPokemon(allPokemon[1].url),
        getPokemon(allPokemon[2].url),
        getPokemon(allPokemon[3].url),
        getPokemon(allPokemon[4].url),
        getPokemon(allPokemon[5].url),
        getPokemon(allPokemon[6].url),
        getPokemon(allPokemon[7].url),
        getPokemon(allPokemon[8].url),
        getPokemon(allPokemon[9].url),
      ]).then((pokemonArr) => {
        pokemonArr.forEach((pokemon) => {
          if (pokemon.weight < weight) {
            result.push(pokemon);
          }
        });
      });
      return result;
    }
  }

  window.Pokemonager = Pokemonager;
})();
