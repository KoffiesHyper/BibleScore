import axios from "axios";

export default class JWTManager {

    async testPair() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/test-pair', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })

            return true;
        } catch {
            try {
                const newAccessToken = await this.refresh();
                localStorage.setItem('accessToken', newAccessToken);
                return true;
            } catch {
                return false;
            }
        }
    }

    async obtainPair(email, password) {
        const pair = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/obtain-pair`, JSON.stringify({
            email: email,
            password: password
        }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        return pair;
    }

    async refresh() {
        const newAccessToken = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/refresh`, JSON.stringify({
            refresh: localStorage.getItem('refreshToken')
        }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        return newAccessToken;
    }
}