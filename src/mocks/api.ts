export default {
  rpc: {
    description: 'base api calls',
    categories: {
      author: {
        description: 'Authoring of network items',
        methods: {
          insertKey: {
            description: 'Insert a key into the keystore.',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'keyType',
                type: 'Text'
              },
              {
                isOptional: false,
                name: 'suri',
                type: 'Text'
              },
              {
                isOptional: true,
                name: 'maybePublic',
                type: 'Bytes'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Bytes'
          },
          removeExtrinsic: {
            description:
              'Remove given extrinsic from the pool and temporarily ban it to prevent reimporting',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'bytesOrHash',
                type: 'Vec<ExtrinsicOrHash>'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Vec<Hash>'
          },
          rotateKeys: {
            description:
              'Generate new session keys and returns the corresponding public keys',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'Bytes'
          },
          pendingExtrinsics: {
            description:
              'Returns all pending extrinsics, potentially grouped by sender',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'Vec<Extrinsic>'
          },
          submitExtrinsic: {
            description:
              'Submit a fully formatted extrinsic for block inclusion',
            isSigned: true,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'extrinsic',
                type: 'Extrinsic'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Hash'
          },
          submitAndWatchExtrinsic: {
            description:
              'Submit and subscribe to watch an extrinsic until unsubscribed',
            isSigned: true,
            isSubscription: true,
            params: [
              {
                isOptional: false,
                name: 'extrinsic',
                type: 'Extrinsic'
              }
            ],
            pubsub: [
              'extrinsicUpdate',
              'submitAndWatchExtrinsic',
              'unwatchExtrinsic'
            ],
            type: 'ExtrinsicStatus'
          }
        }
      },
      chain: {
        description: 'Retrieval of chain data',
        methods: {
          getBlock: {
            description: 'Get header and body of a relay chain block',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: true,
                name: 'hash',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'SignedBlock'
          },
          getBlockHash: {
            description: 'Get the block hash for a specific block',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: true,
                name: 'blockNumber',
                type: 'BlockNumber'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Hash'
          },
          getFinalizedHead: {
            description:
              'Get hash of the last finalized block in the canon chain',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'Hash'
          },
          getHeader: {
            description: 'Retrieves the header for a specific block',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: true,
                name: 'hash',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Header'
          },
          getRuntimeVersion: {
            description:
              'Get the runtime version (alias of state_getRuntimeVersion)',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: true,
                name: 'hash',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'RuntimeVersion'
          },
          subscribeFinalizedHeads: {
            description: 'Retrieves the best finalized header via subscription',
            isSigned: false,
            isSubscription: true,
            params: [],
            pubsub: [
              'finalizedHead',
              'subscribeFinalizedHeads',
              'unsubscribeFinalizedHeads'
            ],
            type: 'Header'
          },
          subscribeRuntimeVersion: {
            description: 'Retrieves the runtime version via subscription',
            isSigned: false,
            isSubscription: true,
            params: [],
            pubsub: [
              'runtimeVersion',
              'subscribeRuntimeVersion',
              'unsubscribeRuntimeVersion'
            ],
            type: 'RuntimeVersion'
          },
          subscribeNewHeads: {
            description: 'Retrieves the best header via subscription',
            isSigned: false,
            isSubscription: true,
            params: [],
            pubsub: ['newHead', 'subscribeNewHead', 'unsubscribeNewHead'],
            type: 'Header'
          }
        }
      },
      state: {
        description: 'Query of state',
        methods: {
          call: {
            description: 'Perform a call to a builtin on the chain',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'method',
                type: 'Text'
              },
              {
                isOptional: false,
                name: 'data',
                type: 'Bytes'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Bytes'
          },
          getChildKeys: {
            description:
              'Retrieves the keys with prefix of a specific child storage',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'childStorageKey',
                type: 'StorageKey'
              },
              {
                isOptional: false,
                name: 'key',
                type: 'StorageKey'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Vec<StorageKey>'
          },
          getChildStorage: {
            description: 'Retrieves the child storage for a key',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'childStorageKey',
                type: 'StorageKey'
              },
              {
                isOptional: false,
                name: 'key',
                type: 'StorageKey'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'StorageData'
          },
          getChildStorageHash: {
            description: 'Retrieves the child storage hash',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'childStorageKey',
                type: 'StorageKey'
              },
              {
                isOptional: false,
                name: 'key',
                type: 'StorageKey'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Hash'
          },
          getChildStorageSize: {
            description: 'Retrieves the child storage size',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'childStorageKey',
                type: 'StorageKey'
              },
              {
                isOptional: false,
                name: 'key',
                type: 'StorageKey'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'u64'
          },
          getKeys: {
            description: 'Retrieves the keys with a certain prefix',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'key',
                type: 'StorageKey'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Vec<StorageKey>'
          },
          getMetadata: {
            description: 'Returns the runtime metadata',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Metadata'
          },
          getRuntimeVersion: {
            description: 'Get the runtime version',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: true,
                name: 'hash',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'RuntimeVersion'
          },
          getStorage: {
            description: 'Retrieves the storage for a key',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'key',
                type: 'StorageKey'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'StorageData'
          },
          getStorageHash: {
            description: 'Retrieves the storage hash',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'key',
                type: 'StorageKey'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Hash'
          },
          getStorageSize: {
            description: 'Retrieves the storage size',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'key',
                type: 'StorageKey'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'u64'
          },
          queryStorage: {
            description:
              'Query historical storage entries (by key) starting from a start block',
            isSigned: false,
            isSubscription: false,
            params: [
              {
                isOptional: false,
                name: 'keys',
                type: 'Vec<StorageKey>'
              },
              {
                isOptional: false,
                name: 'startBlock',
                type: 'Hash'
              },
              {
                isOptional: true,
                name: 'block',
                type: 'Hash'
              }
            ],
            pubsub: ['', '', ''],
            type: 'Vec<StorageChangeSet>'
          },
          subscribeStorage: {
            description: 'Subscribes to storage changes for the provided keys',
            isSigned: false,
            isSubscription: true,
            params: [
              {
                isOptional: false,
                name: 'keys',
                type: 'Vec<StorageKey>'
              }
            ],
            pubsub: ['storage', 'subscribeStorage', 'unsubscribeStorage'],
            type: 'StorageChangeSet'
          }
        }
      },
      system: {
        description: 'Calls to retrieve system info',
        methods: {
          chain: {
            description: 'Retrieves the chain',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'Text'
          },
          health: {
            description: 'Return health status of the node',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'Health'
          },
          name: {
            description: 'Retrieves the node name',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'Text'
          },
          networkState: {
            description: 'Returns current state of the network',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'NetworkState'
          },
          peers: {
            description: 'Returns the currently connected peers',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'Vec<PeerInfo>'
          },
          properties: {
            description:
              'Get a custom set of properties as a JSON object, defined in the chain spec',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'ChainProperties'
          },
          version: {
            description: 'Retrieves the version of the node',
            isSigned: false,
            isSubscription: false,
            params: [],
            pubsub: ['', '', ''],
            type: 'Text'
          }
        }
      }
    }
  }
}
