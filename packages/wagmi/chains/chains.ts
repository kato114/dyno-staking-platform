import { Chain } from 'wagmi'

export const dyno: Chain = {
  id: 7364,
  name: 'Dyno Chain Testnet',
  network: 'dyno-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Dyno Chain Native Token',
    symbol: 'DND',
  },
  rpcUrls: {
    public: 'https://rpctest.dynochain.io/',
    default: 'https://rpctest.dynochain.io/',
  },
  blockExplorers: {
    default: { name: 'DynoScan', url: 'https://testnet.dynoscan.io/' },
  },
  multicall: {
    address: '0xFB2aAb966943d4e88CA0d1533c949a4849deBD12',
    blockCreated: 670512,
  },
  testnet: false,
}
