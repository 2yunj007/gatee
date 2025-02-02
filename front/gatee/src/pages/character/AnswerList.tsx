import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Header from "@pages/character/components/Header";
import AnswerItem from "@pages/character/components/AnswerItem";
import {useMemberStore} from "@store/useMemberStore";
import {useFamilyStore} from "@store/useFamilyStore";
import {useDictStore} from "@store/useDictStore";
import {Answer, MemberApiRes} from "@type/index";
import {getAnsweredAskApi, getFamilyAnsweredAskApi} from "@api/dictionary";
import getUserInfoByMemberFamilyId from "@utils/getUserInfoByMemberFamilyId";
import {ReactComponent as EmptyIcon} from "@assets/images/examImg/empty.svg";

const CharacterStart = () => {
  const [answerTmpList, setTmpAnswerList] = useState<Answer[]>([]);
  const {setAnswerList} = useDictStore();
  const {myInfo} = useMemberStore();
  const {familyInfo} = useFamilyStore();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isMine, setIsMine] = useState(false);
  const [userInfo, setUserInfo] = useState<MemberApiRes | null>(null);

  useEffect(() => {

    if (params.memberFamilyId) {
      const user = getUserInfoByMemberFamilyId(familyInfo, Number(params.memberFamilyId));
      setUserInfo(user);

      // 나일 때
      if (Number(myInfo.memberFamilyId) === Number(params.memberFamilyId)) {
        setIsMine(true);

        getAnsweredAskApi(res => {
          setTmpAnswerList(res?.data);
          setAnswerList(res?.data);
          setIsLoading(false);

        }, err => {
          console.log(err);
        })
        // 다른 가족일 때
      } else {
        getFamilyAnsweredAskApi(
          params.memberFamilyId,
          res => {
            setTmpAnswerList(res?.data);
            setIsLoading(false);
          },
          err => {
            console.log(err);
          }
        )
      }
    }
  }, [params]);


  return (<>
      {
        isLoading === true ?
          <></> :

          <div className="character__answerList">
            {/* 헤더 */}
            <Header name={userInfo?.nickname}/>
            {/* 사전 작성하기 버튼 */}
            {isMine ?
              <Link to="/character/question"
                    className="orangeButtonLarge">
                사전 작성하기
              </Link>
              :
              null
            }
            {/*답안이 없을 때*/}
            {answerTmpList.length === 0 ?
              <div className="empty-answer-list-container">
                <p>앗! 정보가 없어요</p>
                <EmptyIcon className="empty-answer-list-icon"/>
              </div>
              :
              null
            }
            {/* 작성한 답안 */}
            {answerTmpList.map((item, index) => {
              return (
                <AnswerItem key={index} question={item} index={index} isMine={isMine}/>
              )
            })}
          </div>
      }
    </>
  );
}

export default CharacterStart;