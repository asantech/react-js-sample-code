import { create, UseBoundStore, StoreApi } from 'zustand'

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}


export type UseAuthentication = {
    isAuthenticated: boolean;
    user: null | User; 
    setUser: (state: User) => void,
    removeUser: () => void,
}

export const useAuthentication: UseBoundStore<StoreApi<UseAuthentication>> = create((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: () => set((state) => ({ ...state, user: state.user, isAuthenticated: true })),
    removeUser: () => set((state) => ({...state, user: null, isAuthenticated: false })),
}))