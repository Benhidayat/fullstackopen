import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAllAnecdotes, updateAnecdote } from './service/anecdote';
import { useContext } from 'react';
import NotificationContext from './context/NotificationContext';

const App = () => {
  const { messageDispatch } = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  });

  const handleVote = (anecdote) => {
    const votes = anecdote.votes + 1;
    const updatedAnecdote = {
      ...anecdote,
      votes
    }
    updateMutation.mutate(updatedAnecdote);
    messageDispatch({ type: 'ADD', payload: `anecdote '${anecdote.content}' voted`});
    setTimeout(() => {
      messageDispatch({ type: 'REMOVE' })
    }, 5000);
  }

  // initial fethcing
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  });

  if (result.isLoading) {
    return (
      <div>Loading data...</div>
    )
  }

  if (result.isError) {
    return (
      <div>{result.error.message}</div>
    )
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
