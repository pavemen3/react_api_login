import React, { useEffect, useState, useContext } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

import AlertMessage from 'components/utils/AlertMessage'

import { getBooks } from 'lib/api/books'
import { Book } from 'interfaces/index'

import { AuthContext } from 'App'

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}))

// Books一覧ページ
const Books: React.FC = () => {
  const classes = useStyles()

  const initialBookState: Book = {
    id: 0,
    userId: 0,
    title: '',
    body: '',
    genre: '',
    image: {
      url: ''
    }
  }

  const [loading, setLoading] = useState<boolean>(true)
  const [books, setBooks] = useState<Book[]>([])
  const [book, setBook] = useState<Book>(initialBookState)
  const [bookDetailOpen, setBookDetailOpen] = useState<boolean>(false)
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  // Books一覧を取得
  const handleGetBooks = async () => {
    try {
      const res = await getBooks()
      console.log('res: ', res)
      console.log('res?.data: ', res?.data)
      console.log('res?.data[0]: ', res?.data[0])

      if (res?.status === 200) {
        setBooks(res?.data)
      } else {
        console.log('No books')
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetBooks()
  }, [])

  return (
    <>
      {!loading ? (
        books?.length > 0 ? (
          <Grid container justify="center">
            {books?.map((book: Book, index: number) => {
              return (
                <div>{book.title}</div>
                // <div
                //   key={index}
                //   onClick={() => {
                //     setBook(book)
                //     setBookDetailOpen(true)
                //   }}
                // >
                //   <Grid item style={{ margin: '0.5rem', cursor: 'pointer' }}>
                //     <Avatar alt="avatar" src={book?.image.url} className={classes.avatar} />
                //     <Typography
                //       variant="body2"
                //       component="p"
                //       gutterBottom
                //       style={{ marginTop: '0.5rem', textAlign: 'center' }}
                //     >
                //       {book.title}
                //     </Typography>
                //   </Grid>
                // </div>
              )
            })}
          </Grid>
        ) : (
          <Typography component="p" variant="body2" color="textSecondary">
            まだ1冊も登録されていません。
          </Typography>
        )
      ) : (
        <></>
      )}
      <Dialog open={bookDetailOpen} keepMounted onClose={() => setBookDetailOpen(false)}>
        <DialogContent>
          <Grid container justify="center">
            <Grid item>
              <Avatar alt="avatar" src={book?.image.url} className={classes.avatar} />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item style={{ marginTop: '1rem' }}>
              <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'center' }}>
                {book.title}
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                component="p"
                gutterBottom
                style={{ marginTop: '0.5rem', fontWeight: 'bold' }}
              >
                本の内容
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary" style={{ marginTop: '0.5rem' }}>
                {book.body ? book.body : '編集中です'}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="マッチングが成立しました!"
      />
    </>
  )
}
export default Books
