class APIHelper {
    static async get(url) {
        return fetch(url, {
            method: 'GET',
            mode: 'cors'
        }).then(res => {
            // console.log(res);
            if (res.ok) {
                return res.json();
            } else {
                throw (res.statusText);
            }
        });
    }

    static async post(url, body) {
        return fetch(url, {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(body)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw (res.statusText);
            }
        });
    }

    static async patch(url, body) {
        return fetch(url, {
            method: 'PATCH',
            redirect: 'follow',
            body: JSON.stringify(body)
        }).then(res => {
            // console.log(res);
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(JSON.stringify(res.json()));
            }
        });
    }

    static async put(url, body) {
        return fetch(url, {
            method: 'PUT',
            redirect: 'follow',
            body: JSON.stringify(body)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw (res.statusText);
            }
        })
    }

    static async delete(url) {
        return fetch(url, {
            method: 'DELETE',
            redirect: 'follow'
        }).then(res => {
            // console.log(res);
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(JSON.stringify(res.json()));
            }
        });
    }
}

export {APIHelper}
