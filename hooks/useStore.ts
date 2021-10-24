import { wrapProperty } from '@nuxtjs/composition-api'

export const useStore = wrapProperty('$accessor', false)
