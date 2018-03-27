import { createSelector } from 'reselect'

export const selectRoot = state => state.auth

export const selectUser = createSelector(
  selectRoot,
  r => r.user,
)

export const selectIsLoggedIn = createSelector(
  selectUser,
  user => !!user,
)

export const selectUserResultsAsList = createSelector(
  selectRoot, 
  r => r.results,
)


const selectSortByProp = (_, props) => props.sortBy

export const makeSelectSortedResults = () => {
  return createSelector(
    [selectUserResultsAsList, selectSortByProp],
    (resultsList, sortBy) => {
      if (sortBy === 'timestamp') return resultsList
        .sortBy(result => result.timestamp)
      
      return resultsList
        .sortBy(result => result.relevancy)
        .reverse()
    }
  )
}

export const isLoggedIn = props => props.isLoggedIn
export const isNotLoggedIn = props => !props.isLoggedIn
