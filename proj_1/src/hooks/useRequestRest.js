import { useState, useEffect } from 'react';
import axios from 'axios';

export const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'failure'
};

const restUrl = 'api/speakers';

const useRequestRest = () => {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState('');

    // const timeout = (ms) => {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    useEffect(() => {
        const delayFunc = async () => {
            try {
                const result = await axios.get(restUrl);
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(result.data);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        delayFunc();
    }, []);

    const updateRecord = (record, doneCallback) => {
        const originalData = [...data];
        const newRecords = data.map((sp) => (sp.id === record.id ? record : sp));

        const delayFunc = async () => {
            try {
                setData(newRecords);
                await axios.put(`${restUrl}/${record.id}`, record);
                if (doneCallback) {
                    doneCallback();
                }
            } catch (e) {
                setError(e);
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalData);
            }
        }
        delayFunc();
    }

    const insertRecord = (record, doneCallback) => {
        const originalData = [...data];
        const newRecords = [...data, record]

        const delayFunc = async () => {
            try {
                setData(newRecords);
                await axios.post(`${restUrl}/99999`, record);
                if (doneCallback) {
                    doneCallback();
                }
            } catch (e) {
                setError(e);
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalData);
            }
        }
        delayFunc();
    }

    const deleteRecord = (record, doneCallback) => {
        const originalData = [...data];
        const newRecords = data.filter((d) => (d.id !== record.id));

        const delayFunc = async () => {
            try {
                setData(newRecords);
                await axios.delete(`${restUrl}/${record.id}`, record);
                if (doneCallback) {
                    doneCallback();
                }
            } catch (e) {
                setError(e);
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalData);
            }
        }
        delayFunc();
    }


    return { data, requestStatus, error, updateRecord, insertRecord, deleteRecord };
}

export default useRequestRest;