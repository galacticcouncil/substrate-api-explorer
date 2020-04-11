import { ApiPromise } from '@polkadot/api'
import _camelCase from 'lodash/camelCase'
import _isEmpty from 'lodash/isEmpty'
import * as Rpc from '@polkadot/types/interfaces/definitions'
import { StorageEntryMetadataLatest } from '@polkadot/types/interfaces'
import { Vec, Text } from '@polkadot/types'

export const NOOP = () => {
  //noop
}

function formatDocs(docs: Vec<Text>) {
  return docs.map((text) => text.toString()).join()
}

let rpcSearch: [string, string][] = []

function mapQueryMethodWithParams(method: StorageEntryMetadataLatest) {
  const methodName = _camelCase(method.name.toString())
  let params: { [key: string]: string | boolean }[] = []
  let type: string | null = null
  const methodMap = method.type.isMap ? method.type.asMap : null
  const methodPlain = method.type.isPlain ? method.type.asPlain : null
  const doubleMap = method.type.isDoubleMap ? method.type.asDoubleMap : null

  if (methodPlain) type = methodPlain.toString()
  if (methodMap) {
    params = [
      {
        isOptional: method.modifier.isOptional,
        name: methodMap.key.toString(),
        type: methodMap.hasher.toString(),
      },
    ]
    type = methodMap.value.toString()
  }
  if (doubleMap) {
    params = [
      {
        isOptional: method.modifier.isOptional,
        name: doubleMap.key1.toString(),
        type: doubleMap.hasher.toString(),
      },
      {
        isOptional: method.modifier.isOptional,
        name: doubleMap.key2.toString(),
        type: doubleMap.key2Hasher.toString(),
      },
    ]
    type = doubleMap.value.toString()
  }

  return {
    name: methodName,
    data: {
      type,
      params,
      description: formatDocs(method.documentation),
    },
  }
}

// TODO: FIXME https://github.com/polkadot-js/api/pull/2064
export function constructApiRpcObject() {
  const rpc = Rpc
  const categories = {}

  window['rpc'] = rpc

  for (const categoryName in rpc) {
    if (!rpc.hasOwnProperty(categoryName) || !rpc[categoryName].rpc) {
      continue
    }

    const category = rpc[categoryName]

    if (category && category.rpc) {
      categories[categoryName] = {}
      for (const methodName in category.rpc) {
        if (!category.rpc.hasOwnProperty(methodName)) continue

        if (!categories[categoryName].methods)
          categories[categoryName].methods = {}

        categories[categoryName].methods[methodName] = category.rpc[methodName]

        rpcSearch.push([
          'api.rpc.' + categoryName + '.' + methodName,
          category.rpc[methodName].description,
        ])
      }

      if (
        categories[categoryName].methods &&
        !_isEmpty(categories[categoryName].methods)
      ) {
        categories[categoryName].description = category.description
      } else {
        delete categories[categoryName]
      }
    }
  }

  const rpcDescription = { ...{}, categories }

  return rpcDescription
}

export const constructApiDescriptionObject = (api: ApiPromise) => {
  const categories = api.runtimeMetadata.asLatest.modules

  const rpc = constructApiRpcObject()

  const apiDescription = {
    rpc,
    // systemEvents: { categories: {} },
    query: { categories: {} },
    tx: { categories: {} },
    consts: { categories: {} },
  }

  const apiSearch: [string, string][] = [...rpcSearch]
  rpcSearch = []

  categories.forEach((category) => {
    const categoryName = _camelCase(category.name.toString())

    //Build api.query.system.events object

    // TODO: UI

    // if (category.events && !category.events.isEmpty) {
    //   const eventCategories = {}
    //   const methods = {}

    //   category.events.unwrap().forEach(event => {
    //     const name =
    //       _camelCase(category.name.toString()) +
    //       ':' +
    //       _camelCase(event.name.toString())
    //     methods[name] = {}
    //     methods[name].description = formatDocs(event.documentation)
    //   })

    //   eventCategories[categoryName] = { methods }
    //   apiDescription.systemEvents.categories = {
    //     ...apiDescription.systemEvents.categories,
    //     ...eventCategories
    //   }
    // }

    //Build api.query object

    if (category.storage && !category.storage.isEmpty) {
      const queryCategories = {}
      const methods = {}

      category.storage.unwrap().items.forEach((method) => {
        const mappedMethod = mapQueryMethodWithParams(method)
        methods[mappedMethod.name] = { ...mappedMethod.data }
        apiSearch.push([
          'api.query.' + categoryName + '.' + mappedMethod.name,
          mappedMethod.data.description,
        ])
      })

      queryCategories[categoryName] = { methods }
      apiDescription.query.categories = {
        ...apiDescription.query.categories,
        ...queryCategories,
      }
    }

    //Build api.tx object

    if (category.calls && !category.calls.isEmpty) {
      const txCategories = {}
      const methods = {}
      category.calls.unwrap().forEach((method) => {
        const methodName = _camelCase(method.name.toString())
        const docs = formatDocs(method.documentation)

        const params = method.args.map((param) => {
          return {
            name: param.name.toString(),
            type: param.type.toString(),
          }
        })

        methods[methodName] = {
          isSigned: true,
          isSubscription: false,
          params,
          type: method.Type.args.toString(),
          description: docs,
        }
        txCategories[categoryName] = { methods }
        apiSearch.push(['api.tx.' + categoryName + '.' + methodName, docs])
        apiDescription.tx.categories = {
          ...apiDescription.tx.categories,
          ...txCategories,
        }
      })
    }

    //Build api.consts object

    if (category.constants && !category.constants.isEmpty) {
      const constCategories = {}
      const methods = {}

      category.constants.forEach((method) => {
        const methodName = _camelCase(method.name.toString())

        methods[methodName] = {
          params: [],
          isConstant: true,
          type: method.type.toString(),
          description: formatDocs(method.documentation),
        }
      })
      constCategories[categoryName] = { methods }
      apiDescription.consts.categories = {
        ...apiDescription.consts.categories,
        ...constCategories,
      }
    }
  })

  return { apiDescription, apiSearch }
}

export const encodeURI = (data) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

export const isWsAddress = (url: string) => {
  return /^(wss?:\/\/)([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[^\/]+)\/?(:[0-9]{1,5})?$/.test(
    url
  )
}
