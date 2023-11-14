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
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value  
    user_name=document.getElementById('name').value
    father_name=document.getElementById('father_name').value
    age=document.getElementById('age').value
    insta_id=document.getElementById('insta_id').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }

    if (validate_field(user_name) == false || validate_field(father_name) == false || validate_field(age) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        password : password,
        user_name: user_name,
        father_name: father_name,
        age: age,
        instagram_id: insta_id,
        amount: "₹0"
      }
  
      // Push to Firebase Database
      database_ref.child('/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
      addRoom()
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
      addRoom()
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
}

function addRoom() {
    user=auth.currentUser
    room_name = user.uid
    firebase.database().ref("/").child(room_name).update({
          Purpose: "Add Room"
    });
    localStorage.setItem("Room Name", room_name)
    window.location = "dashboard.html"
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;

          });
    });
}
getData();

function redirectToRoomName(name) {
localStorage.setItem("Room Name", name)
  window.location = "dashboard.html"
}
