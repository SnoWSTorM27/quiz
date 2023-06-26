import React from 'react';
import classes from './Backdrop.module.css';

type BackdropProps = {
  onClick: () => void
}

function Backdrop({onClick}: BackdropProps) {
  return (
    <div className={classes.Backdrop} onClick={onClick}></div>
  )
}

export default Backdrop;