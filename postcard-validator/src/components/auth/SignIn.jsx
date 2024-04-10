import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState }from 'react'
import { auth } from "../../firebase";


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            setErrorMessage('')
        }).catch((error) => {
            console.log(error);
            setErrorMessage('Incorrect Login Credentials')
        })
    }

    return (
        <div className='sign-in-container'> 
            <form onSubmit={signIn}>
                <h1>Log In To Your Account</h1>
                <input 
                type="email" 
                placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input 
                type="password" 
                placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Log In</button>
                {errorMessage && <div className="message">{errorMessage}</div>}
            </form>
        </div>
    )
}

export default SignIn;
