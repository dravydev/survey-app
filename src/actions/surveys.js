import sendRequest from '@/utils/sendRequest'

const createSurvey = async (data) => {
	const response = await sendRequest({
		method: 'post',
		path: '/surveys/createSurvey',
		timeout: 5_000,
		data: data
	})

	if (response?.data?.error)
		return {
			error: response.data.details
		}

	return {
		data: {
			survey: response.data.survey
		}
	}
}

const takeSurveys = async () => {
	const response = await sendRequest({
		method: 'get',
		path: '/surveys/takeSurveys',
		timeout: 5_000
	})

	if (response?.data?.error)
		return {
			error: response.data.details
		}

	return {
		data: {
			surveys: response.data.surveys
		}
	}
}

const takeSurvey = async (params) => {
	const response = await sendRequest({
		method: 'get',
		path: '/surveys/takeSurvey?surveyId=' + params.surveyId,
		timeout: 5_000
	})

	if (response?.data?.error)
		return {
			error: response.data.details
		}

	return {
		data: {
			survey: response.data.survey
		}
	}
}

const updateSurveyQuestions = async (params, data) => {
	const response = await sendRequest({
		method: 'post',
		path: '/surveys/updateSurveyQuestions?surveyId=' + params.surveyId,
		timeout: 5_000,
		data: data
	})

	if (response?.data?.error)
		return {
			error: response.data.details
		}

	return {
		data: {
			survey: response.data.survey
		}
	}
}

const takeSurveysPaths = async () => {
	const response = await sendRequest({
		method: 'get',
		path: '/surveys/takeSurveysPaths',
		timeout: 5_000
	})

	if (response?.data?.error)
		return {
			error: response.data.details
		}

	return {
		data: {
			surveys: response.data.surveys
		}
	}
}

const completeSurvey = async (params, data) => {
	const response = await sendRequest({
		method: 'post',
		path: '/surveys/completeSurvey?surveyId=' + params.surveyId,
		timeout: 5_000,
		data: data
	})

	if (response?.data?.error)
		return {
			error: response.data.details
		}

	return {
		data: {
			complete: response.data.complete
		}
	}
}

const refreshSurveyAnswers = async (params) => {
	const response = await sendRequest({
		method: 'get',
		path: '/surveys/refreshSurveyAnswers?surveyId=' + params.surveyId,
		timeout: 5_000
	})

	if (response?.data?.error)
		return {
			error: response.data.details
		}

	return {
		data: {
			answers: response.data.answers
		}
	}
}

export {
	createSurvey,
	takeSurveys,
	takeSurvey,
	updateSurveyQuestions,
	takeSurveysPaths,
	completeSurvey,
	refreshSurveyAnswers
}
