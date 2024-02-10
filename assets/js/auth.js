import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebase.js";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.replace("/");
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const registerWithEmail = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.replace("/");
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const signInWithEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.replace("/");
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const isLoggedIn = () => {
  return localStorage.getItem("userLoggedIn") === "true";
};

export const logOut = () => {
  signOut(auth).then(() => {
    alert("Logged out");
    // refresh the page
    window.location.replace("/");
  });
};

if (window.location.pathname === "/register.html") {
  const signInButton = document.getElementById("signInWithGoogleButton");
  signInButton.addEventListener("click", signInWithGoogle);

  const form = document.getElementById("registerForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }
    // FormData
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      registerWithEmail(email, password);
    }
  });
} else if (window.location.pathname === "/login.html") {
  const signInButton = document.getElementById("signInWithGoogleButton");
  signInButton.addEventListener("click", signInWithGoogle);

  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }
    // FormData
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    signInWithEmail(email, password);
  });
}

const handleHomePage = () => {
  document.querySelector("#registerButton").style.display = "none";
  const logOutButton = document.getElementById("logOutButton");
  logOutButton.style.display = "block";
  logOutButton.addEventListener("click", logOut);
};

document.body.onload = () => {
  if (isLoggedIn()) {
    switch (window.location.pathname) {
      case "/":
        handleHomePage();
        break;
      case "/login.html":
      case "/register.html":
        window.location.replace("/");
        break;
    }
  }

  // Add a listener for the auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // set localStorage
      localStorage.setItem("userLoggedIn", true);
    } else {
      // remove localStorage
      localStorage.removeItem("userLoggedIn");
    }
  });
};
