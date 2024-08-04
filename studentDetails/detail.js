import { db, doc, getDoc } from "../firebase.js";

let studentCard = document.getElementById("studentCard")
async function details() {
    let id = localStorage.getItem("selectedId")
    id = JSON.parse(id)
    console.log(id);
    const reference = doc(db, "students", id)
    const data = await getDoc(reference)
    if (data.exists()) {
        let obj = {
            ...data.data()
        }
        console.log(obj);
        let { courseCategory, email, qualification, student_picture, username } = obj
        studentCard.innerHTML += `
   <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src= ${student_picture} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"><strong>Name: </strong>${username}</h5>
        <p class="card-text"><strong>Qualification: </strong> ${qualification}</p>
        <p class="card-text"><small class="text-body-secondary"><strong>Course Name: </strong> ${courseCategory}</p>
      </div>
    </div>
  </div>
</div>
   `
    }
}
details()