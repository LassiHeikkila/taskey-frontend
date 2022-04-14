import config from '../config.json';

const authUrl = config.backendURL + '/api/v1/auth/';

export const getToken = async (username, password) => {
    return new Promise(resolve => {
        // https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1171-L1178
        const data = {
            username: username,
            password: password,
        };
        fetch(authUrl, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(d => {
            // https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1055-L1061
            console.log('login response:', d);

            if (d.code === 200 && d.payload.token !== '') {
                resolve(d.payload.token);
            } else {
                throw new Error("failed to login");
            }
        });

    });
};

export const checkToken = async ({token}) => {
    return new Promise(resolve => {
        fetch(authUrl, {
            mode: 'cors',
            headers: {
                'Authentication': 'Bearer ' + token,
            },
        })
        .then(response => response.json())
        .then(data => {
            // https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1055-L1061
            console.log('token check response:', data);

            if (data.code === 200) {
                resolve(true);
            }
            resolve(false);
        });
    });
};

export default getToken;
