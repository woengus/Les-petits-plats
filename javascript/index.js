/*class RecipeCardContainer, pour récupérer les données de recipes.js à afficher*/
class RecipeCardsContainer {
  constructor(description, ingredients, name, time) {
    this.description = description;
    this.ingredients = ingredients;
    this.name = name;
    this.time = time;
  }
}
/* variable pour stocker la recherche*/
let search = ""

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
/**
 * 
 * @param {array} recipes affiche les recettes depuis le tableau recipes
 */
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
/**
 * 
 * @param {string} ingredients 
 * @returns création de la liste avec tous les ingrédients, la quantité et l'unité dans la card des recettes
 */
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
    //console.log(e.target.value)
    search = e.target.value.toLocaleLowerCase(); //on stocke les lettres recherchées tappées dans la barre de recherche
    filterRecipes()   
})

//recherche sur ingrédients
/**
 * 
 * @param {array} allIngredients 
 */
function searchFilterIngredients(allIngredients) {
    document.querySelector("#search-bar-ingredients").addEventListener("input" , event => {
        console.log(event.target.value);
        let ingredientsSearched = allIngredients.filter((ingredient)=> {
            if(ingredient.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())) {
                return ingredient
            }
            return false
        })
        console.log(ingredientsSearched);
       document.querySelector(".ingredients-list").innerHTML = `
            ${ingredientsSearched.map(ingredient => {
                return `<li onClick ="addIngredient('${ingredient}')" id="${ingredient}">${ingredient}</li>`
            }).join("")}
       `
    })
}
//recherche sur ustensils
/**
 * 
 * @param {array} allUstensils 
 */
function searchFilterUstensils(allUstensils) {
    document.querySelector("#search-bar-ustensils").addEventListener("input" , event => {
        console.log(event.target.value);
        let ustensilsSearched = allUstensils.filter((ustensil)=> {
            if(ustensil.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())) {
                return ustensil
            }
            return false
        })
        console.log(ustensilsSearched);
       document.querySelector(".ustensils-list").innerHTML = `
            ${ustensilsSearched.map(ustensil => {
                return `<li onClick ="addUstensil('${ustensil}')" id="${ustensil}">${ustensil}</li>`
            }).join("")}
       `
    })
}
//recherche sur appliances
/**
 * 
 * @param {array} allAppliances 
 */
function searchFilterAppliances(allAppliances) {
    document.querySelector("#search-bar-appliances").addEventListener("input" , event => {
        console.log(event.target.value);
        let appliancesSearched = allAppliances.filter((appliance)=> {
            if(appliance.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())) {
                return appliance
            }
            return false
        })
        console.log(appliancesSearched);
       document.querySelector(".appliances-list").innerHTML = `
            ${appliancesSearched.map(appliance => {
                return `<li onClick ="addUstensil('${appliance}')" id="${appliance}">${appliance}</li>`
            }).join("")}
       `
    })
}


//on filtre sur la liste de recettes

function filterRecipes() {
    console.log(applianceFiltered)
    let recipeFiltered = recipes.filter((recipe) => {
        if(search.length >2) {
            if(!recipe.description.toLowerCase().includes(search) && 
                !recipe.name.toLocaleLowerCase().includes(search) && !searchIngredients(search, recipe.ingredients)) { 
                    document.querySelector(".notFound").innerHTML = "Aucune recette ne correspond à votre critère" //message d'erreur si aucune recette trouvée
                    return false
            }
        }
        
       
        if (ingredientFiltered.length) {
            let ingredientFounded = recipe.ingredients.find(ingredient => {
                return ingredientFiltered.includes(ingredient.ingredient)
            })
            
            if(ingredientFounded == undefined) {
                return false
            }
        }
        if (ustensilFiltered.length) {
            let ustensilFounded = recipe.ustensils.find(ustensil => {
                return ustensilFiltered.includes(ustensil)
            })
        
            if(ustensilFounded == undefined) {
                return false
            }
        }
        if (applianceFiltered.length) {
            let applianceFounded = applianceFiltered.includes(recipe.appliance)
            console.log(applianceFounded);
            if(applianceFounded == false) {
                return false
            }
        }
        document.querySelector(".notFound").innerHTML = "" //on enlève le message d'erreur
        return true //retourne le filtre
    })
    console.log(recipeFiltered)
    displayCard(recipeFiltered)
    getAllAplliances(recipeFiltered);
    getAllIngredients(recipeFiltered);
    getAllUstensils(recipeFiltered);
}
// function searchIngredient

