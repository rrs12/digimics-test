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

  var username = localStorage.getItem("Room Name");

var database = firebase.database()

function get() {
  username = localStorage.getItem("Room Name");

  var user_ref = database.ref('/' + username)
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()
    email=data.email
    username=data.user_name
    father_name= data.father_name
    age=data.age
    insta_id= data.instagram_id
    amount=data.amount



    row = '<h1> Email: '+email+'</h1> <br>'+'<h1> Name: '+username+'</h1> <br>'+'<h1> Father Name: '+father_name+'</h1> <br>'+'<h1> Age:'+age+'</h1> <br>'+'<h1> Instagram Id: '+insta_id+'</h1> <br>'+ '<h1> Amount: '+amount+'</h1> <br> <a type="submit" class="bg-gray-700 text-center w-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onclick="login()">Upload Image</a>';
    document.getElementById("output").innerHTML += row;

  })

}

get()


var fileItem;
var fileName;

function getFile(event){
    fileItem=event.target.files[0]
    fileName=fileItem.name;
}

function uploadImage(){
    let storageRef= firebase.storage().ref(username+"/"+fileName)
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot )
        percentVal=Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)
        console.log (percentVal)
        uploadPercentage.innerHTML=percentVal+"%"
        progress.style.width=percentVal+"%"
        

    },(error)=>{
        console.warn(error)
    },()=>{

        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log(url)

        })
    })
}
