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
var universe = document.querySelector(".dropdown-menu");
var modalContent = document.querySelector("#m-content");
var modal = document.querySelector(".mode");
var dropDown = document.createElement("div");
var dropBtn = document.createElement("button");
var iThing = document.createElement("i");
var dropContent = document.createElement("div");
// var display = document.querySelector("#display");
var contentHolder = document.querySelector("#contentHolder");
var bio;
var close;
var dataAttr;
var currentHero;
var circlex;
var bio = document.createElement("div");
bio.setAttribute("id", "modalBio");
var textStats = document.createElement("div");
bio.append(textStats);
var canvas = document.createElement("div");
canvas.setAttribute("id", "canvas");
bio.append(canvas);

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
                    superAPIResults = JSON.parse(xhr.responseText);
                    console.log(superAPIResults);
                    for (i of superAPIResults) {
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

// Makes Universe buttons
var makeUniverse = function (event) {


    if (window.fetch) {
        fetch(queryURLSuper, {
            method: "GET"
        })
            .then(result => result.json())
            .then(response => {
                for (let i of response) {
                    // If the publisher key is null, then it is skipped
                    if (i.biography.publisher === null) { continue; }
                    // if the current publisher has not yet been added to the dropdown, then the function continues and adds it to the dropdown
                    if (universe.innerHTML.indexOf(i.biography.publisher) === -1) {
                        // the below code creates an "a" tag, sets the "data-name" attribute to the publisher, adds two classes, and fills the content with the publisher name
                        var content = document.createElement("a");
                        content.setAttribute("data-name", i.biography.publisher.toUpperCase());
                        content.classList.add("publisher", "dropdown-item");
                        content.textContent = i.biography.publisher;
                        universe.append(content);
                    }
                }
                // pulls all drop down items and adds an event listener for each.  If clicked, getSuperData runs
                dataAttr = document.getElementsByClassName("publisher");
                for (let pub of dataAttr) {
                    pub.addEventListener("click", getSuperData);
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
    modal.style.display = "block";
    var heroId = Object.keys(heroes).find(key => heroes[key] === event.target.dataset.name)
    // creates the close button
    close = document.querySelector(".close");
    // creates image in the modal
    var headshot = document.createElement("img");
    headshot.setAttribute("id", "headshot");
    // The below creates the elements that hold details on the stats for the hero/villain selected
    var name = document.createElement("h2");
    var height = document.createElement("h5");
    var weight = document.createElement("h5");
    var race = document.createElement("h5");
    var pob = document.createElement("h5");
    var occupation = document.createElement("h5");
    // This loop populates the above elements with the details from the API and appends them to the modal containers
    for (i = 0; superAPIResults.length; i++) {
        // Had to go one level deeper to get to the information we needed
        for (key in superAPIResults[i]) {
            if (superAPIResults[i][key] == heroId) {
                currentHero = superAPIResults[i];
                console.log("Current Hero", currentHero);
                console.log("current stat", currentHero.powerstats[0]);
                headshot.setAttribute("src", superAPIResults[i].images.md);
                headshot.setAttribute("alt", superAPIResults[i].name);
                name.innerHTML = `<strong>Name: </strong>${superAPIResults[i].name}`;
                height.innerHTML = `<strong>Height: </strong>${superAPIResults[i].appearance.height[0]}`;
                weight.innerHTML = `<strong>Weight: </strong>${superAPIResults[i].appearance.weight[0]}`;
                race.innerHTML = `<strong>Race: </strong>${superAPIResults[i].appearance.race}`;
                pob.innerHTML = `<strong>Place of Birth: </strong>${superAPIResults[i].biography.placeOfBirth}`;
                occupation.innerHTML = `<strong>Occupation: </strong>${superAPIResults[i].work.occupation}`;
                name.classList.add("funFont");
                height.classList.add("funFont");
                weight.classList.add("funFont");
                race.classList.add("funFont");
                pob.classList.add("funFont");
                occupation.classList.add("funFont");
                textStats.append(headshot);
                textStats.append(name);
                textStats.append(height);
                textStats.append(weight);
                textStats.append(race);
                textStats.append(pob);
                textStats.append(occupation);
                getCircles(event);
                modalContent.insertBefore(bio, modalContent.lastElementChild);
                return
            }
        }
    }

}

// This function populates the circles in the modal that displays the combat statistics of each hero
var getCircles = (event) => {
    // Sets the colors for the various stat circles
    var colors = [
        ['#D3B6C6', '#4B253A'], ['#FCE6A4', '#EFB917'], ['#BEE3F7', '#45AEEA'], ['#F8F9B6', '#D2D558'], ['#F4BCBF', '#D43A43'], ['#8cbb9a', '#19913d']
    ],
        circles = [];
    for (var i = 1; i <= 6; i++) {
        circlex = document.querySelector("#circles-" + i);
        console.log(circlex);
        // Assigns the values from the API into their respective stat
        var stat = Object.values(currentHero.powerstats)[i-1],
            circle = Circles.create({
                id: circlex.id,
                value: stat,
                radius: getWidth(),
                width: 10,
                colors: colors[i - 1]
            });
            console.log(stat);
        circles.push(circle);
        // canvas.append(circle);
    }
    // bio.append(canvas);
    window.onresize = function (e) {
        for (var i = 0; i < circles.length; i++) {
            circles[i].updateRadius(getWidth());
        }
    };
    function getWidth() {
        return window.innerWidth / 20;
    }
}

// Pulls gifs from giphy API to populate modal and also creates modal bio using createModalBio function
var getGIF = function (event) {
    if (event.target.tagName === "IMG") {
        console.log(event.target.tagName);
        // Takes the value of the "data-name" attribute for the hero selected and puts it in the variable "product"
        hero = event.target.dataset.name.replace(" ", "+")
        // sets variable to the ebay API
        var GifAPIKey = "cAIArwQuYBrwxNH9AltwAv79OKwGKzQg";
        queryURLGif = `https://api.giphy.com/v1/gifs/search?api_key=${GifAPIKey}&q=${hero}+comic&limit=5`;
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
                            textStats.append(gifContainer);
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
 // Closes modal when clicking the "X"
 close.onclick = function () {
    modal.style.display = "none";
    // Clears out previous modal
    textStats.innerHTML = "";
}
}

// pulls information and image for the heroes tied to that comic universe and appends them to the home page
var getSuperData = function (event) {
    // clears content of superhero field if there is anything in there
    superImage.innerHTML = "";
    document.querySelector("#dropdownMenuButton").textContent = event.target.dataset.name;
    for (i = 0; i < superAPIResults.length; i++) {
        // iterates through various keys of each super hero
        for (j in superAPIResults[i]) {
            // If the value of the key is a number, skip it
            if (typeof superAPIResults[i][j] === "number") { continue; }
            var value = superAPIResults[i][j];
            // stores the value of the key in the category variable based on the value
            var category = Object.keys(superAPIResults[i]).find(key => superAPIResults[i][key] === value);
            // if the category is not "biography", skip it
            if (category !== "biography") {
                // console.log(category);
                continue;
            } else {
                for (keys in superAPIResults[i][j]) {
                    value = superAPIResults[i][j][keys]
                    category = Object.keys(superAPIResults[i][j]).find(key => superAPIResults[i][j][key] === value);
                    if (superAPIResults[i][j][keys] === null) { continue; }
                    if (category === "publisher") {
                        if (superAPIResults[i][j][keys].toUpperCase() == event.target.dataset.name.toUpperCase()) {
                            console.log("we made it!")
                            var thumbnail = document.createElement("div");
                            thumbnail.classList.add("hero");
                            thumbnail.setAttribute("data-name", superAPIResults[i].name.toUpperCase());
                            var image = document.createElement("img");
                            var name = document.createElement("h4");
                            image.setAttribute("src", superAPIResults[i].images.sm);
                            image.setAttribute("data-name", superAPIResults[i].name.toUpperCase());
                            image.setAttribute("alt", superAPIResults[i].name);
                            image.classList.add("hero");
                            name.classList.add("superName");
                            name.textContent = superAPIResults[i].name;
                            thumbnail.append(image);
                            thumbnail.append(name);
                            superImage.append(thumbnail);
                        } else {
                            console.log("hmmm");
                        }
                    }
                }
            }
        }
    }



}



makeHeroes();
makeUniverse();
contentHolder.addEventListener("click", getGIF);

// if you click outside of the modal, it will close
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // Clears out previous modal
        textStats.innerHTML = "";
    }
}

document.querySelector("#heroSearch").addEventListener("submit" , function() {
var searchBar = document.querySelector("#heroSearch");
//this is the whole hero data right?
var searched = superAPIResults[i][j][keys];

    if(searchBar === "") {
     return ("You have not picked anybody!")
     
    }
    else(searchBar.toUpperCase())
console.log(searchBar);





});

