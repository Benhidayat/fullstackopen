import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
    const dispacth = useDispatch();

    const addAnecdote = async (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        const anecdote = await anecdoteService.createNew(content);
        dispacth(createAnecdote(anecdote));
    };

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addAnecdote}>
                <input type="text" name="anecdote" />
                <button type="submit">add</button>
            </form>
        </div>
    )
};

export default AnecdoteForm;
