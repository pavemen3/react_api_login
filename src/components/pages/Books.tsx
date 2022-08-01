// import React, { useContext } from 'react'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'App'
import { getBooks } from 'lib/api/books'

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Books: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [dataBooks, setDataBook] = useState({})

  useEffect(() => {
    handleGetBooks()
  }, [])

  const handleGetBooks = async () => {
    try {
      const res = await getBooks()

      if (res === undefined) {
        return
      }
      console.log(res)
      console.log(res.data)
      setDataBook(res.data)
      console.log(dataBooks)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h1>Books</h1>
          <table>
            <thead>
              <tr>
                <th>名前</th>
                <th>ジャンル</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {/* {dataBooks.map((item: any, index: any) => (
              <tbody key={index}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.genre}</td>
                  <td>更新</td>
                  <td>詳細へ</td>
                  <td>
                    <button>削除</button>
                  </td>
                </tr>
              </tbody>
            ))} */}
          </table>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  )
}

export default Books
