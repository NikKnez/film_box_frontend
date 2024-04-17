import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import FilmList from './FilmList'
import { useAuth } from '../context/AuthContext'
import { filmApi } from '../misc/FilmApi'
import { handleLogError } from '../misc/Helpers'

function UserPage() {
  const Auth = useAuth()
  const user = Auth.getUser()
  const isUser = user.data.rol[0] === 'USER'

  const [films, setFilms] = useState([])
  const [filmTextSearch, setFilmTextSearch] = useState('')
  const [isFilmsLoading, setIsFilmsLoading] = useState(false)

  useEffect(() => {
    handleGetFilms()
  }, [])

  const handleInputChange = (e, { name, value }) => {
    if (name === 'filmTextSearch') {
      setFilmTextSearch(value)
    }
  }

  const handleGetFilms = async () => {
    setIsFilmsLoading(true)
    try {
      const response = await filmApi.getFilms(user)
      setFilms(response.data)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsFilmsLoading(false)
    }
  }

  const handleSearchFilm = async () => {
    try {
      const response = await filmApi.getFilms(user, filmTextSearch)
      const films = response.data
      setFilms(films)
    } catch (error) {
      handleLogError(error)
      setFilms([])
    }
  }

  if (!isUser) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      <FilmList
        isFilmsLoading={isFilmsLoading}
        filmTextSearch={filmTextSearch}
        films={films}
        handleInputChange={handleInputChange}
        handleSearchFilm={handleSearchFilm}
      />
    </Container>
  )
}

export default UserPage