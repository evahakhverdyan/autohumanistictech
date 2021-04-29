import * as constants from '../actions/constants';

const initialState = {
    videoLessons: []
};

export default function reduce (state = initialState, action) {
    switch (action.type) {
        case constants.GET_VIDEO:
            const { videoLessons } = action;

            return {
                ...state,
                videoLessons
            }
        default:
            return state;
    }
}
