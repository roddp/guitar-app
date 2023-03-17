import React from 'react'
import { Helmet } from 'react-helmet-async'

export const About = () => {


  return (
    <div className='text-center'>
      <Helmet>
        <title>About</title>
      </Helmet>
      <h1>About</h1>
      <p>This project was made by Rodrigo Pereira and was made possible with:</p>

      <span className='me-4'>
        <img src={'./images/React-icon.png'} alt='logo' className='img-thumbnail rounded' style={{ height: '100px' }}></img>
      </span>

      <span className='me-4'>
        <img src={'./images/bootstrap-icon.png'} alt='logo' className='img-thumbnail rounded' style={{ height: '100px' }}></img>
      </span>

      <span className='me-4'>
        <img src={'./images/redux-icon.png'} alt='logo' className='img-thumbnail rounded' style={{ height: '100px' }}></img>
      </span>

    </div>
  )
}
