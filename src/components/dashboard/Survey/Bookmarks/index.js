import styles from './bookmarks.module.scss'

import {
    BiEditAlt,
    BiSelectMultiple
} from 'react-icons/bi'

import BookmarksItem from './BookmarksItem'

import { useMemo } from 'react'

const Bookmarks = ({ ...props }) => {

    const bookmarks = useMemo(() => {
        return [
            {
                value: 'questions',
                text: 'Pytania',
                icon: <BiEditAlt />
            },
            {
                value: 'answers',
                text: 'Odpowiedzi',
                icon: <BiSelectMultiple />
            }
        ]
    }, [])

    return (
        <div className={styles.root}>
            {bookmarks.map(bookmark => <BookmarksItem
                key={bookmark.value}
                {...bookmark}
                bookmark={props.bookmark}
                setBookmark={props.setBookmark}
            />)}
        </div>
    )
}

export default Bookmarks