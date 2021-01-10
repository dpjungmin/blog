import React, { useState, useCallback } from "react"
import { Index, SerialisedIndexData } from "elasticlunr"
import { Link } from "gatsby"
import { media, mixin, theme } from "@styles"
import styled, { css } from "styled-components"
import { Icon } from "@components"

const { mapCategoryToColor } = theme

const StyledContainer = styled.div<{ hasResults: boolean }>`
  position: relative;
  transform: translateY(8px);
  svg {
    position: absolute;
    top: 0;
    left: 10px;
    height: 20px;
    width: 20px;
    transform: translateY(13px);
    color: #c1c7cd;
  }
  &:focus-within {
    input {
      width: 400px;
      ${media.bigDesktop`width: 100%;`}
    }
    ${props =>
      props.hasResults &&
      css`
        .search-results {
          display: block;
        }
      `}
  }
`

const StyledInput = styled.input<{ focus: boolean }>`
  display: block;
  line-height: 18px;
  font-size: 15px !important;
  font-style: normal;
  border: none;
  border: 1px solid #e6e8eb;
  outline: none;
  width: 300px;
  border-radius: 6px;
  padding: 13px 16px 13px 38px;
  color: #48434f;
  background-color: white;
  transition: all 0.2s linear 0s;
  ${media.bigDesktop`width: 100%;`}
  ${props =>
    props.focus &&
    css`
      box-shadow: #b7b5bd 0px 0px 0px 2px inset;
      border-color: transparent;
      width: 400px;
    `}
  &::placeholder {
    color: #b7b5bd;
  }
  &:disabled {
    color: #635e69;
  }
`

const StyledResults = styled.div<{
  focus: boolean
  queried: boolean
}>`
  position: absolute;
  top: 50px;
  left: 0;
  font-size: 15px;
  border-radius: 6px;
  padding: 0;
  background-color: white;
  width: 100%;
  border: 1px solid #c1c7cd;
  .no-results {
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8892b0;
  }
  ${props =>
    !props.focus &&
    css`
      display: none;
    `}
  ${props =>
    props.focus &&
    !props.queried &&
    css`
      display: none;
    `}
`

const StyledResult = styled.div``

const StyledHeader = styled.div`
  color: #807e86;
  padding: 8px 16px;
  font-size: 14px;
`

const StyledUL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`

const StyledLI = styled.li`
  color: #1a202c;
  font-weight: 600;
  padding: 12px 20px;
  font-size: 16px;
  &:hover {
    background-color: #f6f9fa;
  }
`

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    color: currentColor;
  }
`
const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`

const StyledTag = styled.div<{ category: string }>`
  ${mixin.flexCenter}
  font-size: 11px;
  font-weight: 400;
  height: 30px;
  padding: 0 10px;
  border-radius: 50px;
  border: none;
  overflow: hidden;
  margin-bottom: 4px;
  ${props => css`
    color: ${mapCategoryToColor(props.category)};
    background-color: ${mapCategoryToColor(props.category, false, true)};
  `}
  &:not(:last-child) {
    margin-right: 10px;
  }
`

interface Page {
  id: number
  slug: string
  title: string
  category: string
  tags: string[]
}

interface SearchProps {
  searchIndex: SerialisedIndexData<Page>
}

const Search: React.FC<SearchProps> = ({ searchIndex }) => {
  const [index, setIndex] = useState<Index<Page> | null>(null)
  const [query, setQuery] = useState<string>("")
  const [results, setResults] = useState<Page[] | undefined>([])
  const [focus, setFocus] = useState<boolean>(false)

  const onFocus = useCallback(() => {
    setFocus(true)
  }, [])

  const onBlur = useCallback(() => {
    setFocus(false)
  }, [])

  const getOrCreateIndex = () =>
    index
      ? index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(searchIndex)

  const search = (evt: any) => {
    const _query = evt.target.value
    setIndex(getOrCreateIndex())
    setQuery(_query)
    setResults(
      index
        ?.search(_query, {})
        .map(({ ref }) => index.documentStore.getDoc(ref))
    )
  }

  return (
    <StyledContainer hasResults={results && results.length > 0 ? true : false}>
      <Icon name="search" />
      <StyledInput
        type="text"
        value={query}
        onChange={search}
        focus={focus}
        placeholder="Search by title, category, or tag"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <StyledResults
        className="search-results"
        queried={query.length > 0}
        focus={focus}
      >
        {results && results.length > 0 ? (
          <StyledResult>
            <StyledHeader>Search results ({results.length})</StyledHeader>
            <StyledUL>
              {results.map(page => (
                <StyledLink to={page.slug}>
                  <StyledLI key={page.id}>
                    {page.title}{" "}
                    {/* {page.tags && <div>{": " + page.tags.join(`, `)}</div>} */}
                    {
                      <StyledTags>
                        {page.tags &&
                          page.tags.map(tag => (
                            <StyledTag key={tag} category={page.category}>
                              {tag}
                            </StyledTag>
                          ))}
                      </StyledTags>
                    }
                  </StyledLI>
                </StyledLink>
              ))}
            </StyledUL>
          </StyledResult>
        ) : (
          <div className="no-results">No results.</div>
        )}
      </StyledResults>
    </StyledContainer>
  )
}

export { Search }
