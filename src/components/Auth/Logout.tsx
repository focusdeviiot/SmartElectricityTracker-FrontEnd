import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/login');
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;
