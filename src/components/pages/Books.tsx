import React, { useContext } from 'react'

import { AuthContext } from 'App'

import { getBooks } from 'lib/api/books'

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Books: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  const res = getBooks()
  console.log(res)

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h1>Books</h1>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  )
}

export default Books
