import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom"; 

function Login({titleName, validateForm, loginValid, errorMsg}) {
    const [userinfo, setUserinfo] = useState({username:'', password:''})
    let history=useHistory()
    
    function handleChange(e, objectName){
        setUserinfo({...userinfo,[objectName]:e.target.value, })
        
    }

    function handleSubmit(e){
        e.preventDefault();
        if(validateForm(userinfo) === true){
            history.push("/home")
        };
        setUserinfo({username:'', password:''})
        

    }

    const msgContent = errorMsg.filter(error=> error.id === loginValid.errorMsg)[0]
    


    
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <h1>{titleName}</h1>
            <div className='form-input username-input'>
                <label for="username" >Username:</label>
                {loginValid.username===false && <p className='error-msg'>{msgContent.msg}</p>}
                <input type="text" id="username" name="username" value={userinfo.username} onChange={(e)=>{handleChange(e,'username')}}/>
            </div>
            <div className='form-input password-input'>
                <label for="password">Password:</label>
                {loginValid.username===true && loginValid.password===false && <p className='error-msg'>{msgContent.msg}</p>}
                <input type="text" id="Password" name="Password" value={userinfo.password} onChange={(e)=>{handleChange(e,'password')}}/>
            </div>
            <div className='btn-submit'>
                <button type="submit">Submit</button>

            </div>
            <div className='link sign-up-link'>
             <span>No account yet? <Link to='/sign-up' className='hyperlink'>Sign up here</Link></span>
            </div>

        </form>
        

    </div>
  )
}

export default Login

