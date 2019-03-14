import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import PageTitle from "../components/page-title"
import SEO from "../components/seo"

import {
  Button,
  Card,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from "reactstrap"

export const frontmatter = {
  title: "Blog",
  path: "/blog",
}

const BlogPage = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <SEO title="Blog" keywords={[`blog`]} />
      <PageTitle>Blog</PageTitle>
      <p>{data.allMarkdownRemark.totalCount} posts</p>
      <Row>
        <Col sm="6">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Card body>
            <CardTitle>{node.frontmatter.title}</CardTitle>
            <CardSubtitle>Jan 1st, 2019</CardSubtitle>
            <CardText>{node.frontmatter.excerpt}</CardText>
            <Button tag={Link} to={node.fields.slug}>Read more...</Button>
          </Card>
        ))}
        </Col>
      </Row>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = (graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { unpublished: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`)