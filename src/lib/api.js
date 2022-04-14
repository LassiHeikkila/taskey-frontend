import config from '../config.json';

const apiUrl = config.backendURL + '/api/v1/';

const doApiCall = async (token, method, path, data) => {
        try {
            if (token === '') {
                throw new Error("not logged in, won't try to perform API call.");
            }
            if ((method === 'POST' || method === 'PUT') && !data) {
                throw new Error("request body not given for POST or PUT request");
            }

            const response = await fetch( apiUrl + path, {
                method: method,
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : null,
            });

            return response.json();
        } catch (error) {
            throw new Error("request failed with:", error)
        }
};

export { doApiCall };
