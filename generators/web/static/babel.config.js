module.exports = {
  presets: [
    [
      '@babel/env',
      {
        'targets': {
          'ie': 11,
        },
        'useBuiltIns': 'entry',
        'modules': 'commonjs',
      }
    ],
    '@babel/typescript',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
  ],
}
