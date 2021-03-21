import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust, faGoogle } from '@fortawesome/free-solid-svg-icons'
import './Login.css';
import firebaseConfige from './firebase.confige';
import { UseContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import google from '../../image/download.png'

const Login = () => {

   const [loggedInUser, setLoggedInUser] = useContext(UseContext);

   const history = useHistory();
   const location = useLocation();

   const { from } = location.state || { from: { pathname: "/" } };

   const[newUser, setNewUser] = useState(false);

   const[user, setUser] = useState({
      email: '',
      password: '',
   })

   if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfige);
   }

   const handelGoogleSignIn = () => {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      
      firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
         const {displayName, email} = result.user;
         const signInUser = {
         name: displayName, 
         email: email,
         success: false,
         error: "",
      
         }
         setLoggedInUser(signInUser)
         history.replace(from)
      }).catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         var email = error.email;
         var credential = error.credential;
         console.log(errorMessage, email, credential, errorCode)
      });
   }

   const handelSubmit = (e) => {
      if(newUser && user.email && user.password) {
         firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
         .then((res) => {
            console.log('creatAccount', res)
            const newUserInfo = {...user}
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            userUpdateName(user.email)
            console.log("creat name", user.name)
            const {name, email} = user;
            const signInEmail ={
               name: name,
               email: email,
            }
            setLoggedInUser(signInEmail)
            history.replace(from)
         })
         .catch((error) => {
            const newUserInfo = {...user}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo)
         });
      }
      if(!newUser && user.email && user.password){
         firebase.auth().signInWithEmailAndPassword(user.email, user.password)
         .then(res => {
            const newUserInfo = {...user}
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo)
            userUpdateName(user.email)
            const {name, email} = user;
            const signInEmail ={
               name: name,
               email: email,
            }
            setLoggedInUser(signInEmail)
            history.replace(from)
         })
         .catch((error) => {
            const newUserInfo = {...user}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo)
         });
      }
      e.preventDefault();
   }

   const handelBlue = (e) => {
      let isFileValid = true;
      if(e.target.name === 'email') {
         isFileValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name === 'password'){
         isFileValid = e.target.value.length > 6 &&  /\d{1}/.test(e.target.value);
      }
      if(isFileValid){
         const newUserInfo = {...user};
         newUserInfo[e.target.name] = e.target.value;
         setUser(newUserInfo);
      }
   }

   const userUpdateName = name => {
      const user = firebase.auth().currentUser;

      user.updateProfile({
      displayName: name
      }).then(function() {
         console.log('User Name Updated Successfully')
      }).catch(function(error) {
      console.log(error)
      });
   }

   return (
      <div>
         <div className="form-login">
            <form onSubmit={handelSubmit}>
               <h4>{newUser? "Create an account" : 'Login Here'}</h4>

               {newUser && <input className="form-field" type="text" onBlur={handelBlue} name="name" id="" placeholder="Enter Your Name"/>}<br/>

               <input className="form-field" type="text" onBlur={handelBlue} name="email" id="" placeholder="Enter Your Email" required/><br/>

               <input className="form-field" type="password" onBlur={handelBlue} name="password" id="" placeholder="Enter Your Password" required/><br/>

               <input className="form-field" type="submit" value={newUser? "Sign Up" : "Sign In"}/>
               <small className="creatAccount">{newUser? 'Already have an account?':"Don't have a account?"}</small> <a onClick={() => setNewUser(!newUser)} href="#">{newUser? 'Login': 'Create an account'}</a>
            </form>
            <p style={{color:'red'}}>{user.error}</p>
            {user.success && <p style={{color:'green'}}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>}
         </div>
         <br/>
         <p className="or-style">---------------- or ----------------</p>
         <br/>
         <div style={{textAlign: 'center'}}>
         <button onClick={handelGoogleSignIn} className="bth-Google"> <img src={google}></img> <small className="icon-margin">Connect With Google</small></button>
         </div>
         
      </div>
   );
};

export default Login;