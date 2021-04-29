import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getVideoLessons } from '../../redux/actions/Lessons';
import VideoLessons from '../../components/VideoLessons';
import { Container } from "native-base";
import SpinnerBlue from '../../components/Spinner';

const Lessons = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadVideoLessons = async () => {
            setIsLoading(true);
            await dispatch(getVideoLessons());
            setIsLoading(false);
        };

        loadVideoLessons();
    }, [dispatch]);

    const videoLessons = useSelector(state => state.lessons.videoLessons );

    return (
        <Container>
            {
                isLoading
                    ?  <SpinnerBlue />
                    : <VideoLessons videoLessons={videoLessons} />
            }
        </Container>
    );
}

export default Lessons;
