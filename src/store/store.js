import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers
import counterReducer from './counter/counterSlice';
import customizerReducer from './customizer/CustomizerSlice';
import chatReducer from './apps/chat/ChatSlice';
import notesReducer from './apps/notes/NotesSlice';
import emailReducer from './apps/email/EmailSlice';
import ticketReducer from './apps/tickets/TicketSlice';
import contactsReducer from './apps/contacts/ContactSlice';
import userProfileReducer from './apps/userProfile/UserProfileSlice'; // Consistent naming
import CurrentProfileReducer from './apps/userProfile/CurrentProfile'; // Consistent naming
import blogReducer from './apps/blog/BlogSlice';
import friendsReducer from './friend/FriendSlice'; // Import friends reducer

// Configuring persistence for specific reducers
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['customizer'], // You can add other reducers to persist here if needed
};

// Wrap the customizerReducer with persistReducer
const persistedCustomizerReducer = persistReducer(persistConfig, customizerReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customizer: persistedCustomizerReducer, // Persisting the customizer reducer
    chat: chatReducer,
    email: emailReducer,
    notes: notesReducer, // Fix the duplicate reducer issue
    friends: friendsReducer, // Friends reducer
    contacts: contactsReducer,
    currentuser: CurrentProfileReducer,
    ticket: ticketReducer,
    userProfile: userProfileReducer, // Consistent naming
    blog: blogReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

// Setting up persistence for the store
export const persistor = persistStore(store);
