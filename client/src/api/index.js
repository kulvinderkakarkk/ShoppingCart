import axios from 'axios'
import qs from 'qs'

export const post = async (url , data ,method, headers) => {
    console.log('data is', qs.stringify(data))
    const response = await axios.post(url,
    qs.stringify(data), {
    headers : {
        // "Authorization" : "Basic " + token,
        ...headers,
        "Content-Type" : "application/x-www-form-urlencoded"
    }
    })
    return response.data
}