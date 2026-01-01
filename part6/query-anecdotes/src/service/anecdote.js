const BASEURL = 'http://localhost:3001/anecdotes';

export const getAllAnecdotes = async () => {

    const res = await fetch(BASEURL);
    if(!res.ok) throw new Error('Failed to fetch anecdotes');
    return await res.json();
};

export const createAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 })
    };


    const res = await fetch(BASEURL, options);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
    }
    return res.json();    
}

export const updateAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    };

    const res = await fetch(`${BASEURL}/${anecdote.id}`, options);
    if (!res.ok) throw new Error('Failed to update anecdote');
    return res.json();
};