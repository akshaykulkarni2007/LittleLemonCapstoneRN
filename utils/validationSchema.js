import * as Yup from 'yup'

export const onboardingSchema = Yup.object({
	fname: Yup.string()
		.required('First name is required')
		.matches(/^([A-Za-z\s]*)$/gi, 'Please enter valid first name'),
	email: Yup.string()
		.required('Email is required')
		.email('Please enter valid email id'),
})
