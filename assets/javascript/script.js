<<<<<<< Updated upstream
=======
// placeholder for heroes associated with their ID as detailed in the api
var heroes = {};
var queryURLSuper = "https://akabab.github.io/superhero-api/api/all.json";
var APIKey = "AlexMcRa-s-PRD-3ea920fd0-a7db069e";
var hero;
var product;
var queryURLProduct;
var Marvel = [];
var DC = [];
var darkHorse = [];
var other = [];
var data;
// grabs display field for heroes/villains
var superImage = document.querySelector("#heroes");
// grabs display field for comic book universe field
var universe = document.querySelector("#navbarDropdown");
var dropDown = document.createElement("div");
var dropBtn = document.createElement("button");
var iThing = document.createElement("i");
var dropContent = document.createElement("div");

dropDown.classList.add("dropdown");
dropBtn.classList.add("dropbtn");
iThing.classList.add("fa", "fa-caret-down");
dropContent.classList.add("dropdown-content");
dropBtn.append(iThing);
dropDown.append(dropBtn);
dropDown.append(dropContent);
universe.append(dropDown);


// Makes Universe buttons
var makeUniverse = function (event) {
        if (window.fetch) {
            fetch(queryURLSuper, {
                method: "GET"
            })
                .then(result => result.json())
                .then(response => {
                    for (let i of response) {
                        if (i.biography.publisher === null) {continue;}
                        if (universe.innerHTML.indexOf(i.biography.publisher) === -1) {
                            var content = document.createElement("a");
                            content.setAttribute("data-name", i.biography.publisher.toUpperCase());
                            content.textContent = i.biography.publisher;
                            dropContent.append(content);
                        }
                    }
                    

                })
        } else {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", queryURLSuper);
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

// Pulls products from ebay based on the selected superhero/villain
var getProducts = function (event) {
    product = event.target.dataset.name.replace(" ", "+")
    queryURLProduct = `http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=XML&appid=${APIKey}&siteid=0&QueryKeywords=${product}+superhero&version=1063`;
    if (event.target.tagName) {
        if (window.fetch) {
            fetch(queryURLProduct, {
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

// pulls information and image for the heroes tied to that commic universe
var getSuperData = function (event) {
    if (window.fetch) {
        fetch(queryURLSuper, {
            method: "GET"
        })
        .then(result => result.json())
        .then(response => {
            Object.keys(heroes).find(key => heroes[key] === event.target.dataset.name)

        })
    }
}

// creates an object of all heroes with a key of their ID and a value of their name
var makeHeroes = () => {
    if (window.fetch) {
        fetch(queryURLSuper, {
            method: "GET"
        })
            .then(result => result.json())
            .then(response => {
                //console.log(response);
                
                data = response;
                console.log(data);
                for (i of response) {
                    // console.log(i.biography.publisher.toUpperCase());
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
makeUniverse();

// Object.keys(heroes).find(key => heroes[key] === "Spider-Man")

// populate universe buttons, assign data-name tags
// 
//- for loop to pull every hero/villain and put them in a list for the comic book universe selected
//- for loop to pull heroes and villains and put them in their separate hero and villain list.
//- for loop for heroes to pull data from API (image and name) and create elements to append to the hero display section of the page
//- for loop for villains to pull data from API (image and name) and create elements to append to the hero display section of the page
function heroUniverse(data){
    var goodGuy;
    var badGuy;
    console.log(data);
    for(i = 0 , i < data.length ; i++;){
        if(results === data.dataset.biography.publisher) {
             if(data.dataset.biography.publisher == "Marvel Comics") {
             Marvel.push(data.dataset.biography.publisher);
             }
             else if(data.dataset.biography.publisher == "DC Comics") {
                 DC.push(data.dataset.biography.publisher);
             }

             else if(data.dataset.biography.publisher == "Dark Horse Comics") {
                 darkHorse.push(data.dataset.biography.publisher);
             }
             else(data.dataset.biography.publisher); {
                 other.push(data.dataset.biography.publisher);
             }
             console.log(Marvel);
             console.log(other);
         }
     }
}
heroUniverse(data);
>>>>>>> Stashed changes
