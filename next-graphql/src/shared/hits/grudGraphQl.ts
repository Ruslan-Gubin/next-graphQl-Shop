/** Удаление сущности*/
//  const [remove, {}] = useMutation(DELETE_MOVIES, {
//      update(cache, {data: { removeMovie }}) {
//          cache.modify({
//              fields: {
//                  movies(currentMovies = []) {
//                      return currentMovies.filter((movie: IPost) => movie.__ref !== `Movie:${removeMovie.id}`)
//                    }
//                  }
//                })
//              }
//            })
/**function remove */
// removeMovie({
//   variables: {
//     id: id
//   }
// })


/**Update сущности*/
//  const [updateMovie, {}] = useMutation(UPDATE_MOVIES);
/**function update */
// updateMovie({
//   variables: {
//     name: value?.name,
//     genre: value?.genre,
//     direcrotId: Date.now(),
//     id,
//   },
// });
/**Добавление сущности*/
//  const [ addMovie, { error } ] = useMutation(ADD_MOVIES, {
//   update(cache, { data: { newMovies } }) {
//     const { movies } = cache.readQuery({ query: ALL_MOVIES });
//     cache.writeQuery({
//       query: ALL_MOVIES,
//       data: {
//         movies: [newMovies, ...movies]
//       }
//     })
//   },
// })

/**функция добавление сущности*/
// const variables = {
//   name,
//   genre,
//   id: Date.now()
// }

// addMovie({variables})


export {};
