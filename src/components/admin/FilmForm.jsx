import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'

function FilmForm({ filmImdb, filmTitle, filmPoster, handleInputChange, handleAddFilm }) {
  const createBtnDisabled = filmImdb.trim() === '' || filmTitle.trim() === ''
  return (
    <Form onSubmit={handleAddFilm}>
      <Form.Group>
        <Form.Input
          name='filmImdb'
          placeholder='IMDB *'
          value={filmImdb}
          onChange={handleInputChange}
        />
        <Form.Input
          name='filmTitle'
          placeholder='Title *'
          value={filmTitle}
          onChange={handleInputChange}
        />
        <Form.Input
          name='filmPoster'
          placeholder='Poster'
          value={filmPoster}
          onChange={handleInputChange}
        />
        <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Create<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default FilmForm
