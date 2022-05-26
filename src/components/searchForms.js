import React from 'react'
import { useState, useEffect } from 'react'
import swal from 'sweetalert'

import "../css/searchForm.css"
import search_button from "../assets/search.png" 
import github from "../assets/github.png"


import Loader from './Loader'

export default function SearchForm() {
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState(true)
  


  const getUsers = async () => {
    const response = await fetch('https://api.github.com/search/users?q=YOUR_NAME')
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  const getUserInfo = async (id) => {
       window.location.href = `/user-info/${id}`
}

  const getSearch = async (e) => {
    e.preventDefault()
    const search = document.getElementById('search').value;

    if (search !== 'iseijasunow') {
      const response = await fetch(`https://api.github.com/search/users?q=${search}&per_page=10`)
      const data = await response.json()
      setUsers(data)
      setLoading(false)
      
      console.log(search);
    }
    else{
      swal({
        title: "Error",
        text: "You can't search for iseijasunow",
        icon: "error"
      });
    }
    
  }


  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    <div>
      <form onSubmit={getSearch} className='search-form'>
          <img src={github} className="search-logo" alt="logo"/>
          <label className='search-label'>Search for a user: </label>
          <input className='search-input' type="text" id='search' name="name" />
          <button className='search-button'>
            <img src={search_button} alt="buscar"/>
          </button>
      </form>

      {loading ? <Loader /> : 

      <div className='search-users-container'>
        {users.items.map(user => (
          <div className='search-user-container' key={user.id}>
            <img className='search-user-image' src={user.avatar_url} alt="avatar"/>
            <div className='search-user-info'>
              <h3 className='search-user-name'>{user.login}</h3>
            </div>
            
            <div>
              <button className='search-user-button' onClick={() => getUserInfo(user.login)}>Ver perfil</button>
            </div>
          </div>
        ))}
      </div>
      
      }




    </div>
  )
}
