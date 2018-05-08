import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

export const GET_PEOPLE = gql`
  query getPeople {
    people {
      id
      height
      name
      films {
        title
      }
      homeWorld {
        name
      }
    }
  }
`

const PeopleQuery = props => {
  return (
    <Query query={ GET_PEOPLE }>

      {
        ({ loading, error, data }) => {
          if(loading) {
            return (
              <div>
                <img className='le-image'          
                  src="https://media.giphy.com/media/GIEXgLDfghUSQ/giphy.gif" 
                  alt="Loading"
                />
              </div>
            )
          }
          if(error) {
            return (
              <div>
                <img className='le-image'
                  src="http://www.fico.com/en/blogs/wp-content/uploads/2017/03/Lack-of-Data.gif"
                  alt="error"
                />
              </div>
            )
          }
          return props.render(data);
        }
      }

    </Query>
  )
}

export default PeopleQuery