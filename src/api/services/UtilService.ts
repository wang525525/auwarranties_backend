
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

    // custom timestamp used for only this app.
    convertTimestampToDate: (timestamp: number): Date => {
        if (timestamp) {
            const date = new Date(1904, 0, 1);
            date.setSeconds(timestamp);

            return date;
        }
        return undefined;
    },

    // custom timestamp used for only this app.
    convertDateToTimestamp: (date: string): number => {
        if (date) {
            const epochDate = new Date(1904, 0, 1);
            const toDate = new Date(date);
            const seconds = toDate.getTime() / 1000 - epochDate.getTime() / 1000;

            return seconds;
        }
        return undefined;
    },

};

export default utilService;
