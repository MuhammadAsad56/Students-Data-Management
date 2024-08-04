import { db, collection, addDoc, auth, signOut, doc ,storage, ref, uploadBytesResumable, getDownloadURL } from "../firebase.js";

const username = document.getElementById('username');
const email = document.getElementById('email');
const courseCategory = document.getElementById('courseCategory');
const qualification = document.getElementById('qualification');
let student_picture = document.getElementById("studentPicture")

let signupLink = document.getElementById("signupLink")
let loginLink = document.getElementById("loginLink")
let logoutLink = document.getElementById("logoutLink")

let userObj = localStorage.getItem("users")
userObj = JSON.parse(userObj)
console.log(userObj);

function logout() {
    if (userObj) {
        signupLink.style.display = "none"
        loginLink.style.display = "none"
        logoutLink.style.display = "block"
    } else {
        signupLink.style.display = "block"
        loginLink.style.display = "block"
        logoutLink.style.display = "none"
    }
}
logout()

window.logout = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem("users")
            logout()
        })
        .catch((err) => {
            alert(err.message)
        })

}

let uploadPic = () => {
    return new Promise((resolve, reject) => {
        let files = student_picture.files[0]
        console.log(files);
        const randomNum = Math.random().toString().slice(2)
        const storageRef = ref(storage, `images/${randomNum}`);
        const uploadTask = uploadBytesResumable(storageRef, files);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })

}

window.stuRegistration = () => {
    if (userObj) {
        if (username.value && email.value && courseCategory.value) {
            let obj = {
                username: username.value,
                email: email.value,
                courseCategory: courseCategory.value,
                qualification: qualification.value,
            }
            console.log(obj);
            uploadPic()
                .then(async (res) => {
                    obj.student_picture = res
                    const reference = collection(db, "students")
                    const result = await addDoc(reference, obj)
                    window.location.assign("../index.html")
                })
                .catch((rej) => {
                    console.log(rej.message);
                })
        } else {
            alert("please enter all fields")
        }
    }
    else {
        alert("please signup your account")
        window.location.assign("../signup/signup.html")
    }

}





