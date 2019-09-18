import { messages } from './messages';

describe('messages', () => {

  it('should return state by default or if it is passed an action that does not match any type in its switch statement', () => {

    const mockDefaultState = [];

    expect(messages(mockDefaultState, {type: 'FAKE_ACTION', data: 'Blah Blah!'})).toEqual(mockDefaultState);

  });

  it('should return current state with an object added into it when it receives action of type ADD_MESSAGE', () => {

    const mockState = [{message: 'Blah blah blah', isUser: false}]

    const expected = [...mockState, {message: 'What', isUser: true}];

    expect(messages(mockState, {type: 'ADD_MESSAGE', message: 'What', isUser: true})).toEqual(expected);
  });

  it('should return an empty array when it receives an action with type CLEAR_MESSAGES',() => {

    const mockState = [{ message: 'Blah blah blah', isUser: false }];

    const expected = [];

    expect(messages(mockState, {type: 'CLEAR_MESSAGES'})).toEqual(expected);
  });

});
