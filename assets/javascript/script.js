var heroes = {};
var queryURLSuper = "https://akabab.github.io/superhero-api/api/all.json";
var APIKey = "AlexMcRa-s-PRD-3ea920fd0-a7db069e";
var hero;
var product;
var queryURLProduct;

var getProducts = function (event) {
    product = event.target.dataset.name.replace(" ", "+")
    queryURLProduct = `http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=XML&appid=${APIKey}&siteid=0&QueryKeywords=${product}+comic&version=1063`;
    if (event.target.tagName) {
        if (window.fetch) {
            fetch(queryURL, {
                method: "GET"
            })
                .then(result => result.json())
                .then(response => {
                    console.log(response);
                    var results = response.data;

                })
        } else {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", queryURLProduct);
            xhr.onload = (event) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        parsed = JSON.parse(xhr.responseText);
                    }
                } else {
                    console.error(xhr.responseText);
                }
            }
            xhr.onerror = (event) => {
                console.error(xhr.responseText);
            }
            xhr.send();
        }
    }
}

var getSuperData = function (event) {

}


var makeHeroes = () => {
    if (window.fetch) {
        fetch(queryURLSuper, {
            method: "GET"
        })
            .then(result => result.json())
            .then(response => {
                console.log(response);
                for (i of response) {
                    console.log(i);
                    heroes[i.id] = i.name.toUpperCase();
                }
            })
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", queryURLSuper);
        xhr.onload = (event) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    parsed = JSON.parse(xhr.responseText);
                    console.log(parsed);
                    for (i of parsed) {
                        console.log(i);
                        heroes[i.id] = i.name.toUpperCase();
                    }
                }
            } else {
                console.error(xhr.responseText);
            }
        }
        xhr.onerror = (event) => {
            console.error(xhr.responseText);
        }
        xhr.send();
    }
}

makeHeroes();

// Object.keys(heroes).find(key => heroes[key] === "Spider-Man")