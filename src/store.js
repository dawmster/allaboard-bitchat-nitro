import { configureStore } from "@reduxjs/toolkit";

import socketMiddleware from "./middleware/socketMiddleware";
import channelsReducer from "./reducers/channelsReducer";
import chatReducer from "./reducers/chatReducer";
import memberListReducer from "./reducers/memberListReducer";
import sessionReducer from "./reducers/sessionReducer";
import sidebarReducer from "./reducers/sidebarReducer";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    channels: channelsReducer,
    session: sessionReducer,
    sidebar: sidebarReducer,
    memberList: memberListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(socketMiddleware),
});

export default store;
