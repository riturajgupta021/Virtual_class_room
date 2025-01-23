import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, Server_Secret } from './constant';

const VideoPage = () => {
    const {id}  = useParams()
    const roomID = id    
    let myMeeting = async (element) => {
    const appID = APP_ID;
    const serverSecret = Server_Secret;
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),  "Enter Display Name Here",  3600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'copy link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
}
  return (
    <div ref={myMeeting}>
      
    </div>
  )
}

export default VideoPage
