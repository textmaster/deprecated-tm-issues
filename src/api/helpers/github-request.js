import responseHandler from './response-handler';

const baseUrl = 'https://api.github.com/';

export default (token, relativeUrl, method = 'GET', data, extraHeaders) => fetch(
  baseUrl + relativeUrl,
  {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `token ${token}` : undefined,
      ...extraHeaders,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
  .then(responseHandler);
