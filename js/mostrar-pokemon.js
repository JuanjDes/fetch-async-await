/* Recuperar los Pokémon del localStorage
   metemos en array pokemonsGuardados el Item pokemons del localStorage.
   Si no hay nada, pokemonsGuardados estará vacio */
let pokemonsGuardados = JSON.parse(localStorage.getItem('pokemons')) || [];

// Contenedor donde mostrar los Pokémon
const pokemonList = document.getElementById('app');

// Función para manejar la eliminación de un Pokemon
/* function manejarClickEliminar(pokemon) {
    eliminarPokemon(pokemon.nombre);
} */

function mostrarGuardados() {
    pokemonList.innerHTML = '';  // limpiamos contenedor pokemonList antes de mostrar nada
    // Si hay Pokémon guardados
    if (pokemonsGuardados.length > 0) {
        pokemonsGuardados.forEach((pokemon) => {  // recorremos el array pokemonsGuardados y recuperando datos e indice
            
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

            // evento click en la tarjeta del pokemon, para borrarlo
            /* pokemonList.addEventListener('click', () => manejarClickEliminar(pokemon.nombre)); */  // llamamos a la función que elimina el pokemon
            pokemonList.addEventListener('click', () => eliminarPokemon(pokemon.nombre));

            card.appendChild(imagen);
            card.appendChild(nombre);
            pokemonList.appendChild(card);
            
        });
    } else {  // si no hay pokemons guardados
        pokemonList.innerHTML = '<p style="margin: 100px auto;">No tienes Pokémon guardados.</p>';
    }
}

function eliminarPokemon(nombre) {
    let pokemonEliminado = nombre;

    pokemonsGuardados = pokemonsGuardados.filter(pokemon => pokemon.nombre !== nombre);
    localStorage.setItem('pokemons', JSON.stringify(pokemonsGuardados));  // El array actualizado lo pasamos otra vez al localStorage
    alert(`${pokemonEliminado} ha sido eliminado correctamente`);
    
    mostrarGuardados();  // volvemos a mostrar los pokemons actualizados
}

// Mostramos pokemons guardados al cargar la pagina
mostrarGuardados()
