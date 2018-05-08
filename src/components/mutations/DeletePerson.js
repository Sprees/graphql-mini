import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { GET_PEOPLE } from '../queries/PeopleQuery'

export const DELETE_PERSON = gql`
  mutation deletePerson($id: Int!) {
    deletePerson(id: $id) {
      id
      name
    }
  }
`

const deletePerson = props => {
  /* 
  Apollo has a cache of your queries, for faster load times. When you add or remove an item, you should also update the cache. 
  */
  /* use update function on Mutation and provide the cache as the first argument and an object of the result of the Mutation as the second
  */
  return (
    <Mutation
      mutation={ DELETE_PERSON }
      update={ (cache, { data: { deletePerson } }) => {
        console.log(cache.readQuery({ query: GET_PEOPLE }))
        console.log(deletePerson)
        let { people } = cache.readQuery({ query: GET_PEOPLE })
        const updated = people.filter(person => {
          return person.id !== deletePerson.id
        })
        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: updated }
        })
      } }
    >
      { (deletePerson, { loading, error }) => (
        <div>{ props.children(loading, error, deletePerson) }</div>
      )}
    </Mutation>
  )
}

export default deletePerson