import axios from 'axios'

const verifyRecaptcha = async token => {

    const request = await axios(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`)

    return Boolean(request?.data?.success)

}

export default verifyRecaptcha