import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_PEOPLE } from '../queries/PeopleQuery'

export const DELETE_PERSON = gql`
  mutation deletePerson($id: Int!) {
    deletePerson(id: $id) {
      id
    }
  }
`

const DeletePersonMutation = props => {
  return (
    <Mutation
      mutation={ DELETE_PERSON }
      update={ (cache, { data: { deletePerson } }) => {
        console.log(deletePerson)
        let { people } = cache.readQuery({ query: GET_PEOPLE })
        const updatedPeople = people.filter(person => person.id !== deletePerson.id)
        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: updatedPeople }
        })
      } }
    >
      {
        function(deletePerson, { loading, error }) {
          {/* console.log(arguments)
          console.log('DELETE PERSON FUNC: ', deletePerson) */}
          return (
            <div>
              { props.children(loading, error, deletePerson) }
            </div>
          )
        }
      }
    </Mutation>
  )
}

export default DeletePersonMutation