import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'

import FormRow from '../../ui/FormRow'

import { useCreateCabin } from './useCreateCabin'
import { useUpdateCabin } from './useUpdateCabin'

function CreateCabinForm({ cabinToEdit = {} }) {
  //update cabin
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })
  const { errors } = formState

  // CREATE cabin
  const { isCreating, createCabin } = useCreateCabin()

  // Editing mutation
  const { isEditing, editCabin } = useUpdateCabin()

  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    //cabin is updating but not changing img or, creating a new image
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image: image }, id: editId })
    } else createCabin({ ...data, image: data.image[0] }, { onSuccess: () => reset() })
  }
  function onError(errors) {
    /* console.log(errors) */
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'Price should be at least 100',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'this field is required',
            validate: (value) =>
              +value <= +getValues().regularPrice || 'Disocount should be less then regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register('image', {
            required: isEditSession ? false : 'this field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
