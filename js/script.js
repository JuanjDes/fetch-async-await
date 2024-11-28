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

// --------------------------------------------- AL RECARGAR LA PAGINA BORRAMOS TODOS LOS DATOS ----------------------
    window.addEventListener('beforeunload', () => {
        currentPage = 1;
        document.getElementById('searchInput').value = '';
        document.getElementById('app').innerHTML = '';
    });




// --------------------------- OBTENEMOS DATOS DE LA API POKEMON MEDIANTE ASYNC / AWAIT ------------------------------
    async function getPokemons(page) {
        try {
            valorBuscaPokemon.value = valorBuscaPokemon.value.toLowerCase();  // pasamos nombre del pokemon introducido a minusculas

            if (valorBuscaPokemon.value === undefined || valorBuscaPokemon.value === '') {  // si no introducimos nada en busqueda
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                todosPokemon(data);
            } else {  // si he introducido un pokemon llama a la funcion unPokemon() y muestra el pokemon introducido
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${valorBuscaPokemon.value}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos. El Pokemon no existe');
                    }
                    const data = await response.json();
                    unPokemon(data);
                } 

        } catch (error) {
            console.error('Error:', error);
            alert(error);  // muestra el error en pantalla
        }
    }

// ------------------------------------------- FUNCION PARA MOSTRAR LOS 12 PRIMEROS POKEMON -------------------------------- 
    async function todosPokemon(data) {

        const imgContainer = document.getElementById('app');
        imgContainer.innerHTML = '';  // Limpiar el div para que no se muestren imágenes anteriores
        
        for (let i = 0; i < data.results.length; i++) {
            try {
                const response = await fetch(data.results[i].url);  // Hacer fetch al Pokémon [i]
                const pokemonData = await response.json();  // De la url del pokemon[i] traemos todos los datos

                const pokemonCard = document.createElement('div');
                const img = document.createElement('img');
                const nombre = document.createElement('h3');

                // altura y peso del pokemon
                const altura = document.createElement('p');
                const peso = document.createElement('p');
                altura.classList.add('datos-pokemon');
                peso.classList.add('datos-pokemon');
                altura.textContent = `Altura: ${pokemonData.height} cm`;
                peso.textContent = `Peso: ${(pokemonData.weight / 100).toFixed(1)} kg`;
                
                pokemonCard.classList.add('pokemon-card');  // Clase para dar estilo a la tarjeta del Pokémon
                img.classList.add('imagen-pokemon');
                nombre.classList.add('nombre-pokemon');

                img.src = pokemonData.sprites.other['official-artwork'].front_default; // Imagen frontal del Pokémon en alta difinición
                img.alt = pokemonData.name; // Nombre del Pokémon
                nombre.textContent = pokemonData.name; // Nombre del pokemon

                imgContainer.appendChild(pokemonCard);
                pokemonCard.appendChild(img);
                pokemonCard.appendChild(altura);
                pokemonCard.appendChild(peso);
                pokemonCard.appendChild(nombre);

              } catch (error) {
                console.error(`Error al obtener datos del Pokémon ${data.results[i].name}:`, error);
              }
        }
    }

    

// ------------------------------------------------ FUNCION PARA MOSTRAR POKEMON BUSCADO --------------------------------------
    async function unPokemon(data) {

        const imgContainer = document.getElementById('app');  // consigo el div del HTML
        imgContainer.innerHTML = '';  // Limpiar el div para que no se muestren imágenes anteriores

        // altura y peso del pokemon
        const altura = document.createElement('p');
        const peso = document.createElement('p');
        altura.classList.add('datos-pokemon');
        peso.classList.add('datos-pokemon');
        altura.textContent = `Altura: ${data.height} cm`;
        peso.textContent = `Peso: ${(data.weight / 100).toFixed(1)} kg`;
        
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
        pokemonCard.appendChild(altura);
        pokemonCard.appendChild(peso);
        pokemonCard.appendChild(nombre);
    }