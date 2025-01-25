export async function makeRequest<ReturnType>(url: string, data: RequestInit, queryParams?: Record<string, number | string>) {
    const urlSearchParams = new URLSearchParams();

    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            urlSearchParams.append(key, value.toString());
        })
    }


    try {
        let response = null;

        response = await fetch(url + `?${urlSearchParams}`, data);

        if (!response?.ok) {
            let err = new Error("HTTP status code: " + response.status);
            const json = await response.json()
            err.message = json.data.q[0];
            throw err;
        }

        const payloadJson = await response.json();
        return payloadJson.data as ReturnType;
    } catch (error) {
        throw Error(error.message);
    }
}
