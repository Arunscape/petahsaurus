import React, { useState } from 'react';
import * as Api from '../api';
import { useHistory } from 'react-router-dom';
import icon from '../assets/appicon.svg';

const Frame = (props) => <div className="jframe">
  <img src={icon} />
  {props.children}
  </div>;

enum State {
  GetEmail,
  Signin,
  Signup,
  Validating,
  Complete,
}
const bindInputToState = (setter) => (event) => setter(event.target.value);

const checkEmail = (email: string, setState, history) => {
  console.log(email);
  Api.checkEmail(email)
    .then(() => {
      setState(State.Signin);
      Api.signin(email)
        .then(() => {
          setState(State.Validating);
          pollForUpgrade(setState, history);
        })
        .catch((e) => console.log('Could not start signin', e));
    })
    .catch(() => setState(State.Signup));
};

const signup = (email: string, username: string, setState, history) => {
  console.log(email);
  Api.signup(email, username)
    .then(() => {
      setState(State.Validating);
      pollForUpgrade(setState, history);
    })
    .catch(() => console.log('Could not start signup'));
};

const pollForUpgrade = (setState, history) => {
    console.log('Polling');
    Api.upgrade()
      .then(() => {
        console.log('polling complete');
        setState(State.Complete);
        history.push('/home');
      })
      .catch(() =>
        setTimeout(() => {
          console.log('polling contine');
          pollForUpgrade(setState, history);
        }, 5000),
      );
};

const SignIn = () => {
  const [state, setState] = useState(State.GetEmail);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();

  switch (state) {
    case State.GetEmail:
      return (
        <Frame>
          <h1>Getting email</h1>
          <input
            key="emailinput"
            type="email"
            placeholder="email@example.com"
            onChange={bindInputToState(setEmail)}
          />
          <button onClick={() => checkEmail(email, setState, history)}>Next</button>
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
          <h1>Signup</h1>
          <input
            key="nameinput"
            type="text"
            placeholder="Name"
            onChange={bindInputToState(setUsername)}
          />
          <button onClick={() => signup(email, username, setState, history)}>
            Next
          </button>
        </Frame>
      );
      break;
    case State.Validating:
      return (
        <Frame>
          <h1>Validating</h1>
        </Frame>
      );
      break;
    case State.Complete:
      return (
        <Frame>
          <h1>Done</h1>
        </Frame>
      );
      break;
    default:
      return (
        <Frame>
          <h1>An error has occured :(</h1>
        </Frame>
      );
      break;
  }
};

export default SignIn;
