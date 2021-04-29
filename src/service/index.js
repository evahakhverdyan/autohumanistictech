import { AUTO_AMO_URL } from '../config';

class AmoAutoService {
    sendRequest = async (query, method, params ) => {
        try {
            const url = `${AUTO_AMO_URL}/${query}`;
            const request = {
                method,
                mode: 'cors',
                credential: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
          
            const response = await fetch(url, { ...request, ...params });
           
            return response.json();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}
export default new AmoAutoService();
