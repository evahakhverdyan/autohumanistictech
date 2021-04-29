const padTime = time => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
};

export const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${padTime(seconds)}`;
};

export const isArrayEmpty = list => list.length === 0;

export const getExamTitle = (position) => {
    if(position > 20  && position <= 25)
        return 'Дополнительные вопросы 1/2';
    if(position > 25 )
        return 'Дополнительные вопросы 2/2';

    return '';
}

export const emptyScreen = () =>  { return (null) }

export const progressPercent = (quantity, total) => Math.round( quantity * 100 / total)
