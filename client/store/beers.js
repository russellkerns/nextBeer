import axios from 'axios'

const SET_BEERS = 'SET_BEERS'

const setBeers = beers => ({
  type: SET_BEERS,
  beers
})

export const getNextBeerThunk = query => {
  return async dispatch => {
    const {data} = await axios.get('api/beers', {
      params: {name: query.name, state: query.state}
    })
    dispatch(setBeers(data))
  }
}

const beerReducer = (state = [], action) => {
  switch (action.type) {
    case SET_BEERS:
      return action.beers
    default:
      return state
  }
}

export default beerReducer
