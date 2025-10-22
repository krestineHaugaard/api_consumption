import { options, api } from "./api.js"

const firstFetch= "now_playing"

apiFetch(firstFetch);

document.querySelectorAll("button").forEach(menuOption => {
    menuOption.addEventListener("click", function() {
        const dataTarget = this.getAttribute("data-target")
        apiFetch(dataTarget);
    })
})

function apiFetch (choosenEndPoint){fetch(`${api}${choosenEndPoint}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then((data) => {

    document.querySelector("#movie-list").innerHTML = ""

    data.results.forEach(movie => {
        const newMovie = document.querySelector("#card-template").content.cloneNode(true);
        newMovie.querySelector(".title").innerText = movie.title;
        newMovie.querySelector("img").setAttribute("src", `${movie.poster_path}`);
        newMovie.querySelector("img").setAttribute("alt", `${movie.title}`);
        newMovie.querySelector(".movie-overview").innerText = movie.overview;
        newMovie.querySelector(".original-title").innerText = movie.original_title;
        newMovie.querySelector(".release-date").innerText = movie.release_date;
        document.querySelector("#movie-list").appendChild(newMovie);
    });
  })
  .catch(err => console.error(err));
}

