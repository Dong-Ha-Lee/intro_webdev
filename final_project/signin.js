var database;
var file_input, rent_boolean, file_input2, user_uid;

$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBO0DzkjKDv3Q4rQ2Er0JRu15RbyUY_CDE",
        authDomain: "webdevfinal-5a678.firebaseapp.com",
        databaseURL: "https://webdevfinal-5a678.firebaseio.com",
        projectId: "webdevfinal-5a678",
        storageBucket: "webdevfinal-5a678.appspot.com",
        messagingSenderId: "304346608145"
    };

    firebase.initializeApp(config);
    console.log("initialized");
    var storage = firebase.storage();
    firebase.auth().onAuthStateChanged(function (user) {
        window.user = user; // user is undefined if no user signed in
        if (firebase.auth().currentUser) {

            $("#me").removeAttr("data-toggle");
            $("#me").removeAttr("data-target");

            var a_drop_down = document.createElement("a");
            var p_user_email = document.createElement("p");
            var pref_icon = document.createElement("img");
            var logout_icon = document.createElement("img");
            var user_uid = firebase.auth().currentUser.uid;
            var prof, prof_fn, prof_ln, prof_pn, prof_carmodel, prof_rent, prof_rpd, prof_car_url;

            pref_icon.setAttribute("src", "https://png.icons8.com/settings/win10/30/000000");
            logout_icon.setAttribute("src", "https://png.icons8.com/exit/win10/30/000000");

            pref_icon.setAttribute("class", "px-3");
            logout_icon.setAttribute("class", "pr-3");

            pref_icon.setAttribute("id", "pref_icon");
            logout_icon.setAttribute("id", "logout_icon");

            pref_icon.setAttribute("data-target", "#profileModal");
            pref_icon.setAttribute("data-toggle", "modal");
            logout_icon.setAttribute("onclick", "signout()");

            a_drop_down.setAttribute("class", "row");
            a_drop_down.setAttribute("id", "status_container");

            p_user_email.innerHTML = user.email;
            p_user_email.setAttribute("id", "display_name");


            firebase.database().ref('users/' + user_uid).once('value').then(function (snapshot) {
                if (snapshot.exists()) {
                    console.log("profile exists");
                    prof = snapshot.val();
                    prof_fn = prof.user_first_name;
                    prof_ln = prof.user_last_name;
                    prof_pn = prof.user_phone_number;
                    prof_carmodel = prof.car_model;
                    prof_rent = prof.rent;
                    prof_rpd = prof.rent_per_day;
                    var gsReference_car = storage.refFromURL(prof.car_picture_url);
                    var gsReference_prof = storage.refFromURL(prof.profile_picture_url);
                    $(".upload_img").css({
                        display: 'none'
                    });
                    $(".img_edit_icon").css({
                        display: 'inline'
                    });
                    gsReference_car.getDownloadURL().then(function (url) {
                        $(".file_preview").attr("class", "mx-auto file_preview rounded-circle");
                        $("#car_img_preview").attr("src", url);
                    });
                    gsReference_prof.getDownloadURL().then(function (url) {
                        $("#prof_img_preview").attr("src", url);
                    });
                    $("#fn").val(prof_fn);
                    $("#ln").val(prof_ln);
                    $("#pn").val(prof_pn);
                    $("#car_model").val(prof_carmodel);
                    if (prof_rent) {
                        $("#rent_no").css({
                            display: "none"
                        });
                        $("#rent_div").css({
                            display: "flex"
                        });
                        rent_boolean = prof_rent;
                    } else {
                        $("#rent_yes").css({
                            display: "none"
                        });
                        rent_boolean = prof_rent;
                    }
                    $("#rent_per_day").val(prof_rpd);

                } else if (!snapshot.exists()) {
                    console.log("no profile info yet")
                }
            });

            $("#me").append(a_drop_down);
            $("#status_container").append(p_user_email, pref_icon, logout_icon);
            $("#me_icon").css({
                display: 'none'
            });

            $("#me").css({
                marginBottom: 0,
                fontSize: "1rem"
            });

        }
    });
    // Sign out user

});

