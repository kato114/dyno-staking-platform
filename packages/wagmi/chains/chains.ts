import { Chain } from 'wagmi'

export const dyno: Chain = {
  id: 7363,
  name: 'Dyno Chain',
  network: 'dyno',
  nativeCurrency: {
    decimals: 18,
    name: 'Dyno Chain Native Token',
    symbol: 'DND',
  },
  rpcUrls: {
    public: 'https://rpc.dynochain.io/',
    default: 'https://rpc.dynochain.io/',
  },
  blockExplorers: {
    default: { name: 'DynoScan', url: 'https://dynoscan.io/' },
  },
  multicall: {
    address: '0x977C2eFba2d547AeF7B10e95A34fd33C1BbDECe6',
    blockCreated: 670512,
  },
  testnet: false,
}
