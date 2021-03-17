import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


function App() {
  const [user, setUser] = useState({})
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var githubProvider = new firebase.auth.GithubAuthProvider();



  // Handle Google Log in

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  }



  // Handle Facebook Sign In
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('facebook user', user)
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, errorCode, email, credential)
      });
  }



  // Handle github Sign In
  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log('git hub user', user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, credential)
      });
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign In with Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign In with Git hub</button>
      <h3>User: {user.displayName}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
