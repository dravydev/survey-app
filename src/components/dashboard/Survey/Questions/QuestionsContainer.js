import styles from './questions.module.scss'

import QuestionsContainerItem from './QuestionsContainerItem'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useCallback, useMemo, useState } from 'react'

const QuestionsContainer = () => {

    const tempQuestions = useMemo(() => {
        return [
            {
                id: 'hw-1',
                title: 'Pytanie 1',
                description: 'Opis',
                isDescription: true,
                isRequired: true,
                mode: 'shortText'
            },
            {
                id: 'hw-2',
                title: 'Pytanie 2',
                description: 'Opis',
                isDescription: true,
                isRequired: true,
                mode: 'shortText'
            },
            {
                id: 'hw-3',
                title: 'Pytanie 3',
                description: 'Opis',
                isDescription: true,
                isRequired: true,
                mode: 'shortText'
            }
        ]
    }, [])

    const [questions, setQuestions] = useState(tempQuestions)

    const onDragEnd = useCallback(event => {

        const { source, destination } = event

        if (!destination) return

        const [itemToMove] = questions.splice(source.index, 1)
        questions.splice(destination.index, 0, itemToMove)

        setQuestions([ ...questions ])

    }, [])

    return (
        <div className={styles.container}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    getContainerForClone={true}
                    droppableId="questions"
                    direction="vertical"
                >

                    {provided => (
                        <div ref={provided.innerRef}>
                            {questions.map((question, index) => <QuestionsContainerItem
                                key={question.id}
                                {...question}
                                index={index}
                            />)}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default QuestionsContainer