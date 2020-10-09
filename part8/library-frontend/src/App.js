import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription, useLazyQuery } from '@apollo/client'

import { ME, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [newBookTrigger, setNewBookTrigger] = useState(0)
  const [getFavorite, resultFavorite] = useLazyQuery(ME)

  const favorite = resultFavorite.data?.me

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includeIn = (set, object) => set.map((book) => book.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includeIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      if (addedBook.genres.includes(favorite.favoriteGenre)) setNewBookTrigger(newBookTrigger + 1)
      updateCacheWith(addedBook)
      window.alert(`new book added ${addedBook.title}`)
    },
  })

  useEffect(() => {
    if (token) {
      setPage('books')
      getFavorite()
    }
  }, [token, getFavorite])

  const loggedNavbar = () => {
    return (
      <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('favorite')}>recommend</button>
        <button onClick={logout}>logout</button>
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {!token ? <button onClick={() => setPage('login')}>login</button> : loggedNavbar()}
      </div>

      <Authors logged={token} show={page === 'authors'} />

      <Books show={page === 'books'} />

      {token ? (
        <Recommend
          newBookTrigger={newBookTrigger}
          show={page === 'favorite'}
          favorite={favorite?.favoriteGenre}
        />
      ) : null}

      <NewBook updateCacheWith={updateCacheWith} show={page === 'add'} />

      <LoginForm setToken={setToken} show={page === 'login'} />
    </div>
  )
}

export default App
