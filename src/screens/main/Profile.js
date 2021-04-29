import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Content } from 'native-base';
import { loadPersonalData } from '../../redux/actions/User';
import SpinnerBlue from '../../components/Spinner';
import UserInfo from '../../components/UserInfo';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadUserData = async () => {
            setIsLoading(true);
            await dispatch(loadPersonalData(currentUser.id));
            setIsLoading(false);
        };

        loadUserData();
    }, [dispatch]);

    const userData = useSelector(state => state.user.userData);

    return (
        isLoading
            ?  <SpinnerBlue />
            :   <Content padder>
                    {
                        userData.map((user, index) => <UserInfo userData={user} index={index} key={index}/>)
                    }
                </Content>
    );
}

export default Profile;
