const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAYrttd-CoF8gQOevy3vPIJYWwHTNTNhWI",
    authDomain: "web503-lab6.firebaseapp.com",
    projectId: "web503-lab6",
    storageBucket: "web503-lab6.appspot.com",
    messagingSenderId: "783081255686",
    appId: "1:783081255686:web:8ff86d193ff6857c242487"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');

const userListUI = document.getElementById("userList");
usersRef.on("child_added", snap => {
    let user = snap.val();
    let $li = document.createElement("li");
    $li.innerHTML = user.name;
    $li.setAttribute("child-key", snap.key);
    $li.addEventListener("click", userClicked) userListUI.append($li);
});

function userClicked(e) {
    var userID = e.target.getAttribute("child-key");
    const userRef = dbRef.child('users/' + userID);
    const userDetailUI = document.getElementById("userDetail");
    userDetailUI.innerHTML = ""
    userRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val() userDetailUI.append($p);
    });
}