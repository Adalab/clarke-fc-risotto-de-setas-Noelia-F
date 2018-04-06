'use strict';

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    const recipe = json.recipe;
    let nameHTML = '';
    let shipHTML = '';
    let currencyHTML = '';
    let ingredientsHTML = '';

    //añadir nombre receta
    nameHTML = recipe.name;
    const name = document.querySelector('.title');
    name.innerHTML =  nameHTML;


    //añadir productos en lista
    const ingredients = recipe.ingredients;
    for (var i = 0; i < ingredients.length; i++) {
      ingredientsHTML += '<li class="items"><input type="checkbox" name="" value="">' + '<input type="number" name="" value="" placeholder="1">' + '<h2 class="item item__name">' + ingredients[i].product + '</h2><p class="item item__brand">' + ingredients[i].brand + '</p><p class="item item__quantity">' + ingredients[i].quantity + '</p><h3 class="item item__price">' + ingredients[i].price + '</h3></li>';
    }
    const productsList = document.querySelector('.items');
    productsList.innerHTML = ingredientsHTML;


  });