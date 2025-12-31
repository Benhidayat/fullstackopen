const BASEURL = 'http://localhost:3001/anecdotes';

export const getAllAnecdotes = async () => {
    try {
        const res = await fetch(BASEURL);
        if(!res.ok) throw new Error('Failed to fetch anecdotes');
        return await res.json();

    } catch (error) {
        throw new Error('anecdote service not available due to problems in server');
    }
};

export const createAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 })
    };

    try {
        const res = await fetch(BASEURL, options);
        if (!res.ok) throw new Error('Failed to create new anecdote');
        return res.json();
    } catch (error) {
        throw new Error('anecdote service not available due to problems in server');
    }
};