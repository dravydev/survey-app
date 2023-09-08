import styles from './switch.module.scss'

const Switch = ({ ...props }) => {
    return (
        <div className={styles.root}>
            <input type="hidden" name={props.name} />
        </div>
    )
}

export default Switch