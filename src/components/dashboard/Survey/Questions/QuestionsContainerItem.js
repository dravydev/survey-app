import styles from './questions.module.scss'

import Input from '@/components/ui/Input'

import cn from '@/utils/cn'
import { PiDotsSix} from 'react-icons/pi'

const QuestionsContainerItem = ({ ...props }) => {
    return (
        <div className={cn(styles.containerItem, styles.block)}>
            <div className={styles.containerItemMove}>
                <PiDotsSix />
            </div>
            <Input
                name="title"
                label="Tytuł pytania"
                defaultValue={props.title}
            />
        </div>
    )
}

export default QuestionsContainerItem