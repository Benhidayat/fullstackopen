import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAllAnecdotes, updateAnecdote } from './service/anecdote';

const App = () => {
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

  console.log(anecdotes)

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
