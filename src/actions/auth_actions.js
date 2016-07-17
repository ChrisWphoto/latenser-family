import * as C from '../constants';
import firebase from "firebase";
import { browserHistory  } from 'react-router';

var config = {
    apiKey: "AIzaSyD_7ci6G4C45fNbDDRcmAAHsXMnwj98hz4",
    authDomain: "latenser-family.firebaseapp.com",
    databaseURL: "https://latenser-family.firebaseio.com",
    storageBucket: "latenser-family.appspot.com",
  };
  firebase.initializeApp(config);
 //let gitProvider = new firebase.auth.GithubAuthProvider();
 let provider = new firebase.auth.FacebookAuthProvider();

export function startListeningToAuth(){
		return function(dispatch,getState){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('USER auth changed', user)
          dispatch({
						type: C.LOGIN_USER,
						uid: user.uid,
						username: user.displayName || user.email
           });
           browserHistory.push('/calendar');
        } else {
          dispatch({type:C.LOGOUT});
        }
      });
    };
}


export function attemptLogin(email, password){
  return function(dispatch,getState){
    dispatch({type:C.ATTEMPTING_LOGIN});
    // firebase.auth().createUserWithEmailAndPassword('m2@g.com', '123456')
    console.log('emailsda', email, password);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({type:C.DISPLAY_ERROR,error:"Login failed! "+error});
      dispatch({type:C.LOGOUT});
    });
  }
}

export function attemptLoginFB() {
  return function(dispatch, getState) {
    dispatch({type:C.ATTEMPTING_LOGIN});
    firebase.auth().signInWithRedirect(provider)
      .then(function(result) {
        
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("User from FB:", user);
        // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      dispatch({type:C.DISPLAY_ERROR,error:"Login failed! "+error});
      dispatch({type:C.LOGOUT});
    });
  }
}

export function logoutUser(){
  return function(dispatch,getState){
    dispatch({type:C.LOGOUT}); // don't really need to do this, but nice to get immediate feedback
    browserHistory.push('/');
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      console.error("Signout failed", error)
    });
  }
}