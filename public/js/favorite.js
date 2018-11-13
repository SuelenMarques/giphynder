var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {

    database.ref('favorites/' + USER_ID).once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          createFavorite(childData.url, childData.title, childKey);
        });
      });

    function createFavorite(url, title, key) {
    $(".favorite-list").append(`
      <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div id="card-image" class="card-image">
                <img src="${url}">
              </div>
              <div class="card-content my-text-center">
                <p id="gif-title">${title}</p>
                <br>
                <div class="my-d-flex">
                  <button class="waves-light btn" data-delete-id="${key}" >Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
    $(`button[data-delete-id=${key}]`).click(function() {
      $(this).closest('.row').remove().fadeOut('slow');
      database.ref('favorites/'+ USER_ID + "/" + key).remove();
    });
  }

});

// var database = firebase.database();
// var userID = window.location.search.match(/\?id=(.*)/)[1];

// $(document).ready(function () {

//   $('input').val('');

//   database.ref("users/" + userID).once("value")
//     .then(function (snapshot) {
//       var userInfo = snapshot.val();
//     })

//   database.ref("users").once("value")
//     .then(function (snapshot) {
//       snapshot.forEach(function (childSnapshot) {
//         var childKey = childSnapshot.key;
//         var childData = childSnapshot.val();
//         createUsers(childData.email, childKey);
//       });
//     })

//   $('input').keyup(getSearch);

//   getGifsFromAPI();

//   $('#red-btn').click(getSearch);

//   $('#green-btn').click(likedGif);
//   $('#favorite').click(() => window.location = "favoritos.html?id=" + userID);

// });

// let indexOfGif = -1;

// //chamando o Hammer.js
// const myElement = document.getElementById('card-image');
// const mc = new Hammer(myElement);
// // listen to events...
// mc.on("swipeleft", getSearch);
// mc.on("swiperight", likedGif);

// function getSearch(event) {
//   let searchItem = buscaPalavra();
//   if (!searchItem) {
//     getGifsFromAPI();
//   }
//   trazBusca(searchItem);
// }

// function trazBusca(searchItem) {
//   $.ajax({
//     type: 'GET',
//     url: `http://api.giphy.com/v1/gifs/search?q=${searchItem}&api_key=${keyAPI}&limit=100`,
//     success: showGif,
//     error: erro
//   });
// }

// function buscaPalavra(){
//   return document.getElementById("search").value;
// }

// function likedGif() {
//   getSearch();
//   addToFav()
// }

// function getGifsFromAPI() {
//   $.ajax({
//     type: 'GET',
//     url: `https://api.giphy.com/v1/gifs/search?q=gif&api_key=rc0vl8oEetDnA6wEuyjXXwtGB99EYxSS&limit=100 `,
//     success: showGif,
//     error: erro
//   });
// }

// function showGif(data) {
//   indexOfGif += 1;
//   urlImg = data['data'][indexOfGif]['images']['original']['url'];
//   $('img').attr('src', urlImg);
//   gifTitle = data['data'][indexOfGif]['title'];
//   $('#gif-title').html(gifTitle);
//   }

// function addToFav() {

//   return database.ref("favorites/" + userID).push({
//     url: urlImg,
//     title: gifTitle

//   });
// }

// function erro() {
//   console.log('erro');
// }