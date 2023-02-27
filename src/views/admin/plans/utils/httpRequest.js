const httpRequest = async (host, method, path = '', headers = {}, data = {}) => {
    const response = await fetch(host + path, {
        method,
        headers,
        body: method !== 'GET' ? JSON.stringify(data) : null
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Something went wrong!');
    }

    return responseData;
};

export default httpRequest;
