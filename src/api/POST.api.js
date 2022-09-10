import { byteVaultApi } from './http-client';

export const createFragment = (body) => byteVaultApi.post('/fragments', body);
