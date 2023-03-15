import compose from 'compose-function'

import { withQuery } from './withQuery'
import { withRouter } from './withRouter'
import { withStore } from './withStore'
import { withTheme } from './withTheme'

export const withProviders = compose(
  withStore,
  withTheme,
  withQuery,
  withRouter
)
