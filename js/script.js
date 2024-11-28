let currentPage = 1;

const valorBuscaPokemon = document.getElementById('searchInput');
const buscaPokemon = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');

// --------------------------------------------- HACEMOS CLICK EN SEARCH ---------------------------------------------
    buscaPokemon.addEventListener('click', () => {
        document.getElementById('app').innerHTML = '';  // limpiamos el div-app para que no aparezca nada anterior
        getPokemons();
    });

// --------------------------------------------- HACEMOS ENTER EN SEARCH INPUT ---------------------------------------
    valorBuscaPokemon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            document.getElementById('app').innerHTML = '';  // limpiamos el div-app para que no aparezca nada anterior
            getPokemons();
        }
    });

// --------------------------------------------- HACEMOS CLICK EN PREVIOUS -------------------------------------------
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            document.getElementById('app').innerHTML = '';  // limpiamos el div-app para que no aparezca nada anterior
            getPokemons(currentPage);
        }
    });

// --------------------------------------------- HACEMOS CLICK EN NEXT -----------------------------------------------
    nextBtn.addEventListener('click', () => {
        currentPage++;
        document.getElementById('app').innerHTML = '';  // limpiamos el div-app para que no aparezca nada anterior
        getPokemons(currentPage);
    });

// --------------------------------------------- HACEMOS CLICK EN RESET ----------------------------------------------
    resetBtn.addEventListener('click', () => {
        currentPage = 1;
        document.getElementById('searchInput').value = '';  // limpiamos el input para que no aparezca nada anterior
        document.getElementById('app').innerHTML = '';  // limpiamos el div-app para que no aparezca nada anterior
        getPokemons(currentPage);
    });




// --------------------------- OBTENEMOS DATOS DE LA API POKEMON MEDIANTE ASYNC / AWAIT ------------------------------
    async function getPokemons(page) {
        try {
            valorBuscaPokemon.value = valorBuscaPokemon.value.toLowerCase();  // pasamos nombre del pokemon introducido a minusculas

            if (valorBuscaPokemon.value === undefined || valorBuscaPokemon.value === '') {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                todosPokemon(data);  // si no he introducido un pokemon, muestra los 50 primeros
            } else {  // si he introducido un pokemon, no llama a la funcion mostrarImagenes() y muestra el pokemon introducido
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${valorBuscaPokemon.value}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos');
                    }
                    const data = await response.json();
                    unPokemon(data);
                } 

        } catch (error) {
            console.error('Error:', error);
        }
    }

// ------------------------------------------- FUNCION PARA MOSTRAR LOS 12 PRIMEROS POKEMON -------------------------------- 
    async function todosPokemon(data) {

        const imgContainer = document.getElementById('app');
        imgContainer.innerHTML = '';  // Limpiar el div para que no se muestren imágenes anteriores
        
        for (let i = 0; i < data.results.length; i++) {
            try {
                const response = await fetch(data.results[i].url);  // Hacer fetch a la URL del Pokémon
                const pokemonData = await response.json();  // De la url del pokemon traemos todos los datos
          
                const pokemonCard = document.createElement('div');
                const img = document.createElement('img');
                const nombre = document.createElement('h3');
                
                pokemonCard.classList.add('pokemon-card');  // Clase para dar estilo a la tarjeta del Pokémon
                img.classList.add('imagen-pokemon');
                nombre.classList.add('nombre-pokemon');

                img.src = pokemonData.sprites.other['official-artwork'].front_default; // Imagen frontal del Pokémon en alta difinición
                img.alt = pokemonData.name; // Nombre del Pokémon
                nombre.textContent = pokemonData.name; // Nombre del pokemon

                imgContainer.appendChild(pokemonCard);
                pokemonCard.appendChild(img);
                pokemonCard.appendChild(nombre);

              } catch (error) {
                console.error(`Error al obtener datos del Pokémon ${data.results[i].name}:`, error);
              }
        }
    }

    function mostrarPokemons(data) {
        const imgContainer = document.getElementById('app');
        imgContainer.innerHTML = '';  // Limpiar el div para que no se muestren imágenes anteriores
    }

// ------------------------------------------------ FUNCION PARA MOSTRAR POKEMON BUSCADO --------------------------------------
    async function unPokemon(data) {

        const imgContainer = document.getElementById('app');  // consigo el div del HTML
        imgContainer.innerHTML = '';  // Limpiar el div para que no se muestren imágenes anteriores

        const pokemonCard = document.createElement('div');
        const img = document.createElement('img');
        const nombre = document.createElement('h3');

        pokemonCard.classList.add('pokemon-card');
        img.classList.add('imagen-pokemon-card');
        nombre.classList.add('nombre-pokemon');
        
        img.src = data.sprites.other['official-artwork'].front_default; // Imagen frontal del Pokémon en alta definición
        img.alt = data.name;
        nombre.textContent = data.name; // Nombre del Pokémon

        imgContainer.appendChild(pokemonCard);
        pokemonCard.appendChild(img);
        pokemonCard.appendChild(nombre);
    }