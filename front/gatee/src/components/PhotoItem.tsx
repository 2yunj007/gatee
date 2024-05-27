import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useFamilyStore} from "@store/useFamilyStore";
import {useMemberStore} from "@store/useMemberStore";
import {createReactionPhotoApi, deleteDetailPhotoApi, deleteReactionPhotoApi} from "@api/photo";
import {IoHeart, IoHeartOutline} from "react-icons/io5";
import {RiDeleteBin6Line} from "react-icons/ri";


interface MemberReaction {
  memberId: string;
  content: string;
}

interface PhotoDetailData {
  reactionList: MemberReaction[];
  imageUrl: string;
  isReaction: boolean;
  photoId: number;
}


const PhotoItem = ({photoDetailData}: { photoDetailData: PhotoDetailData }) => {
  const {myInfo} = useMemberStore()
  const [isPressed, setIsPressed] = useState(photoDetailData.isReaction);
  const {familyInfo, familyId} = useFamilyStore()
  const [reactionList, setReactionList] = useState(photoDetailData.reactionList)
  const navigate = useNavigate();
  // 멤버 Id 받아서 아이콘 Url 반환하는 함수
  const findProfile = (memberId: string) => {
    if (familyInfo.length > 0) {
      return familyInfo.find(member => member.memberId === memberId)?.profileImageUrl;
    } else {
      return ""
    }
  }
  // 좋아요 누르기
  const createReactionPhotoApiFunc = () => {
    createReactionPhotoApi(
      photoDetailData.photoId,
      res => {
        setIsPressed(!isPressed);
        setReactionList(prevReactionList => {
          // memberId가 12인 원소가 이미 있는지 확인
          const existingReaction = prevReactionList.find(reaction => reaction.memberId === myInfo.memberId);
          if (!existingReaction) {
            // memberId가 12인 원소가 없으면 추가
            return [...prevReactionList, {memberId: myInfo.memberId, content: "heart"}];
          }
          return prevReactionList; // 이미 좋아요를 눌렀으면 변동 없음
        });

      },
      err => {
        console.error(err);
      }
    )
  }

  // 좋아요 취소하기
  const deleteReactionPhotoApiFunc = () => {
    deleteReactionPhotoApi(
      photoDetailData.photoId,
      res => {
        setIsPressed(!isPressed);
        // API 호출 성공 시 reactionList 업데이트
        setReactionList(prevReactionList => {
          // memberId가 12인 원소를 제외한 배열 반환
          return prevReactionList.filter(reaction => reaction.memberId !== myInfo.memberId);
        });
      },
      err => {
        console.error(err);
      }
    )
  }

  // 좋아요 누르기 함수
  const pressHeart = () => {
    if (!isPressed) {
      createReactionPhotoApiFunc();
    } else {
      deleteReactionPhotoApiFunc();
    }
  };

  const deletePhotoApiFunc = () => {
    deleteDetailPhotoApi(
      photoDetailData.photoId, familyId,
      res => {
        navigate("/photo");
      }, err => {
        console.error(err);
        navigate("/photo");
      })
  }

  useEffect(() => {
    setIsPressed(photoDetailData.isReaction);
    setReactionList(photoDetailData.reactionList);
  }, [photoDetailData]);

  return (
    <div className="photo-detail--container">
      {/* 서버 주소로 변경할 것 */}
      <img className="photo-detail-img" src={photoDetailData.imageUrl} alt=""/>

      <div className="interaction--container">
        <div className={`liked--container${isPressed ? '--active' : ''}`}>
          <IoHeart onClick={pressHeart} size={35}/>

          {/* 좋아요 누른 사람 */}
          <div className="liked-profiles--container">
            {reactionList.map((item, index) => {
              return <img key={index} className="liked-icon" src={findProfile(item?.memberId)} alt=""/>;
            })}
          </div>
        </div>
        <RiDeleteBin6Line size={30} color="gray" onClick={deletePhotoApiFunc}/>
      </div>
    </div>
  );
};

export default PhotoItem;
