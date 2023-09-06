import sendRequest from '@/utils/sendRequest'

const createSurvey = async data => {

    const response = await sendRequest({
        method: 'post',
        path: '/surveys/createSurvey',
        timeout: 5_000,
        data: data
    })

    if (response?.data?.error) return {
        error: response.data.details
    }

    return {
        data: {
            survey: response.data.survey
        }
    }

}

const takeSurveys = async data => {

    const response = await sendRequest({
        method: 'get',
        path: '/surveys/takeSurveys',
        timeout: 5_000,
        data: data
    })

    if (response?.data?.error) return {
        error: response.data.details
    }

    return {
        data: {
            surveys: response.data.surveys
        }
    }

}

export {
    createSurvey,
    takeSurveys
}