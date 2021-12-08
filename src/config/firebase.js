// Import the functions you need from the SDKs you need

import { initializeApp} from "firebase/app";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged,updateEmail,signOut} from "firebase/auth";
import { getFirestore, collection,
  addDoc, setDoc, doc, getDoc, query, getDocs,updateDoc,where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
 //https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

const firebaseConfig = {

  apiKey: "AIzaSyAPixQOjcoBUKmOPkQgTFdlVaW3c3m4F8Y",
  authDomain: "olx-11557.firebaseapp.com",
  projectId: "olx-11557",
  storageBucket: "olx-11557.appspot.com",
  messagingSenderId: "341473499365",
  appId: "1:341473499365:web:95d93c5bcef60ff4275c0c"
};


initializeApp(firebaseConfig);


const auth = getAuth();
const db = getFirestore();
const storage = getStorage();


async function registerUser(authParams)
{
  const {email,password,fullname,contactno,picture} = authParams;

  
  const {user:{uid}} = await createUserWithEmailAndPassword(auth, email, password)
  //user = userCredential.user.uid.toString();
  // await addDoc(collection(db, "users"), {
  //     email,fullname,contactno
  //   })
  
    const storageRef = ref(storage, 'users/' + picture.name) 
    await uploadBytes(storageRef, picture)
    const url = await getDownloadURL(storageRef)
 
 
  await setDoc(doc(db, "users", uid), {
    email,fullname,contactno,url
  });
  return uid.toString();
  
    
}

function logout() {
  signOut(auth)
}

async function getCurrentUserData()
{
  const user = auth.currentUser;
  if (user) {
     const uid = user.uid.toString();
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    //console.log("Document data 2:", docSnap.data());
    const data = docSnap.data();
    data.id=uid;
    return data;
  } else {
    alert("user is not login");
  }
}
async function getAdData(id)
{
  
    const docRef = doc(db, "ads", id);
    const docSnap = await getDoc(docRef);
    
    //console.log("Document data 2:", docSnap.data());
    const data = docSnap.data();
  
    return data;
  
}

async function getUserData(uid)
{
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    //console.log("Document data 2:", docSnap.data());
    const data = docSnap.data();
    // data.id=uid;
    return data;
}

async function loginUser(email,password)
{

  const {user:{uid}} = await signInWithEmailAndPassword(auth, email, password)
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
    data.id=uid;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  return data;
  
  // user = userCredential.user.uid.toString();

}

async function postAd(data)
{
  let { images } = data
  let imagesUrl = []
  const uid = auth.currentUser.uid;

  for(let i = 0; i < images.length; i++) {
    const storageRef = ref(storage, 'ads/' + images[i].name) 
    await uploadBytes(storageRef, images[i])
    const url = await getDownloadURL(storageRef)
    imagesUrl.push(url)
   }
   data.images = imagesUrl
   data.uid=uid
   await addDoc(collection(db, 'ads'), data)
  
    alert('Data added successfully!')
    return uid;
  
 
}

async function getAllAds() {
  const q = query(collection(db, "ads"))
  const querySnapshot = await getDocs(q)
  const currentAds = []
  querySnapshot.forEach(doc => {
    currentAds.push({...doc.data(),id:doc.id})
  })
 
  return currentAds
}

function getCurrentId()
{
  const uid = auth.currentUser.uid;
  return uid;
}

async function updateProfile(params)
{
  console.log(params)
  const {fullname,contactno,email,newpic,userid,setpic} = params
  const docRef = doc(db, "users", userid);
   
  if( setpic === true){
  const storageRef = ref(storage, 'users/' + newpic.name) 
  await uploadBytes(storageRef, newpic)
  const url = await getDownloadURL(storageRef)
  await updateEmail(auth.currentUser, email)
  await updateDoc(docRef, {
    fullname,contactno,email,url
  });
}
else{
  await updateEmail(auth.currentUser, email)
  await updateDoc(docRef, {
    fullname,contactno,email
  });
}
  return userid;

}

async function searchResults(value)
{
  const adsRef = collection(db, "ads");
  let results=[];

  const q = query(adsRef, where("title", "==", value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    
  results.push({...doc.data(),id:doc.id})
});

return results;
}

export {getAdData,registerUser,loginUser,postAd,getAllAds,getCurrentUserData,updateProfile,searchResults,getUserData,getCurrentId,logout};


// onAuthStateChanged(auth, async (user) => {
//   if (user) {

//     const uid = user.uid.toString();
//     for(let i = 0; i < images.length; i++) {
//     const storageRef = ref(storage, 'ads/' + images[i].name) 
//     await uploadBytes(storageRef, images[i])
//     const url = await getDownloadURL(storageRef)
//     imagesUrl.push(url)
//    }
//    data.images = imagesUrl
//    data.uid=uid
//    await addDoc(collection(db, 'ads'), data)
//    console.log(2)
//     alert('Data added successfully!')
    

// } else {
// alert("user is not login");
// }
// });