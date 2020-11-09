async function retrieveXML(callback) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://jeremy-jung.github.io/XML/", true);
    request.send();

    request.onload = function () {
        callback(request.response);
    }
}


// initialize JSON data structure
function initializeJSON(response) {
    songsJSON["songs"] = [];
    songsJSON["genres"] = [];
    
    var parser = new DOMParser();
    var xmlData = parser.parseFromString(response, "text/xml");
    var songsElements = xmlData.getElementsByTagName("song");
    console.log(songsElements[9])
    for (var i = 0; i < songsElements.length; i++) {
        var song = {};
        // get title of song
        var titleElement = songsElements[i].getElementsByTagName("title")[0];
        var title = titleElement.innerHTML.trim();
        song["title"] = title;
        // get artists of song
        var artistElements = songsElements[i].getElementsByTagName("artist");
        var artists = [];
        for (var j = 0; j < artistElements.length; j++) {
            var artistElement = artistElements[j];
            artists.push(artistElement.innerHTML.trim());
        }
        song["artists"] = artists;

        // get genre of song
        var genreElement = songsElements[i].getElementsByTagName("genre")[0];
        var genre = genreElement.innerHTML.trim();
        song["genre"] = genre;
        appendGenre(genre);

        // get release date of song
        var releaseDateElement = songsElements[i].getElementsByTagName("year")[0];
        var date = releaseDateElement.innerHTML.trim();
        song["date"] = date;

        songsJSON["songs"].push(song);
    }
}


function appendGenre(genre) {
    var genreAlreadyExists = false;
    var genres = songsJSON["genres"];
    for ( var index in genres) {
        if ( genres[index] == genre ) {
            genreAlreadyExists = true;
            break;
        }
    }

    if (!genreAlreadyExists) {
        songsJSON["genres"].push(genre);
    }
}

