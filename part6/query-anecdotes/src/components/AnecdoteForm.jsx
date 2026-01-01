import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../service/anecdote";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const AnecdoteForm = () => {
  const { messageDispatch } = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      messageDispatch({ type: 'ADD', payload: error.message })
    }
  });
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote');
    newMutation.mutate(content);
    messageDispatch({ type: 'ADD', payload: `${content} is created` })
    setTimeout(() => {
      messageDispatch({ type: 'REMOVE' })
    }, 5000);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
