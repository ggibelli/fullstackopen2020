import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [getBooksGenre, resultGenre] = useLazyQuery(ALL_BOOKS)
  const [booksGenre, setBooksGenre] = useState(null)
  const [genreForHtml, setGenreForHtml] = useState(null)
  const showBooks = (genre) => {
    setGenreForHtml(genre)
    getBooksGenre({ variables: { genre: genre } })
  }

  const showAll = () => {
    setGenreForHtml(null)
    setBooksGenre(null)
  }

  useEffect(() => {
    if (resultGenre.data) {
      setBooksGenre(resultGenre.data.allBooks)
    }
  }, [resultGenre])
  if (!props.show) {
    return null
  }

  const books = result.data?.allBooks
  const rawGenres = books.map((book) => book.genres).flat()
  const uniqueSetGenres = new Set(rawGenres)
  const genres = [...uniqueSetGenres]
  const filteredBooks = booksGenre ? booksGenre : books

  if (result.loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      <p>Genre selected: {genreForHtml ? genreForHtml : 'All the genres'}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => showBooks(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={showAll}>Show all</button>
    </div>
  )
}

export default Books
