import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from './components/SignUp';
import Home from './components/Home';
import { useHistory } from "react-router-dom"; 


const USERINFO =[{username:'abcd1234',password:'abcd@1234'}];

function App() {
  const [loginValid, setLoginValid] = useState({username: null, password: null, errorMsg: null})
  const [signUpValid, setSignUpValid] = useState({username: null, password: null, errorMsg: null})
  
  const errorMsg = [{id: 0, msg: 'Username cannot be empty'},
                    {id: 1, msg: 'Password cannot be empty'},
                    {id: 2, msg: 'Invalid username'},
                    {id: 3, msg: 'Invalid password'},
                    {id: 4, msg: 'Username\'s length is too short'},
                    {id: 5, msg: 'Password\'s length is too short'},
                    {id: 6, msg: 'Username has already been used'},
                    {id: 7, msg: 'Re-enter password is not same as password'}]

  function validateForm(userinfo) {
    const isUserExist = USERINFO.findIndex(user => user.username === userinfo.username)
    
    if(isUserExist >= 0){
      if(userinfo.username !== ''){
        if(userinfo.password === USERINFO[isUserExist].password){
          setLoginValid({...loginValid, username: true, password: true})
          return true
          
        }
        else{
          setLoginValid({username: true,password: false, errorMsg: 3})
          return false
        }

      }
      else{
        setLoginValid({username: false, password: false, errorMsg:0})
      }
      
    }
    else{
      setLoginValid({username: false, password: false, errorMsg: 2})
      return false
    }
    
  }

  function validateSignUpForm(signUpInfo){
    const isUserExist = USERINFO.findIndex(user => user.username === signUpInfo.username);
    console.log(isUserExist);

    if(isUserExist === -1){
      //Check if username is empty
      if(signUpInfo.username !== ''){
        if(signUpInfo.username.length >= 8){
          if(signUpInfo.password!==''){
            if(signUpInfo.password.length >= 8){
              if(signUpInfo.password === signUpInfo.password2){
                setSignUpValid({...signUpValid,username:true, password:true})
                USERINFO.push({username:signUpInfo.username, password:signUpInfo.password})
                return true
              }
              else{
                setSignUpValid({username:true, password:false, errorMsg: 7})
              }
            }
            else{
              setSignUpValid({username:true, password:false, errorMsg: 5})
            }
          }
          else{
            setSignUpValid({username:true, password:false, errorMsg: 1})
          }

        }
        else{
          setSignUpValid({username:false, password:false, errorMsg: 4})

        }

      }
      else{
        setSignUpValid({username:false, password:false, errorMsg: 0})
      }
    }
    else{
      setSignUpValid({username:false, password:false, errorMsg: 6})
    }
  }

  console.log(USERINFO)
  



  return (
    <Router>
      <Switch>
        <Route path='/sign-up'>
          <SignUp titleName='Sign-up' validateSignUpForm={validateSignUpForm} signUpValid={signUpValid} errorMsg={errorMsg}/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/'>
          <Login titleName='Login' validateForm={validateForm} loginValid={loginValid} errorMsg={errorMsg}/>
        </Route>

      </Switch>
    </Router>
      


  );
}

export default App;
