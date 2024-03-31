import axios from 'axios';

export const addGroup = async(data) => {
    try {
        return await axios.post(`http://localhost:3001/group/add`, {
            ...data
        });
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};

export const getGroup = async(id) => {
    try {
        return await axios.get(`http://localhost:3001/group/get/${id}`);
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};
