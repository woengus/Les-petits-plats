

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
                        <div>${items.description}</div>
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
       ingredientsHTML += `<li><span class="ingredient-bold">${ingredient.ingredient}:</span> ${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</li>` //function ternaire pour unit
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
                    recipeFiltered.push(recipe); //on affiche les cards contenant les lettres recherchées 
                }
                
            })
            if(recipeFiltered.length === 0) { //si on n'a pas trouvé de recette, on affiche le message d'erreur
                document.querySelector(".notFound").innerHTML = "Aucune recette ne correspond à votre critère" 
            }
            else {
                document.querySelector(".notFound").innerHTML = "" //on enlève le message d'erreur
            }
            //console.log(recipeFiltered)
            displayCard(recipeFiltered);
            getAllAplliances(recipeFiltered);
            getAllIngredients(recipeFiltered);
            getAllUstensils(recipeFiltered);
           
        } 
        else {
            displayCard(recipes);
            getAllAplliances(recipes);
            getAllIngredients(recipes);
            getAllUstensils(recipes);
            document.querySelector(".notFound").innerHTML = ""
        }
       
    }
    searchFilter(typedLetters)
    
})

// function searchIngredient

function searchIngredients(letters, ingredients) {
   
    ingredients.forEach((ingredient) => {
       //console.log((ingredient));
        if(ingredient.ingredient.toLocaleLowerCase().includes(letters)) {
            console.log(ingredient)
            return true
        }
    })
    return false
}


//tous les noms de recettes
let allName = []
recipes.map(({name}) => {
    allName.push(`${name}`)
})


//tous les appareils
function getAllAplliances(recipes) {
    let allAppliances = []

recipes.map(({appliance}) => {
    if(!allAppliances.includes(appliance)){
        allAppliances.push(appliance)
        console.log(appliance);
    } 
})
allAppliances.sort(); //tri alphabétique
displayAppliances(allAppliances)
}


//tous les ustensiles
function getAllUstensils(recipes) {
    let allUstensils = []
recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
        if(!allUstensils.includes(ustensil)){
            allUstensils.push(ustensil)
        }
    })
})
console.table(allUstensils)
allUstensils.sort();
displayUstensils(allUstensils);
}


// tous les ingrédients
function getAllIngredients(recipes) {
    let allIngredients = []

    recipes.forEach((recipe)=>{
        let ingredients = recipe.ingredients;
        ingredients.forEach((ingredient) => {
              if(!allIngredients.includes(ingredient.ingredient)){ //on filtre ici pour éviter des doublons d'ingrédients
                  allIngredients.push(ingredient.ingredient);
              }
        })
      })

allIngredients.sort();
displayIngredients(allIngredients)

//console.table(allIngredients);
}


//click sur ingredients / appareils / ustensiles
function displayIngredients(allIngredients) {
    let ingredientsHTML = ""
    let openIngredients = 
    `<div class="ingredients-title">
        <h3>
            Ingrédients 
            <i onclick="openList('ingredients')" class="fa-solid fa-chevron-down" ></i>
        </h3>
    </div>
    <p class="ingredients-search is-invisible">Rechercher un ingrédient<i onclick="openList('ingredients')" class="fa-solid fa-chevron-up" ></i></p>
    <div class="ingredients-list is-invisible">
        ${allIngredients.forEach(element => ingredientsHTML += `<li onClick ="addIngredient('${element}')">${element}</li>`)}
    </div>`
    document.querySelector(".ingredients").innerHTML = openIngredients
    document.querySelector(".ingredients-list").innerHTML = ingredientsHTML
}
function displayUstensils(allUstensils) {
    let ustensilsHTML = ""
    let openUstensils = `
    <div class="ustensils-title">
        <h3>
            Ustensiles 
            <i onclick="openList('ustensils')" class="fa-solid fa-chevron-down"></i>
            </h3>
        </div>
    <p class="ustensils-search is-invisible">Rechercher un ustensile<i onclick="openList('ustensils')" class="fa-solid fa-chevron-up"></i></p>
    <div class="ustensils-list is-invisible">
        ${allUstensils.forEach(element => ustensilsHTML += `<li onClick ="addUstensil('${element}')">${element}</li>`)}
    </div>`
    document.querySelector(".ustensils").innerHTML = openUstensils
    document.querySelector(".ustensils-list").innerHTML = ustensilsHTML
}

