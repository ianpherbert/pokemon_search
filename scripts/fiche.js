const urlParams = new URLSearchParams(window.location.search);
const pokemon = urlParams.get("n");
showFiche(pokemon);

function showFiche(pokemon) {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const url = baseUrl + pokemon;

  $.get(url, (pokemon) => {
    $("#name").text(pokemon.name);
    $("#title").text(pokemon.name);

    $("#id").text(pokemon.id);

    $.get(baseUrl + (pokemon.id - 1), (result) => {
      $("#previous").text(result.name);
    });
    $.get(baseUrl + (pokemon.id + 1), (result) => {
      $("#next").text(result.name);
    });

    $("#weight").text(pokemon.weight + " g");
    $("#height").text(pokemon.height + " cm");

    $("#type").empty();

    pokemon.types.forEach((t) => {
      $("#type").append(
        '<span class="type ' + t.type.name + '">' + t.type.name + "</span>"
      );
    });

    let pokeImg = document.getElementById("pokemon-img");
    const imgUrl = pokemon.sprites.other["official-artwork"]["front_default"];
    document.getElementById("favicon").href = imgUrl;
    pokeImg.src = imgUrl;
    pokeImg.alt = pokemon;
  });
}

$("#nav-foot>a").click((e) => {
  showFiche(e.currentTarget.textContent);
});
