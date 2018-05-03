/*------- Variables -------*/

var inputFilm = document.getElementById('inputFilm');
var filmName;
const submit = document.querySelector(".iconLoupe");
var modalContainer = document.querySelector(".modal_container");
var movieModal = document.querySelector(".movie_modal");
var movieInfos = document.querySelector(".movie_infos");
var itemId;






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
                    console.log(itemId);
                    getItemData(id)
                })
            }
        }
    });
}


//Modal
// var modal = document.querySelector(".modal");
//
// var closeButton = document.querySelector(".close-button");
//
//
// function windowOnClick(event) {
//   if (event.target === modal) {
//    toggleModal();
//  }
// }



function getItemData(id) {
    $.ajax ({
        url: "http://www.omdbapi.com/?apikey=858501f8&t=" + itemId,
        dataType: "json",
        success: function(res) {
          // movieModal.classList.toggle("show-modal");
          modalContainer.style.display = "block";

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

// openModal.addEventListener("click", toggleModal);
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);


//https://api.themoviedb.org/3/movie/268?api_key=67cc61914ff7a9cf3c55f2014fa568b1 film info
//https://api.themoviedb.org/3/movie/268/credits?api_key=67cc61914ff7a9cf3c55f2014fa568b1 film credits
