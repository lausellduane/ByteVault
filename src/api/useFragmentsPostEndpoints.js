import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFragment } from './POST.api';

export const useFragmentPostMutation = () => {
    const queryClient = useQueryClient();

    const useCreateFragment = useMutation(createFragment, {
        onSuccess: () => {
            queryClient.invalidateQueries('fragments');
        }
    });

    return {
        useCreateFragment
    };
};