"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";
import { UserStore, createUserStore } from "../store/user";
import axios from "../config/axios";
import { getTokens, removeTokens } from "../utils/local-storage";

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

export interface UserStoreProviderProps {
  children: ReactNode;
}

// เอาไว้สร้าง store และเก็บไว้ใน context
export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const store = useRef(createUserStore()).current;

  // console.log("context", store.getState().name); // ดึงค่าจาก store

  useEffect(() => {
    console.log("context");
    const token = getTokens();
    if (token) {
      axios
        .get("/auth/me")
        .then((response) => {
          const userData = {
            id: response.data.id,
            email: response.data.email,
            role: response.data.role,
            name: response.data.name,
            picture: response.data.picture,
            enabled: response.data.enabled,
            address: response.data.address,
          };

          store.setState(userData);

          // store.setState((state) => ({
          //   ...state,
          //   setUser: store.getState().setUser,
          // }));
          // store.getState().setUser(userData);
          console.log("first");
        })
        .catch((error) => {
          console.log(error);
          removeTokens();
        });
    }
  }, []);

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  );
};

// เอาไว้ดึงค่าจาก store
export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
