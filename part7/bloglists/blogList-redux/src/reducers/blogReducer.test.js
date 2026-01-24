import deepFreeze from 'deep-freeze';
import { describe, expect, test } from 'vitest';
import blogReducer from './blogReducer';

describe('blogReducer', () => {
    test('return new state with action NEW_BLOG', () => {
        const state = [];
        const action = {
            type: 'NEW_BLOG',
            payload: {
                title: 'redux state',
                author: 'budi',
                url: 'example.com'
            }
        }

        deepFreeze(state);
        const newState = blogReducer(state, action);

        expect(newState).toHaveLength(1);
        expect(newState).toContainEqual(action.payload);
    })
});