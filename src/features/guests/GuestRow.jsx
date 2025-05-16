import styled from 'styled-components';

import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import CreateGuestForm from './CreateGuestForm';
import { useDeleteGuest } from './useDeleteGuest';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 4.8rem;
  height: 3.6rem;
  object-fit: cover;
  border-radius: 0.4rem;
  box-shadow: var(--shadow-md);
`;

const Name = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Email = styled.div`
  font-family: 'Sono';
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Nationality = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

function GuestRow({ guest }) {
  const { isDeleting, deleteGuest } = useDeleteGuest();
  // const { isCreating, createGuest } = useCreateGuest();

  const { id, fullName, nationality, countryFlag } = guest;

  return (
    <Table.Row>
      <Img src={countryFlag} alt={`${nationality} flag`} />

      <Name>{fullName}</Name>
      <Email>{guest.email}</Email>
      <Nationality>{nationality}</Nationality>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='edit'>
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='cabins'
                disabled={isDeleting}
                onConfirm={() => deleteGuest(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
export default GuestRow;
