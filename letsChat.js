user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function addUser()
{
    user_name = document.getElementById("user_name").value;
    localStorage.setItem("user_name",user_name);
    window.location = "letsChat_room.html";
}

function addRoom()
{
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
    });

    localStorage.setItem("room-name",room_name);

    window.location = "index.html";
}

var firebaseConfig = {
      apiKey: "AIzaSyC1-C9pZacV3yPDFWLtqZIf9fcDqa0tC_s",
      authDomain: "moumon-dd08f.firebaseapp.com",
      databaseURL: "https://moumon-dd08f-default-rtdb.firebaseio.com",
      projectId: "moumon-dd08f",
      storageBucket: "moumon-dd08f.appspot.com",
      messagingSenderId: "513772521678",
      appId: "1:513772521678:web:68526eb649580b1f16289f",
      measurementId: "G-E1VBCLETFR"
    };
    
    firebase.initializeApp(firebaseConfig);
    

function send()
{
msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
name:user_name,
message:msg,
like:0
});

document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
   firebase_message_id = childKey;
   message_data = childData;

   console.log(firebase_message_id);
       console.log(message_data);
       name = message_data['name'];
       message = message_data['message'];
   like = message_data['like'];
   name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
   message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
   span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

  row = name_with_tag + message_with_tag +like_button + span_with_tag;       
  document.getElementById("output").innerHTML += row;

} });  }); }
getData();

function updateLike(message_id)
{
console.log("clicked on like button - " + message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_likes = Number(likes) + 1;
console.log(updated_likes);

firebase.database().ref(room_name).child(message_id).update({
      like : updated_likes  
 });

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("letsChat.html");
}
