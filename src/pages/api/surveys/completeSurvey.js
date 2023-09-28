import Joi from 'joi'
import Survey from '@/models/Survey'

import verifyRecaptcha from '@/utils/verifyRecaptcha'

const schema = Joi.object({

    surveyId: Joi.string()
        .hex()
        .length(24)
        .required(),

    recaptchaToken: Joi.string()
        .required(),

    answers: Joi.array()
        .max(30)
        .items(
            Joi.object({
                _id: Joi.string()
                    .hex()
                    .length(24)
                    .required(),
                mode: Joi.string()
                    .valid('singleChoice', 'multipleChoice', 'shortAnswer', 'longAnswer')
                    .required(),
                value: Joi.when('mode', {
                    is: 'shortAnswer',
                    then: Joi.string()
                        .min(1)
                        .max(50)
                        .required(),
                    otherwise: Joi.when('mode', {
                        is: 'longAnswer',
                        then: Joi.string()
                            .min(3)
                            .max(250)
                            .required(),
                        otherwise: Joi.forbidden()
                    })
                }),
                values: Joi.when('mode', {
                    is: 'singleChoice',
                    then: Joi.array()
                        .length(1)
                        .items(Joi.string().min(1).max(32))
                        .required(),
                    otherwise: Joi.when('mode', {
                        is: 'multipleChoice',
                        then: Joi.array()
                            .min(1)
                            .max(10)
                            .items(Joi.string().min(1).max(32))
                            .required(),
                        otherwise: Joi.forbidden()
                    })
                })
            })
        )
        .required()

})

const validateAnswers = (answers, questions) => {

    for (const question of questions) {

        const { isRequired } = question

        const answer = answers.find(answer => answer._id == question._id)

        if (isRequired && !answer) return false

        if (answer) {

            if (answer.mode != question.mode) return false


        }

    }

    return true

}

const takeSurvey = async (req, res) => {

    const validator = schema.validate({ ...req.query, ...req.body })

    if (validator.error) {

        res.json({
            error: true,
            details: {
                reason: 'ValidationError',
                message: 'Nieprawidłowe dane, spróbuj ponownie'
            }
        })

        return
    }

    const { surveyId, recaptchaToken, answers } = validator.value

    const isVerified = await verifyRecaptcha(recaptchaToken)

    if (!isVerified) {

        res.json({
            error: true,
            details: {
                reason: 'VerificationError',
                message: 'Błąd weryfikacji captcha, spróbuj ponownie'
            }
        })

        return
    }

    const survey = await Survey.findById(surveyId, {
        questions: 1
    })

    const isValid = validateAnswers(answers, survey.questions)

    if (!isValid) {

        res.json({
            error: true,
            details: {
                reason: 'ValidationError',
                message: 'Nieprawidłowe dane, spróbuj ponownie'
            }
        })

        return
    }

    const ipAddress = req.headers['x-real-ip'] ?? '127.0.0.1'

    console.log(ipAddress)

    // await Survey.updateOne(
    //     {
    //         _id: surveyId,
    //         ownerId: user.id
    //     },
    //     {
    //         questions: questions
    //     },
    //     { runValidators: true }
    // )

    res.json({ complete: true })

}

export default takeSurvey