import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'
import AuthorForm from './AuthorForm'
const Authors = ({ logged, show }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }
  const authors = result.data?.allAuthors

  if (result.loading) return <div>loading...</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {logged ? <AuthorForm authors={authors} /> : null}
    </div>
  )
}

export default Authors
