import client from 'lib/api/client'
import { UpdateBookFormData } from 'interfaces/index'

import Cookies from 'js-cookie'

// 動作確認用
export const execTest = () => {
  return client.get('/test')
}

// 本の一覧
export const getBooks = () => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get('/books', {
    headers: {
      'access-token': Cookies.get('_access_token')!,
      client: Cookies.get('_client')!,
      uid: Cookies.get('_uid')!
    }
  })
}

// id指定でBook情報を個別に取得
export const getBook = (id: number | undefined) => {
  return client.get(`/books/${id}`)
}

// Book情報を更新
export const updateBook = (id: number | undefined | null, data: UpdateBookFormData) => {
  return client.put(`/books/${id}`, data)
}
