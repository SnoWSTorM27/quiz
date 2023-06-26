import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import { getAuthToken } from '../../store/auth';

import classes from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const [isOpen, setOpenMenu] = useState(false);
  let isAuthenticated = useSelector(getAuthToken());
  useEffect(() => {
    
  }, [isAuthenticated]);
  
  const toggleMenuHandler = () => {
    setOpenMenu(prevState => !prevState)
  };

  const menuCloseHandler = () => {
    setOpenMenu(false);
  };

  return (
    <div className={classes.Layout}>
      <Drawer isOpen={isOpen} onClose={menuCloseHandler} isAuthenticated={!!isAuthenticated}/>
      <MenuToggle 
        onToggle={toggleMenuHandler}
        isOpen={isOpen}
      />
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;