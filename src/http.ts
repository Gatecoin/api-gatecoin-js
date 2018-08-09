import {sign} from './auth';
import {stringify} from 'query-string';

const request = async <T>(
  fetchImpl: any,
  method: string,
  url: string,
  auth?: {publicKey: string, privateKey: string},
  query?: Object,
  body?: Object
): Promise<T> => {

  const fullUrl = url + ((query) ? '?' + stringify(query) : '');

  const options: any = {
    method,
    headers: {},
  };

  if (auth) {
    const signature = sign(fullUrl, method, auth.publicKey, auth.privateKey, String(Date.now() / 1000));

    options.headers = {
      'api_public_key': signature.publicKey,
      'api_request_signature': signature.signature,
      'api_request_date': signature.now,
    };
  }

  if (body) {
    options.body = JSON.stringify(body);
    options.headers['content-type'] = 'application/json';
  }

  const response = await fetchImpl(fullUrl, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export {
  request,
}
