import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';

export function useAllGuests() {
  const {
    isLoading,
    data: { data: guests = [], count = 0 } = {},
    error,
  } = useQuery({
    queryKey: ['guests', 'all'],
    queryFn: () => getGuests({ all: true }),
  });

  return { isLoading, guests, count, error };
}
