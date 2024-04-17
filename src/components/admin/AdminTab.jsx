import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import FilmTable from './FilmTable'

function AdminTab(props) {
  const { handleInputChange } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
  const { isFilmsLoading, films, filmImdb, filmTitle, filmPoster, filmTextSearch, handleAddFilm, handleDeleteFilm, handleSearchFilm } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Users' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'films', icon: 'video camera', content: 'Films' },
      render: () => (
        <Tab.Pane loading={isFilmsLoading}>
          <FilmTable
            films={films}
            filmImdb={filmImdb}
            filmTitle={filmTitle}
            filmPoster={filmPoster}
            filmTextSearch={filmTextSearch}
            handleInputChange={handleInputChange}
            handleAddFilm={handleAddFilm}
            handleDeleteFilm={handleDeleteFilm}
            handleSearchFilm={handleSearchFilm}
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab