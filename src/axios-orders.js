import axios from 'axios';

const instance = axios.create({
    baseURL : "https://burgerbuilder-fcbba.firebaseio.com/"

});

export default instance;