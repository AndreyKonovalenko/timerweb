import React from 'react';

import cssObject from './Button.module.css';

const Button = (props) => {


  const data = (
    <button className={cssObject.Button} onClick={props.onClickHandler}> {props.name} </button>
  );

  return data;

}


export default Button;
