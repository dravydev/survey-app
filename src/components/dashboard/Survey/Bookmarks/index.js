import styles from './bookmarks.module.scss'

import {
    BiCog,
    BiEditAlt,
    BiStats
} from 'react-icons/bi'

import BookmarksItem from './BookmarksItem'

import { useMemo } from 'react'

const Bookmarks = ({ ...props }) => {

    const bookmarks = useMemo(() => {
        return [
            {
                value: 'editor',
                text: 'Edytor',
                icon: <BiEditAlt />
            },
            {
                value: 'settings',
                text: 'Ustawienia',
                icon: <BiCog />
            },
            {
                value: 'stats',
                text: 'Statystyki',
                icon: <BiStats />
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