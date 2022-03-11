import { configureStore } from '@reduxjs/toolkit'
import billReducer from './Bill'
import linkReducer from "./links"
import parsedTicketReducer from "./parsedLinks"

export const store = configureStore({
  reducer: {
      links: linkReducer,
      parsedTickets: parsedTicketReducer,
      billItems: billReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch