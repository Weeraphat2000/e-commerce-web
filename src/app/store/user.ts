import { create, createStore } from "zustand"; // create ใช้สร้าง store และ createStore ใช้สร้าง store แบบไม่มี middleware
import axios from "../config/axios";
import { persist, PersistOptions } from "zustand/middleware"; // ใช้ persist จะเก็บ state ไว้ใน local storage
import { removeTokens, setTokens } from "../utils/local-storage";

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
  login: (payload: { email: string; password: string }) => Promise<UserState>;
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

// export const createUserStore = (initState: UserState = defaultInitState) => {
//   return create<UserStore>()(
//     persist<UserStore>(
//       (set) => ({
//         ...initState,
//         setUser: (user: UserState) => set(user),
//         logout: () => set(defaultInitState),
//         login: async (payload: { email: string; password: string }) => {
//           const response = await axios.post("/auth/login", payload);
//           set({
//             id: response.data.user.id,
//             email: response.data.user.email,
//             role: response.data.user.role,
//             name: response.data.user.name,
//             picture: response.data.user.picture,
//             enabled: response.data.user.enabled,
//             address: response.data.user.address,
//           });
//         },
//       }),
//       {
//         name: "user-store",
//       }
//     )
//   );
// };

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user: UserState) => set(user),
    logout: () => {
      set(defaultInitState);
      removeTokens();
    },
    login: async (payload: { email: string; password: string }) => {
      const response = await axios.post("/auth/login", payload);

      setTokens(response.data.token);

      set({
        id: response.data.user.id,
        email: response.data.user.email,
        role: response.data.user.role,
        name: response.data.user.name,
        picture: response.data.user.picture,
        enabled: response.data.user.enabled,
        address: response.data.user.address,
      });

      return response.data.user;
    },
  }));
};
