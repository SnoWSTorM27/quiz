import React from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Drawer.module.css';

type DrawerProps = {
  isOpen: boolean,
  isAuthenticated: boolean,
  onClose: () => void
}

function Drawer({ isOpen, onClose, isAuthenticated }: DrawerProps) {

  const links = [
    {to: '/', label: 'Список', exact: true}
  ];

  if (isAuthenticated) {
    links.push({to: '/quiz-creator', label: 'Создать викторину', exact: false});
    links.push({to: '/logout', label: 'Выйти', exact: false});
  } else {
    links.push({to: '/auth', label: 'Авторизация', exact: false});
  }

  const cls = [
    classes.Drawer,
    isOpen ? "" : classes.close
  ]

  const renderLinks = (links) => {
    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={onClose}
        >{link.label}</NavLink>
      </li>
    ))
  };

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      {isOpen ? <Backdrop onClick={onClose}/> : null}
    </>
  )
}

export default Drawer;