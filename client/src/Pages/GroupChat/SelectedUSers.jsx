import React from 'react'

const SelectedUSers = ({userData, deleteUser}) => {
  return (
    <div className='flex items-center px-3 bg-red-500 rounded-full py-[2px] text-yellow-50'>
        <p className='mr-1'>{userData.name}</p>
        <button className='text-sm font-light' onClick={deleteUser}>x</button>
    </div>
  )
}

export default SelectedUSers