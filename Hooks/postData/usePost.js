import { useState, useEffect, } from 'react'
import { BASE_URL, } from '../../SRC/Util/Constent/Constent';
import axios from 'axios';

const usePost = (endPoint, route) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${BASE_URL}${endPoint}/${route}`, { email, password });
            setData(response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
                setData(error.response.data);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(false);
        setError(null);
        setData(null);
    }, [endPoint, route]);

    return { login, loading, error, data };
};

export default usePost;




