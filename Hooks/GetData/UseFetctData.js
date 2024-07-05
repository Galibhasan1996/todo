import { useState, useEffect } from 'react'
import { BASE_URL } from '../../SRC/Util/Constent/Constent';
import axios from 'axios';

export const useFetch = (EndPoint, route) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}${EndPoint}/${route}`);
            setData(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return { data, loading, error };
};
