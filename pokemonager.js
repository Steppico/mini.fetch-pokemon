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
      await Promise.all(
        allPokemon.map((poke) => {
          return getPokemon(poke.url);
        })
      ).then((pokemonArr) => {
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
