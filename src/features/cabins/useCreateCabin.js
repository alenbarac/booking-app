import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createEditCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useCreateCabin() {
  const queryClient = useQueryClient()

  // create mutation
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New Cabin created')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isCreating, createCabin }
}
