import songdb from './song-DB/songdb.js';

console.log('Song DB Obj: ');

songdb.open();

songdb.getAllData().then(displaySongs);

let like_count = 0;

//service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js');
}

else{
    console.log('Service worker not supported.');
}

document.getElementById('add-button').addEventListener('click', showList);

function showList(song){
   
    // console.log(song);

    var songTitle = document.getElementById('title-name').value;
    var songArtist = document.getElementById('artist-name').value;

    if (songArtist == "" || songTitle=="") {
        // validationAlert();
        // console.log(songTitle);
        // console.log("\n" + songArtist);

        var li_div = document.createElement('div');
        li_div.className ="viewcard";

        var divTitle = document.createElement('h5');
        divTitle.className = "div_title";
        divTitle.innerHTML = song.Title;

        var divArtist = document.createElement('p');
        divArtist.className = "div_Artist";
        divArtist.innerHTML = song.Artist;

        li_div.appendChild(divTitle);
        li_div.appendChild(divArtist);

        var likeDiv = document.createElement('div');
        likeDiv.className = "div_like";

        var like = document.createElement('h5');
        like.className = "like-text";
        var l = document.createTextNode("Likes:");
        like.appendChild(l);

        likeDiv.appendChild(like);

        var likeCount = document.createElement('h4');
        likeCount.className = "like-count";
        var lc = document.createTextNode(song.Likes);
        likeCount.appendChild(lc);

        likeDiv.appendChild(likeCount);

        li_div.appendChild(likeDiv);

        // var removeButton = document.createElement('button');
        // removeButton.id = "btn-remove";
        // var rt = document.createTextNode('Remove');
        // removeButton.appendChild(rt);

        var likeButton = document.createElement('button');
        likeButton.id = "btn-like";
        var lt = document.createTextNode('+1 Like');
        likeButton.appendChild(lt);

        var bn_div = document.createElement('div');
        bn_div.className = "bn_class";

        //bn_div.appendChild(removeButton);
        bn_div.appendChild(likeButton);

        li_div.appendChild(bn_div);

        var main_body = document.createElement('div');
        main_body.appendChild(li_div);

        let song_list = document.getElementById('list-song');
        song_list.appendChild(main_body);

        createRemoveButton(song, li_div);

        // document.getElementById('btn-like').addEventListener('click', () => {
        //     like_count = like_count + 1;
        // });

        // document.getElementById('btn-remove').addEventListener('click', () => {
        //     songdb.delete(song.id)
        //     .then(() => {
        //         console.log(song.id)
        //         li_div.remove();
        //     })
        //     .catch((err) => {
        //         console.log(song.id)
        //         console.error('Failed', err);
        //     });
            
        // });
    }

    else{

        console.log(songTitle);
        console.log("\n" + songArtist);

        const li_div = document.createElement('div');
        li_div.className ="viewcard";

        var divTitle = document.createElement('h5');
        divTitle.className = "div_title";
        divTitle.innerHTML = songTitle;

        var divArtist = document.createElement('p');
        divArtist.className = "div_Artist";
        divArtist.innerHTML = songArtist;

        li_div.appendChild(divTitle);
        li_div.appendChild(divArtist);

        var likeDiv = document.createElement('div');
        likeDiv.className = "div_like";

        var like = document.createElement('h5');
        like.className = "like-text";
        var l = document.createTextNode("Likes:");
        like.appendChild(l);

        likeDiv.appendChild(like);

        var likeCount = document.createElement('h4');
        likeCount.className = "like-count";
        var lc = document.createTextNode(like_count);
        likeCount.appendChild(lc);

        likeDiv.appendChild(likeCount);

        li_div.appendChild(likeDiv);

        // var removeButton = document.createElement('button');
        // removeButton.id = "btn-remove";
        // var rt = document.createTextNode('Remove');
        // removeButton.appendChild(rt);

        var likeButton = document.createElement('button');
        likeButton.id = "btn-like";
        var lt = document.createTextNode('+1 Like');
        likeButton.appendChild(lt);

        var bn_div = document.createElement('div');
        bn_div.className = "bn_class";

        // createRemoveButton(song, bn_div);

       // bn_div.appendChild(removeButton);
        bn_div.appendChild(likeButton);

        li_div.appendChild(bn_div);

        var main_body = document.createElement('div');
        main_body.appendChild(li_div);

        let song_list = document.getElementById('list-song');
        song_list.appendChild(main_body);

        songdb.add(songTitle, songArtist);

        songTitle = "";
        songArtist = "";
        createRemoveButton(song, li_div);
    }

    document.getElementById('btn-like').addEventListener('click', () => {
        like_count = like_count + 1;
    });


    // document.getElementById(removeButton.id).addEventListener('click', () => {
    //     songdb.delete(song.id)
    //     .then(() => {
    //         li_div.remove();
    //         console.log(song.id)
    //     })
    //     .catch((err) => {
    //         console.log(song.id)
    //         console.error('Failed', err);
    //     });
        
    // });

}

// function validationAlert(){
//     alert("Title and Artist must be filled out");
//     console.log("Enter title and artist details!!")
// }

function displaySongs(songs){
    if (songs.length > 0) {
        songs.forEach((song) => {
          showList(song);
        });
      }
      else {
        console.log("Display Not found");
      }
}

function createRemoveButton(song, li_div){
    console.log("inside create Remove");

    var removeButton = document.createElement('button');
    removeButton.id = "btn-remove";
    removeButton.innerText = 'Remove';
    li_div.append(removeButton);

    document.getElementById(removeButton.id).addEventListener('click', () => {
        songdb.delete(song.id)
        .then(() => {
            console.log("inside then");
            li_div.remove();
            console.log(song.id)
        })
        .catch((err) => {
            console.log(song.id)
            console.error('Failed', err);
        });
        
    });
   // bn_div.appendChild(removeButton);

    // console.log(removeButton.id);

    // removeSong(song, li_div, removeButton);
}

// function removeSong(song, li_div, removeButton){

//     // console.log(removeButton.id);

//     document.getElementById(removeButton.id).addEventListener('click', () => {
//         songdb.delete(song.id)
//         .then(() => {
//             li_div.remove();
//             console.log(song.id)
//         })
//         .catch((err) => {
//             console.log(song.id)
//             console.error('Failed', err);
//         });
        
//     });
// }

// function createLikeButton(song, li_div, likeDiv, bn_div){

//     var like = document.createElement('h5');
//         like.className = song.id + "like-text";
//         var l = document.createTextNode("Likes:");
//         like.appendChild(l);

//         likeDiv.appendChild(like);

//         var likeCount = document.createElement('h4');
//         likeCount.className = "like-count";
//         var lc = document.createTextNode(like_count);
//         likeCount.appendChild(lc);

//         likeDiv.appendChild(likeCount);

//         li_div.appendChild(likeDiv);

//         var likeButton = document.createElement('button');
//         likeButton.id = "btn-like";
//         var lt = document.createTextNode('+1 Like');
//         likeButton.appendChild(lt);

//         bn_div.appendChild(likeButton);

// }

// function likeShowCount(song, likeButton){

//     document.getElementById(song.id + likeButton.id).addEventListener('click', () => {
//         like_count = like_count + 1;
//         song.Likes = like_count;
//     });
// }