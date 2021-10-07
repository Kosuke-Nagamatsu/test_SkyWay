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
    
    meta.innerText = `
      UA: ${navigator.userAgent}
      SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
    `.trim();
    
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
