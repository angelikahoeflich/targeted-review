import axios from 'axios'
//initialstate
const initialState = {
  pokemon: {}
}
//ACTION TYPES

const GET_POKEMON = 'GET_POKEMON';


//ACTION BUILDERS - an action is an object with a type and a payload
export function getPokemon(){
  const number = Math.ceil(Math.random() * 150)
  const {data} = axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`)
  console.log(data)
  return{
    type: GET_POKEMON,
    payload: res.data
  }

}

//REDUCER FUNCTION

export default function reducer(state = initialState, action){
  const {type, payload} = action
  switch(type){
    case GET_POKEMON + '_PENDING':
      return {...state}
    case GET_POKEMON + '_REJECTED':
      return {...state}
    case GET_POKEMON + '_FULFILLED':
      return {...state, pokemon: payload}
  }
}

