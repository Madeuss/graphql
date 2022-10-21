import { gql, useMutation } from '@apollo/client'
import React, { FormEvent, useState } from 'react'
import { GET_USERS } from '../App'
import { client } from '../lib/apollo'

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`

const NewUserForm: React.FC = () => {
  const [name, setName] = useState('')
  const [createUser, { data, loading }] = useMutation(CREATE_USER)

  const handleCreateUser = async (event: FormEvent) => {
    event.preventDefault()

    if (!name) return

    await createUser({
      variables: {
        name,
      },
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USERS })

        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [...users, createUser],
          },
        })
      },
    })

    setName('')
  }

  return (
    <form onSubmit={handleCreateUser}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">Enviar</button>
    </form>
  )
}

export default NewUserForm
