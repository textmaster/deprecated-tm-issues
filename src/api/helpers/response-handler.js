const customThrow = (status, message) => {
  const err = new Error(message);
  err.statusCode = status;
  throw err;
};

export default response => response
  .json()
  .catch(() => ({}))
  .then(jsonRes => (Math.floor(response.status / 100) === 2 ?
    jsonRes :
    customThrow(response.status, `Unexpected error: ${JSON.stringify(jsonRes)}`)
  ));
