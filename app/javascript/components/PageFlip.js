import React from 'react';
// 本をめくるようなエフェクト用
import HTMLFlipBook from 'react-pageflip';
// カード用
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


// カードの内容
const cardContents = {
  first: {
    titles: {
      main: "ステップ１",
      sub: "IDを確認"
    },
    content: "ルームへ入り Your ID（電話番号）をご確認ください。"
  },
  second: {
    titles: {
      main: "ステップ２",
      sub: "相手のIDを入れてCall"
    },
    content: "自身からまたは相手から「Call」することで、通話が開始します。「Close」を押すと終了します。"
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
        <Typography sx={{ my: 1.5 }} color="text.secondary">
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
      </HTMLFlipBook>
    </div>
  );
}

export default PageFlip;

