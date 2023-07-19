import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

const IsLogged = props => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  //if the authentication i still ongoing
  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return <Navigate to='/home' />;
  } else {
    return props.children;
  }
};

export default IsLogged;
