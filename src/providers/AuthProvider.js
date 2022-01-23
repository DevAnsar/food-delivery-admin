import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [storageValue, setLocalStorageValue] = useLocalStorage('_delivery_maneger', {
    loggedIn: false,
    token: null,
    name: null,
    email: null,
    mobile: null
  });

  const [user, setUser] = useState(storageValue);

  useEffect(() => {
    setLocalStorageValue('_delivery_maneger', user);
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
export { AuthContext };
export default AuthProvider;
