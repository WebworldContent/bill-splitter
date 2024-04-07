import axios from 'axios';

export const addGroup = async(data) => {
    try {
        return await axios.post(`https://bill-splitter-server.vercel.app/group/add`, {
            ...data
        });
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};

export const addExpenses = async(data, groupId) => {
    try {
        return await axios.put(`https://bill-splitter-server.vercel.app/group/add-expense/${groupId}`, {
            data
        });
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};

export const getGroup = async(id) => {
    try {
        return await axios.get(`https://bill-splitter-server.vercel.app/group/get/${id}`);
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};
