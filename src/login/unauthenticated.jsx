import React from 'react';

import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';

import './main.css';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    endpointHandler(`/api/auth/login`);
  }

  async function createUser() {
    endpointHandler(`/api/auth/create`);
  }

  async function endpointHandler(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({email: userName, password: password}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <form id="sign_in_form">
        <img className="mb-4" src="full_icon.png" alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput" onChange={(e) => setUserName(e.target.value)} placeholder="name@example.com" />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <Button variant='w-100 btn btn-lg btn-primary' onClick={() => loginUser()}>
          Login
        </Button>
        <Button variant='w-100 btn btn-lg btn-secondary' onClick={() => createUser()}>
          Create
        </Button>
        {/* <button className="w-100 btn btn-lg btn-primary" type="button" onClick={create}>
          Create
        </button>
        <button className="w-100 btn btn-lg btn-primary" type="button" onClick={login}>
          Sign in
        </button> */}
       </form>


      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
