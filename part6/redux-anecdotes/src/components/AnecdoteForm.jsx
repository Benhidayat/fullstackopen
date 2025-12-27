import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispacth = useDispatch();

    const addAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispacth(createAnecdote(content));
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
