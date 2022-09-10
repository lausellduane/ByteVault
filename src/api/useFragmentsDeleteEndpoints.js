import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFragment } from './DELETE.api';

export const useFragmentDeleteMutation = () => {
    const queryClient = useQueryClient();

    const useDeleteFragment = useMutation(deleteFragment, {
        onSuccess: () => {
            queryClient.invalidateQueries('fragments');
        }
    })

    return {
        useDeleteFragment
    };
};