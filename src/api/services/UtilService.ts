
import jwt = require('jsonwebtoken');
const SECRET_KEY = 'auwarranties2020';

const utilService = {
    getAuthToken: (data: any): string => {
        // const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign(data, SECRET_KEY, {
            // expiresIn,
            algorithm:  'HS256',
        });
        return accessToken;
    },

    parseToken: (token: string): any => {
        // const expiresIn = 24 * 60 * 60;
        const data = jwt.verify(token, SECRET_KEY, {
            // expiresIn,
            algorithm: 'HS256',
        });
        return data;
    },

};

export default utilService;
