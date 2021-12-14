import React from 'react';
// レイアウト関連
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// ボタン
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// ページフリップ
import PageFlip from './PageFlip';
// スタイル
import '../stylesheets/react/top.scss'

function Top(props) {
  const isLogin = props.is_login;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box>
          <Grid container spacing={2} className="header-contents">
            <Grid item xs={12} md={7}>
              <h1><span>ビデオチャットの始め方</span></h1>
              <small>クリックでページをめくれます</small>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button href="/video_calls/chat">ルームへ入る</Button>

                  {/* ログインの有無でボタン表示を変更 */}
                  {isLogin && <Button href="/users/sign_out" data-method="delete">ログアウト</Button>}
                  {!isLogin && <Button href="/users/sign_in">ログイン</Button>}

                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>

          {/* ページフリップ */}
          <PageFlip />

        </Box>
      </Container>
    </React.Fragment >
  );
}

export default Top;
