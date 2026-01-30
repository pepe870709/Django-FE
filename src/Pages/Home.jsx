import React, { use, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Login from '../Components/Login'
import { useFetchMe } from '../hook/reactQueryFetch'
import { useQueryClient } from '@tanstack/react-query'
import { set } from 'zod'
import { useRefresh } from '../hook/reactQueryFetch'
import api from '../API/Axios/customAxios'
import { Outlet } from 'react-router-dom'

const Home = () => {

  //const {data, isLoading, refetch} = useFetchMe(null)
  
  //const {data: data1, refresh} = useRefresh(null)

  
  const fetchyMe = async () => {
  //  const result = await refetch()
  //  if(result.isSuccess)
  //   console.log(result.data)
  //   else if (result.isError){
  //     //queryClient.removeQueries({queryKey: ['me']})
  //     console.log(data)
  //     //setId(data?.userId)
  //     refresh()
  //   }
  }

  return (
    <div>
      <Login/>
      <Navbar/>
      <div>
        <button className='btn' type='button' onClick={() => {fetchyMe()}}>Me</button>
      </div>
      <Outlet/>
    </div>
  )
}

export default Home
