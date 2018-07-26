let fetch = (typeof window !== 'undefined' && window.fetch) ? window.fetch : require('node-fetch');

export default fetch;
