import styles from './questions.module.scss'

import {
    PrimaryButton,
    SecondaryButton
} from '@/components/ui/Button'

import {
    CgEye,
    CgShare,
    CgCheckO
} from 'react-icons/cg'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const QuestionsOptions = ({ ...props }) => {
    return (
        <div className={styles.options}>

            <h2 className={cn(styles.optionsTitle, inter)}>{props.title}</h2>

            <SecondaryButton>
                <CgEye />
                <span>Odwiedź</span>
            </SecondaryButton>

            <SecondaryButton>
                <CgShare />
                <span>Udostępnij</span>
            </SecondaryButton>

            <PrimaryButton>
                <CgCheckO />
                <span>Zapisz</span>
            </PrimaryButton>

        </div>
    )
}

export default QuestionsOptions