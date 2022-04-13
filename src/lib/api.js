import config from '../config.json';

const apiUrl = config.backendURL + '/api/v1/';

const doApiCall = async (token, method, path, data) => {
        if (token === '') {
            throw new Error("not logged in, won't try to perform API call.");
        }
        if ((method === 'POST' || method === 'PUT') && !data) {
            throw new Error("request body not given for POST or PUT request");
        }

        const response = fetch( apiUrl + path, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: data ? JSON.stringify(data) : null,
        });

        return response.json();
};

export { doApiCall };
