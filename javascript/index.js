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

console.table(cardsRecipes)

/*récupération de tous les ingrédients*/

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
console.table(ingredientsUniques);


//affichage card

function displayCard(){
    for(let i=0; i< cardsRecipes.length; i++) {
        console.log(i)
        recipeCardsContainer.innerHTML = recipeCardsContainer.innerHTML +
        `<div class="cards-flex">
            <div class="card-up">image de ${cardsRecipes[i].name}</div>
            <div class="card-down">
                <div class="card-down-vertical">
                    <div class="card-down-vertical-left">
                        <h2>${cardsRecipes[i].name}</h2>
                        <p>${cardsRecipes[i].ingredients}</p>
                    </div>
                    <div class="card-down-vertical-right">
                        <div class ="flex-h2-time"><i class="fa-regular fa-clock"></i><h2>${cardsRecipes[i].time} min</h2></div>
                        <p>${cardsRecipes[i].description}</p>
                    </div>
                </div>
            </div>
        </div>`
    }
    
}
displayCard();
