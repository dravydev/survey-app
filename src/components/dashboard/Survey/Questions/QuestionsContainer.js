import styles from './questions.module.scss'

import QuestionsContainerItem from './QuestionsContainerItem'

import { useSurvey } from '@/hooks'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useCallback } from 'react'

const QuestionsContainer = () => {

    const { survey, setSurvey } = useSurvey()

    const onDragEnd = useCallback(event => {

        const { source, destination } = event

        if (!destination) return

        const [itemToMove] = survey.questions.splice(source.index, 1)
        survey.questions.splice(destination.index, 0, itemToMove)

        setSurvey({ ...survey })

    }, [survey])

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                getContainerForClone={true}
                droppableId="questions"
                direction="vertical"
            >

                {provided => (
                    <div ref={provided.innerRef} className={styles.container}>
                        {survey.questions.map((question, index) => <QuestionsContainerItem
                            key={question._id}
                            {...question}
                            index={index}
                        />)}
                    </div>
                )}

            </Droppable>
        </DragDropContext>
    )
}

export default QuestionsContainer