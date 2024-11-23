import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserState = {
  id: string;
  email: string;
  role: string;
  name: string | null;
  picture: string | null;
  enabled: boolean;
  address: string | null;
};

export type UserActions = {
  setUser: (user: UserState) => void;
  logout: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  id: "",
  email: "",
  role: "",
  name: null,
  picture: null,
  enabled: false,
  address: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return create<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        setUser: (user: UserState) => set(user),
        logout: () => set(defaultInitState),
      }),
      {
        name: "user-store",
      }
    )
  );
};

// export const createUserStore = (initState: UserState = defaultInitState) => {
//     return create<UserStore>((set) => ({
//       ...initState,
//       setUser: (user: UserState) => set(user),
//       logout: () => set(defaultInitState),
//     }));
//   };
