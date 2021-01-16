import React, { useState } from 'react'
import * as Api from '../api'

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
const bindInputToState = (setter) => (event) => setter(event.target.value)

const checkEmail = (email: string, setState) => {
    console.log(email);
    Api.checkEmail(email)
        .then(() => setState(State.Signin))
        .catch(() => setState(State.Signup))
}


const SignIn = () => {
    const [state, setState] = useState(State.GetEmail);
    const [email, setEmail] = useState("");
    switch (state) {
        case State.GetEmail:
            return (
                <Frame>
                    <p>Getting email</p>
                    <input type="email" placeholder="email@example.com" onChange={bindInputToState(setEmail)}/>
                    <button onClick={() => checkEmail(email, setState)}>Next</button>
                </Frame>
                )
            break;
        case State.Signin:
            return (
                <Frame>
                    <p>Signin</p>
                </Frame>
                )
            break;
        case State.Signup:
            return (
                <Frame>
                    <p>Signup</p>
                </Frame>
                )
            break;
        case State.Validating:
            return (
                <Frame>
                    <p>Validating</p>
                </Frame>
                )
            break;
        case State.Complete:
            return (
                <Frame>
                    <p>Done</p>
                </Frame>
                )
            break;
        default:
            return (<Frame>
                    <p>An error has occured :(</p>
            </Frame>)
            break;
    }
}




export default SignIn;