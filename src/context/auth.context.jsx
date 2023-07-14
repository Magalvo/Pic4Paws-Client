import { createContext, useEffect, useState } from 'react';
import {
  auth,
  getAdditionalInfo,
  signInWithGoogle
} from '../config/firebase.config';
import { signupGoogle } from '../api/auth.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../state/index.js';

const AuthContext = createContext();

export const AuthProviderWrapper = props => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const isLoading = useSelector(state => state.isLoading);
  const user = useSelector(state => state.user);
  const authToken = useSelector(state => state.authToken);
  const [stateIsLoggedIn, stateSetIsLoggedIn] = useState(false);
  const [stateIsLoading, stateSetIsLoading] = useState(true);
  const [stateUser, stateSetUser] = useState(null);

  const dispatch = useDispatch();

  const verifyUser = () => {
    auth.onAuthStateChanged(async user => {
      if (!user) {
        dispatch(
          setUser({
            isLoggedIn: false,
            isLoading: false,
            user: null,
            authToken: null
          })
        );
        stateSetUser(null);
        stateSetIsLoggedIn(false);
      } else if (
        user.providerData.length &&
        user.providerData[0].providerId === 'google.com'
      ) {
        const loggedInUser = {
          _id: user.uid,
          firstName: user.displayName,
          email: user.email
        };
        stateSetUser(loggedInUser);
        stateSetIsLoggedIn(true);

        const authToken = await user.getIdToken();
        localStorage.setItem('authToken', authToken);

        dispatch(
          setUser({
            isLoggedIn: true,
            isLoading: false,
            user: loggedInUser, // Update the user value
            authToken: authToken
          })
        );
      } else {
        const { claims } = await user.getIdTokenResult();
        const loggedInUser = {
          firstName: claims.name,
          email: claims.email
        };
        stateSetUser(loggedInUser);
        const authToken = await user.getIdToken();
        localStorage.setItem('authToken', authToken);
        dispatch(
          setUser({
            isLoggedIn: true,
            isLoading: false,
            user: loggedInUser, // Update the user value
            authToken: authToken
          })
        );
      }
      stateSetIsLoading(false);
    });
  };

  const handleGoogleAuthentication = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const additionalInfo = getAdditionalInfo(userCredential);
      if (additionalInfo.isNewUser) {
        await signupGoogle({
          firstName: userCredential.user.displayName,
          email: userCredential.user.email
        });
      }
    } catch (error) {
      console.log('Error authenticating with Google', error);
    }
  };

  const removeToken = () => {
    dispatch(setUser({ authToken: null }));
    localStorage.removeItem('authToken');
    auth.signOut();
  };

  const logOutUser = () => {
    removeToken();
    verifyUser();
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        authToken,
        stateIsLoggedIn,
        stateIsLoading,
        stateUser,
        logOutUser,
        handleGoogleAuthentication
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
