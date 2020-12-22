module.exports = {
  siteMetadata: {
    title: "__template__website__name",
    description: "__template__website__name website",
    author: `@fes300`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Global Custodian Solution`,
        short_name: `GCS`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: "static/favicon-32x32.png",
      },
    },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        test: /\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ["develop"],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    `gatsby-plugin-next-seo`,
    `gatsby-plugin-typescript`,
    `gatsby-theme-material-ui`,
  ],
}
