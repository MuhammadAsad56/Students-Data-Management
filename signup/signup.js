import { auth,createUserWithEmailAndPassword,db, doc, setDoc } from "../firebase.js";

let name = document.getElementById("name")
let email = document.getElementById("email")
let password = document.getElementById("password")

window.signup = () => {
   let  obj = {
    name: name.value,
    email: email.value,
    password: password.value
   }
   createUserWithEmailAndPassword(auth, obj.email, obj.password)
   .then((res)=>{
    obj.id = res.user.uid
    const reference = doc(db, "users", obj.id)
    setDoc(reference,obj)
    .then((res)=>{
      let objUser = JSON.stringify(obj)
      localStorage.setItem("users", objUser)
      window.location.assign("../registrationForm/index.html")
    })
    .catch((err)=>{
        console.log(err.message);
    })
   })
   .catch((err)=>{
      console.log(err.message);
   })
}