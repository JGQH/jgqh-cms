import Supabase from './Supabase'

export async function getImage(id:string) {
  const { data, error } = await Supabase.storage.from('images').download(id)

  if (error) throw error
  if(!data) throw new Error('Image is null')

  return data as File
}

export async function updateImage(id:string, image:File | null) {
  if(image) {
    const { error } = await Supabase.storage.from('images').upload(id, image)

    if (error) throw error

    return
  }
  throw new Error('Image is null')
}