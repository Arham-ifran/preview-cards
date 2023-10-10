import { ENV } from '../../config/config'
const { baseUrl } = ENV

export const saveImage = (body = null, callback) => {
    const url = `${baseUrl}user/save-image`
    fetch(url, {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(body),
    },
    )
        .then((res) => res.json())
        .then((data) => {
            callback()
            alert(data.message)
        })
        .catch((error) => {
            callback()
            if (error.response && error.response.data) {
                const { data } = error.response;
                if (data.message)
                    alert(data.message);
            }
        });
};
