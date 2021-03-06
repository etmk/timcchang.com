import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

type SEOProps = {
  title?: string
  description?: string
  lang?: string
  keywords?: Array<string>
  meta?: Array<any>
}

export default function SEO({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
}: SEOProps) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaTitle = title || data.site.siteMetadata.title
        const metaDescription =
          description || data.site.siteMetadata.description

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={metaTitle}
            titleTemplate={`%s`}
            meta={[
              {
                name: 'google-site-verification',
                content: 'joDHdTdb56PSG3inAa0NTavlVPlKpbJSIZM0OfTfImI',
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
