import styles from './questions.module.scss'

import QuestionsContainerItem from './QuestionsContainerItem'

import { useSurvey } from '@/hooks'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useCallback, useState } from 'react'

const QuestionsContainer = () => {

    const { survey } = useSurvey()

    const [questions, setQuestions] = useState(survey.questions)

    const onDragEnd = useCallback(event => {

        const { source, destination } = event

        if (!destination) return

        const [itemToMove] = questions.splice(source.index, 1)
        questions.splice(destination.index, 0, itemToMove)

        setQuestions([...questions])

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
                                key={question._id}
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