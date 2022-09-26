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
//console.table(ingredientsUniques);


//affichage card

function displayCard(){
console.table(cardsRecipes[0].ingredients[0].ingredient)
    for(let i=0; i< cardsRecipes.length; i++) {
      
        recipeCardsContainer.innerHTML = recipeCardsContainer.innerHTML +
        `<div class="cards-flex">
            <div class="card-up">image de ${cardsRecipes[i].name}</div>
            <div class="card-down">
                <div class="card-down-vertical">
                    <div class="card-down-vertical-left">
                        <h2>${cardsRecipes[i].name}</h2>
                        <p>${cardsRecipes[i].ingredients[0].ingredient}</p>
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

//barre de recherche évenement keyup

const searchbar = document.querySelector("#search-bar");

searchbar.addEventListener("keyup", (e) => {
    //console.log(e.target.value)
    const typedLetters = e.target.value; //on stocke les lettres recherchées tappées dans la barre de recherche
    const cards = document.querySelectorAll(".cards-flex"); //on selectionne toutes les cards
    //console.log(cards) on vérifie qu'on a bien toutes les recettes

//function pour rechercher 
    function searchFilter(letters, cardLetters) { 
        if(letters.length >2 ) {    //on cherche des mots de plus de 2 lettres
            //on boucle sur les elements
            for (let i = 0; i < cardLetters.length; i++) {
                //on vérifie qu'on a dans les cards les lettres recherchées avec la méthode includes()
                if(cardLetters[i].textContent.toLowerCase().includes(letters)) { //on vérifie si le contenu du texte de la card possède les lettres recherchées, en mettant en minuscule
                    cardLetters[i].style.display = "block"; //on affiche les cards contenant les lettres recherchées
                }
                else {
                    cardLetters[i].style.display ="none"; //on enlève les cards ne comportant pas les lettres recherchées
                }
            }
        } 
    }
    searchFilter(typedLetters, cards)
})