function direct_to_profile() {
    console.log('clicked');
    var modal_fade, modal_dialog, modal_content, modal_header, modal_title, modal_body;
    var div = document.createElement("div");
}

function signout() {
    console.log("clicked");
    firebase.auth().signOut()
        .catch(function (err) {
            // Handle errors
        });
    window.location.replace("/index.html");

}

function signin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (err) {
            // Handle errors
        });
    database = firebase.database();
}

function signup() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // Register a new user
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (err) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
}
$("#auth_modal_close").click(function () {
    $("#first_time").css({
        display: 'inline',
        opacity: '1'
    });
    $("#signin").css({
        display: 'inline',
        opacity: '1'
    });
    $("#signup").css({
        display: 'none'
    });
});


$('#img-profile').on("change", function (event) {
    firebase.auth().onAuthStateChanged(function (user) {
        user_uid = user.uid;
        file_input = event.target.files[0];
        var preview = document.getElementById('prof_img_preview');
        preview.src = URL.createObjectURL(event.target.files[0]);
        var storageRef = firebase.storage().ref("/images/" + user_uid + '/prof_pic');
        var uploadTask = storageRef.put(file_input);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            function (error) {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;


                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            });
    });

});

$('#car-profile').on("change", function (event) {
    firebase.auth().onAuthStateChanged(function (user) {
        user_uid = user.uid;
        file_input = event.target.files[0];
        var preview = document.getElementById('car_img_preview');
        preview.src = URL.createObjectURL(event.target.files[0]);
        var storageRef = firebase.storage().ref("/images/" + user_uid + '/car_pic');
        var uploadTask = storageRef.put(file_input);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            function (error) {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;


                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            });
    });
});

$("#rent_yes").click(function () {
    $('#rent_no').queue(function () {
        $("#rent_no").animate({
            opacity: '0'
        }, 800).dequeue();
    }).queue(function () {
        $("#rent_no").css({
            display: 'none'
        }).dequeue()
    });
    $("#rent_div").css({
        display: 'flex'
    });
    rent_boolean = true;
});
$("#rent_no").click(function () {
    $('#rent_yes').queue(function () {
        $("#rent_yes").animate({
            opacity: '0'
        }, 800).dequeue();
    }).queue(function () {
        $("#rent_yes").css({
            display: 'none'
        }).dequeue()
    });
    rent_boolean = false;
});


function save() {

    var uid, fn, ln, pn, prof_pic_url, car_model, rent, rent_per_day, car_pic_url;

    firebase.auth().onAuthStateChanged(function (user) {

        fn = $("#fn").val();
        ln = $("#ln").val();
        pn = $("#pn").val();
        car_model = $("#car_model").val();
        rent = rent_boolean;
        rent_per_day = $("#rent_per_day").val();
        uid = user.uid;
        var database = firebase.database();
        var refurl_user = "gs://webdevfinal-5a678.appspot.com/images/" + uid + "/prof_pic";
        var refurl_car = "gs://webdevfinal-5a678.appspot.com/images/" + uid + "/car_pic";
        var storageRef = firebase.storage().ref("/images/" + uid + '/prof_pic');
        prof_pic_url = refurl_user;
        car_pic_url = refurl_car;
        writeUserData(uid, fn, ln, pn, prof_pic_url, car_model, rent, rent_per_day, car_pic_url);

        function writeUserData(user_uid, fn, ln, pn, prof_pic_url, car_model, rent, rent_per_day, car_pic_url) {
            firebase.database().ref('users/' + uid).set({
                profile_picture_url: prof_pic_url,
                user_first_name: fn,
                user_last_name: ln,
                user_phone_number: pn,
                car_model: car_model,
                rent: rent,
                rent_per_day: rent_per_day,
                car_picture_url: car_pic_url
            });
            if (rent) {
                firebase.database().ref('rent_out_cars/').push().set({
                    car_model: car_model,
                    car_picture_url: car_pic_url,
                    rent_per_day: rent_per_day,
                    owner: fn,
                    owner_pn: pn
                });
                console.log("profile_updated");
            }
        }
    });
}
