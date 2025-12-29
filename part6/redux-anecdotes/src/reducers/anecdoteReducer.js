import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes';

// const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     case 'VOTE':
//       const id = action.payload.id;
//       const anecdoteToVote = state.find(n => n.id === id);
//       const votedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1
//       }
//       return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote);
//     case 'NEW_ANECDOTE':
//       return [...state, action.payload]
//     default:
//       return state;
//   }

// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find(a => a.id === id);
      console.log(anecdoteToVote)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote :votedAnecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  }
});

const { setAnecdotes } = anecdoteSlice.actions;
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;