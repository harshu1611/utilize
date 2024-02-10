import React from 'react'
import { Oval } from 'react-loader-spinner'


export default function Loader() {
  return (
    <div className='flex w-screen h-screen items-centre justify-center'>
      <Oval visible={true} color={'blue'} height={"80px"} width={"80px"}/>
    </div>
  )
}
