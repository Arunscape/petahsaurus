import React, { useState } from 'react';
import * as Api from '../api';

const Frame = (props) => <div>{props.children}</div>;

enum State {
  GetEmail,
  Signin,
  Signup,
  Validating,
  Complete,
}
const bindInputToState = (setter) => (event) => setter(event.target.value);

const checkEmail = (email: string, setState) => {
  console.log(email);
  Api.checkEmail(email)
    .then(() => {
      setState(State.Signin);
      Api.signin(email)
        .then(() => {
          setState(State.Validating);
          pollForUpgrade(setState);
        })
        .catch(() => console.log('Could not start signin'));
    })
    .catch(() => setState(State.Signup));
};

const signup = (email: string, username: string, setState) => {
  console.log(email);
  Api.signup(email, username)
    .then(() => {
      setState(State.Validating);
      pollForUpgrade(setState);
    })
    .catch(() => console.log('Could not start signup'));
};

const pollForUpgrade = (setState) => {
    console.log('Polling');
    Api.upgrade()
      .then(() => setState(State.Complete))
      .catch(() => setTimeout(() => pollForUpgrade(setState), 1000));
};

const SignIn = () => {
  const [state, setState] = useState(State.GetEmail);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  switch (state) {
    case State.GetEmail:
      return (
        <Frame>
          <p>Getting email</p>
          <input
            key="emailinput"
            type="email"
            placeholder="email@example.com"
            onChange={bindInputToState(setEmail)}
          />
          <button onClick={() => checkEmail(email, setState)}>Next</button>
        </Frame>
      );
      break;
    case State.Signin:
      return (
        <Frame>
          <p>Signin</p>
        </Frame>
      );
      break;
    case State.Signup:
      return (
        <Frame>
          <p>Signup</p>
          <input
            key="nameinput"
            type="text"
            placeholder="Name"
            onChange={bindInputToState(setUsername)}
          />
          <button onClick={() => signup(email, username, setState)}>
            Next
          </button>
        </Frame>
      );
      break;
    case State.Validating:
      return (
        <Frame>
          <p>Validating</p>
        </Frame>
      );
      break;
    case State.Complete:
      return (
        <Frame>
          <p>Done</p>
        </Frame>
      );
      break;
    default:
      return (
        <Frame>
          <p>An error has occured :(</p>
        </Frame>
      );
      break;
  }
};

export default SignIn;
