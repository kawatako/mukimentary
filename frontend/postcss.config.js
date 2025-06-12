//frontend/postcss.config.js
// v4対応型
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},     // v4推奨形式（内部でtailwindcssとautoprefixerをラップ）
    autoprefixer: {},               // ベンダープレフィックスを自動追加
  },
};
