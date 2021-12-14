import React from 'react';
// 本をめくるようなエフェクト用
import HTMLFlipBook from 'react-pageflip';
// カード用
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// スタイル
import '../stylesheets/react/page_flip.scss'

// カードの内容
const cardContents = {
  first: {
    titles: {
      main: "ステップ１",
      sub: "受信者はログインへ"
    },
    content: "ログイン後にルームへお入りください。登録済みのユーザ情報でログイン、または新規アカウントを作成後に受信できます。"
  },
  second: {
    titles: {
      main: "ステップ２",
      sub: "発信者はルームへ"
    },
    content: "ログインせずルームへ入り、ログイン済みユーザへ発信できます。会話したい相手を選択し「Call」すると開始します。なお、ログイン後も発信可能です。"
  },
  third: {
    titles: {
      main: "ステップ３",
      sub: "会話を終了"
    },
    content: "「Close」で会話を終了します。\nご利用ありがとうございます。"
  }
}

// カードタイトル（奇数ページ）のレイアウトを返す
function getCardTitle(titles) {

  const card = (
    <Card className="contents" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" component="div">
          {titles.main}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {titles.sub}
        </Typography>
      </CardContent>
    </Card>
  );

  return card;
}

// カード内容（偶数ページ）のレイアウトを返す
function getCardContent(content) {

  const card = (
    <Card className="contents" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ my: 1.5 }} color="text.secondary" style={{ whiteSpace: "pre-line" }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );

  return card;
}

function PageFlip() {
  return (
    <div className="d-flex justify-content-center">
      <HTMLFlipBook width={300} height={500}>
        <div className="oddPage">
          {getCardTitle(cardContents.first.titles)}
        </div>
        <div className="evenPage">
          {getCardContent(cardContents.first.content)}
        </div>
        <div className="oddPage">
          {getCardTitle(cardContents.second.titles)}
        </div>
        <div className="evenPage">
          {getCardContent(cardContents.second.content)}
        </div>
        <div className="oddPage">
          {getCardTitle(cardContents.third.titles)}
        </div>
        <div className="evenPage">
          {getCardContent(cardContents.third.content)}
        </div>
      </HTMLFlipBook>
    </div>
  );
}

export default PageFlip;

