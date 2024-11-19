import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBoard } from '../../context/boardContext';
import inviteService from '../../services/inviteServices';

const InviteHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setBoardInviteInfo } = useBoard()

    useEffect(() => {

        const getInviteInfo = async () => {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');

            if (token) {
                const inviteRes = await inviteService.getInviteInfo(token)
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
