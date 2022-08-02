// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}

// Books
export interface Book {
  id: number
  userId: number
  title: string
  body: string
  genre: string
  image: {
    url: string
  }
  createdAt?: Date
  updatedAt?: Date
}
export interface UpdateBookData {
  id: number | undefined | null
  userId?: number
  title?: string
  body?: string
  genre?: string
  image?: string
}

export interface UpdateBookFormData extends FormData {
  append(name: keyof UpdateBookData, value: String | Blob, fileName?: string): any
}
