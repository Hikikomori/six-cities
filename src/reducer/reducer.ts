import * as Redux from 'redux'
import {reducer as base} from './base/base'
import {reducer as favorites} from './favorites/favorites'
import {reducer as reviews} from './reviews/reviews'
import {reducer as user} from './user/user'

export default Redux.combineReducers({
  BASE: base,
  FAVORITES: favorites,
  REVIEIWS: reviews,
  USER: user
})
