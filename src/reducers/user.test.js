import { user } from './user';

describe('user', () => {

  it('should return state by default or if it is passed an action that does not match any type in its switch statement', () => {

    const mockDefaultState = null;

    expect(user(mockDefaultState, { type: 'FAKE_ACTION', message: 'Blah Blah!' })).toEqual(mockDefaultState);
  });

  it('should return an object with user information when it receives an action with type CREATE_USER', () => {

    const mockDefaultState = null;

    const expected = {
      name: 'Dorv',
      place: 'Computerland'
    };

    expect(user(mockDefaultState, {type: 'CREATE_USER', user : expected})).toEqual(expected);

  });

  it('should return null if it receives an action with type REMOVE_USER',() => {

    const mockDefaultState = {name: 'Dorv', place: 'Computerland'};

    expect(user(mockDefaultState, {type: 'REMOVE_USER'})).toEqual(null);


  });


});