function displayAppliances(allAppliances) {
    let applianceHTML = ""
    let openAppliances =
     `<div class="appliances-title">
        <h3>
            Appareils 
            <i onclick="openList('appliances')" class="fa-solid fa-chevron-down"></i>
        </h3>
     </div>
     <p class="appliances-search is-invisible">Rechercher un appareil<i onclick="openList('appliances')" class="fa-solid fa-chevron-up"></i></p>
     <div class="appliances-list is-invisible">${allAppliances.forEach(element =>  applianceHTML += `<li onClick ="addAppliance('${element}')">${element}</li>`)}</div>`
    document.querySelector(".appliances").innerHTML = openAppliances
    document.querySelector(".appliances-list").innerHTML = applianceHTML
}

//function openList, ouvre et ferme la liste des ingrédients, appareils ou ustensiles au click sur les fleches
function openList(list) {
    console.log(`.${list}`+"-list")
    
    if(document.querySelector(`.${list}`+"-list").classList.contains("is-invisible")) {
        document.querySelector(`.${list}`+"-list").classList.remove("is-invisible")
        document.querySelector(`.${list}`+"-list").classList.add("is-visible")
        document.querySelector(`.${list}`+"-search").classList.remove("is-invisible")
        document.querySelector(`.${list}`+"-search").classList.add("is-visible")
        document.querySelector(`.${list}`+"-title").classList.add("is-invisible")
    }
    else {
        document.querySelector(`.${list}`+"-list").classList.remove("is-visible")
        document.querySelector(`.${list}`+"-list").classList.add("is-invisible")
        document.querySelector(`.${list}`+"-search").classList.remove("is-visible")
        document.querySelector(`.${list}`+"-search").classList.add("is-invisible")
        document.querySelector(`.${list}`+"-title").classList.remove("is-invisible")
        document.querySelector(`.${list}`+"-title").classList.add("is-visible")
    }
    
}


let ingredientFiltered = []
let ustensilFiltered = []
let applianceFiltered = []
//addIngredient et removeIngredient
function addIngredient(element) {
    let tagHTML = document.createElement("span")
    tagHTML.classList.add("ingredientTag")
    tagHTML.innerHTML = `${element}<i class="fa-regular fa-circle-xmark" onclick="removeIngredient(event,'${element}')"></i>`
    //console.log(tagHTML) 
    document.querySelector(".filter-result").appendChild(tagHTML)
    ingredientFiltered.push(element)
    console.log(ingredientFiltered)

}
function removeIngredient(event,element) {
    console.log(event.target.parentElement)
    console.log(element)
    const tagHTML = event.target.parentElement //pour enlever le parent, croix et le span
    document.querySelector(".filter-result").removeChild(tagHTML)
    ingredientFiltered = ingredientFiltered.filter(ingredient => {
        return ingredient != element;
    })
    console.log(ingredientFiltered)
}

//addUstensil et removeUstensil
function addUstensil(element) {
    let tagHTML = document.createElement("span")
    tagHTML.classList.add("ustensilTag")
    tagHTML.innerHTML = `${element}<i class="fa-regular fa-circle-xmark" onclick="removeUstensil(event,'${element}')"></i>`
    //console.log(tagHTML) 
    document.querySelector(".filter-result").appendChild(tagHTML)
    ustensilFiltered.push(element)
}
function removeUstensil(event,element) {
    const tagHTML = event.target.parentElement //pour enlever le parent, croix et le span
    document.querySelector(".filter-result").removeChild(tagHTML)
    ustensilFiltered = ustensilFiltered.filter(ingredient => {
        return ingredient != element;
    })
}

//addAppliance et removeAppliance
function addAppliance(element) {
    let tagHTML = document.createElement("span")
    tagHTML.classList.add("applianceTag")
    tagHTML.innerHTML = `${element}<i class="fa-regular fa-circle-xmark" onclick="removeAppliance(event,'${element}')"></i>`
    //console.log(tagHTML) 
    document.querySelector(".filter-result").appendChild(tagHTML)
    applianceFiltered.push(element)
}
function removeAppliance(event,element) {
    const tagHTML = event.target.parentElement //pour enlever le parent, croix et le span
    document.querySelector(".filter-result").removeChild(tagHTML)
    applianceFiltered = applianceFiltered.filter(ingredient => {
        return ingredient != element;
    })
}

getAllAplliances(recipes);
getAllIngredients(recipes);
getAllUstensils(recipes);
