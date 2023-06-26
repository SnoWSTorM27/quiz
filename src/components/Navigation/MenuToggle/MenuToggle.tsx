import React from 'react';
import classes from './MenuToggle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MenuToggleProps = {
  onToggle: () => void,
  isOpen: boolean
}


function MenuToggle({ onToggle, isOpen }: MenuToggleProps) {
  const cls = [
    classes.MenuToggle,
    isOpen ? classes.open : ""
  ];

  const close = 
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="close"
      fill="currentColor"
      width="1.5rem"
      height="1.5rem"
      className={cls.join(' ')}
    >
      <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
    </svg>;

  const menu = 
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width="1.5rem"
      height="1.5rem"
      className={cls.join(' ')}
      viewBox="0 0 20 14"
      id="menu"
    >
      <g 
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="translate(1 1)"
    ><path d="M0 6h18M0 0h18M0 12h18"></path></g>
    </svg>;
  

  if (isOpen) {
    cls.push(classes.open);
  }

  return (
    <div onClick={onToggle}>
      {/* {isOpen ? close : menu} */}
      {isOpen ? close : menu}
    </div>
  )
}

export default MenuToggle;