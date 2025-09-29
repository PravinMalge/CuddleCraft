import { prisma } from '@/lib/db'
import React from 'react'

const Page = async() => {

  const users = await prisma.user.findMany();
  console.log(users)

  return (
    <div className='p-5'>
     {JSON.stringify(users ,null,2)}
    </div>
  )
}

export default Page