// 注册 Babel 转换器以支持 JSX
require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  extensions: ['.js', '.jsx'],
});

// 启动服务器
require('./index.cjs');