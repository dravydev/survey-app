import styles from './survey.module.scss'

import Bookmarks from './Bookmarks'

import Questions from './Questions'
import Settings from './Settings'
import Stats from './Stats'

import { useMemo, useState } from 'react'

const Survey = () => {

    const [bookmark, setBookmark] = useState('editor')

    const bookmarks = useMemo(() => {
        return {
            editor: <Questions />,
            settings: <Settings />,
            stats: <Stats />
        }
    }, [])

    return (
        <div className={styles.root}>
            <Bookmarks
                bookmark={bookmark}
                setBookmark={setBookmark}
            />
            <div className={styles.rootBookmark}>
                {bookmarks[bookmark]}
            </div>
        </div>
    )
}

export default Survey