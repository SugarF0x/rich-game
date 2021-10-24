import { actionTree, mutationTree } from 'typed-vuex'

async function urlContentToDataUri(url: string): Promise<string> {
  return await fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = function () {
            resolve(this.result as string)
          }
          reader.readAsDataURL(blob)
        })
    )
}

export const state = () => ({
  total: 6,
  loaded: 0,
  images: {
    bullAngry: '/images/bull_angry.png',
    bullHappy: '/images/bull_happy.png',
    doll: '/images/doll.jpg',
  },
  sounds: {
    boom: '/sounds/boom.mp3',
    dollSong: '/sounds/doll_song.mp3',
    gunshot: '/sounds/gunshot.mp3',
  },
})

type AssetsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  ADD_IMAGE(state, payload: { target: keyof AssetsState['images']; value: string }) {
    state.images[payload.target] = payload.value
    state.loaded++
  },
  ADD_SOUND(state, payload: { target: keyof AssetsState['sounds']; value: string }) {
    state.sounds[payload.target] = payload.value
    state.loaded++
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async getAssets({ state, commit }) {
      const images = Object.entries(state.images)
      for (const image of images) {
        const [key, value] = image as [keyof AssetsState['images'], string]
        const data = await urlContentToDataUri(value)
        commit('ADD_IMAGE', { target: key, value: data })
      }

      const sounds = Object.entries(state.sounds)
      for (const sound of sounds) {
        const [key, value] = sound as [keyof AssetsState['sounds'], string]
        const data = await urlContentToDataUri(value)
        commit('ADD_SOUND', { target: key, value: data })
      }
    },
  }
)
