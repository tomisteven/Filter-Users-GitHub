import React from 'react'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import web from '../assets/web.png'
import twiter from '../assets/twiter.png'
import github from '../assets/github.png'
import back from '../assets/back.png'

import "../css/userInfo.css"


export default function UserInfo() {

  

  const [user, setUser] = useState([])
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)


  const getId = () => {
    const url = window.location.href
    const id = url.split('/')[url.split('/').length - 1]
    return id
  }



  const userInfo = async () => {
    const id = getId()
    const response = await fetch(`https://api.github.com/users/${id}`)
    const data = await response.json()
    setUser(data)
    setLoading(false)
  }

  const userRepos = async () => {
    const id = getId()
    const response = await fetch(`https://api.github.com/users/${id}/repos?per_page=100`)
    const data = await response.json()
    
    const repo = data.sort((a, b) => {
      return parseDate(b.updated_at).split("/")[2] - parseDate(a.updated_at).split("/")[2]
    })

    const repo2 = data.sort((a, b) => {
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    })

    setRepos(repo2)
    //setRepos(data)

    setLoading(false)
    //console.log(data);
    //console.log(parseDate(data[0].created_at).split("/")[2]);
    console.log(repo);
  }

  const parseDate = (date) => {
    const parsedDate = new Date(date)
    const month = parsedDate.getMonth() + 1
    const day = parsedDate.getDate()
    const year = parsedDate.getFullYear()
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    userInfo()
    userRepos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return ( 
    <>
    <div className='userinfo-container'>
      <a href="/">
        <img src={back} alt="back" className="back-button" />
      </a>
      <div className='userinfo'>

        {loading ? <Loader /> :
        <div className='user-info-container'>
          
          <img className='user-info-image' src={user.avatar_url} alt="avatar"/>
          <div className='user-info-info'>
            <h3 className='user-info-name'>{user.name}</h3>
            <p className='user-info-bio'>{user.bio}</p>
            
            <p className='user-info-followers'>{user.followes}</p>
            <p className='user-info-followers'>{user.location ? "Ubicacion: " + user.location : "No tiene ubicacion"}</p>
            <p className='user-info-date'>En github desde {parseDate(user.created_at)}</p>
            <p className='user-info-followers'>Tiene {user.public_repos} Repositorios publicos</p>
            <div className="user-medias">
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  <img className='user-medias' src={github}alt="github"/>
                </a>   
                <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                  <img className='user-medias' src={twiter}alt="twitter"/>
                </a>
                <a href={user.blog} target="_blank" rel="noopener noreferrer">
                  <img className='user-medias' src={web}alt="blog"/>
                </a>
            </div>    
            </div>
          </div>
        }
      </div>

      <div className='infoGraficas'>
          <div className="cont-progress">
              <h2>Seguidores: {user.followers} </h2>
              <div className="total-progress">
                <h6 className='max-min'>00</h6>
                <div className="progress" style={{"height": "30px"}}>
                    <div className="progress-bar  bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="1" style={{"width": `${user.followers/50}%`}} aria-valuemin="0" aria-valuemax="100">{user.followers < 1 ? "No tiene seguidores" : user.followers }</div>

                </div>
                <h6 className='max-min'>+8000</h6>
              </div>
              
              <h2>repositorios: {user.public_repos} </h2>
              <div className="total-progress">
                  <h6 className='max-min'>00</h6>
                <div className="progress">
                  <div className="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="25" style={{"width": `${user.public_repos/2}%`}} aria-valuemin="0" aria-valuemax="100">{user.public_repos}
                  </div>
                  </div>
                  <h6 className='max-min'>+200</h6>
              </div>
          </div>
      </div>
    </div>
    <h2 className='repos-title'>Respositorios</h2>
  {
    loading ? <Loader /> :
    <div className='datatable-container'>
      
      <table className='datatable'>
        <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Link</th>
                <th>Ultimo Push</th>
                <th>Creacion</th>
              </tr>
        </thead>
        <tbody>
          {repos.map((repo, index) => (
            <tr key={index}>
              <td style={{"fontSize": "25px", "marginLeft":"10px", "fontWeight": "bold", "textAlign": "center"}} className='number'>{index + 1}</td>
              <td>{repo.name}</td>
              <td>{repo.description ? repo.description : "No tiene descripcion"}</td>
              <td><a className='link-repo' href={repo.html_url}>{repo.html_url}</a></td>
              <td>{parseDate(repo.pushed_at)}</td>
              <td>{parseDate(repo.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    
  }
    </>
  )
}