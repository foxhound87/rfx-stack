import _ from 'lodash';

const config = global.CONFIG;

class Request {

  /**
   * Handle complicated isomorphic "request"
   * @param method
   * @returns {Function}
   */
  handle(method) {
    return (path, params = {}, options = {}) => {
      const requestParams = (!_.isEmpty(params) && method === 'get')
      ? (['?', this.querystring(params)].join('')) : '';
      const requestURL = this.url(path) + requestParams;
      return fetch(requestURL, options).then(this.handleResponse);
    };
  }

  /**
   * Prepend host of API server
   * @param path
   * @returns {String}
   * @private
   */
  url(path) {
    let base;
    base = ['http:/', config.api.host].join('/');
    if (_.startsWith(path, 'http')) return path;
    base = [base, config.api.port].join(':');
    return [base, _.trimStart(path, '/')].join('/');
  }

  /**
   * Encode querystring
   * @param obj {Object}
   * @returns {String}
   * @private
   */
  querystring(obj) {
    const enc = encodeURIComponent;
    return _.map(obj, (v, k) => [enc(k), '=', enc(v)].join('')).join('&');
  }


  /**
   * Parse response
   * @param resp
   * @returns {Promise.<T>|Promise<U>|*}
   * @private
   */
  handleResponse(resp) {
    const isJSON = resp.headers && resp.headers.get('Content-Type').includes('json');
    const response = resp[isJSON ? 'json' : 'text']();

    return resp.ok ? response : response.then(err => {
      throw err;
    });
  }
}

const request = new Request;

export default {
  get: request.handle('get'),
  post: request.handle('post'),
};
