import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import PageTitle from "../components/page-title"

import { Button } from "reactstrap"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  console.log('BlogPost', JSON.stringify(post, undefined, 2));
  return (
    <Layout>
      <PageTitle>{post.frontmatter.title}</PageTitle>
      <small>
        Est. {post.timeToRead} min read.
        {post.fields.permalink && (
          <>
            {" "}
            <Link to={post.fields.permalink}>Permalink</Link>
          </>
        )}
      </small>
      <div className="my-4" dangerouslySetInnerHTML={{ __html: post.html }} />
      {post.frontmatter.tags && post.frontmatter.tags.map(tag => (<Button size="sm">{tag}</Button>) )}
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
        tags
      }
      fields {
        permalink
      }
    }
  }
`