import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import GuestRow from './GuestRow';
import { useGuests } from './useGuests';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';

function GuestTable() {
  const { isLoading, guests, count } = useGuests();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!guests.length) return <Empty resourceName='guests' />;

  // FILTER
  const filterValue = searchParams.get('filter') || 'all';

  let filteredGuests;
  if (filterValue === 'all') filteredGuests = guests;
  if (filterValue === 'no-discount')
    filteredGuests = guests.filter((guest) => guest.discount === 0);
  if (filterValue === 'with-discount')
    filteredGuests = guests.filter((guest) => guest.discount > 0);

  // SORT
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedGuests = filteredGuests.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns='1.2fr 2.2fr 2.2fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Email</div>
          <div>Nationality</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedGuests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
