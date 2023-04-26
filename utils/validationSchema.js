import * as Yup from 'yup'

export const onboardingSchema = Yup.object({
	fname: Yup.string()
		.required('First name is required')
		.matches(/^([A-Za-z\s]*)$/gi, 'Please enter valid first name'),
	email: Yup.string()
		.required('Email is required')
		.email('Please enter valid email id'),
})

export const profileSchema = Yup.object({
	fname: Yup.string()
		.required('First name is required')
		.matches(/^([A-Za-z\s]*)$/gi, 'Please enter valid first name'),
	lname: Yup.string()
		.required('Last name is required')
		.matches(/^([A-Za-z\s]*)$/gi, 'Please enter valid last name'),
	email: Yup.string()
		.required('Email is required')
		.email('Please enter valid email id'),
	phone: Yup.string()
		.required('Phone number is required')
		.matches(
			// /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
			/^(\+\d{1,3}[- ]?)?\d{10}$/,
			'Please enter valid 10 digit phone number'
		),
})
