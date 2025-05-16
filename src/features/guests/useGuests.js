import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //SORT
  const sortByRaw = searchParams.get('sortBy') || 'created_at-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: guests = {}, count = 0 } = {},
    error,
  } = useQuery({
    queryKey: ['guests', sortBy, page],
    queryFn: () => getGuests({ sortBy, page }),
  });

  // PRE FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['guests', sortBy, page + 1],
      queryFn: () => getGuests({ sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['guests', sortBy, page - 1],
      queryFn: () => getGuests({ sortBy, page: page - 1 }),
    });

  return { isLoading, guests, count, error };
}
