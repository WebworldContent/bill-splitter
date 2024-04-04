import axios from 'axios';

export const addPaymentInfo = async(data) => {
    try {
        return await axios.post(`http://localhost:3001/payment/add`, {
            ...data
        });
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};

export const getPaymentInfo = async(id) => {
    try {
        return await axios.get(`http://localhost:3001/payment/get/${id}`);
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};
