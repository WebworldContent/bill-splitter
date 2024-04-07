import axios from 'axios';

export const addPaymentInfo = async(data) => {
    try {
        return await axios.post(`https://bill-splitter-server.vercel.app/payment/add`, {
            ...data
        });
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};

export const getPaymentInfo = async(id) => {
    try {
        return await axios.get(`https://bill-splitter-server.vercel.app/payment/get/${id}`);
    } catch (error) {
        throw new Error(`Error while sending http request: ${error}`);
    }
};
