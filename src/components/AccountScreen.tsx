import React from 'react'
import { useParams } from 'react-router-dom'
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const AccountScreen = () => {

    const {method} = useParams();

  return (
    <div>
    {method == "login" && <LoginScreen/>}
    {method == "signup" && <SignupScreen/>}
    </div>
  )
}

export default AccountScreen