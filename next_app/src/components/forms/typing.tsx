
interface FormField {
	name: string,
	label: string,
	type: string,
}

interface FormSection {
	name: string,
	isFormset: boolean,
	flexDirection: string,
	fields: Array<FormField>,
}

