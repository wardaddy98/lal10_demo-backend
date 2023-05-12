export const handleResponse = (res, data) => {
  let response = {};

  switch (data.type) {
    case 'SUCCESS':
      response.status = 200;
      break;

    case 'BAD_REQUEST':
      response.status = 400;
      break;

    case 'UNAUTHORIZED':
      response.status = 401;
      break;

    case 'FORBIDDEN':
      response.status = 403;
      break;

    case 'NOT_FOUND':
      response.status = 404;
      break;

    case 'ERROR':
      response.status = 500;
      response.message = 'Internal Server Error';
      break;
  }

  response = { ...response, ...data };
  delete response.type;

  return res.status(response.status).json(response || {});
};
