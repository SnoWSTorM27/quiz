import React from 'react';
import classes from './Loader.module.css';

type Props = {}

function Loader({}: Props) {
  return (
    <div className={classes.center}>
      <div className={classes.Loader}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader;
