document.addEventListener('DOMContentLoaded', () => {
  let allPokemonData = [] // initially grab the data from the fetch and store it
  // DOM ELEMENTS:
  const cardContainer = document.getElementById('pokemon-container')
  const searchInputField = document.getElementById('pokemon-search-input')
  // console.log(searchInputField);
  searchInputField.addEventListener('input', (e) => { // special event object
    // event is the input event
    // event.target is part of the event object which has a special key of target which will be the object, or node, or HTML element that received the event
      // in this case, the target is the <input> field the user typed into
    // event.target.value is the string the user input into the search field
    const userInput = e.target.value
    // filter is going to iterate over the array of 150 poke elements where each element is pokeObject
    const filteredPoke = allPokemonData.filter((pokeObject) => {
      // filter the poke that pass this given test: pokes' whose name include the userInput
      return pokeObject.name.includes(userInput) // now we must update the pg to reflect these changes
    })
    const pokeHTML = renderAllPokemon(filteredPoke)
      cardContainer.innerHTML = pokeHTML // reset the view
  })

  cardContainer.addEventListener('click', function(e) {
    // if (e.target.nodeName === "IMG") {
    //   console.log('card was clicked!', e.target);
    // }
    if (e.target.dataset.action === 'flip') {
      const clickedPokemon = allPokemonData.find((pokeObject) => { // find returns THE THING ur looking for
        // debugger
        // event.target is the img that was clicked
        // event.target.dataset -> {action: 'flip', id: '3'}
        return pokeObject.id == event.target.dataset.id // loose equality
      })
      
      if (e.target.src == clickedPokemon.sprites.back) {
        e.target.src = clickedPokemon.sprites.front
      } else {
        e.target.src = clickedPokemon.sprites.back
      }
      // e.target is the img tag that was clicked

    }
  })

  // send a get request to the server
  // grab all the poke data
  let pokemonURL = 'http://localhost:3000/pokemon'
  // when u send a fetch req u dont just get back the data - u get back a responseObj that has metadata
  fetch(pokemonURL, { method: 'GET' })
    .then((responseObj) => {
      // console.log(responseObj);
      return responseObj.json() // want to parse the JSON out of the responseObj --> this will return a promise
    }) // when this promise resolves, go to the next .then()
    .then((parsedJSON) => {
      // sotre all the pokemon data in a JS array so we can interact w it AFTER the initial fetch
      allPokemonData = parsedJSON
      console.table(allPokemonData);
      // once we have the poke data, let's try to get SOMETHING on the page..
      cardContainer.innerHTML = renderAllPokemon(allPokemonData)
    })
}) // end of DOMContentLoaded

function renderAllPokemon(pokeCollection) {
  return pokeCollection.map(function(pokeObject) {
      return `
      <div class="pokemon-container">
            <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
              <h1 class="center-text">${pokeObject.name}</h1>
              <div style="width:239px;margin:auto">
                <div style="width:96px;margin:auto">
                  <img data-id="${pokeObject.id}" data-action="flip" class="toggle-sprite" src="${pokeObject.sprites.front}">
                </div>
              </div>
            </div>
          </div>  `
    }).join('') // will take our array of html strings and turn it into one big string so we dont see commas
}
