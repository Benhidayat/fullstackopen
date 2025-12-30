import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notifReducer";

const AnecdoteForm = () => {
    const dispacth = useDispatch();

    const addAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispacth(appendAnecdote(content));
        dispacth(setNotification(`new anecdote ${content}`, 5));
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
