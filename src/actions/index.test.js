import { createUser, removeUser, hasErrored, addMessage, clearMessages } from './index';

describe('createUser', () => {

  it('should return an object with type CREATE_USER and user property', () => {

    const mockUser = {
      name: 'Dorvord'
    };

    const expected = {
      type: 'CREATE_USER',
      user: {name: 'Dorvord'}
    };

    expect(createUser(mockUser)).toEqual(expected);
  });

  describe('removeUser', () =>{

    it('should return an object with type REMOVE_USER', () => {

      const expected = {
        type: 'REMOVE_USER'
      };

      expect(removeUser()).toEqual(expected);
    });
  });

  describe('hasErrored', () => {

    it('should return an object with type HAS_ERRORED and errorMsg', () => {
      
      const errorMsg = 'Sorry, that didn\'t work!'

      const expected = {
        type: 'HAS_ERRORED',
        errorMsg : 'Sorry, that didn\'t work!'
      };

      expect(hasErrored(errorMsg)).toEqual(expected);
    });
  });

  describe('addMessage', () => {

    it('should return an object with type ADD_MESSAGE, message and isUser properties', () => {
      const message = 'Blah blah blah';
      const isUser = false;

      const expected = {
        type: 'ADD_MESSAGE',
        message: 'Blah blah blah',
        isUser: false
      };

      expect(addMessage(message, isUser)).toEqual(expected);

    });
  });

  describe('clearMessages', () => {

    it('should return an object with type CLEAR_MESSAGES', () => {

      const expected = {
        type: 'CLEAR_MESSAGES'
      };

      expect(clearMessages()).toEqual(expected);
    })
  })

});