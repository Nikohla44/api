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
                results.appendChild(item)
            }

            var items = document.querySelectorAll("#results > div.item")
            for (var k = 0; k < items.length; k++) {
                items[k].addEventListener("click", function() {
                    itemId = this.id
                    getItemData(id)
                })
            }
        }
    });
}



var inputFilm = document.getElementById('inputFilm');
var filmName;

inputFilm.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
        filmName = this.value;
        getvalue(filmName);
        results.innerHTML = ""
        searchFromQuery("\"" + choice + "\"")
    }
}, false);
