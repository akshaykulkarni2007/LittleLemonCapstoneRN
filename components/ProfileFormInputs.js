import { Input } from './common'

export const ProfileFormInputs = ({
	touched,
	errors,
	values,
	handleChange,
	handleBlur,
}) => {
	return (
		<>
			<Input
				label="First Name"
				name="fname"
				touched={touched.fname}
				errors={errors.fname}
				value={values.fname}
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>
			<Input
				label="Last Name"
				name="lname"
				touched={touched.lname}
				errors={errors.lname}
				value={values.lname}
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>
			<Input
				label="Email"
				name="email"
				touched={touched.email}
				errors={errors.email}
				value={values.email}
				keyboardType="email-address"
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>
			<Input
				label="Phone number"
				name="phone"
				touched={touched.phone}
				errors={errors.phone}
				value={values.phone}
				keyboardType="phone-pad"
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>
		</>
	)
}
