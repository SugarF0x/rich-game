import { actionTree, mutationTree } from 'typed-vuex'
import { each, get, set } from 'lodash'
import { urlToUri } from '~/utils'
import { AssetsMap } from '~/static/assets/map'

export type AssetsState = Pick<AssetsMap, 'entries'> &
  AssetsMap['assets'] & {
    loaded: number
  }

export const state = (): AssetsState => ({
  loaded: 0,
  entries: undefined!,
  images: undefined!,
  sounds: undefined!,
})

export const mutations = mutationTree(state, {
  SET_ASSETS_MAP: (state, payload: AssetsMap) => {
    Object.assign(state, { entries: payload.entries, ...payload.assets })
  },
  SET_ASSET(state, payload: { path: string; value: string }) {
    const { path, value } = payload
    const nests = path.split('/')
    nests.shift()
    const name = nests.pop()!.split('.')[0]
    const isNumeric = !isNaN(Number(name))
    const storePath = nests.join('.')

    if (!isNumeric) {
      set(state, `${storePath}.${name}`, value)
    } else {
      const isInitial = !get(state, storePath)[0].includes('data:')
      if (!isInitial) {
        set(state, storePath, [...(get(state, storePath) as any), value])
      } else {
        set(state, storePath, [value])
      }
    }
    state.loaded++
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async getAssetsMap({ state, commit, dispatch }) {
      if (typeof state.entries !== 'undefined') return

      await fetch('/assets/map.json')
        .then((response) => response.json())
        .then((json) => {
          commit('SET_ASSETS_MAP', json)
        })
        .then(() => {
          dispatch('getAssets')
        })
    },

    async getAssets({ state, commit }) {
      async function fetchEach(obj: Record<string, any>) {
        await each(obj, async (path: any) => {
          if (typeof path === 'object') {
            fetchEach(path)
          } else {
            const value = (await urlToUri(path)) as string
            commit('SET_ASSET', { path, value })
          }
        })
      }

      await fetchEach(state.images)
      await fetchEach(state.sounds)
    },
  }
)
