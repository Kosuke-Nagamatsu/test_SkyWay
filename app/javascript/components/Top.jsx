import React from 'react';
import { CssBaseline, Container, Box, Grid } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
import PageFlip from './PageFlip';
import '../stylesheets/react/top.scss'


export default function Top(props) {
  const isLogin = props.is_login;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box>
          <Grid container spacing={2} className="header-contents">
            <Grid item xs={12} md={6}>
              <h1><span>ビデオチャットの始め方</span></h1>
              <small>クリックでページをめくれます</small>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button href="/video_calls/chat">ルームへ入る</Button>

                  {/* ログインの有無でボタン表示を変更 */}
                  {isLogin && <Button href="/users/sign_out" data-method="delete">ログアウト</Button>}
                  {!isLogin && <Button href="/users/sign_in">ログイン</Button>}
                  {!isLogin && <Button href="/users/sign_up">アカウント</Button>}

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
