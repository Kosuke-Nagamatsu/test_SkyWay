import React, { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Paper, Button } from '@mui/material';
// 作成したContextをimport
import { UserInputContext } from './providers/UserInputProvider';


export default function Confirm(props) {

  // currentState（入力データを管理する変数）を取得
  const { currentState } = useContext(UserInputContext);
  // フォームの各フィールドに応じたプロパティを取り出す
  const { name, email, password, confirmPassword } = currentState;

  const createData = (title, content) => {
    return { title, content };
  }

  // 表示するデータ
  const rows = [
    createData("名前", name),
    createData("メールアドレス", email),
    createData("パスワード", password),
    createData("パスワード確認", confirmPassword)
  ];

  const onSubmit = () => {
    alert("登録ボタンを押しました！");
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ p: 3, my: 3 }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="justify">
                  {row.title}
                </TableCell>
                <TableCell align="justify">{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={onSubmit} fullWidth>
        登録
      </Button>
      <Button variant="outlined" onClick={props.handleBack} fullWidth sx={{ mt: 1 }} >
        戻る
      </Button>
    </>
  );
}