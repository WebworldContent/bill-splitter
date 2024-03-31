import axios from 'axios';

export const addGroup = async(data) => {
    try {
        await axios.post(`http://localhost:3001/group/add`, {
            ...data
        });
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};
