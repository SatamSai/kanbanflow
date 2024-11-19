import React, { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import userService from './services/userServices';

interface AuthProps {
    children: ReactNode;
}

const url = import.meta.env.VITE_BACKEND_URL;

const Auth: React.FC<AuthProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userRes = await userService.checkToken()

                if (userRes.data.error == "Unauthorized") {
                    if (location.pathname !== '/register') {
                        navigate('/login');
                    }
                }
                else {
                    if (!userRes.data.user.fullname) {
                        navigate('/set-info')
                    }
                    else {
                        navigate('/')
                    }
                }
            } catch (error) {
                console.error('Error checking token:', error);
                if (location.pathname !== '/register') {
                    navigate('/login');
                }
            }
        };

        checkAuth();
    }, [navigate, location.pathname]);

    return <>{children}</>;
};

export default Auth;
