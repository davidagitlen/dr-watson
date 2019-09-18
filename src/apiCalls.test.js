import { startConversation, postMessage, endConversation } from './apiCalls';

describe('startConversation', () => {
  const mockFeeling = 'stressed';
  const mockResponse = {
    message: "Hi there, my name is Dr. Watson.  I understand tha…tressed.  What has been most stressful this week?"
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should call fetch with the correct url', () => {
    const url = 'https://drwatson-api.herokuapp.com/api/v1/start_session';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ feeling: mockFeeling })
    };
    startConversation(mockFeeling);

    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should return a new response message (HAPPY)', () => {
    expect(startConversation(mockFeeling)).resolves.toEqual(mockResponse);
  });

  it('should return an error (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    expect(startConversation(mockFeeling)).rejects.toEqual(Error('Dr Watson is currently down.  Please try again later.'))
  });

  it('should return an error if promise rejects (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'))
    });

    expect(startConversation(mockFeeling)).rejects.toEqual(Error('fetch failed.'))
  });
});

describe('endConversation', () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true
      });
    });
  });

  it('should call fetch with the correct url', () => {
    const url = 'https://drwatson-api.herokuapp.com/api/v1/end_session';
    endConversation();

    expect(window.fetch).toHaveBeenCalledWith(url);
  });

  it('should resolve with no errors', () => {
    expect(endConversation()).resolves.toEqual(undefined)
  });

  it('should return an error (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    expect(endConversation()).rejects.toEqual(Error('There was a problem ending the session.  Please close the application.'));
  });

  it('should return an error if promise rejects (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'));
    });

    expect(endConversation()).rejects.toEqual(Error('fetch failed.'));
  });
});

describe('postMessage', () => {

  it('should call fetch with the correct url and options object for POST', () => {
    const url = 'https://drwatson-api.herokuapp.com/api/message';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      });
    });

    postMessage();

    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should return a message from Dr Watson if it resolves (happy)', () => {

    const message = {message: "Thanks for writing me!"}
    
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(message)
      });
    }); 

    expect(postMessage()).resolves.toEqual(message)
  });

  it('should throw an error if the fetch is not successful (sad)', () => {

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('That did not work'));
    });

    expect(postMessage()).rejects.toEqual(Error('That did not work'));
  });

  it('should throw an error if the reponse is not ok (sad)', () => {

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    expect(postMessage()).rejects.toEqual(Error('Sorry, Dr. Watson could not read your message, please try again!'));

  });


})