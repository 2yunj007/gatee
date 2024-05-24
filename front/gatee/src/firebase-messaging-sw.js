import 'firebase/messaging';
import { getPushAlarmByLocalStorageApi } from "@api/firebase";
import firebase from "./firebase-config";

const VALID_KEY = process.env.REACT_APP_FCM_VAPID_KEY;

let messaging;

// 브라우저 문제로 오류나서 추가한 것
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

export async function requestPermission() {
  if (firebase.messaging.isSupported()) {
    const permission = await Notification.requestPermission();
    if (permission === "denied") {
      console.log("FCM 알림 권한이 거부되었습니다. 앱 설정 -> 가티 -> 알림 허용해 주세요.");
      return;
    } else {
      console.log("FCM 알림 권한 허용");
    }

    const token = await messaging.getToken({
      vapidKey: VALID_KEY,
    });

    // 토큰 조회한 뒤, 서버로 토큰 구독
    if (token) {
      // 스토어에 저장
      localStorage.setItem('fcmDeviceToken', token);
      // 서버로 토큰 구독하기
      getPushAlarmByLocalStorageApi()
    } else {
      console.log("FCM device token을 얻지 못함");
    }
  } else {
    console.log("지원되지 않는 브라우저")
  }
}
