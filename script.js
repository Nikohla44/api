/*------- Variables -------*/

var inputFilm = document.getElementById('inputFilm');
var filmName;
var itemId;
const submit = document.querySelector(".iconLoupe");
var modalContainer = document.querySelector(".modal_container");
var movieModal = document.querySelector(".movie_modal");
var movieInfos = document.querySelector(".movie_infos");
var modalId;
var closeButton = document.querySelector(".close-button");






// read the data + display results
function getvalue(film) {
    $.ajax ({
        url: "https://api.themoviedb.org/3/search/movie?api_key=67cc61914ff7a9cf3c55f2014fa568b1&query=" + film,
        dataType: "json",
        success: function(res) {
          for (var i = 0; i < res.results.length; i++) {
                var title = res.results[i].original_title
                var year = res.results[i].release_date.substr(0,4)
                var image = res.results[i].poster_path
                var id = res.results[i].id

                var item = document.createElement("div")
                var boxImg = document.createElement("div")
                var itemImage = document.createElement("img")
                var itemInfos = document.createElement("div")
                var itemTitle = document.createElement("span")
                var itemYear = document.createElement("span")

                itemImage.src = "http://image.tmdb.org/t/p/w185/" + image
                itemTitle.appendChild(document.createTextNode(title))
                itemYear.appendChild(document.createTextNode(year))
                itemInfos.appendChild(itemTitle)
                itemInfos.appendChild(itemYear)
                boxImg.appendChild(itemImage)
                item.appendChild(boxImg)
                item.appendChild(itemInfos)
                item.id = id
                item.classList.add("item")
                boxImg.classList.add("boxImg")
                itemInfos.classList.add("itemInfos")
                itemTitle.classList.add("itemTitle")
                itemYear.classList.add("itemYear")
                results.appendChild(item)
            }

            var items = document.querySelectorAll("#results > div.item")
            for (var k = 0; k < items.length; k++) {
                items[k].addEventListener("click", function() {
                    itemId = this.id
                    changeId(id)
                })
            }
        }
    });
}


//Modal


// function windowOnClick(event) {
//   if (event.target === modal) {
//    toggleModal();
//  }
// }
//Recuperation id de omdb
function changeId(id) {
    $.ajax ({
        url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=67cc61914ff7a9cf3c55f2014fa568b1",
        dataType: "json",
        success: function(res) {
          var newID = res.imdb_id;
          console.log(newID);
          getItemData(newID)
        }
    });
}

//Lancement et creation du modal
function getItemData(infos) {
    $.ajax ({
        url: "http://www.omdbapi.com/?apikey=858501f8&i=" + infos,
        dataType: "json",
        success: function(res) {

          //Affichage du modal
          modalContainer.style.display = "block";


            // var image2 = res.Poster
            var synopsis = res.Plot
            var runtime = res.Runtime
            var genre = res.Genre
            var real = res.Director
            var scenario = res.Writer
            var actors = res.Actors
            var language = res.Language
            var country = res.Country


            var modal = document.createElement("div")
            // var boxImg2 = document.createElement("div")
            // var modalImg = document.createElement("img")
            var modalInfos = document.createElement("div")
            var modalSynopsis = document.createElement("p")
            var modalRuntime = document.createElement("span")
            var modalGenre = document.createElement("span")
            var modalReal = document.createElement("span")
            var modalScenar = document.createElement("span")
            var modalAct = document.createElement("span")
            var modalLanguage = document.createElement("span")
            var modalCountry = document.createElement("span")

            //modalImg.src = "http://image.tmdb.org/t/p/w185/" + image2
            modalSynopsis.appendChild(document.createTextNode(synopsis))
            modalRuntime.appendChild(document.createTextNode(runtime))
            modalGenre.appendChild(document.createTextNode(genre))
            modalReal.appendChild(document.createTextNode(real))
            modalScenar.appendChild(document.createTextNode(scenario))
            modalAct.appendChild(document.createTextNode(actors))
            modalLanguage.appendChild(document.createTextNode(language))
            modalCountry.appendChild(document.createTextNode(country))

            // boxImg2.appendChild(modalImg)
            modalInfos.appendChild(modalSynopsis)
            modalInfos.appendChild(modalRuntime)
            modalInfos.appendChild(modalGenre)
            modalInfos.appendChild(modalReal)
            modalInfos.appendChild(modalScenar)
            modalInfos.appendChild(modalAct)
            modalInfos.appendChild(modalLanguage)
            modalInfos.appendChild(modalCountry)
            modal.classList.add("modal")
            // modalImg.classList.add("modalImg")
            modalInfos.classList.add("modalInfos")
            modalSynopsis.classList.add("modalSynopsis")
            modalRuntime.classList.add("modalRuntime")
            modalGenre.classList.add("modalGenre")
            modalReal.classList.add("modalReal")
            modalScenar.classList.add("modalScenar")
            modalAct.classList.add("modalAct")
            modalLanguage.classList.add("modalLanguage")
            modalCountry.classList.add("modalCountry")
            movieModal.appendChild(modalInfos)


                      // document.getElementById("synopsis").textContent = "Synopsis : " + res.Plot;
            // document.getElementById("duree").textContent = "Durée : " + res.Runtime;
            // document.getElementById("genre").textContent = "Genre : " + res.Genre;
            // document.getElementById("real").textContent = "Réalisateur : " + res.Director;
            // document.getElementById("scenar").textContent = "Scénario : " + res.Writer;
            // document.getElementById("acteurs").textContent = "Avec : " + res.Actors;
            // document.getElementById("langue").textContent = "Langue : " + res.Language;
            // document.getElementById("origine").textContent = "Pays : " + res.Country;
        }
    });
}




// trigger functions
function affichage() {
  filmName = inputFilm.value;
  getvalue(filmName);
  results.innerHTML = ""
}

submit.addEventListener("click", function() {
    affichage()

})

inputFilm.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
        affichage()

    }
}, false);

// openModal.addEventListener("click", modalContainer);
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);


//https://api.themoviedb.org/3/movie/268?api_key=67cc61914ff7a9cf3c55f2014fa568b1 autre affiche = backdrop path
