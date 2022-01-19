import axios from "axios";

export default class JWTManager{

    async obtainPair(email, password){
        const pair = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/obtain-pair`, JSON.stringify({
            email: email,
            password: password
        }),
        {
            headers:{
                'Content-Type': 'application/json'
            }
        })

        return pair;
    }

    async refresh(){

    }
}