import styles from './fields.module.scss'

import FieldsGroupItem from './FieldsGroupItem'

const FieldsGroup = ({ fields }) => {


    return (
        <div className={styles.group}>
            {fields.map((text, key)=> <FieldsGroupItem key={text+key} text={text} />)}
        </div>
    )
}

export default FieldsGroup