function searchIngredients(letters, ingredients) {  
    ingredients.forEach((ingredient) => {
       //console.log((ingredient));
        if(ingredient.ingredient.toLocaleLowerCase().includes(letters)) {
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
        if(
            !allAppliances.includes(appliance)
            && !applianceFiltered.includes(appliance)
        ){
            allAppliances.push(appliance)
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
            if(
                !allUstensils.includes(ustensil)
                && !ustensilFiltered.includes(ustensil)
            ){
                allUstensils.push(ustensil)
            }
        })
    })

allUstensils.sort();
displayUstensils(allUstensils);
}


// tous les ingrédients
/**
 * 
 * @param {array} recipes 
 */
function getAllIngredients(recipes) {  
    displayIngredients(allIngredients(recipes))
}

/**
 * Ca retourne tous les ingrédients
 * @param {array} recipes liste de recettes
 * @returns {array}
 */
function allIngredients(recipes) {
    let allIngredients = []

    recipes.forEach((recipe)=>{
        let ingredients = recipe.ingredients;
        ingredients.forEach((ingredient) => {
                if(
                    !allIngredients.includes(ingredient.ingredient)
                    && !ingredientFiltered.includes(ingredient.ingredient)
                ){ //on filtre ici pour éviter des doublons d'ingrédients
                    allIngredients.push(ingredient.ingredient);
                }
        })
    })
    
    allIngredients.sort();
    return allIngredients
}

//click sur ingredients / appareils / ustensiles

/**
 * 
 * @param {array} allIngredients tableau contenant tous les ingrédients
 */
function displayIngredients(allIngredients) {
    let ingredientsHTML = ""
    let openIngredients = 
    `<div class="ingredients-title">
        <h3>
            Ingrédients 
            <i onclick="openList('ingredients')" class="fa-solid fa-chevron-down" ></i>
        </h3>
    </div>
    <p class="ingredients-search is-invisible">
        <input type="search"  placeholder="Rechercher un ingrédient" id="search-bar-ingredients">
        <i onclick="openList('ingredients')" class="fa-solid fa-chevron-up fa-ingredients"></i>
    </p>
    <div class="ingredients-list is-invisible">
        ${allIngredients.forEach(element => ingredientsHTML += `<li onClick ="addIngredient('${element}')" id="${element}">${element}</li>`)}
    </div>`
    document.querySelector(".ingredients").innerHTML = openIngredients
    document.querySelector(".ingredients-list").innerHTML = ingredientsHTML
    searchFilterIngredients(allIngredients) 
}

/**
 * 
 * @param {array} allUstensils tableau contenant tous les ustensiles
 */
function displayUstensils(allUstensils) {
    let ustensilsHTML = ""
    let openUstensils = `
    <div class="ustensils-title">
        <h3>
            Ustensiles 
            <i onclick="openList('ustensils')" class="fa-solid fa-chevron-down"></i>
            </h3>
        </div>
    <p class="ustensils-search is-invisible">
        <input type="search" placeholder="Rechercher un ustensile" id="search-bar-ustensils">
        <i onclick="openList('ustensils')" class="fa-solid fa-chevron-up"></i>
    </p>
    <div class="ustensils-list is-invisible">
        ${allUstensils.forEach(element => ustensilsHTML += `<li onClick ="addUstensil('${element}')" id="${element}">${element}</li>`)}
    </div>`
    document.querySelector(".ustensils").innerHTML = openUstensils
    document.querySelector(".ustensils-list").innerHTML = ustensilsHTML
    searchFilterUstensils(allUstensils) 
}

/**
 * 
 * @param {array} allAppliances tableau contenant tous les appareils
 */
