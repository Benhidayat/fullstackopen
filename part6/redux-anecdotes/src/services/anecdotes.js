const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await fetch(baseUrl);

    if (!response.ok) throw new Error('Failed to fetch the notes');

    return await response.json();
};

const createNew = async (content) => {
    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 })
    };

    const res = await fetch(baseUrl, option);
    if (!res.ok) throw new Error('Failed to create anecdote');

    return await res.json();
};

const updateAnecdote = async (id, anecdote) => {
    const option = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    };

    const res = await fetch(`${baseUrl}/${id}`, option);

    if (!res.ok) throw new Error('Failed to update');

    return await res.json();
};

export default {
    getAll,
    createNew,
    updateAnecdote
}