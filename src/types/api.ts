import { ApiPromise } from '@polkadot/api'

export interface ApiInterface {
  loaded: boolean
  url: string
  description: object
  search: [string, string][]
  promise: ApiPromise | {}
}

export interface ApiStateInterface {
  current: ApiInterface
  compare: ApiInterface
}

export interface SetApiActionPayloadInterface {
  which: 'current' | 'compare'
  data: {
    loaded?: boolean
    url?: string
    description?: object
    search?: [string, string][]
    promise?: ApiPromise | {}
  }
}

export interface SetApiActionInterface {
  type: string
  payload: SetApiActionPayloadInterface
}

export interface ApiDiffInterface {
  added: object
  deleted: object
  updated: object
}
