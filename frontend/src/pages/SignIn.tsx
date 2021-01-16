import React, { useState } from 'react'

const Frame = (props) =>
    <div>
        {props.children}
    </div>

enum State {
    GetEmail,
    Signin,
    Signup,
    Validating,
    Complete,
}

const SignIn = () => 
    const [state, setState] = useState(State.GetEmail);
    <Frame>
        <p>This is the sign in page =D</p>
    </Frame>




export default SignIn;