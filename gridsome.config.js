// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
      {
        use: '@gridsome/source-strapi',
        options: {
            //apiURL: 'http://localhost:1337', // 接口地址
            apiURL: process.env.GRIDSOME_API_URL,
            queryLimit: 1000, // Defaults to 100
            contentTypes: ['post'], // 查询的数据类型 StrapiPost
            //singleTypes: ['general'], // 单个节点
            // Possibility to login with a Strapi user,
            // when content types are not publicly available (optional).
            // loginData: { // 登录信息
            //   identifier: '',
            //   password: ''
            // }
        }
      }
  ]
}
