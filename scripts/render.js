
function populateGenreSelection() {
    var selection = document.getElementById("genreSelection");
    
    var genres = songsJSON["genres"];
    for (var index in genres) {
        var option = document.createElement("option");
        option.innerHTML = genres[index];
        selection.appendChild(option);
    }
}


$("#filter").on("click", function () {
    console.log("pressed")
    var selectedGenre = $("#genreSelection option:selected").val();
    var setContainer = document.getElementById("setContainer");
    setContainer.innerHTML = "";

    console.log(selectedGenre);
    var rule = /[&]/g
    selectedGenre = selectedGenre.replace(rule, "&amp;");
    var songsToDisplay = getSongsByGenre(selectedGenre);
    console.log(songsToDisplay)
    displaySongs(songsToDisplay);

})

function getSongsByGenre(genre) {
    var listSongs = [];
    for (var index in songsJSON.songs) {
        var songElt = songsJSON.songs[index]
        var thisGenre = songElt.genre;
        console.log(songElt);
        if (thisGenre == genre) {
            listSongs.push(songElt);
        }
    }

    return listSongs;
}

function displaySongs(songsToDisplay) {
    var setContainer = document.getElementById("setContainer");
    for (var index in songsToDisplay) {
        var song = songsToDisplay[index];
        var songElement = document.createElement("div");

        var titleElement = document.createElement("h4");
        titleElement.innerHTML = song.title;

        var artistsElement = document.createElement("div")
        artistsElement.innerHTML = "Artists: ";
        var artists = song.artists;
        for (var artistIndex = 0; artistIndex < artists.length; artistIndex++) {
            if (artistIndex == 0) {
                artistsElement.innerHTML = artistsElement.innerHTML + artists[artistIndex];
            }
            else {
                artistsElement.innerHTML = artistsElement.innerHTML + ", " + artists[artistIndex];
            }
        }

        var genreElement = document.createElement("div");
        genreElement.innerHTML = "Genre: " + song.genre;

        var dateElement = document.createElement("div");
        dateElement.innerHTML = "Release: " + song.date;

        songElement.appendChild(titleElement);
        songElement.appendChild(artistsElement);
        songElement.appendChild(genreElement);
        songElement.appendChild(dateElement);

        setContainer.appendChild(songElement);
    }
}