
const searchInput = document.querySelector('#inputPokemonName')
let api = `https://pokeapi.co/api/v2/pokemon/`


buscaPokemon()

searchInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        buscaPokemon();
    }
})


async function buscaPokemon(){
    try{
        let nomePokemon = searchInput.value.toLowerCase()
        let pokemonData = await fetch(`${api}${nomePokemon}`)
            if(pokemonData.status === 200){
                let toJson = await pokemonData.json();
                console.log(toJson)
                atualizaStats(toJson)
                searchInput.value = ''
            } else if(pokemonData.status === 404){
                alert('Pokemon não existe')
            }
    }
    catch(error){
        console.error('Erro:', error)
    }
   
}

async function atualizaStats(pokemon){
    let numbers = document.querySelectorAll('.desc-number')
    let type = document.querySelectorAll('.type')
        document.querySelector('#idPokemon').innerText = `#${pokemon.id.toString().padStart(3, '0')}`;
    let linha = document.querySelectorAll('.desc-inner')
    let pokemonName = document.querySelector('.pokemonName h1')

    let imagePokemon = document.querySelector('#imagePokemon')
    imagePokemon.setAttribute('src', `${pokemon.sprites.other.home.front_default}`)

     pokemonName.innerText = pokemon.name

    for(let i = 0; i < numbers.length; i++){
        numbers[i].innerText = pokemon.stats[i].base_stat
    }
    
for (let i = 0; i < type.length; i++) {
    if (pokemon.types[i]) {
        type[i].innerText = pokemon.types[i].type.name;
        type[i].style.display = 'block';
    } else {
        type[i].style.display = 'none';
    }
}
 
 for(let i = 0; i < linha.length; i++){
    linha[i].style.width = `${pokemon.stats[i].base_stat}%`
 }

}
