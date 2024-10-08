import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModal } from '../../context/modalContext';
import axios from 'axios';
import { useBoard } from '../../context/boardContext';

const url = import.meta.env.VITE_BACKEND_URL;
const InviteHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setBoardInviteInfo } = useBoard()

    useEffect(() => {

        const getInviteInfo = async () => {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');

            if (token) {
                const inviteRes = await axios.get(url + '/board/' + token + '/getInviteInfo')
                setBoardInviteInfo(inviteRes.data)
                navigate('/');
            } else {
                navigate('/');
            }
        }
        getInviteInfo()
    }, [location.search]);

    return null;
};

export default InviteHandler;
