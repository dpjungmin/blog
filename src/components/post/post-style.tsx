import styled, { css } from "styled-components"
import { theme, media } from "@styles"

const { mapCategoryToColor } = theme

const StyledPost = styled.section<{ category: string }>`
  img {
    /* padding: 40px; */
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    background-color: #f6f9fc;
    display: block;
  }

  .anchor {
    display: none;
  }

  a {
    display: inline-flex;
    ${props => css`
      color: ${mapCategoryToColor(props.category)};
      &:hover {
        color: ${mapCategoryToColor(props.category, true)};
      }
    `}
    &::before {
      white-space: pre;
    }
  }

  hr {
    margin: 20px 6px;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 400;
  }

  h1,
  h2,
  h3 {
    font-family: Ubuntu, Helvetica, Arial, sans-serif;
    color: #02203c;
    line-height: 1.3;
    font-weight: 600;
  }

  h2 {
    margin: 30px 0 15px;
    font-size: 24px;
  }

  h3 {
    margin: 20px 0 15px;
    font-size: 20px;
  }

  p {
    margin: 15px 0;
  }

  ul,
  ol {
    margin: 0;
    padding-left: 30px;
    p {
      margin: 0;
    }
  }

  table {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 15px;
    margin-bottom: 15px;
    th {
      background-color: #f6f9fc;
      padding: 5px 10px;
    }
    td {
      padding: 5px 10px;
    }
  }

  /* Inline code block in paragraph */
  p,
  li {
    & > code {
      padding: 0.05em 0.3em 0.2em;
      border-radius: 5px;
      background-color: #edf2f7;
      color: #1a202c;
      line-height: 24px;
      font-weight: 600;
    }
  }

  blockquote {
    background-color: rgb(248, 249, 250);
    border-left-style: solid;
    border-left-width: 5px;
    ${props => css`
      border-left-color: ${mapCategoryToColor(props.category, true)};
    `}
    margin: 0;
    padding: 10px;
    border-radius: 4px;
    p {
      margin: 0;
    }
  }

  .gatsby-highlight {
    background-color: #f6f8fa;
    border-radius: 4px;
    overflow: auto;
    margin-bottom: 15px;
    padding: 1.25em;
    padding-top: 2em;
    padding-left: 1.5em;
    position: relative;
    ${media.tablet`
      font-size: 12px;
      padding-top: 3em;
      padding-left: 2em;
    `}
  }

  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left;
    min-width: 100%;
  }

  /* Code title */
  .gatsby-code-title {
    padding: 4px 20px;
    font-size: 14px;
    background-color: transparent;
  }

  /* Line highlighting */
  .gatsby-highlight-code-line {
    display: block;
    background-color: #d9f4e6;
    border-left: 4px solid #d9f4e6;
    padding-left: calc(1em + 2px);
    padding-right: 1em;
    margin-right: -1.3em;
    margin-left: -1.5em;
    & > * {
      background-color: #d9f4e6;
    }
    ${media.tablet`
      margin-left: -2em;
      border-left: 3px solid #d9f4e6;
    `}
  }

  /* Language badges */
  .gatsby-highlight pre[class*="language-"]::before {
    position: absolute;
    left: 20px;
    top: 0;
    padding: 3px 10px;
    background-color: #a0a1b0;
    border-radius: 4px;
    z-index: 1;
    color: #fff;
    font-size: 13px;
  }

  .gatsby-highlight pre[class="language-pseudo-code"]::before {
    content: "pseudo code";
    color: black;
    background-color: #ebdbd3;
  }

  .gatsby-highlight pre[class="language-cpp"]::before,
  .gatsby-highlight pre[class="language-c++"]::before {
    content: "c++";
    color: white;
    background-color: #005dd6;
  }
  .gatsby-highlight pre[class="language-go"]::before,
  .gatsby-highlight pre[class="language-Go"]::before {
    content: "Go";
    color: white;
    background-color: #626ee3;
  }
  .gatsby-highlight pre[class="language-jsx"]::before {
    content: "jsx";
    color: black;
    background-color: #90cdf9;
  }
  .gatsby-highlight pre[class="language-typescript"]::before,
  .gatsby-highlight pre[class="language-ts"]::before {
    content: "ts";
    color: white;
    background-color: #4778e2;
  }
  .gatsby-highlight pre[class="language-javascript"]::before,
  .gatsby-highlight pre[class="language-js"]::before {
    content: "js";
    color: black;
    background-color: #ffdf37;
  }
  .gatsby-highlight pre[class="language-graphql"]::before {
    content: "GraphQL";
    color: white;
    background-color: #bc027f;
  }
  .gatsby-highlight pre[class="language-css"]::before {
    content: "css";
    color: white;
    background-color: #f67300;
  }

  .gatsby-highlight pre[class="language-shell"]::before,
  .gatsby-highlight pre[class="language-bash"]::before {
    content: "bash";
    color: black;
    background-color: #ccd6f6;
  }

  .gatsby-highlight pre[class="language-none"]::before,
  .gatsby-highlight pre[class="language-text"]::before {
    content: "text";
    color: black;
    background-color: #dad1cc;
  }
  .gatsby-highlight pre[class="language-c"]::before {
    content: "c";
  }
  .gatsby-highlight pre[class="language-html"]::before {
    content: "html";
  }
  .gatsby-highlight pre[class="language-mdx"]::before {
    content: "mdx";
  }
  .gatsby-highlight pre[class="language-sh"]::before {
    content: "sh";
  }
  .gatsby-highlight pre[class="language-yaml"]::before {
    content: "yaml";
  }
  .gatsby-highlight pre[class="language-markdown"]::before {
    content: "md";
  }
  .gatsby-highlight pre[class="language-json"]::before,
  .gatsby-highlight pre[class="language-json5"]::before {
    content: "json";
  }
  .gatsby-highlight pre[class="language-diff"]::before {
    content: "diff";
  }
  .gatsby-highlight pre[class="language-flow"]::before {
    content: "flow";
  }
`

export { StyledPost }
