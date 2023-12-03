import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }
  return data
}

export async function createEditCabin(newCabin, id) {
  // unique image name - remove with blank if image has / in name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')

  // updating part - image is already there
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  //supabase image path
  const imagePath = hasImagePath
    ? newCabin.image // leave existing image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}` //updating a new image

  let query = supabase.from('cabins')

  // Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

  // Edit Cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select()

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be created')
  }
  // Upload image

  //if there is an image early return
  if (hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // Delete cabin if error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.error(storageError)
    throw new Error('Cabins image could not be uploade, cabin not created')
  }

  return data
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be deleted')
  }
  return data
}
