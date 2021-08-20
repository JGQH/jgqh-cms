import Supabase from './Supabase'

export async function getImage(id:string) {
  const { data, error } = await Supabase.storage.from('images').download(id)

  if (error) throw error

  return URL.createObjectURL(data)
}