  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD5U47JEPujGTeKklwZUqfFGgjLOakzPfA",
    authDomain: "digitaldynamics-d64e7.firebaseapp.com",
    projectId: "digitaldynamics-d64e7",
    storageBucket: "digitaldynamics-d64e7.appspot.com",
    messagingSenderId: "949156558770",
    appId: "1:949156558770:web:9c473497898fafc434d6ab"
  };

  // Initialize Firebase
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  room_name = localStorage.getItem("Room Name");

  function getData() {
        firebase.database().ref("/" + room_name).on('value', function (snapshot) {
              document.getElementById("output").innerHTML = "";
              snapshot.forEach(function (childSnapshot) {
                    childKey = childSnapshot.key;
                    childData = childSnapshot.val();
                    if (childKey != "Purpose") {
                          firebase_message_id = childKey;
                          message_data = childData;

                          //Start code
                          var amount=message_data["amount"];
                        console.log(amount)

                          row = "<h1>"+amount+"</h1>";
                          document.getElementById("output").innerHTML = row;


                          //End code    
                          var objDiv = document.getElementById("output");
                          objDiv.scrollTop = objDiv.scrollHeight;

                    }
              });
        });
  }

  getData()