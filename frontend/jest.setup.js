import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Polyfill for import.meta.env in Jest
globalThis.import = globalThis.import || {};
globalThis.import.meta = globalThis.import.meta || {};
globalThis.import.meta.env = globalThis.import.meta.env || {
  VITE_CONTRACT_ADDRESS: "0x0000000000000000000000000000000000000000",
  VITE_MORALIS_API_KEY: "test",
  VITE_APP_BACKEND_URL: "http://localhost:3000"
};
