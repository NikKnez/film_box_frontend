import React from 'react'
import { Grid, Header, Form, Icon, Image, Input, Item, Segment } from 'semantic-ui-react'

function FilmList({ isFilmsLoading, filmTextSearch, films, handleInputChange, handleSearchFilm }) {
  let filmList
  if (films.length === 0) {
    filmList = <Item key='no-film'>No Film</Item>
  } else {
    filmList = films.map(film => {
      return (
        <Item key={film.imdb}>
          <Image src={film.poster} size='small' bordered rounded />
          <Item.Content>
            <Item.Header>{film.title}</Item.Header>
            <Item.Meta>{film.imdb}</Item.Meta>
            <Item.Description>
              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Item.Description>
          </Item.Content>
        </Item>
      )
    })
  }

  return (
    <Segment loading={isFilmsLoading} color='purple'>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='3'>
            <Header as='h2'>
              <Icon name='video camera' />
              <Header.Content>Films</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Form onSubmit={handleSearchFilm}>
              <Input
                action={{ icon: 'search' }}
                name='filmTextSearch'
                placeholder='Search by IMDB or Title'
                value={filmTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Item.Group divided unstackable relaxed link>
        {filmList}
      </Item.Group>
    </Segment>
  )
}

export default FilmList