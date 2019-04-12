var heroes = {};
var queryURL = "https://akabab.github.io/superhero-api/api/all.json";

var makeHeroes = () => {
    if (window.fetch) {
        fetch(queryURL, {
            method: "GET"
        })
            .then(result => result.json())
            .then(response => {
                console.log(response);
                for (i of response) {
                    console.log(i);
                    heroes[i.id] = i.name;
                }
            })
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", queryURL);
        xhr.onload = (event) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    parsed = JSON.parse(xhr.responseText);
                    console.log(parsed);
                    for (i of parsed) {
                        console.log(i);
                        heroes[i.id] = i.name;
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