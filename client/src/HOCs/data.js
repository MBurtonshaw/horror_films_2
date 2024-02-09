import config from '../config';

export default class Data {
  // api method is used to make a call to the provided path
  api(path, method = 'GET', body = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options);
  }

  // function to GET and return the message posted at '/'
  async getMessage() {
    const response = await this.api('/', 'GET', null);

    if (response.status === 200) {
      return response.json([]).then(data => data);
    }
    else if (response.status === 400 || response.status === 401 || response.status === 500) {
      return response.json().then(data => data);
    }
  }

}