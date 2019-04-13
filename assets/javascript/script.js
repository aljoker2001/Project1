// placeholder for heroes associated with their ID as detailed in the api
var heroes = {};
var queryURLSuper = "https://akabab.github.io/superhero-api/api/all.json";
var APIKey = "AlexMcRa-s-PRD-3ea920fd0-a7db069e";
var hero;
var product;
var queryURLGif;
// stores fetch results from Superhero API
var superAPIResults;
// grabs display field for heroes/villains
var superImage = document.querySelector("#heroes");
// grabs display field for comic book universe field
var universe = document.querySelector("#navbarDropdown");
var modalContent = document.querySelector(".modal-content");
var modal = document.querySelector(".modal");
var dropDown = document.createElement("div");
var dropBtn = document.createElement("button");
var iThing = document.createElement("i");
var dropContent = document.createElement("div");
var display = document.querySelector("#display");
var bio;

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
                    if (i.biography.publisher === null) { continue; }
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

// pulls from super hero API to populate bio details in modal
var createModalBio = (event) => {
    modalContent.innerHTML = "";
    modal.style.display = "block";
    var heroId = Object.keys(heroes).find(key => heroes[key] === event.target.dataset.name)
    bio = document.createElement("div");
    bio.setAttribute("id", "modalBio")
    var headshot = document.createElement("img");
    headshot.setAttribute("id", "headshot");
    var name = document.createElement("h2");
    var height = document.createElement("h5");
    var weight = document.createElement("h5");
    var race = document.createElement("h5");
    var pob = document.createElement("h5");
    var occupation = document.createElement("h5");
    for (i = 0; superAPIResults.length; i++) {
        for (key in superAPIResults[i]){
            if (superAPIResults[i][key] == heroId) {
                headshot.setAttribute("src", superAPIResults[i].images.md);
                name.innerHTML = `<strong>Name: </strong>${superAPIResults[i].name}`;
                height.innerHTML = `<strong>Height: </strong>${superAPIResults[i].appearance.height[0]}`;
                weight.innerHTML = `<strong>Weight: </strong>${superAPIResults[i].appearance.weight[0]}`;
                race.innerHTML = `<strong>Race: </strong>${superAPIResults[i].appearance.race}`;
                pob.innerHTML = `<strong>Place of Birth: </strong>${superAPIResults[i].biography.placeOfBirth}`;
                occupation.innerHTML = `<strong>Occupation: </strong>${superAPIResults[i].work.occupation}`;
                console.log(name.textContent);
                console.log(height.textContent);
                console.log(weight.textContent);
                console.log(race.textContent);
                console.log(pob.textContent);
                console.log(occupation.textContent);
                bio.append(headshot);
                bio.append(name);
                bio.append(height);
                bio.append(weight);
                bio.append(race);
                bio.append(pob);
                bio.append(occupation);
                modalContent.append(bio);
                return
            }
        }
    }
}

// Pulls gifs from giphy API to populate modal
var getGIF = function (event) {
    // Takes the value of the "data-name" attribute for the hero selected and puts it in the variable "product"
    hero = event.target.dataset.name.replace(" ", "+")
    // sets variable to the ebay API
    var GifAPIKey = "cAIArwQuYBrwxNH9AltwAv79OKwGKzQg";
    queryURLGif = `https://api.giphy.com/v1/gifs/search?api_key=${GifAPIKey}&q=${hero}&limit=5`;
    // Checks to see if the selected item is a hero or villain based on the class name of "hero".  If it is, then it runs the rest of the function
    if (event.target.className.indexOf("hero") !== -1) {
        // pull data from super hero API to populate the modal
        createModalBio(event);
        if (window.fetch) {
            fetch(queryURLGif, {
                method: "GET"
            })
                .then(result => result.json())
                .then(response => {
                    var results = response.data;
                    var gifContainer = document.createElement("div");
                    gifContainer.classList.add("gifContainer");
                    console.log(results.length);
                    console.log(superAPIResults[0].name);
                    // creates 5 gifs of hero to append to modal
                    for (i = 0; i < results.length; i++) {
                        console.log("test: ", results[i]);
                        var image = document.createElement("img");
                        image.setAttribute("src", results[i].images.fixed_height.url);
                        image.classList.add("modalGif");
                        console.log(image);
                        gifContainer.append(image);
                        bio.append(gifContainer);
                        superImage.append("Hello");
                    }
                })
        } else {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", queryURLGif);
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
                console.log(response);
                // stores fetch response in global variable for access in other functions
                superAPIResults = response;
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

// if you click outside of the modal, it will close
window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  // Closes modal when clicking the "X"
  close.onclick = function () {
    modal.style.display = "none";
  }

makeHeroes();
makeUniverse();
superImage.addEventListener("click", getGIF);

// document.querySelector("#heroes").addEventListener("click", function myFunction(event) {
//     console.log("my click event: ", event);
//     console.log("my target's tag name", event.target.dataset.name);
//     console.log(Object.keys(heroes).find(key => heroes[key] === event.target.dataset.name));
// })

// populate universe buttons, assign data-name tags
// 