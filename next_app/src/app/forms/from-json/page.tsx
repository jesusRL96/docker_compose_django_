import FormDynamic from '@/components/forms/FormDynamic'
import { formDataExample } from '@/components/forms/dataFormExample';
import React from 'react'

const formSections: Array<FormSection> = formDataExample;

const FromJSONForm = () => {
  return (
		<FormDynamic formSectionsData={formSections} formLayout="vertical"></FormDynamic>
  )
}

export default FromJSONForm
