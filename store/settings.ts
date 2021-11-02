import { mutationTree } from 'typed-vuex'

export type Player = 'rich' | 'puma'
type Screen = 'loading' | 'character' | 'RLGL'

export const state = () => ({
  player: 'rich' as Player,
  screen: 'loading' as Screen,
})

export const mutations = mutationTree(state, {
  SET_PLAYER(state, payload: Player) {
    state.player = payload
  },
  SET_SCREEN(state, payload: Screen) {
    state.screen = payload
  },
})
