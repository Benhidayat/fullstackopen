import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

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
    const anecdotes = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => a.votes < b.votes ? 1 : -1).map(n => (
                <Anecdote key={n.id} anecdote={n} vote={() => dispatch(voteAnecdote(n.id))} />
            ))}
        </div>
    )
};

export default AnecdoteList;
