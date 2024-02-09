import {
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebase.js";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      alert("Sign in with Google successful", user);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const isLoggedIn = async () => {
  const ans = await auth.onAuthStateChanged((user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  });
  return ans;
};

if (window.location.pathname === "/register.html") {
  const signInButton = document.getElementById("signInWithGoogleButton");
  signInButton.addEventListener("click", signInWithGoogle);
}

document.body.onload = () => {
  if (isLoggedIn()) {
    switch (window.location.pathname) {
      case "/":
        document.querySelector("#registerButton").style.display = "none";
        break;
      case "/register.html":
        window.location.replace("/");
        break;
    }
  }
};
