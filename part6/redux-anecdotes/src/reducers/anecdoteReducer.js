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
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote :votedAnecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdote(state, action) {
      const anecdote = action.payload;
      const updatedAnecdotes = state.map(n => n.id === anecdote.id ? anecdote : n);
      return updatedAnecdotes;
    }
  }
});

const { createAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(anecdote));
  };
};

export const increaseVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, anecdote);
    dispatch(updateAnecdote(updatedAnecdote))
  };
};


export const { voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;