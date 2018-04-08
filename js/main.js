'use strict';

//Promesa llamada
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

    const counter = document.querySelectorAll('.items__number');
    const price = document.querySelectorAll('.item__price');
    let itemCounter = 0;
    let subtotalCounter = 0;
    const itemNumber = document.querySelector('.item--number');
    const subtotal = document.querySelector('.item__sum-subtotal');
    const totalPrice = document.querySelector('.item__sum-total');
    const totalButton = document.querySelector('.total--send');

    //Mostrar nombre receta
    nameHTML = recipe.name;
    const name = document.querySelector('.title');
    name.innerHTML =  nameHTML;


    //Mostrar productos de la lista
    currencyHTML = recipe.currency;
    const ingredients = recipe.ingredients;
    for (var i = 0; i < ingredients.length; i++) {
      ingredientsHTML += '<li class="items"><input class="items__checkbox" type="checkbox" name="" value="">' + '<input class="items__number" type="number" name="" value="1" placeholder="1">  <div class="items__description">' + '<h2 class="item item__name">' + ingredients[i].product + '</h2><p class="item item__brand">' + ingredients[i].brand + '</p><p class="item item__quantity">' + ingredients[i].quantity + '</p></div><h3 class="item item__price">' + ingredients[i].price + currencyHTML + '</h3></li>';
    }
    const productsList = document.querySelector('.ingredients__products-list');
    productsList.innerHTML = ingredientsHTML;

    //Mostrar gastos envío
    let shippingPriceHTML;
    shippingPriceHTML = parseFloat(recipe['shipping-cost']).toFixed(2);
    const shippingPrice = document.querySelector('.item__sum-costs');
    shippingPrice.innerHTML = shippingPriceHTML + currencyHTML;


      //Seleccionar todo y deseleccionar todo
      const list = document.querySelectorAll('.items__checkbox');
      const selectAll = document.querySelector('.button--select-all');
      const unSelectAll = document.querySelector('.button--unselect-all');

      function addAllproducts(){
        for(let i=0; i<list.length; i++){
          if(list[i].type == 'checkbox' ){
            list[i].checked = true;
          }
        }
      }

      function removeAllproducts(){
        for(let i=0; i<list.length; i++){
          if(list[i].type == 'checkbox' ){
            list[i].checked = false;
          }
        }
      }

      selectAll.addEventListener('click', addAllproducts);
      unSelectAll.addEventListener('click', removeAllproducts);

      //Añadir un elemento
      function addPriceArticle(){
  	  itemCounter = 0;
  	  subtotalCounter = 0;
    	for(var i=0; i < list.length; i++){
    		if(list[i].checked == true){
    			let counterIngredient = counter[i].value;
    			let priceIngredient = getIngredientPrice(list[i].value);
    			let sumPrice = parseFloat(counterIngredient) * parseFloat(priceIngredient);
    			let result = sumPrice.toFixed(2);
    			price[i].innerHTML = result + currencyHTML;
    			counter += parseFloat(counterIngredient);
    			subtotalCounter += parseFloat(result);
      }
  	}
  		printTotal()
  }

  function getIngredientPrice(product){
  	var price = 0;
  	for(var i = 0; i < ingredients.length; i++){
  		if( ingredients[i].product == product){
  			price = ingredients[i].price;
  			break;
  		}
  	}
  	return price;
  }

  function printTotal() {
    itemNumber.innerHTML = counter;
  	subtotal.innerHTML = subtotalCounter.toFixed(2) + currencyHTML;
  	totalPrice.innerHTML = (subtotalCounter + shippingPriceHTML).toFixed(2) + currencyHTML;
  	totalButton.innerHTML = (subtotalCounter + shippingPriceHTML).toFixed(2) + currencyHTML;
  }
      });
