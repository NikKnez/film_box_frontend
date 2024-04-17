import React, { Fragment } from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import FilmForm from './FilmForm'

function FilmTable({ films, filmImdb, filmTitle, filmPoster, filmTextSearch, handleInputChange, handleAddFilm, handleDeleteFilm, handleSearchFilm }) {
  let filmList
  if (films.length === 0) {
    filmList = (
      <Table.Row key='no-film'>
        <Table.Cell collapsing textAlign='center' colSpan='5'>No film</Table.Cell>
      </Table.Row>
    )
  } else {
    filmList = films.map(film => {
      return (
        <Table.Row key={film.imdb}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteFilm(film.imdb)}
            />
          </Table.Cell>
          <Table.Cell>
            { film.poster ?
            <Image src={film.poster} size='tiny' bordered rounded /> :
            <Image src='/images/film-poster.jpg' size='tiny' bordered rounded />
            }
          </Table.Cell>
          <Table.Cell>{film.imdb}</Table.Cell>
          <Table.Cell>{film.title}</Table.Cell>
          <Table.Cell>{film.createdAt}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <Fragment>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            <Form onSubmit={handleSearchFilm}>
              <Input
                action={{ icon: 'search' }}
                name='filmTextSearch'
                placeholder='Search by Imdb or Title'
                value={filmTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <FilmForm
              filmImdb={filmImdb}
              filmTitle={filmTitle}
              filmPoster={filmPoster}
              handleInputChange={handleInputChange}
              handleAddFilm={handleAddFilm}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={4}>Poster</Table.HeaderCell>
            <Table.HeaderCell width={3}>IMDB</Table.HeaderCell>
            <Table.HeaderCell width={4}>Title</Table.HeaderCell>
            <Table.HeaderCell width={4}>CreatedAt</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filmList}
        </Table.Body>
      </Table>
    </Fragment>
  )
}

export default FilmTable