function displayAppliances(allAppliances) {
    let applianceHTML = ""
    let openAppliances =
     `<div class="appliances-title">
        <h3>
            Appareils 
            <i onclick="openList('appliances')" class="fa-solid fa-chevron-down"></i>
        </h3>
     </div>
     <p class="appliances-search is-invisible">
        <input type="search" placeholder="Rechercher un appareil" id="search-bar-appliances"><i onclick="openList('appliances')" class="fa-solid fa-chevron-up">
        </i>
    </p>
     <div class="appliances-list is-invisible">${allAppliances.forEach(element =>  applianceHTML += `<li onClick ="addAppliance('${element}')" id="${element}">${element}</li>`)}</div>`
    document.querySelector(".appliances").innerHTML = openAppliances
    document.querySelector(".appliances-list").innerHTML = applianceHTML
    searchFilterAppliances(allAppliances) 
}

//function openList, ouvre et ferme la liste des ingrédients, appareils ou ustensiles au click sur les fleches
/**
 * 
 * @param {string} list vérifie la présence des class is-visible ou is-invisible pour gérer l'affichage des listes d'ingrédient appareils et ustensils
 */
function openList(list) { 
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
/**
 * 
 * @param {string} element création d'un filtre avec l'ingredient cliqué sur la liste
 */
function addIngredient(element) {
    let tagHTML = document.createElement("span")
    tagHTML.classList.add("ingredientTag")
    tagHTML.innerHTML = `${element}<i class="fa-regular fa-circle-xmark" onclick="removeIngredient(event,'${element}')"></i>`
    document.querySelector(".filter-result").appendChild(tagHTML)
    ingredientFiltered.push(element)
    filterRecipes()
}
/**
 * 
 * @param {Event} event 
 * @param {string} element supprime le filtre au click sur la croix de fermeture
 */
function removeIngredient(event,element) {
    console.log(event.target.parentElement)
    console.log(element)
    const tagHTML = event.target.parentElement //pour enlever le parent, croix et le span
    document.querySelector(".filter-result").removeChild(tagHTML)
    ingredientFiltered = ingredientFiltered.filter(ingredient => {
        return ingredient != element;
    })
    filterRecipes()
}

//addUstensil et removeUstensil
/**
 * 
 * @param {string} element création d'un filtre avec l'ustensil cliqué sur la liste
 */
function addUstensil(element) {
    let tagHTML = document.createElement("span")
    tagHTML.classList.add("ustensilTag")
    tagHTML.innerHTML = `${element}<i class="fa-regular fa-circle-xmark" onclick="removeUstensil(event,'${element}')"></i>`
    document.querySelector(".filter-result").appendChild(tagHTML)
    ustensilFiltered.push(element)
    filterRecipes()
}
/**
 * 
 * @param {event} event 
 * @param {string} element supprime le filtre au click sur la croix de fermeture
 */
function removeUstensil(event,element) {
    const tagHTML = event.target.parentElement //pour enlever le parent, croix et le span
    document.querySelector(".filter-result").removeChild(tagHTML)
    ustensilFiltered = ustensilFiltered.filter(ingredient => {
        return ingredient != element;
    })
    filterRecipes()
}

//addAppliance et removeAppliance
/**
 * 
 * @param {string} element création d'un filtre avec l'appareil cliqué sur la liste
 */
function addAppliance(element) {
    let tagHTML = document.createElement("span")
    tagHTML.classList.add("applianceTag")
    tagHTML.innerHTML = `${element}<i class="fa-regular fa-circle-xmark" onclick="removeAppliance(event,'${element}')"></i>`
    document.querySelector(".filter-result").appendChild(tagHTML)
    applianceFiltered.push(element)
    filterRecipes()
}
/**
 * 
 * @param {event} event 
 * @param {string} element supprime le filtre au click sur la croix de fermeture
 */
function removeAppliance(event,element) {
    const tagHTML = event.target.parentElement //pour enlever le parent, croix et le span
    document.querySelector(".filter-result").removeChild(tagHTML)
    applianceFiltered = applianceFiltered.filter(ingredient => {
        return ingredient != element;
    })
    filterRecipes()
}

getAllAplliances(recipes);
getAllIngredients(recipes);
getAllUstensils(recipes);
