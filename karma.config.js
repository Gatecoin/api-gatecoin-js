require('./e2e/env');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.ts',
      'e2e/web/**/*.ts',
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript", 'env']
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    envPreprocessor: [
      'TEST_VAR',
    ]
  })
};
