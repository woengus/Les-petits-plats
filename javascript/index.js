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

//tous les noms de recettes
let allName = []
recipes.map(({name}) => {
    allName.push(`${name}`)
})
//console.table(allName.sort());

//tous les ustensiles
let allUstensils = []
recipes.map(({ustensils}) => {
    allUstensils.push(`${ustensils}`)
})
//console.table(allUstensils.sort())

//boucle pour récupérer tous les ingrédients
let allIngredients = []
recipes.forEach((recipe)=>{
  let ingredients = recipe.ingredients;
  ingredients.forEach((ingredient) => {
       allIngredients.push(ingredient.ingredient);
  })
})
/*console.table(allIngredients) on a la les ingrédients filtrés mais avec des doublons
pour filtrer le tableau de ses doublons, on utilise la méthode Set, https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set*/
const ingredientsUniques = new Set(allIngredients);
console.table(ingredientsUniques);


//affichage card

function displayCard(recipes){

    let recipesHTML = "";
    recipes.forEach((items)=> {
      
       recipesHTML += 
        `<div class="cards-flex">
            <div class="card-up"></div>
            <div class="card-down">
                <div class="card-down-vertical">
                    <div class="card-down-vertical-left">
                        <h2>${items.name}</h2>
                        <ul>
                           ${displayListIngredients(items.ingredients)}
                        
                        </ul>
                    </div>
                    <div class="card-down-vertical-right">
                        <div class ="flex-h2-time"><i class="fa-regular fa-clock"></i><h2>${items.time} min</h2></div>
                        <p>${items.description}</p>
                    </div>
                </div>
            </div>
        </div>`
        
    })
    recipeCardsContainer.innerHTML = recipesHTML;
}
displayCard(recipes);

//function displayListingredient

function displayListIngredients(ingredients) {
    let ingredientsHTML = ""
    ingredients.forEach((ingredient) => {
        ingredientsHTML += `<li>${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""} ${ingredient.ingredient}</li>` //function ternaire pour unit
    })
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
           recipes.forEach((recipe)=>{
                //on vérifie qu'on a dans les recettes les lettres recherchées avec la méthode includes()
                if(recipe.description.toLowerCase().includes(letters) || 
                recipe.name.toLocaleLowerCase().includes(letters) || searchIngredients(letters, recipe.ingredients)) { 
                    console.log(recipe)
                    recipeFiltered.push(recipe); //on affiche les cards contenant les lettres recherchées
                }
            })
            
            //console.log(recipeFiltered)
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
   
    ingredients.forEach((ingredient) => {
        
        if(ingredient.ingredient.toLocaleLowerCase().includes(letters)) {
            console.log(ingredient)
            return true
        }
    })
    return false
}