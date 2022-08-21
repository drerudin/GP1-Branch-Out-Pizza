// spoontacular api function for random recipe

displayRecipe = function () {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48bf167781mshb0c05079ca1a209p1d0909jsnecfac70feb12',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=pizza&number=30&offset=0', options)
        .then(response => response.json())
        .then(response => { 
    
            // console.log(response.results);
            
            let i = Math.floor(Math.random()*response.results.length);
            
            const element = document.getElementById('recipe-link');
            element?.remove();
         
         
            // url link created with random result    
            var a = document.createElement('a');
            a.setAttribute('id', 'recipe-link');
            var link = document.createTextNode(response.results[i].title);
            a.appendChild(link);
            a.title = response.results[i].title;
            a.href = response.results[i].sourceUrl;
            document.getElementById('recipe-card').append(a);
    
            // save recipe to local storage and load up to 5 into id "recipe-list"
            let recipeList = JSON.parse(localStorage.getItem('recipeList')) || [];
            recipeList.push(response.results[i]);
            localStorage.setItem('recipeList', JSON.stringify(recipeList));
            if (recipeList.length > 5) {
                recipeList.shift();
            }
            localStorage.setItem('recipeList', JSON.stringify(recipeList));
            console.log(recipeList);
            displayRecipeList(recipeList);
                            }               
                                        )           
                                        .catch(err => console.error(err));
    }
    
    // display recipes url in recipe-list in ascending order in li tags
    function displayRecipeList(recipeList) {
        let recipeListDiv = document.getElementById('recipe-list');
        recipeListDiv.innerHTML = '';
        for (let i = 0; i < recipeList.length; i++) {
            let a = document.createElement('a');
            a.setAttribute('id', 'recipe-link');
            var link = document.createTextNode(recipeList[i].title);
            a.appendChild(link);
            a.title = recipeList[i].title;
            a.href = recipeList[i].sourceUrl;
            let li = document.createElement('li');
            li.appendChild(a);
            recipeListDiv.appendChild(li);
        }
    }
    
    
    
    // end spoontacular api
    
    
    
    
    
    const pnd_key = 'b29978175cmsh7acead99898141dp1966d1jsn9658d91e4b1d';
    
    var pullPizzaList = function (user) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'pizza-and-desserts.p.rapidapi.com',
                'X-RapidAPI-Key': 'b29978175cmsh7acead99898141dp1966d1jsn9658d91e4b1d'
            }
        };
        fetch('https://pizza-and-desserts.p.rapidapi.com/pizzas', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                displayPizzas(response, user);
            }
            )
            .catch(err => console.error(err));
    };
    function displayPizzas(data) {
        //grab the ul element from index.html
        var ulElement = document.getElementsByClassName('pizza-results');
        console.log(ulElement);
        //loop through all the api results
        for (var i = 0; i < data.length; i++) {
            console.log(i);
            var pizzaDiv = document.createElement("div");
            pizzaDiv.setAttribute('class', 'pizza-card');
            //create a li tag element
            var liTag = document.createElement("li");
            liTag.setAttribute('class', 'pizza-name');
            liTag.textContent = data[i].name;
            var liTag2 = document.createElement("li");
            liTag2.textContent = " Description: " + data[i].description;
            var imgTag = document.createElement("img");
            imgTag.setAttribute('class', 'pizza-img');
            imgTag.setAttribute('src', data[i].img);
            var isVeg = data[i].veg;
    console.log(isVeg);
            var pizzaBox = document.createElement("div");
            if(isVeg){
            pizzaBox.setAttribute('class', 'pizza-box green');
        }else {
            pizzaBox.setAttribute('class', 'pizza-box red');
        }
        //append the li tag to html page
            pizzaDiv.appendChild(liTag);
            pizzaDiv.appendChild(pizzaBox);
            pizzaDiv.appendChild(liTag2);
            pizzaDiv.appendChild(imgTag);
            ulElement[0].appendChild(pizzaDiv);
        }
    }
    
    pullPizzaList();
    