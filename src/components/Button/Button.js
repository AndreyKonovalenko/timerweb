import React from 'react';

import cssObject from './Button.module.css';

const Button = (props) => {
  const data = (
    <button
      className={cssObject.Button}
      onClick={props.onClickHandler}
      style={props.isActive ? {background: 'var(--primary)'} : null}
    >
      {' '}
      {props.name}{' '}
    </button>
  );

  return data;
};

export default Button;
