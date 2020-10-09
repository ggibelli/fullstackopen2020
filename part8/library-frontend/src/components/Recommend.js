import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const [getBooksGenre, { data, loading, called, refetch }] = useLazyQuery(ALL_BOOKS)
  const [booksGenre, setBooksGenre] = useState(null)

  useEffect(() => {
    getBooksGenre({ variables: { genre: props.favorite } })
  }, [props.favorite, props.newBookTrigger, getBooksGenre])

  useEffect(() => {
    if (called && props.newBookTrigger && props.show) {
      refetch()
    }
  }, [called, refetch, props])

  useEffect(() => {
    if (data) {
      setBooksGenre(data.allBooks)
    }
  }, [data])

  if (!props.show) {
    return null
  }

  if (loading) return <div>loading...</div>

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre {props.favorite}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksGenre.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
