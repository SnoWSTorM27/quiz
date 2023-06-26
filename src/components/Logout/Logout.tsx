import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from '../../store/auth';

type LogoutProps = {}

function Logout({}: LogoutProps) {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(logout());
  }, []);
  return (
    <Redirect to="/"/>
  )
}

export default Logout