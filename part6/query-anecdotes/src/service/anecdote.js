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