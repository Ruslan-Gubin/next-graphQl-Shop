import { gql } from "@apollo/client";

const ALL_MOVIES = gql`
  query {
    movies: movies {
      name
      genre
      id
    }
  }
`;

const ONE_MOVIE = gql`
  query ($id: ID) {
    movie(id: $id) {
      id
      name
      genre
    }
  }
`;

const ADD_MOVIES = gql`
  mutation ($name: String!, $genre: String!, $id: ID) {
    newMovies: addMovie(name: $name, genre: $genre, directorId: $id) {
      id
      name
      genre
    }
  }
`;

const UPDATE_MOVIES = gql`
  mutation ($name: String!, $genre: String!, $id: ID, $direcrotId: ID) {
    newMovies: updateMovie(
      id: $id
      name: $name
      genre: $genre
      directorId: $direcrotId
    ) {
      id
      name
      genre
    }
  }
`;

const DELETE_MOVIES = gql`
  mutation ($id: ID) {
    removeMovie: removeMovie(id: $id) {
      id
    }
  }
`;

export { ALL_MOVIES, ADD_MOVIES, UPDATE_MOVIES, DELETE_MOVIES, ONE_MOVIE };
