/***********************************************************************  
Recuperar los Pokémon del localStorage
 metemos en array pokemonsGuardados el Item pokemons del localStorage.
 Si no hay nada, pokemonsGuardados estará vacio
************************************************************************/
let pokemonsGuardados = JSON.parse(localStorage.getItem('pokemons')) || [];

// CONTENEDOR PRINCIPAL PARA MOSTRAR LAS TARJETAS
const pokemonList = document.getElementById('app');

// FUNCION PARA MOSTRAR LOS POKEMON GUARDADOS, EN EL DIV APP
function mostrarGuardados() {
    pokemonList.innerHTML = '';  // limpiamos contenedor pokemonList antes de mostrar nada
    const imgContainer = document.getElementById('app'); // Contenedor principal que tendra el div de la carta
    
    // Si hay Pokémon guardados
    if (pokemonsGuardados.length > 0) {
        pokemonsGuardados.forEach((pokemon) => {  // recorremos el array pokemonsGuardados y recuperando datos e indice
            console.log(pokemon);
            const card = document.createElement('div');
            card.className = 'pokemon-card';

            // Imagen del Pokémon
            const imagen = document.createElement('img');
            imagen.classList.add('imagen-pokemon');
            imagen.src = pokemon.imagen;
            imagen.alt = pokemon.nombre;

            // Nombre del Pokémon
            const nombre = document.createElement('p');
            nombre.classList.add('nombre-pokemon');
            nombre.textContent = pokemon.nombre;

            // altura y peso del pokemon
            const altura = document.createElement('p');
            const peso = document.createElement('p');
            altura.classList.add('datos-pokemon');
            peso.classList.add('datos-pokemon');
            altura.textContent = `Altura: ${pokemon.altura} cm`;
            peso.textContent = `Peso: ${(pokemon.peso)} kg`;

            // evento click en la tarjeta del pokemon, para borrarlo
            card.addEventListener('click', (event) => {
                /* event.stopPropagation(); */
                eliminarPokemon(pokemon.nombre)
            });

            imgContainer.appendChild(card);
            card.appendChild(imagen);
            card.appendChild(altura);
            card.appendChild(peso);
            card.appendChild(nombre);            
        });
    } else {  // si no hay pokemons guardados
        pokemonList.innerHTML = '<p style="margin: 100px auto;">No tienes Pokémon guardados.</p>';
    }
}

function eliminarPokemon(nombre) {
    let pokemonEliminado = nombre;
    
    // array pokemonsGuardados, filtramos quitando el nombre que no queremos
    pokemonsGuardados = pokemonsGuardados.filter(pokemon => pokemon.nombre !== nombre);
    
    // El array actualizado lo pasamos otra vez al localStorage
    localStorage.setItem('pokemons', JSON.stringify(pokemonsGuardados));
    alert(`${pokemonEliminado} ha sido eliminado correctamente`);
    
    // volvemos a mostrar los pokemons actualizados
    mostrarGuardados();
}

// Mostramos pokemons guardados al cargar la pagina
mostrarGuardados()
