const axios = require('axios')
let characters = require('./model')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
}  = require('graphql')

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      height: { type: GraphQLInt },
      films: { 
        type: new GraphQLList(MovieType),
        resolve: (person) => {
          return person.films.length ? person.films.map(film => {
            return axios.get(film).then(res => res.data)
          }) : []
        } 
      },
      homeWorld: {
        type: HomeWorldType,
        resolve: (person) => {
          return axios.get(person.homeworld).then(res => res.data)
        }
      }
    }
  }
})

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => {
    return {
      title: { 
        type: GraphQLString,
      },
      releaseDate: { 
        type: GraphQLString,
        // to have a different title for release data than the original API make a resolve function to get the value
        resolve: movie => movie.release_date 
      }
    }
  }
})

const HomeWorldType = new GraphQLObjectType({
  name: 'HomeWorld',
  fields: () => {
    return {
      name: { type: GraphQLString },
      climate: { type: GraphQLString },
      population: { type: GraphQLString }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      person: {
        type: GraphQLNonNull(PersonType),
        args: {
          id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (parent, args) => {
          return characters.find(person => person.id === args.id)
        }
      },
      people: {
        type: new GraphQLList(PersonType),
        resolve: () => {
          return characters
        }
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      addPerson: {
        type: PersonType,
        args: {
          id: {  type: GraphQLNonNull(GraphQLInt) },
          name: { type: GraphQLNonNull(GraphQLString) },
          height: { type: GraphQLInt },
          films: { type: new GraphQLList(GraphQLString) },
          homeWorld: { type: GraphQLString }
        },
        resolve: (person, args) => {
          characters.push({ ...args })
          return { ...args }
        }
      },
      deletePerson: {
        type: PersonType,
        args: {
          id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (person, args) => {
          let character = characters.find(e => e.id === args.id)
          characters = characters.filter(person => person.id !== args.id)
          return {
            id: character.id,
            name: character.name
          }
        }
      },
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
