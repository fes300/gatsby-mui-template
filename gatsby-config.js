module.exports = {
  siteMetadata: {
    title: "__template__website__name",
    description: "__template__website__name website",
    author: `@fes300`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Lato\:300,400,400i,700`],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // if you want to import an SVG and using it as a component (i.e. using SvgIcon)
        },
      },
    },
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
    `gatsby-plugin-next-seo`,
    {
      resolve: `gatsby-plugin-ts`,
      options: {
        codegen: false,
        failOnError: true,
      },
    },
    `gatsby-theme-material-ui`,
  ],
}
