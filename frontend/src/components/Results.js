import React from 'react'
import PropTypes from 'prop-types'
import { withState,  } from 'recompose'
import { connect } from 'react-redux'
import { Box, Heading, ButtonOutline } from 'rebass'

import { makeSelectSortedResults } from 'resources/auth/selectors'


const withSortedResults = connect(() => {
  const selectSortedResults = makeSelectSortedResults()

  return (state, props) => ({
    results: selectSortedResults(state, props).toArray(),
  })
})

const withSortByState = withState('sortBy', 'setSortBy', 'relevancy')


const PullRequestCard = ({ title, relevancy, timestamp }) => (
  <Box>
    <h2>{title}</h2>
    <dl>
      <dt>relevancy</dt>
      <dd>{relevancy}</dd>
      
      <dt>timestamp</dt>
      <dd>{timestamp}</dd>
    </dl>
  </Box>
)

PullRequestCard.propTypes = {
  title: PropTypes.string.isRequired,
  relevancy: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
}

const ResultsList = ({ results }) => (
  <ul>
    {results.map(result => 
      <li key={result.id}>
        <PullRequestCard {...result} />
      </li>
    )}
  </ul>
)

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired
}

const SortedResults = withSortedResults(ResultsList)

const _ResultsBrowser = ({ sortBy, setSortBy }) => [
  <div key="tools">
    <ButtonOutline onClick={() => setSortBy('relevancy')} children="relevancy" />
    <ButtonOutline onClick={() => setSortBy('timestamp')} children="timestamp" />
  </div>,
  <SortedResults key="results" sortBy={sortBy} />
]

_ResultsBrowser.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
}

const ResultsBrowser = withSortByState(_ResultsBrowser)

const ResultsScene = () => (
  <Box>
    <Heading>Results</Heading>
    <ResultsBrowser />
  </Box>
)

export default ResultsScene
