// AuthenticatedApp.js
import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebase'; 
import './Styles/AppStyles.css';

const AuthenticatedApp = () => {
  const [code, setCode] = useState('');
  const [isCodeFieldValid, setIsCodeFieldValid] = useState(false);
  const [name, setName] = useState('');
  // const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneFieldValid, setIsPhoneFieldValid] = useState(false);
  // const [serviceType, setServiceType] = useState('select');
  const [message, setMessage] = useState('');
  const resetForm = () => {
    setCode('');
    setName('');
    // setAmount('');
    setPhoneNumber('');
    // setServiceType('select');
    setMessage(''); 
};

  // FIELD CHECKERS FOR GREEN BORDER --------------->
  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input contains only digits
    const containsOnlyDigits = /^\d+$/.test(inputValue);

    // Check if the input has exactly 10 digits and contains only digits
    const isValidPhoneNumber = inputValue.length === 10 && containsOnlyDigits;

    setPhoneNumber(inputValue);
    setIsPhoneFieldValid(isValidPhoneNumber);
  };

  const handleCodeChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input contains only digits
    const containsOnlyDigits = /^\d+$/.test(inputValue);

    // Check if the input has exactly 10 digits and contains only digits
    const isValidCode = inputValue.length === 7 && containsOnlyDigits;

    setCode(inputValue);
    setIsCodeFieldValid(isValidCode);
  };

  const handleSignOut = () => {
    signOut(auth).catch(error => console.error(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      phoneNumber: phoneNumber,
      discountCode: code,
      // orderType: serviceType,
      name: name,
      // amount: amount
    };



    // Get the current user
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // User is signed in, get the token
      user.getIdToken().then((token) => {
        // Now we have the token, proceed with the fetch call
        fetch('https://codecheck-cnkvyssrga-uc.a.run.app', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include the token in the Authorization header
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle success
          console.log('Success:', data);
          const messageContainer = document.getElementById('message');
          if (messageContainer) {
            messageContainer.textContent = data.message; // Set the message from the data
            setMessage(data.message);
            if (data.message === "Valid Discount Code") {
                // If the message is exactly "Valid Discount Code", reset the form fields
                setCode("");
                setName("");
                // setAmount("");
                setPhoneNumber("");
                // setServiceType("select");
            }
          } else {
            console.error('Message container not found.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // Here you might want to update the state to show an error message
        });
      });
    } else {
      // No user is signed in.
      console.log('User is not signed in to obtain a token.');
      // Here you might want to redirect the user to sign in or show a message
    }
};
  
  // Enable submit button only if form is valid
  // Check if the code is 7 digits long and contains only numbers
   const isCodeValid = /^\d{7}$/.test(code);

   // Check if name is not empty
   const isNameValid = name.trim() !== '';

   // Check if amount is not empty
   // const isAmountValid = amount.trim() !== '' && !isNaN(amount) && Number(amount) > 0;


  // Check if the phoneNumber is 10 digits long and contains only numbers
  const isPhoneNumberValid = /^\d{10}$/.test(phoneNumber);

  // Check if the serviceType is not equal to 'select'
  // const isServiceTypeValid = serviceType !== 'select';

  // Enable submit button only if all conditions are met
  const isFormValid = isCodeValid && isNameValid && isPhoneNumberValid // && isAmountValid  && isServiceTypeValid;


  return (
    <div className="fullContainer">
        <div className="container">
        <h1>Code Redemption</h1>
        <form onSubmit={handleSubmit} id="postcardForm">
            <div>
            <label>Code:</label>
            <input 
              type="text" 
              value={code} 
              onChange={handleCodeChange} 
              style={{ border: isCodeFieldValid ? '3px solid rgb(50, 180, 1)' : '' }} />
            </div>
            <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            {/* <div>
            <label>Amount $$:</label>
            <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
            </div> */}
            <div>
            <label>Phone Number:</label>
            <input 
              type="text" 
              value={phoneNumber} 
              onChange={handlePhoneNumberChange} 
              style={{ border: isPhoneFieldValid ? '3px solid rgb(50, 180, 1)' : '' }} />
            </div>
            {/* <div>
            <label>Select Service Type:</label>
            <select className="select" value={serviceType} onChange={e => setServiceType(e.target.value)}>
                <option value="select">Select an option</option>
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
                <option value="dineIn">Dine-In</option>
            </select>
            </div> */}
            <button type="submit" disabled={!isFormValid}>Submit</button>
        </form>
        <button type="button" onClick={resetForm}>Reset Form</button>
        <button onClick={handleSignOut}>Log Out</button>
        <div className={message === "Valid Discount Code" ? "success-message" : "message"} id="message">
            {message}
        </div>
        </div>
    </div>
  );
};

export default AuthenticatedApp;
