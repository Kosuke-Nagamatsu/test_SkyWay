import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Card, CardContent, Typography } from '@mui/material';
import '../stylesheets/react/page_flip.scss'


// 文章データ
const textContents = [
  {
    title: { main: "ステップ１", sub: "受信者はログインへ" }
  },
  {
    content: "ログイン後にルームへお入りください。登録済みのユーザ情報でログイン、または新規アカウントを作成後に受信できます。"
  },
  {
    title: { main: "ステップ２", sub: "発信者はルームへ" }
  },
  {
    content: "ログインせずルームへ入り、ログイン済みユーザへ発信できます。会話したい相手を選択し「Call」すると開始します。なお、ログイン後も発信可能です。"
  },
  {
    title: { main: "ステップ３", sub: "会話を終了" }
  },
  {
    content: "「Close」で会話を終了します。\nご利用ありがとうございます。"
  }
];

// 奇数ページのレイアウトを返す
const renderOddContent = (text) => {

  const { main, sub } = text.title;

  const card = (
    <Card className="contents" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" component="div">
          {main}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {sub}
        </Typography>
      </CardContent>
    </Card>
  );

  return card;
}

// 偶数ページのレイアウトを返す
const renderEvenContent = (text) => {

  const card = (
    <Card className="contents" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ my: 1.5 }} color="text.secondary" style={{ whiteSpace: "pre-line" }}>
          {text.content}
        </Typography>
      </CardContent>
    </Card>
  )

  return card;
}

export default function PageFlip() {
  return (
    <div className="d-flex justify-content-center">
      <HTMLFlipBook width={300} height={500}>

        {/* 1ページから順に表示 */}
        {textContents.map((textContent, index) => (
          (index + 1) % 2 === 1 ? (
            <div className="oddPage" key={index}>
              {renderOddContent(textContent)}
            </div>
          ) : (
            <div className="evenPage" key={index}>
              {renderEvenContent(textContent)}
            </div>
          )
        ))}

      </HTMLFlipBook >
    </div >
  );
}

