const firebaseConfig = {
    apiKey: "AIzaSyD5U47JEPujGTeKklwZUqfFGgjLOakzPfA",
    authDomain: "digitaldynamics-d64e7.firebaseapp.com",
    projectId: "digitaldynamics-d64e7",
    storageBucket: "digitaldynamics-d64e7.appspot.com",
    messagingSenderId: "949156558770",
    appId: "1:949156558770:web:9c473497898fafc434d6ab"
  };

firebase.initializeApp(firebaseConfig)


var fileText= document.querySelector('.fileText')
var uploadPercentage = document.querySelector('.uploadPercentage')
var progress= document.querySelector('.progress')
var percentVal;
var fileItem;
var fileName;

function getFile(event){
    name1= localStorage.getItem("Room Name");
    fileItem=event.target.files[0]
    fileName=fileItem.name;
}

function uploadImage(){
    name1= localStorage.getItem("Room Name");
    let storageRef= firebase.storage().ref(name1+"/"+fileName)
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

alert("Image Uploaded successfully")
window.location= "/dashboard.html"
    })
}
