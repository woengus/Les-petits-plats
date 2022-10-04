//import {recipes} from "./recipes";
console.log(recipes);
/*class RecipeCardContainer, pour récupérer les données de recipes.js à afficher*/
class RecipeCardsContainer {
  constructor(description, ingredients, name, time) {
    this.description = description;
    this.ingredients = ingredients;
    this.name = name;
    this.time = time;
  }
}

/*stockage des recettes*/

const recipeCardsContainer = document.querySelector(".cards");
const cardsRecipes = [];

//objet RecipeCardsContainer
for (const recipe of recipes) {
  let card = new RecipeCardsContainer(
    recipe.description,
    recipe.ingredients,
    recipe.name,
    recipe.time
  );
  cardsRecipes.push(card);
}

//console.table(cardsRecipes)


const allIngredients = [];
/*boucle pour récupérer les ingrédients du tableau recipe[i].ingredients*/
for (let i = 0; i < recipes.length; i++) {
  let ingredients = recipes[i].ingredients;
  for (let i = 0; i < ingredients.length; i++) {
    let ingredient = ingredients[i].ingredient;
    allIngredients.push(ingredient);
   
    /*nouveau tableau avec map, avec une fonction qui push chaque ingredient dans le tableau allIngredients, à mettre en 2eme méthode algo */
    //ingredients.map(({ ingredient }) => {
    //  allIngredients.push(`${ingredient}`); /*ne pas oublier `$`*/
    //});
 
  }
  
}


/*console.table(allIngredients) on a la les ingrédients filtrés mais avec des doublons
pour filtrer le tableau de ses doublons, on utilise la méthode Set, https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set*/
const ingredientsUniques = new Set(allIngredients);
//console.table(ingredientsUniques);


//affichage card

function displayCard(listRecipes){
//console.table(listRecipes)
    let recipesHTML = "";
    for(let i=0; i< listRecipes.length; i++) {
      
       recipesHTML += 
        `<div class="cards-flex">
            <div class="card-up">image de ${listRecipes[i].name}</div>
            <div class="card-down">
                <div class="card-down-vertical">
                    <div class="card-down-vertical-left">
                        <h2>${listRecipes[i].name}</h2>
                        <ul>
                           ${displayListIngredients(listRecipes[i].ingredients)}
                        
                        </ul>
                    </div>
                    <div class="card-down-vertical-right">
                        <div class ="flex-h2-time"><i class="fa-regular fa-clock"></i><h2>${listRecipes[i].time} min</h2></div>
                        <p>${listRecipes[i].description}</p>
                    </div>
                </div>
            </div>
        </div>`
        
    }
    recipeCardsContainer.innerHTML = recipesHTML;
}
displayCard(recipes);

//function displayListingredient

function displayListIngredients(ingredients) {
    let ingredientsHTML = ""
    for (let i =0; i < ingredients.length;i++) {
        ingredientsHTML += `<li>${ingredients[i].quantity} ${ingredients[i].unit ? ingredients[i].unit : ""} ${ingredients[i].ingredient}</li>` //function ternaire pou unit
    }
    return ingredientsHTML
}
//barre de recherche évenement keyup

const searchbar = document.querySelector("#search-bar");

searchbar.addEventListener("input", (e) => {
    console.log(e.target.value)
    const typedLetters = e.target.value.toLocaleLowerCase(); //on stocke les lettres recherchées tappées dans la barre de recherche
 
//function pour rechercher 
    function searchFilter(letters) { 
        let recipeFiltered = [];
        if(letters.length >2 ) {    //on cherche des mots de plus de 2 lettres
            //on boucle sur les elements
            for (let i = 0; i < recipes.length; i++) {
                //on vérifie qu'on a dans les recettes les lettres recherchées avec la méthode includes()
                if(recipes[i].description.toLowerCase().includes(letters) || 
                recipes[i].name.toLocaleLowerCase().includes(letters) || searchIngredients(letters, recipes[i].ingredients)) { //todo : chercher sur les ingrédients
                    console.log(recipes[i])
                    recipeFiltered.push(recipes[i]); //on affiche les cards contenant les lettres recherchées
                }
            }
            //todo: else, boucler sur les ingrédients
            console.log(recipeFiltered)
            displayCard(recipeFiltered);
        } 
        else {
            displayCard(recipes);
        }
    }
    searchFilter(typedLetters)
})
// function searchIngredient

function searchIngredients(letters, ingredients) {
    console.log(ingredients)
    for (let i =0; i < ingredients; i++) {
        if(ingredients[i].ingredient.toLocaleLowerCase().includes(letters)) {
            return true
        }
    }
    return false
}