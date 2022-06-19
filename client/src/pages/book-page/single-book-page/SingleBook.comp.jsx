import React from 'react'

const SingleBook = (props) => {
  return (
    <div className='book-container'>
    <div className='title'>{props.title}</div>
    <img src={props.bookCovered} alt={props.title}/>
    <div className='author'>{props.author}</div>
    <div className='description'>{props.description}</div>
    <div className='price'>{props.price}</div>
    <div className='pages'>{props.pages}</div>
    </div>

  )
}

export default SingleBook