import React from 'react'

const Footer = () => {

    const date = new Date;
    let year=date.getFullYear();
 

  return (
    <div className='bg-black text-white  flex justify-center'>
    { ` © ${year} Skymate .All rights reserved`}
    </div>
  )
}

export default Footer
