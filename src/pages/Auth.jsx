import React from 'react'
import { useSearchParams } from 'react-router-dom'

function Auth() {
  const [searchParams] = useSearchParams
  return (
    <div className='mt-36 flex flex-col items-center gap-10'>
      {searchParams.get}
      <h1 className='text-3xl font-extrabold'>Login / SignUp</h1>
    </div>
  )
}

export default Auth
