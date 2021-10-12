window.onload = () => {

  const Peer = window.Peer;
  // SkyWayのAPIキーを定数に保存
  const SKYWAY_KEY = gon.api_key;
  
  (async function main() {
    // 各idに一致する要素オブジェクトを取得し、定数に保存
    const localVideo = document.getElementById('js-local-stream');
    const localId = document.getElementById('js-local-id');
    const callTrigger = document.getElementById('js-call-trigger');
    const closeTrigger = document.getElementById('js-close-trigger');
    const remoteVideo = document.getElementById('js-remote-stream');
    const remoteId = document.getElementById('js-remote-id');
    const meta = document.getElementById('js-meta');
    // src属性値（読込元を指定するためのURI）に'skyway'を含むscript要素を取得
    const sdkSrc = document.querySelector('script[src*=skyway]');
    
    meta.innerText = `UA: ${navigator.userAgent}`.trim();
    
    // getUserMediaで取得した自分のカメラ映像をlocalStreamへ保存
    const localStream = await navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .catch(console.error);
      
    // Render local stream
    localVideo.muted = true;
    localVideo.srcObject = localStream;
    localVideo.playsInline = true;
    await localVideo.play().catch(console.error);

    // Peer作成
    // new Peer() により、SkyWay のシグナリングサーバと接続できる
    // インスタンスを作成したときに、電話番号にあたるPeerIDを取得
    const peer = (window.peer = new Peer({
      key: SKYWAY_KEY,
      debug: 3,
    }));

    // 発信者側
    // Callボタンに対して、clickイベントが発生したときに呼び出される関数を設定
    // Register caller handler
    callTrigger.addEventListener('click', () => {
      // Note that you need to ensure the peer has connected to signaling server
      // before using methods of peer instance.
      if (!peer.open) {
        // peer.open は、シグナリングサーバへの接続状況をboolean型で保持してる
        return;
      }
      
      // call(相手のPeerID, localStream)
      // ↑これで相手に接続し、MediaConnectionオブジェクトが取得できる
      // MediaConnectionには相手の映像が含まれる
      const mediaConnection = peer.call(remoteId.value, localStream);
      
      // 相手のlocalStreamを受信したときに発生
      mediaConnection.on('stream', async stream => {
        // Render remote stream for caller
        remoteVideo.srcObject = stream;
        remoteVideo.playsInline = true;
        await remoteVideo.play().catch(console.error);

        // 開始日時を取得
        var startTime = Date.now();
        // 1秒ごとに関数showCountdown(startTime)を実行
        setInterval(function(){showCountdown(startTime)}, 1000);
      });

      // mediaConnection.close()が呼ばれたとき
      // または相手とのメディアチャネル接続が切断されたときの処理
      mediaConnection.once('close', () => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
      });
      
      // 切断処理
      // close(true)で相手の MediaConnection も即座に close する
      closeTrigger.addEventListener('click', () => mediaConnection.close(true));
    });
    
    // シグナリングサーバとの接続が成功したタイミングでview側へPeerIDを挿入
    peer.once('open', id => (localId.textContent = id));
    
    // 受信者側
    // 発信側からメディアチャネル（音声・映像）の接続を受信したときにlocalStreamを送る
    // Register caller handler
    peer.on('call', mediaConnection => {
      mediaConnection.answer(localStream);

      // 相手のlocalStreamを受信したときに発生
      mediaConnection.on('stream', async stream => {
        // Render remote stream for caller
        remoteVideo.srcObject = stream;
        remoteVideo.playsInline = true;
        await remoteVideo.play().catch(console.error);

        // 開始日時を取得
        var startTime = Date.now();
        // 1秒ごとに関数showCountdown(startTime)を実行
        setInterval(function(){showCountdown(startTime)}, 1000);
      });
      
      // mediaConnection.close()が呼ばれたとき
      // または相手とのメディアチャネル接続が切断されたときの処理
      mediaConnection.once('close', () => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
      });
      
      // 切断処理
      // close(true)で相手の MediaConnection も即座に close する
      closeTrigger.addEventListener('click', () => mediaConnection.close(true));
    });
    
    // エラーが発生した場合の処理
    peer.on('error', console.error);
  })();
};


// 残り時間をカウントダウン表示する
const showCountdown = startTime => {

  // 現在日時を取得(1970-01-01 00:00:00からのミリ秒)
  var nowTime = Date.now();
  // 開始日時に20000ミリ秒を足して終了時間を用意（テスト用で開始から20秒後）
  var endTime = startTime + 20000;
  // 引き算して残り時間を計算
  var limitTime = endTime - nowTime;

  // 残り時間のミリ秒を、分と秒に分割
  var limitMin = limitTime / ( 1000 * 60 );   // 分
  limitTime = limitTime % ( 1000 * 60 );
  var limitSec = limitTime / 1000;   // 秒
  var msg = Math.floor(limitMin) + "分" + Math.floor(limitSec) + "秒";

  // 表示する文字列の作成
  if( limitTime > 0 ) {
     // 残り時間がある場合
     msg = "あと " + msg + " です。";
  }
  else {
     // 残り時間がなくなって以降
     msg = "Enjoy your trip！";
  }

  // 作成した文字列を表示
  document.getElementById("count-down").innerHTML = msg;
};
