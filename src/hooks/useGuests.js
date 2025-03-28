import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../services/apiBookings';

export function useGuests() {
  const { isLoading, data: guests = {} } = useQuery({
    queryKey: ['guests'],
    queryFn: getGuests,
  });

  return { isLoading, guests };
}
