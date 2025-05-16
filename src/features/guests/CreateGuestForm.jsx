import React from 'react';
import Form from '../../ui/Form';
import { useForm } from 'react-hook-form';
import { useCreateGuest } from './useCreateGuest';
import { useEditGuest } from './useEditGuest';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { NATIONALITY_CODES } from '../../utils/constants';

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { createGuest, isCreating } = useCreateGuest();
  const { isEditing, editGuest } = useEditGuest();

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const nationalityShortener =
      NATIONALITY_CODES[data.nationality] || 'unknown';
    const countryFlag = `https://flagcdn.com/${nationalityShortener}.svg`;

    if (isEditSession)
      editGuest(
        {
          newGuestData: {
            ...data,
            countryFlag,
          },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createGuest(
        { ...data, countryFlag: countryFlag },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onError(errors) {}
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Full Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isWorking}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isWorking}
          {...register('email', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='National ID' error={errors?.name?.message}>
        <Input
          type='text'
          id='nationalID'
          disabled={isWorking}
          {...register('nationalID', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Nationality' error={errors?.name?.message}>
        <Input
          type='text'
          id='nationality'
          disabled={isWorking}
          {...register('nationality', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit guest' : 'Create new guest'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
