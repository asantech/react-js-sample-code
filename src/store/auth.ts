import { create, UseBoundStore, StoreApi } from 'zustand'

import { getCookie } from '@utils/cookie';

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}


export type UseAuthStore = {
    isAuthenticated: boolean;
    user: null | User; 
    accessToken: null | string;
    refreshToken: null | string;
    setUser: (state: any) => void,
    removeUser: () => void,
}

export const useAuthStore: UseBoundStore<StoreApi<UseAuthStore>> = create((set) => ({
    isAuthenticated: Boolean(getCookie('accessToken')),
    user: null,
    accessToken: null,
    refreshToken: null,
    setUser: (data:any) => set((state) => ({ ...state, user: data.user, isAuthenticated: true, accessToken: data.auth?.accessToken, refreshToken: data.auth?.refreshToken })),
    removeUser: () => set((state) => ({...state, user: null, isAuthenticated: false, accessToken: null, refreshToken: null })),
}))