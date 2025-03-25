import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import NewBookingForm from './NewBookingForm';

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <NewBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
