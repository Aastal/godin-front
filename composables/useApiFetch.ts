import { mande } from 'mande'

export const useApiFetch = (url: string, options = {}) => {
  return mande(url, options)
}
