import decodeJWT from 'jwt-decode';

const payloadIsValid = payload =>
  payload && payload.exp * 1000 > new Date().getTime();

export const verifyJWT = (token) => {
  if (typeof token !== 'string') {
    return Promise.reject(new Error('Token provided to verifyJWT is missing or not a string'));
  }

  try {
    const payload = decodeJWT(token);

    if (payloadIsValid(payload)) {
      // return both payload and token for better promise handling
      return Promise.resolve({ payload, token });
    }

    return Promise.reject(new Error('Invalid token: expired'));
  } catch (error) {
    return Promise.reject(new Error('Cannot decode malformed token.'));
  }
};
