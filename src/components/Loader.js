import React from 'react'
import { SpinnerInfinity } from 'spinners-react';
import '../css/loader.css'

export default function Loader() {
  return (
    <div className='loader-cont'><SpinnerInfinity size={50} thickness={100} speed={100} color="#fff" secondaryColor="#4b525b" /></div>
  )
}
