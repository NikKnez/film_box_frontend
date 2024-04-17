import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import AdminTab from './AdminTab'
import { filmApi } from '../misc/FilmApi'
import { handleLogError } from '../misc/Helpers'

function AdminPage() {
  const Auth = useAuth()
  const user = Auth.getUser()
  const isAdmin = user.data.rol[0] === 'ADMIN'

  const [users, setUsers] = useState([])
  const [films, setFilms] = useState([])
  const [filmImdb, setFilmImdb] = useState('')
  const [filmTitle, setFilmTitle] = useState('')
  const [filmPoster, setFilmPoster] = useState('')
  const [filmTextSearch, setFilmTextSearch] = useState('')
  const [userUsernameSearch, setUserUsernameSearch] = useState('')
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [isFilmsLoading, setIsFilmsLoading] = useState(false)

  useEffect(() => {
    handleGetUsers()
    handleGetFilms()
  }, [])

  const handleInputChange = (e, { name, value }) => {
    if (name === 'filmImdb') {
      setFilmImdb(value)
    } else if (name === 'filmTitle') {
      setFilmTitle(value)
    } else if (name === 'filmPoster') {
      setFilmPoster(value)
    } else if (name === 'filmTextSearch') {
      setFilmTextSearch(value)
    } else if (name === 'userUsernameSearch') {
      setUserUsernameSearch(value)
    }
  }

  const handleGetUsers = async () => {
    try {
      setIsUsersLoading(true)
      const response = await filmApi.getUsers(user)
      setUsers(response.data)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsUsersLoading(false)
    }
  }

  const handleDeleteUser = async (username) => {
    try {
      await filmApi.deleteUser(user, username)
      await handleGetUsers()
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleSearchUser = async () => {
    try {
      const response = await filmApi.getUsers(user, userUsernameSearch)
      const data = response.data
      const users = Array.isArray(data) ? data : [data]
      setUsers(users)
    } catch (error) {
      handleLogError(error)
      setUsers([])
    }
  }

  const handleGetFilms = async () => {
    try {
      setIsFilmsLoading(true)
      const response = await filmApi.getFilms(user)
      setFilms(response.data)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsFilmsLoading(false)
    }
  }

  const handleDeleteFilm = async (imdb) => {
    try {
      await filmApi.deleteFilm(user, imdb)
      await handleGetFilms()
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleAddFilm = async () => {
    const trimmedImdb = filmImdb.trim()
    const trimmedTitle = filmTitle.trim()
    const trimmedPoster = filmPoster.trim()

    if (!(trimmedImdb && trimmedTitle)) {
      return
    }

    const film = { imdb: trimmedImdb, title: trimmedTitle, poster: trimmedPoster }

    try {
      await filmApi.addFilm(user, film)
      clearFilmForm()
      await handleGetFilms()
    } catch (error) {
      handleLogError(error)
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

  const clearFilmForm = () => {
    setFilmImdb('')
    setFilmTitle('')
    setFilmPoster('')
  }

  if (!isAdmin) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      <AdminTab
        isUsersLoading={isUsersLoading}
        users={users}
        userUsernameSearch={userUsernameSearch}
        handleDeleteUser={handleDeleteUser}
        handleSearchUser={handleSearchUser}
        isFilmsLoading={isFilmsLoading}
        films={films}
        filmImdb={filmImdb}
        filmTitle={filmTitle}
        filmPoster={filmPoster}
        filmTextSearch={filmTextSearch}
        handleAddFilm={handleAddFilm}
        handleDeleteFilm={handleDeleteFilm}
        handleSearchFilm={handleSearchFilm}
        handleInputChange={handleInputChange}
      />
    </Container>
  )
}

export default AdminPage