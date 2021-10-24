import { getAccessorType, getterTree, mutationTree, actionTree } from 'typed-vuex'

import * as assets from '~/store/assets'

export const state = () => ({

})

export const getters = getterTree(state, {

})

export const mutations = mutationTree(state, {

})

export const actions = actionTree(
  { state, getters, mutations },
  {

  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    assets,
  },
})
