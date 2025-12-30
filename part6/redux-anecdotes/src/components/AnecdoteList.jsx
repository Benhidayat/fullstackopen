import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notifReducer";

const Anecdote = ({ anecdote, vote }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={vote}>vote</button>
            </div>
        </div>
    )
};

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter}) => {
        return anecdotes?.filter(n => n.content.toLowerCase().includes(filter.toLowerCase()));
    });
    
    const dispatch = useDispatch();

    const handleVote = (anecdote) => {
        const addedVote = anecdote.votes + 1;
        const updatedAnecdote = {
            ...anecdote,
            votes: addedVote
        }
        
        dispatch(increaseVote(updatedAnecdote));
        dispatch(setNotification(`You vote for ${anecdote.content}`, 5));
    };

    return (
        <div>
            {anecdotes?.sort((a, b) => a.votes < b.votes ? 1 : -1).map(n => (
                <Anecdote key={n.id} anecdote={n} vote={() => handleVote(n)} />
            ))}
        </div>
    )
};

export default AnecdoteList;
