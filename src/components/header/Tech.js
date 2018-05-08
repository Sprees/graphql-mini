import React from 'react'

const Tech = props => {
  return (
    <div className='header-tech'>
      <img className='image' src={ props.image } alt={ props.tech }/>
      <h1 className={ props.tech.toLowerCase() }>{ props.tech }</h1>
    </div>
  )
}

export default Tech