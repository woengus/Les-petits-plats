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
console.table(allIngredients)
/*console.table(allIngredients) on a la les ingrédients filtrés mais avec des doublons
    pour filtrer le tableau de ses doublons, on utilise la méthode Set, https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set*/
const ingredientsUniques = new Set(allIngredients);
console.table(ingredientsUniques);