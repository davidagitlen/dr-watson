import { errorMsg } from './errorMsg';

describe('errorMsg', () => {

  it('should return state by default or if it is passed an action that does not match any type in its switch statement', () => {

    const mockDefaultState = '';

    expect(errorMsg(mockDefaultState, { type: 'FAKE_ACTION', message: 'Blah Blah!' })).toEqual(mockDefaultState);
  });

  it('should return a string when it receives an action with type HAS_ERRORED', () => {

    const mockDefaultState = '';

    expect(errorMsg(mockDefaultState, {type: 'HAS_ERRORED', errorMsg: 'Sumfing ain\'t right'})).toEqual('Sumfing ain\'t right')
  });


})