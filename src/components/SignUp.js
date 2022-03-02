import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"; 

function SignUp({titleName, validateSignUpForm, signUpValid, errorMsg}) {
    const history= useHistory()
    const [signUpInfo, setSignUpInfo] = useState({username:'', password:'', password2:''})

    function handleChange(e, objectName){
        setSignUpInfo({...signUpInfo,[objectName]:e.target.value, })
        
    }

    function handleSubmit(e){
        e.preventDefault();
        if(validateSignUpForm(signUpInfo) === true){
            history.push("/")
            
        };
        setSignUpInfo({username:'', password:'', password2:''})
        

    }
    console.log(signUpInfo)
    console.log(errorMsg)
    const msgContent = errorMsg.filter(error=> error.id === signUpValid.errorMsg)[0]
    console.log(msgContent)
  return (
    <div className='container'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            <h1>{titleName}</h1>
            <div className='form-input username-input'>
                <label for="username">Enter a Username:</label>
                <p className='hint'>* Username should contain at least 8 characters</p>
                {signUpValid.username === false && <p className='error-msg'>{msgContent.msg}</p>}
                <input type="text" id="username" name="username" value={signUpInfo.username} onChange={(e)=>{handleChange(e,'username')}}></input>
            </div>
            <div className='form-input password-input'>
                <label for="password">Enter a Password:</label>
                <p className='hint'>* Password should contain at least 8 characters</p>
                {signUpValid.username===true && signUpValid.password===false && <p className='error-msg'>{msgContent.msg}</p>}
                <input type="text" id="Password" name="Password" value={signUpInfo.password} onChange={(e)=>{handleChange(e,'password')}}></input>
            </div>
            <div className='form-input password-input-validate'>
                <label for="password">Re-enter the Password:</label>
                <input type="text" id="Password" name="Password" value={signUpInfo.password2} onChange={(e)=>{handleChange(e,'password2')}}></input>
            </div>
            <div className='btn btn-submit'>
                <button type="submit">Sign Up</button>

            </div>
            <div className='link sign-up-link'>
             <span>No account yet? <Link to='/' className='hyperlink'>Sign In</Link></span>
            </div>

        </form>
    </div>
  )
}

export default SignUp