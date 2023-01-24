const searchFilm = document.getElementById("searchBar");
const resultat = document.getElementById("resultat");
const posterFilm = document.getElementById("poster");
const titleFilm = document.getElementById("title");
const yearFilm = document.getElementById("year");
const actorsFilm = document.getElementById("actors");
const plotFilm = document.getElementById("plot");
const datalist = document.getElementById("options");
let options = [];

async function loadMovies() {
    let title = searchFilm.value;
    let URL = "https://www.omdbapi.com/?t=" + title + "&plot=full&apikey=86fdb3be"
    let reponse = await fetch(URL)
    let data = await reponse.json();

    console.log(title);

    if (data.Response == "True") {
        resultat.style.visibility = "visible";
        posterFilm.style.visibility = "visible";
        afficherFilm(data);
    } else {
        resultat.style.visibility = "hidden";
        posterFilm.style.visibility = "hidden";
    }
}

async function searchMovies() {
    let title = searchFilm.value;
    let URL = "https://www.omdbapi.com/?s=" + title + "&page=1&apikey=86fdb3be"
    let reponse = await fetch(URL)
    let data = await reponse.json();

    if (data.Response == "True") {
        if (datalist.children.length) {
            for (let i = 0; i < data.Search.length; i++) {
                options[i] = document.getElementById(`option${i}`);
            }
        } else {
            for (let i = 0; i < data.Search.length; i++) {
                options[i] = document.createElement("option");
                options[i].setAttribute("id", `option${i}`);
                datalist.appendChild(options[i]);
            }
        }
        for (let i = 0; i < data.Search.length; i++) {
            options[i].value = data.Search[i].Title;
            options[i].setAttribute("id", `option${i}`);
            datalist.appendChild(options[i]);
        }
    } else {
        if (datalist.children.length != 0) {
            for (let i = 0; i < datalist.children.length; i++) {
                options[i].remove;
            }
        }
    }
}

function afficherFilm(film) {
    posterFilm.src = film.Poster;
    yearFilm.innerText = "Year : " + film.Year;
    titleFilm.innerText = "Title : " + film.Title;
    plotFilm.innerText = "Description : " + film.Plot;
    actorsFilm.innerText = "Actors : " + film.Actors;
}

function noenter() {
    return !(window.event && window.event.keyCode == 13);
}

searchFilm.addEventListener("input", function () {
    
    setTimeout(() => {
        searchMovies();
        loadMovies();
    }, 50);

});
