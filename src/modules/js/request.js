import axios from 'axios'

// let host = 'http://rap2api.taobao.org/app/mock/7058'

axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/7058';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default function request({ method = "GET", url, data = {} }) {
    return new Promise((resolve, reject) => {
        let option = { method, url };
        if (method.toLowerCase() === 'get') {
            option.params = data;
        } else { option.data = data; }
        axios(option).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    })
}