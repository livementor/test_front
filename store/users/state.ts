export interface UsersState {
  authUser?: string
}

export const state = (): UsersState => ({
  authUser: undefined,
})
