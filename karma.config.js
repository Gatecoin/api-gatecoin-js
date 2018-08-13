require('./env');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.ts',
      'test-e2e/web/**/*.ts',
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript", 'env']
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome_without_security'],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    envPreprocessor: [
      'BASE_URL',
      'PUBLIC_KEY',
      'PRIVATE_KEY',
    ],
    karmaTypescriptConfig: {
      compilerOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: "commonjs",
        sourceMap: true,
        target: "ES5",
        lib: ["es2015", "es2016", "es2017", "dom"],
        allowSyntheticDefaultImports: true,
      },
      exclude: ["tools"]
    },
    customLaunchers: {
      Chrome_without_security: {
        base: 'ChromeHeadless',
        flags: ['--disable-web-security']
      }
    }
  })
};
