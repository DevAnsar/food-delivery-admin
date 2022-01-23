import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

function useAuthProvider() {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('useAuth must be within AuthProvider!');

  return context;
}
function useAuth() {
  const { user, setUser } = useAuthProvider();
  const toggleAuth = (loginToken = false) => {
    setUser((prev) => ({
      ...prev,
      loggedIn: !prev.loggedIn,
      token: loginToken || prev.token
    }));
  };
  const setPersonalData = ({ name, mobile, email }) => {
    setUser((prev) => ({
      ...prev,
      name,
      mobile,
      email
    }));
  };

  return { user, toggleAuth, setPersonalData };
}

export { useAuth };
