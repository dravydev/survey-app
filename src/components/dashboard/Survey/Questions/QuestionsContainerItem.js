import styles from './questions.module.scss'

import Input from '@/components/ui/Input'
import Switch from '@/components/ui/Switch'
import Select from '@/components/ui/Select'
import Tooltip from '@/components/ui/Tooltip'

import Fields from './Fields'

import { PiDotsSix } from 'react-icons/pi'

import cn from '@/utils/cn'
import generateHexId from '@/utils/generateHexId'

import { BiTrashAlt } from 'react-icons/bi'

import { SecondaryButton } from '@/components/ui/Button'

import { Draggable } from 'react-beautiful-dnd'
import { useDebounce, useSurvey } from '@/hooks'
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'

const QuestionsContainerItem = ({ ...props }) => {
	const mountRef = useRef(false)

	const { survey, setSurvey, selectedId, setSelectedId } = useSurvey()

	const [titleValue, setTitleValue] = useState(props.title)

	const title = useDebounce(titleValue, 500)

	const isSelected =
		props._id === selectedId ? styles.containerItemSelected : ''

	const modes = useMemo(() => {
		return [
			{
				value: 'shortAnswer',
				text: 'Krótka odpowiedź'
			},
			{
				value: 'longAnswer',
				text: 'Długa odpowiedź'
			},
			{
				value: 'singleChoice',
				text: 'Jednokrotny wybór'
			},
			{
				value: 'multipleChoice',
				text: 'Wielokrotny wybór'
			}
		]
	}, [])

	const selectedQuestion = useMemo(() => {
		return survey.questions.find((question) => question._id === props._id)
	}, [props._id, survey.questions])

	const handleSelectQuestion = useCallback(
		(event) => {
			if (selectedId === props._id) return

			setSelectedId(props._id)

			event.currentTarget.scrollIntoView({
				block: 'center'
			})

			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[selectedId]
	)

	const handleSelect = useCallback(
		(value) => {
			selectedQuestion.mode = value

			if (!value.endsWith('Choice')) {
				selectedQuestion.fields = []
			} else {
				if (!selectedQuestion.fields.length) {
					const fieldId = generateHexId(24)

					selectedQuestion.fields.push({
						_id: fieldId,
						text: 'Nowa opcja'
					})
				}
			}

			setSurvey({ ...survey })

			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[survey]
	)

	const handleRequired = useCallback(
		(status) => {
			selectedQuestion.isRequired = status

			setSurvey({ ...survey })

			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[survey]
	)

	const handleDelete = useCallback(() => {
		survey.questions = survey.questions.filter(
			(question) => question._id != selectedId
		)

		const selectedIndex = survey.questions.findIndex(
			(question) => question._id === selectedId
		)

		setSelectedId(
			survey.questions.length ? survey.questions.at(selectedIndex)._id : null
		)

		setSurvey({ ...survey })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedId, survey])

	useEffect(() => {
		if (!mountRef.current) {
			mountRef.current = true
			return
		}

		selectedQuestion.title = title

		setSurvey({ ...survey })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [title, mountRef])

	return (
		<Draggable index={props.index} draggableId={props._id}>
			{(provided, snapshot) => {
				const isActive = snapshot.isDragging ? styles.containerItemActive : ''

				const transform = provided.draggableProps.style.transform

				const style = {
					...provided.draggableProps.style,
					transform: transform?.replace(/\(([^,]+),/, '(0px,')
				}

				return (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={style}
						onClick={handleSelectQuestion}
						className={cn(
							styles.containerItem,
							isActive,
							isSelected,
							styles.block
						)}
					>
						<div
							{...provided.dragHandleProps}
							className={styles.containerItemMove}
						>
							<PiDotsSix />
						</div>
						<Input
							name="title"
							label="Tytuł pytania"
							minLength={3}
							maxLength={64}
							onChange={(value) => setTitleValue(value)}
							defaultValue={props.title}
							autoComplete="off"
							required
						/>
						<Fields questionId={props._id} />
						<div className={styles.containerItemSettings}>
							<Select
								label="Rodzaj"
								name="mode"
								index={modes.findIndex((mode) => mode.value == props.mode)}
								options={modes.map((mode) => ({
									value: mode.value,
									text: mode.text
								}))}
								onSelect={handleSelect}
							/>

							<Tooltip text="Usuń pytanie">
								<SecondaryButton onClick={handleDelete} type="button">
									<BiTrashAlt />
								</SecondaryButton>
							</Tooltip>

							<Switch
								name="isRequired"
								label="Wymagane"
								status={props.isRequired}
								onSwitch={handleRequired}
							/>
						</div>
					</div>
				)
			}}
		</Draggable>
	)
}

export default QuestionsContainerItem
