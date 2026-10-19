import NodeCache from 'node-cache';


const cache = new NodeCache({ stdTTL: 300, checkPeriod: 320 });

/**
 * Cache initialization with default Time-To-Live (TTL) of 5 minutes (300 seconds)
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * @returns 
 */
const cacheMiddleware = (request, response, next) => {
    if (request.method !== 'GET') return next();

    const urlToCacheKey = request.originalUrl;
    const cachedResponse = cache.get(urlToCacheKey);

    if (cachedResponse) {
        return response.send(cachedResponse);
    }

    const intercept = response.send;

    response.send = function (body) {
        cache.set(urlToCacheKey, body);
        intercept.call(this, body);
    };

    next();
}

export default cacheMiddleware;