import { db, collection, getDocs, signOut, auth } from "./firebase.js";

let signupLink = document.getElementById("signupLink")
let loginLink = document.getElementById("loginLink")
let logoutLink = document.getElementById("logoutLink")

let userObj = localStorage.getItem("users")
userObj = JSON.parse(userObj)
console.log(userObj);

function logout(){
    if(userObj){
       signupLink.style.display = "none"
       loginLink.style.display = "none"
       logoutLink.style.display = "block"
    }else{
         signupLink.style.display = "block"
         loginLink.style.display = "block"
         logoutLink.style.display = "none"
    }
}
logout()

window.logout = ()=>{
    signOut(auth)
    .then(()=>{
        localStorage.removeItem("users")
        logout()
    })
    .catch((err)=>{
        alert(err.message)
    })

}

let cardsSection = document.getElementById("cardsSection")
let getData = async () =>{
    const reference = collection(db, "students")
    const res = await getDocs(reference)
        res.forEach((doc) => {
            let obj = {
                id: doc.id,
                ...doc.data()
            }
            let {username, email, courseCategory,qualification,student_picture, id} = obj            
            cardsSection.innerHTML += `
              <div class="card" style="width: 18rem;">
            <img src= ${student_picture} class="card-img-top" alt="#">
            <div class="card-body">
              <h5 class="card-title">${username}</h5>
              <p class="card-text">${courseCategory}</p>
              <button onclick="details('${id}')" class="btn btn-primary">check more details</button>
            </div>
        </div>
            `
        });

    }
getData()

window.details = (id) =>{
   let studentId = JSON.stringify(id)
   localStorage.setItem("selectedId", studentId)
   window.location.assign("./studentDetails/detail.html")

}