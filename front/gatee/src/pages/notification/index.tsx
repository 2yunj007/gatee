import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import FeatureModal from "@pages/notification/components/FeatureModal";
import SettingsToast from "@pages/notification/components/SettingsToast";
import NaggingModal from "@pages/notification/components/NaggingModal";
import {NotificationRes} from "@type/index";
import {
  getNotificationListFirstApi,
  getNotificationListNextApi,
  readNotificationApi
} from "@api/notification";
import {useModalStore} from "@store/useModalStore";
import {useNotificationStore} from "@store/useNotificationStore";
import useModal from "@hooks/useModal";
import useObserver from "@hooks/useObserver";
import getUrlFromType from "@utils/getUrlFromType";
import ScrollAnimation from "@assets/images/animation/scroll_animation.json";
import dayjs from "dayjs";
import Lottie from "lottie-react";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';


type Anchor = 'top' | 'left' | 'bottom' | 'right';


const NotificationIndex = () => {
  // 열린지 닫힌지 상태 확인 가능
  const [state, setState] = useState({
    bottom: false,
  });

  // 모달 상태 관리
  const {isOpen: isNaggingModalOpen, openModal: openNaggingModal, closeModal: closeNaggingModal} = useModal();
  const {isOpen: isFeatureModalOpen, openModal: openFeatureModal, closeModal: closeFeatureModal} = useModal();

  // MUI 관련 코드 -> 슬라이드 다운 해서 내리기 기능 가능
  const toggleDrawer = (anchor: Anchor, open: boolean) =>(event: React.KeyboardEvent | React.MouseEvent) => {
        if (open === true) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({...state, [anchor]: open});
      };

  // 설정 탭에서 완료 버튼 누를 때 팝업 내리기
  const handleFinishTab = (event: React.MouseEvent) => {
    toggleDrawer('bottom', false)(event);
  }

  // 토스트 객체
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: 'auto'
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      style={{backgroundColor: "#7B7B7B"}}
    >
      {/* 토스트 팝업 되는 컴포넌트 넣기 */}
      <SettingsToast handleFinishTab={handleFinishTab}/>
    </Box>
  );

  const navigate = useNavigate();
  const {setShowModal} = useModalStore();
  const {notificationPopUp, setShowNotification} = useNotificationStore();
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [clickedNotification, setClickedNotification] = useState<NotificationRes | null | undefined>(null)
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isGetAllData, setIsGetAllData] = useState<boolean>(false);
  const {notificationDataList, setNotificationDataList, setNotificationChecked} = useNotificationStore();
  const [isCallNextData, setIsCallNextData] = useState<boolean>(false);

  // 읽음 처리
  const handleReadNotification = (id: string, isCheck: boolean) => {
    const clicked = notificationDataList.find((item) => item.notificationId === id)
    setClickedNotification(clicked);
    if (clicked && clicked?.type === "NAGGING")
      openNaggingModal();
    else if (clicked && clicked?.type === "FEATURE")
      openFeatureModal();

    if (!isCheck) {
      readNotificationApi({notificationId: id}
        , res => {
          // 이동해야 할 때 navigate
          if (clicked?.type !== "NAGGING" && clicked?.type !== "FEATURE")
            navigate(getUrlFromType(clicked?.type, clicked?.typeId));

          // 이동 안 할 때는 상태 업데이트(css) 변경
          setNotificationChecked(id);
        }
        , err => {
          console.log(err);
        })
    } else if (clicked?.type !== "NAGGING" && clicked?.type !== "FEATURE") {
      navigate(getUrlFromType(clicked?.type, clicked?.typeId));
    }
  }

  // 모달 내리기
  const handleModal = () => {
    closeNaggingModal();
    closeFeatureModal();
  }

  useEffect(() => {
    if (nextCursor && isCallNextData) {
      getNotificationListNextApi(nextCursor,
        res => {
          // 배열 추가
          setNotificationDataList([
            ...notificationDataList,
            ...res.data.pushNotificationResList
          ]);
          setHasNext(res.data.hasNext);
          setNextCursor(res.data.nextCursor);
          setIsGetAllData(!res.data.hasNext);
          setIsCallNextData(false);
        }, err => {
          console.log(err);
          setIsCallNextData(false);
        })
    }
  }, [nextCursor, isCallNextData]);

  // 스크롤
  const nextScroll = () => {
    setLoading(true);
    setIsCallNextData(true);
  }

  const {target} = useObserver({
    fetcher: nextScroll,
    dependency: notificationDataList,
    isLoading: isCallNextData
  })

  useEffect(() => {
  }, [target.current]);

  const getNotificationListFirstApiFunc = () => {
    if (isLoading) return;

    setShowNotification(false);

    getNotificationListFirstApi(
      res => {
        setNotificationDataList(res.data.pushNotificationResList);
        setHasNext(res.data.hasNext);
        setNextCursor(res.data.nextCursor);
      }, err => {
        console.log(err);
      })
  }
  // 알림 리스트 가져오기
  useEffect(() => {
    getNotificationListFirstApiFunc();
  }, []);

  // 알림 뜨면 새로 갱신
  useEffect(() => {
    if (notificationPopUp !== null) {
      getNotificationListFirstApiFunc();
    }
  }, [notificationPopUp]);

  return (
    <div className="notification-tab--container">

      {/* 상단 */}
      <div className="notification--top--container">
        <h2>알림 목록</h2>

        {/* 토스트 팝업 버튼 */}
        <React.Fragment key={"bottom"}>
          <Button onClick={toggleDrawer("bottom", true)}>
            알림 설정
          </Button>
          <SwipeableDrawer
            anchor={"bottom"}
            open={state["bottom"]}
            onClose={toggleDrawer("bottom", false)}
            onOpen={toggleDrawer("bottom", true)}>
            {list("bottom")}
          </SwipeableDrawer>
        </React.Fragment>

      </div>

      <div className="notification-list-container">
        {/* 알림 개별 아이템 */}
        {notificationDataList.map((item, index) => {
          return <NotificationItem key={index} notificationData={item} handleReadNotification={handleReadNotification}/>
        })}

        {(!isGetAllData && notificationDataList.length >= 10) && (
          <div className="scroll-target" ref={target}>
            <Lottie className="scroll-target__animation" animationData={ScrollAnimation}/>
          </div>
        )}

      </div>
      {isGetAllData ?
        <div className="notification-scroll-finish-explain">
          모든 알림을 조회하였습니다.
        </div>
        : null}
      {isNaggingModalOpen ?

        <NaggingModal notificationData={clickedNotification} handleModal={handleModal}/>

        :
        null}
      {isFeatureModalOpen ?
        <FeatureModal notificationData={clickedNotification} handleModal={handleModal}/>
        : null}
    </div>
  );
};

