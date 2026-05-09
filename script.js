let search = document.getElementById("search");

let products = document.querySelectorAll(".product");



// SEARCH

if(search){

    search.addEventListener("keyup", function(){

        let enteredValue = search.value.toUpperCase();

        products.forEach(product => {

            let productName = product.querySelector("h2").textContent;

            if(productName.toUpperCase().indexOf(enteredValue) < 0){

                product.style.display = "none";

            }

            else{

                product.style.display = "block";

            }

        });

    });

}



// FILTER

function filterProducts(category){

    products.forEach(product => {

        if(category === "all"){

            product.style.display = "block";

        }

        else if(product.classList.contains(category)){

            product.style.display = "block";

        }

        else{

            product.style.display = "none";

        }

    });

}



// FAVORITES

function like(element, name, price, image){

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];



    let existing = favorites.find(item => item.name === name);



    if(existing){

        favorites = favorites.filter(item => item.name !== name);

        element.style.color = "black";

        element.innerHTML = "♡";

    }

    else{

        favorites.push({

            name: name,

            price: price,

            image: image

        });

        element.style.color = "red";

        element.innerHTML = "♥";

    }



    localStorage.setItem("favorites", JSON.stringify(favorites));

}



// LOAD RED HEARTS AGAIN

window.onload = function(){

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];



    document.querySelectorAll(".heart").forEach(heart => {

        let product = heart.parentElement;

        let name = product.querySelector("h2").textContent;



        let found = favorites.find(item => item.name === name);



        if(found){

            heart.style.color = "red";

            heart.innerHTML = "♥";

        }

    });



    loadFavorites();

};



// FAVORITES PAGE

function loadFavorites(){

    let container = document.getElementById("favorites-container");



    if(!container) return;



    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];



    container.innerHTML = "";



    favorites.forEach(item => {

        container.innerHTML += `

        <div class="product">

            <img src="${item.image}">

            <h2>${item.name}</h2>

            <p>${item.price}</p>

        </div>

        `;

    });

}