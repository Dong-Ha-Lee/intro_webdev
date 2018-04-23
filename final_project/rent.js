$(document).ready(function () {
    var storage = firebase.storage();

    var dbref = firebase.database().ref('rent_out_cars/');

    dbref.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;

            var car_download_url = childSnapshot.child("car_picture_url").val();
            var rpd = childSnapshot.child("rent_per_day").val();
            var owner = childSnapshot.child("owner").val();
            var car_model = childSnapshot.child("car_model").val();

            var gsReference_car = storage.refFromURL(car_download_url);
            gsReference_car.getDownloadURL().then(function (url) {
                var emptyDiv = document.createElement("div");
                var emptyDiv2 = document.createElement("div");

                var emptyImg = document.createElement("img");
                var emptyH4 = document.createElement("h4");
                var emptyP = document.createElement("p");

                var card, card_img, card_body, card_title, card_text;

                card = emptyDiv;
                card.setAttribute("class", "card col-sm-12 col-md-4 col-lg-3 mx-auto");
                card.setAttribute("data-toggle", "modal");

                card_img = emptyImg;
                card_img.setAttribute("class", "card-img-top mt-3 hvr-grow profile_pic mx-auto");
                card_img.setAttribute("src", url);
                card_img.setAttribute("alt", "Card images");

                card_body = emptyDiv2;
                card_body.setAttribute("class", "card-body");

                card_title = emptyH4;
                card_title.setAttribute("class", "card-title");
                card_title.innerHTML = car_model;

                card_text = emptyP;
                card_text.setAttribute("class", "card-text");
                card_text.innerHTML = "Per day: $" + rpd;
                //card done
                //push to dom

                $(".row").append(card);
                card.append(card_img, card_body);
                card_body.append(card_title, card_text);
            });
        });
    });
});

//function createCardModal(url, car_name, rpd) {
//    var emptyDiv = document.createElement("div");
//    var emptyImg = document.createElement("img");
//    var emptyH4 = document.createElement("h4");
//    var emptyP = document.createElement("p");
//
//    var card, card_img, card_body, card_title, card_text;
//
//    card = emptyDiv;
//    card.setAttribute("class", "card col-sm-12 col-md-4 col-lg-3 mx-auto");
//    card.setAttribute("data-toggle", "modal");
//
//    card_img = emptyImg;
//    card_img.setAttribute("class", "card-img-top mt-3 hvr-grow profile_pic");
//    card_img.setAttribute("src", url);
//    card_img.setAttribute("alt", "Card images");
//
//    card_body = emptyDiv;
//    card_body.setAttribute("class", "card-body");
//
//    card_title = emptyH4;
//    card_title.setAttribute("class", "card-title");
//    card_title.innerHTML(car_name);
//
//    card_text = emptyP;
//    card_text.setAttribute("class", "card-text");
//    card_text.innerHTML("Per day: $" + rpd);
//    //card done
//    //push to dom
//    card_body.append(card_title, card_text);
//    $(".car_infos").children($(".row")).append(card).append(card_img, card_body);
//    //modal start
//
//
//
//}
