/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { unpublished: { ne: true } } }
      ) {
        edges {
          node {
            fields {
              permalink
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const { data } = result
    console.log('createPages', JSON.stringify(data, undefined, '  '));
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: `${__dirname}/src/templates/blog-post.js`,
        context: {
          slug: node.fields.slug
        },
      })
      if (node.fields.permalink) {
        createPage({
          path: node.fields.permalink,
          component: `${__dirname}/src/templates/blog-post.js`,
          context: {
            slug: node.fields.slug
          },
        })
      }
    });
  });
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  switch (node.internal.type) {
    case "MarkdownRemark":
      console.log('markdownRemark', JSON.stringify(node, undefined, '  '));

      const fileNode = getNode(node.parent);
      console.log('fileNode', JSON.stringify(fileNode, undefined, '  '));

      let slug = createFilePath({ node, getNode });
      slug = `/${fileNode.sourceInstanceName}${slug}`
      console.log('slug', slug);
      createNodeField({ node, name: "slug", value: slug });

      if (node.frontmatter.permalink) {
        const permalink = node.frontmatter.permalink
        console.log('permalink', permalink);
        createNodeField({ node, name: "permalink", value: permalink })
      }
      break;
    default:
      console.log("Uncaught", node.internal.type);
  }
}