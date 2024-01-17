import { configureStore } from "@reduxjs/toolkit";
import { rtkQueryErrorLogger } from "./ErrorCatching";

import { AssistantSlice, ThreadSlice, MessageSlice, DataSlice } from "./Slices";

export default configureStore({
  reducer: {
    [AssistantSlice.reducerPath]: AssistantSlice.reducer,
    [ThreadSlice.reducerPath]: ThreadSlice.reducer,
    [MessageSlice.reducerPath]: MessageSlice.reducer,
    [DataSlice.reducerPath]: DataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AssistantSlice.middleware,
      ThreadSlice.middleware,
      MessageSlice.middleware,
      DataSlice.middleware,
    ]),

  rtkQueryErrorLogger,
});
