import { createContext, useReducer } from 'react'

import booksReducer, { BOOKS_INITIAL_STATE, SINGLE_BOOK_INITIAL_STATE } from '../reducers/books.reducer'

export const BooksContext = createContext()

const BooksContextProvider = (props) => {

    const [ booksState, dispatchBooksState] = useReducer(booksReducer, BOOKS_INITIAL_STATE)
    const [singleBookState, dispatchSingleBookState] = useReducer(booksReducer, SINGLE_BOOK_INITIAL_STATE)
    const value = {
        booksState,
        dispatchBooksState,
        singleBookState,
        dispatchSingleBookState,

    }

    return <BooksContext.Provider value={value}>{props.children}</BooksContext.Provider>
}

export default BooksContextProvider