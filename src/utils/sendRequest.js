import axios from 'axios'

const sendRequest = async props => {

    const abortController = new AbortController()

    try {

        const timeout = setTimeout(() => {
            abortController.abort()
        }, props.timeout)

        const request = await axios({
            method: props.method,
            url: '/api' + props.path,
            signal: abortController.signal,
            headers: {
                'Content-Type': 'application/json'
            },
            data: props.data,
            withCredentials: true
        })

        clearTimeout(timeout)

        return {
            ok: Boolean(request.status == 200),
            status: request.status,
            data: request.data
        }

    } catch {

        return {
            ok: false,
            status: 503,
            data: {
                error: true,
                details: {
                    reason: 'ServerError',
                    message: 'Wystąpił błąd serwera, spróbuj ponownie'
                }
            }
        }
    }

}

export default sendRequest