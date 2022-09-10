import { byteVaultApi } from './http-client';

export const deleteFragment = (body) => byteVaultApi.delete('/fragments', { data: JSON.stringify(body) })
