import { useQuery } from '@tanstack/react-query';
import { byteVaultApi } from './http-client';

export const FetchFragments = (setFragments, handleFragmentIDs,setFetchFragmentsError) => {
    return useQuery(['fragments'], 
    async () => {
        return await byteVaultApi.get('/fragments');
    },
    {
        enabled: true,
        onSuccess: (res) => {
            setFragments(res?.data);
            handleFragmentIDs(res?.data);
        }
    },
    {
        onError: (err) => {
            setFetchFragmentsError(err);
        }
    });
}

export const FetchProgrammingLanguages = () => {
    return useQuery(['programmingLanguages'], 
    async () => {
        return await byteVaultApi.get('/programming-languages');
    },
    {
        enabled: true,
        onSuccess: () => {}
    },
    {
        onError: () => {}
    });
}

export const FetchTags = () => {
    return useQuery(['tags'], 
    async () => {
        return await byteVaultApi.get('/fragments/tags');
    },
    {
        enabled: true,
        onSuccess: () => {}
    },
    {
        onError: () => {}
    });
}