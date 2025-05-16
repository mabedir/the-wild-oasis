import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateGuest } from '../../services/apiGuests';

export function useEditGuest() {
  const queryClient = useQueryClient();

  const { mutate: editGuest, isLoading: isEditing } = useMutation({
    mutationFn: ({ newGuestData, id }) => {
      return updateGuest(newGuestData, id);
    },
    onSuccess: () => {
      toast.success('Guest successfully edited');
      queryClient.invalidateQueries({
        queryKey: ['guests'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editGuest };
}
