import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [setBornTo, setSetBornTo] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo } })
    setSetBornTo('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={authors[0].name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
