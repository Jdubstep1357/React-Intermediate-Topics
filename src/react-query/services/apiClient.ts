import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});


// <T> is referred to instead of referring to other instances
// <T> is typed objects - generic
class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }


    // makes arrow function referenced in useToDos
    getAll = () => {
        return axiosInstance
        .get<T[]>(this.endpoint)
        .then(res => res.data);
    }

    post = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then(res => res.data);
    }
}

export default APIClient;