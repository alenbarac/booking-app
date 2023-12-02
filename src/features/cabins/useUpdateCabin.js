import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createEditCabin } from '../../services/apiCabins'

import toast from 'react-hot-toast'

export function useUpdateCabin() {
  const queryClient = useQueryClient()
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin updated successfuly')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isEditing, editCabin }
}
