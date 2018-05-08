import React from 'react'
import Card from './Card'

const List = props => {
  return (
    <div className='list'>
      { props.list.map((e, i) => <Card { ...e } key={ i } />) }
    </div>
  )
}

export default List