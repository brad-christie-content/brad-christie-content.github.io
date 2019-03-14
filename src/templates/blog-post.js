import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PageTitle from "../components/page-title"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <PageTitle>{post.frontmatter.title}</PageTitle>
      <small>Est. {post.timeToRead} min read.</small>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug } }
    ) {
      html
      timeToRead
      frontmatter {
        title
      }
    }
  }
`