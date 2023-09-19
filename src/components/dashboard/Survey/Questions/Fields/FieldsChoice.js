import styles from './fields.module.scss'

import FieldsChoiceMode from './FieldChoiceMode'
import FieldsChoiceItem from './FieldsChoiceItem'
import FieldsChoiceInsert from './FieldsChoiceInsert'

const FieldsChoice = ({ ...props }) => {
    return (
        <div className={styles.choice}>
            <FieldsChoiceMode text={props.text} />
            {props.mode.endsWith('Choice') && <div>
                {props.fields.map(field => <FieldsChoiceItem key={field._id} mode={props.mode} {...field} />)}
                <FieldsChoiceInsert />
            </div>}
        </div>
    )
}

export default FieldsChoice