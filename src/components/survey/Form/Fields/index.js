import styles from './fields.module.scss'

import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Selector from '@/components/ui/Selector'

import { useMemo } from 'react'

const ShortAnswer = ({ ...props }) => {
	return (
		<div>
			<Input label="Krótka odpowiedź" name={props.name} />
		</div>
	)
}

const LongAnswer = ({ ...props }) => {
	return (
		<div>
			<Textarea label="Długa odpowiedź" name={props.name} minLength={5} />
		</div>
	)
}

const SingleChoice = ({ ...props }) => {
	return props.fields.map((field) => (
		<div key={field._id}>
			<Selector
				type="radio"
				name={props.name}
				text={field.text}
				value={field.text}
			/>
		</div>
	))
}

const MultipleChoice = ({ ...props }) => {
	return props.fields.map((field) => (
		<div key={field._id}>
			<Selector
				type="checkbox"
				name={props.name}
				text={field.text}
				value={field.text}
			/>
		</div>
	))
}

const Fields = ({ ...props }) => {
	const modes = useMemo(() => {
		return {
			shortAnswer: ShortAnswer,
			longAnswer: LongAnswer,
			singleChoice: SingleChoice,
			multipleChoice: MultipleChoice
		}
	}, [])

	const Mode = modes[props.mode]

	return (
		<div className={styles.root}>
			<Mode name={props.name} fields={props.fields} />
		</div>
	)
}

export default Fields
