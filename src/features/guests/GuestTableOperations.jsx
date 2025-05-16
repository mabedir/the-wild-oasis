import TableOperations from '../../ui/TableOperations';
import SortBy from '../../ui/SortBy';

function GuestTableOperations() {
  return (
    <TableOperations style={{ flexDirection: 'row-reverse' }}>
      {/* Sort by name, email, or created_at */}
      <SortBy
        options={[
          {
            value: 'created_at-desc',
            label: 'Sort by creation date (newest first)',
          },
          {
            value: 'created_at-asc',
            label: 'Sort by creation date (oldest first)',
          },
          { value: 'fullName-asc', label: 'Sort by name (A-Z)' },
          { value: 'fullName-desc', label: 'Sort by name (Z-A)' },
          { value: 'email-asc', label: 'Sort by email (A-Z)' },
          { value: 'email-desc', label: 'Sort by email (Z-A)' },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
