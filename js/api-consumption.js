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
    document.querySelector("section").innerHTML = ""
    const h2 = document.createElement("h2");
    data.results.forEach(movie => {
        let newMovie = h2.cloneNode(true);
        newMovie.innerText = movie.original_title;
        document.querySelector("section").appendChild(newMovie);
        
    });
  })
  .catch(err => console.error(err));
}

