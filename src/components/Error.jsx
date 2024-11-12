import React from 'react'

const Error = ({message}) => {
  return (
    <span className='text-red-600 text-center'>
      {message}
    </span>
  )
}

export default Error
