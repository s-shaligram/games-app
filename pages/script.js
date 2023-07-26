/**
 * function to add song into the list
 */
function addSongsToList(){

    var songTitle = document.getElementById('title-name').value;
    var songArtist = document.getElementById('artist-name').value;

    if (songArtist == "" && songTitle=="") {
        showAlert();
    }

    else{
        console.log(songTitle);
        console.log("\n" + songArtist);

        var li_div = document.createElement('div');
        li_div.className ="viewcard";

        var divTitle = document.createElement('h5');
        divTitle.className = "div_title";
        divTitle.innerHTML = songTitle;

        var divArtist = document.createElement('p');
        divArtist.className = "div_Artist";
        divArtist.innerHTML = songArtist;

        li_div.appendChild(divTitle);
        li_div.appendChild(divArtist);
    }

    /*var main_body = document.createElement('div');
    main_body.appendChild(li_div);*/

    let song_list = document.getElementById('list-song');
    song_list.appendChild(li_div);
}

/**
 * function to show alert for data validation
 */
function validationAlert(){
    alert("Title and Artist must be filled out");
    console.log("Enter details in list!!")
}