// 알림 아이템
const NotificationItem = ({notificationData, handleReadNotification}: { notificationData: NotificationRes, handleReadNotification: (id: string, isCheck: boolean) => void }) => {
  const today = dayjs();
  const notificationDate = dayjs(notificationData.createdAt);

  let displayTime;

  if (notificationDate.isSame(today, 'day')) {
    displayTime = notificationDate.format('HH:mm');
  } else if (notificationDate.isSame(today, 'year')) {
    displayTime = notificationDate.format('M월 D일');
  } else {
    displayTime = notificationDate.format('YYYY년 M월');
  }

  // 알림 누르기
  const handleNotificationItemClick = () => {
    handleReadNotification(notificationData.notificationId, notificationData.isCheck);
  }
  return (
    <div onClick={() => handleNotificationItemClick()}
         className={notificationData.isCheck ? "notification-item--container read" : "notification-item--container"}>

      {/* 프로필 아이콘 이미지 */}
      <img className="notification-item-profile--img"
           src={notificationData.senderImageUrl}
           alt="프사"/>

      {/* 내용 */}
      <div className="notification-item--content-container">
        <div className="notification-item--top--container">
          <p className="notification-item-title">{notificationData.title}</p>
          <p className="notification-item-time">
            {displayTime}
          </p>
        </div>
        <p className="notification-item-content">{notificationData.content}</p>
      </div>
    </div>
  )
}

export default NotificationIndex;