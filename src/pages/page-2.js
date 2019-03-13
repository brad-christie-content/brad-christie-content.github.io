import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import PageTitle from "../components/page-title"
import SEO from "../components/seo"

export const frontmatter = {
  title: "Page two",
  path: "/page-2",
}

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <PageTitle>Hi from the second page</PageTitle>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
