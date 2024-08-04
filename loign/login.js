import {db, auth,signInWithEmailAndPassword, doc, getDoc } from "../firebase.js";

let email = document.getElementById("email")
let password = document.getElementById("password")
// let email = document.getElementById("email")

window.login = () => {
    let obj = {
        email: email.value,
        password: password.value
    }
    signInWithEmailAndPassword(auth,obj.email,obj.password)
    .then(async (res)=>{
        const id  = res.user.uid
        const reference = doc(db, "users", id)
        const data = await getDoc(reference)
        if(data.exists()){
           let userObj = JSON.stringify(data.data());
           localStorage.setItem("users", userObj)
           console.log(userObj);
           window.location.assign("../registrationForm/index.html")
        }
        

    })
} 
