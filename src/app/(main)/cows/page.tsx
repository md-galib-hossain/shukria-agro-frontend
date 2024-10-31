'use client'
import { useGetAllCowsQuery } from '@/redux/api/cowApi'
import React from 'react'

const Cows = () => {
  const page = 1
  const limit = 5
  const query ={}
  const {data,isLoading} = useGetAllCowsQuery({page,limit,...query})
  if(!isLoading) console.log(data)
  return (
    <div>cows</div>
  )
}

export default Cows