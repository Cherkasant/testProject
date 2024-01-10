import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token')
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://',
  }),
  tagTypes: ['Photos'],
  endpoints: (build) => ({
    getPhotoData: build.query<any, void>({
      query: () => ({
        url: `api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_API_KEY}`,
        method: 'GET',
        providesTags: ['Photos'],
      }),
      transformResponse: (response: any) => {
        return {
          card: {
            id: response.id,
            date: response.created_at,
            info: response.description,
            user: response.user.name,
            download: response.downloads,
            width: response.width,
            height: response.height,
          },
          url: response.urls.small,
          tags: response.tags,
        }
      },
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    getPreviousPhoto: build.query<any, string>({
      query: (id: string) => ({
        url: `api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_API_KEY}`,
        method: 'GET',
        invalidatesTags: ['Photos'],
      }),
      transformResponse: (response: any) => {
        return {
          card: {
            id: response.id,
            date: response.created_at,
            info: response.description,
            user: response.user.name,
            download: response.downloads,
            width: response.width,
            height: response.height,
          },
          url: response.urls.small,
          tags: response.tags,
        }
      }
      ,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    updateTagsPhoto: build.mutation<any, { id: string | undefined, tag: string }>({
      query: ({ id, tag }) => ({
        url: `api.unsplash.com/photos/${id}?tags=${tag}?client_id=${process.env.REACT_APP_API_KEY}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      transformResponse: (response: any) => response
      ,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    logIn: build.query<any, void>({
      query: () => ({
        url: `unsplash.com/oauth/token?client_id=${process.env.REACT_APP_API_KEY}&client_secret=${process.env.REACT_APP_SECRET_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=y1PXx4yEcxHnfkoRzsM-Y48EmVPfoLNhIjnCaoMA3ZU&grant_type=authorization_code`,
        method: 'POST',
      }),
      transformResponse: (response: any) => {
        return localStorage.setItem('token', response.access_token)
      }
      ,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    deleteLikePhoto: build.mutation<any, string>({
      query: (id: string) => ({
        url: `api.unsplash.com/photos/${id}/like=?client_id=${process.env.REACT_APP_API_KEY}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      transformResponse: (response: any) => response
      ,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
})

export const {
  useGetPhotoDataQuery,
  useGetPreviousPhotoQuery,
  useUpdateTagsPhotoMutation,
  useLogInQuery,
  useDeleteLikePhotoMutation,
} = api