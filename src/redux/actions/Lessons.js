import * as constants from './constants';
import AmoAutoService from '../../service';

export function getVideoLessons() {
    return async (dispatch, getState) => {
        const query = 'api/login?type=getVideo';
        const { video: videoLessons } = await AmoAutoService.sendRequest(query, 'GET');

        try {
            dispatch({
                type: constants.GET_VIDEO,
                videoLessons
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}
