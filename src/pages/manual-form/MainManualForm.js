import React from 'react';
import styled from 'styled-components';

import './MainManualForm.css';
import ManualForm from './ManualForm';

export default function MainManualForm() {
  const parallax2 = `${process.env.PUBLIC_URL}/main-manual-form/paralax2.jpg`;
  const gear1 = `${process.env.PUBLIC_URL}/main-manual-form/gear1.png`;

  const DivContent = styled.div`
    width: 100%;
    background-image:url(${gear1}), url(${parallax2});
    background-position: left bottom, left top;
    background-repeat: no-repeat, repeat;
    
        &:hover {
            background-color: transparent;
        }
    `;

  return (
    <div className="main-manual-form">
      <div
        className="main-manual-form__header"
        style={{
          backgroundImage: `url(${
            `${process.env.PUBLIC_URL}/main-manual-form/paralax3.jpg`
          })`,
        }}
      >
        New User Account Registration
      </div>
      <DivContent>
        <div className="main-manual-form__google">
          <div className="main-manual-form__google-button">
            <span>g+</span>
            <p>Sign up with your Google Account</p>
          </div>
        </div>
        <div className="main-manual-form__or">
          <p>or</p>
        </div>
        <div className="main-manual-form__register">
          <ManualForm />
        </div>
        <p className="main-manual-form__clone">
          cloned from :
          {' '}
          <a href="https://flixpress.com/register.aspx">flixpress.com</a>
        </p>
      </DivContent>
    </div>
  );
}
