import { wrapProperty } from '@nuxtjs/composition-api'
import { accessorType } from '~/store'

export const useStore = wrapProperty('$accessor', false) as () => typeof accessorType
