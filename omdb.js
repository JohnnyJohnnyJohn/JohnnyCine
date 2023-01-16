const searchFilm = document.getElementById("searchBar");
const posterFilm = document.getElementById("poster");
const titleFilm = document.getElementById("title");
const yearFilm = document.getElementById("year");
const actorsFilm = document.getElementById("actors");
const plotFilm = document.getElementById("plot");
const datalist = document.getElementById("options");

async function loadMovies() {
    let title = searchFilm.value;
    let URL = "https://www.omdbapi.com/?t=" + title + "&plot=full&apikey=86fdb3be"
    let resultat = await fetch(URL)
    let data = await resultat.json();

    console.log(title);

    if (data.Response == "True") {
        document.getElementById("resultat").style.visibility = "visible";
        document.getElementById("poster").style.visibility = "visible";
        afficherFilm(data);
    } else {
        document.getElementById("resultat").style.visibility = "hidden";
        document.getElementById("poster").style.visibility = "hidden";
    }
}

async function searchMovies() {
    let title = searchFilm.value;
    let URL = "https://www.omdbapi.com/?s=" + title + "&page=1&apikey=86fdb3be"
    let resultat = await fetch(URL)
    let data = await resultat.json();

    if (data.Response == "True") {
        if (datalist.children.length) {
            let option1 = document.getElementById("option1");
            let option2 = document.getElementById("option2");
            let option3 = document.getElementById("option3");
            let option4 = document.getElementById("option4");
            let option5 = document.getElementById("option5");
            let option6 = document.getElementById("option6");
            let option7 = document.getElementById("option7");
            let option8 = document.getElementById("option8");
        } else {            
            let option1 = document.createElement("option");
            option1.setAttribute("id", "option1");
            datalist.appendChild(option1);

            let option2 = document.createElement("option");
            option2.setAttribute("id", "option2");
            datalist.appendChild(option2);

            let option3 = document.createElement("option");
            option3.setAttribute("id", "option3");
            datalist.appendChild(option3);

            let option4 = document.createElement("option");
            option4.setAttribute("id", "option4");
            datalist.appendChild(option4);

            let option5 = document.createElement("option");
            option5.setAttribute("id", "option5");
            datalist.appendChild(option5);

            let option6 = document.createElement("option");
            option6.setAttribute("id", "option6");
            datalist.appendChild(option6);

            let option7 = document.createElement("option");
            option7.setAttribute("id", "option7");
            datalist.appendChild(option7);

            let option8 = document.createElement("option");
            option8.setAttribute("id", "option8");
            datalist.appendChild(option8);
        }
        option1.value = data.Search[0].Title;
        option2.value = data.Search[1].Title;
        option3.value = data.Search[2].Title;
        option4.value = data.Search[3].Title;
        option5.value = data.Search[4].Title;
        option6.value = data.Search[5].Title;
        option7.value = data.Search[6].Title;
        option8.value = data.Search[8].Title;
    } else {
        if (datalist.children.length != 0) {
            document.getElementById("option1").remove();
            document.getElementById("option2").remove();
            document.getElementById("option3").remove();
            document.getElementById("option4").remove();
            document.getElementById("option5").remove();
            document.getElementById("option6").remove();
            document.getElementById("option7").remove();
            document.getElementById("option8").remove();
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

window.addEventListener("keyup", function () {
    
    setTimeout(() => {
        searchMovies();
        loadMovies();
    }, 50);

});
