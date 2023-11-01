import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({user: userReducer})

const persistConfig = {
    key: 'rootUser',
    version: 1,
    storage
}

const persisteReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persisteReducer,
    middleware: (getDefaultMiddlerware) => getDefaultMiddlerware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);