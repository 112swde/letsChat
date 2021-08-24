var firebaseConfig = {
    apiKey: "AIzaSyCGYIP8Py7g2NhS2hE9U2TRdDxAIYqNIgs",
    authDomain: "kwitter-81d63.firebaseapp.com",
    projectId: "kwitter-81d63",
    storageBucket: "kwitter-81d63.appspot.com",
    messagingSenderId: "383163080495",
    appId: "1:383163080495:web:499af41a9b915b7773cbda"
  };
  
  firebase.initializeApp(firebaseConfig);

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    
     
    });});}
getData();