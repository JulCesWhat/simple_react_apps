import { useState, useEffect } from 'react';

export const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'failure'
};

const useRequestDelay = (time, initialData = []) => {
    const [data, setData] = useState(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState('');

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const delayFunc = async () => {
            try {
                await timeout(time);
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(data);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        delayFunc();
    }, []);

    const updateRecord = (recordUpdated, doneCallback) => {
        const originalData = [...data];
        const newRecords = data.map((sp) => (sp.id === recordUpdated.id ? recordUpdated : sp));

        const delayFunc = async () => {
            try {
                setData(newRecords);
                await timeout(time);
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
                await timeout(time);
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
                await timeout(time);
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

export default useRequestDelay;