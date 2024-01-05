
interface FormField {
	name: string,
	label: string,
	type: string,
}

interface FormSection {
	name: string,
	flexDirection: string,
	fields: Array<FormField>,
}

