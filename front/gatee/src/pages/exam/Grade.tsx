import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import GradeNotFound from "@pages/exam/components/GradeNotFound";
import {ExamResult, MemberApiRes} from "@type/index";
import {getFamilyExamResultApi} from "@api/exam";
import {useFamilyStore} from "@store/useFamilyStore";
import getGradeSvg from "@utils/getGradeSvg";
import getUserInfoByMemberFamilyId from "@utils/getUserInfoByMemberFamilyId";
import Stamp from "@assets/images/icons/stamp_logo.png"


const ExamGrade = () => {
  const params = useParams();
  const {familyInfo} = useFamilyStore();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<MemberApiRes | null>(null);
  const [avgGrade, setAvgGrade] = useState<null | number>(null)

  const [gradeDataList, setGradeDataList] = useState<ExamResult[]>([]);


  useEffect(() => {
    if (params.memberFamilyId) {
      setUserInfo(getUserInfoByMemberFamilyId(familyInfo, Number(params.memberFamilyId)));
    }

  }, [params]);

  useEffect(() => {
    if (userInfo?.memberFamilyId) {
      getFamilyExamResultApi(userInfo?.memberFamilyId,
        res => {
          setGradeDataList(res.data);
          setIsLoading(false);
          if (res.data?.length) {
            const scores = res.data.map(item => item.score);
            const scoreSum = scores.reduce((sum, score) => sum + score, 0);
            const average = Math.ceil(scoreSum / scores.length);
            setAvgGrade(getGradeSvg(average));
          }
        }, err => {
          console.log(err);
        })
    }
  }, [userInfo]);

  return (
    <div className="exam-grade">

      {/* 상단 헤더 */}
      {isLoading ? null :
        avgGrade === null ?
          <GradeNotFound/>
          :
          <>

            <div className="exam__grade-header">
              <div className="small">{userInfo?.nickname}의 평균 점수는?</div>
              <div className="large"> {avgGrade}등급</div>
            </div>
            <div className="exam__grade-body">

              {/*표 제목 - 인덱스*/}
              <div className="exam-grade-data">
                <div className="flex-date bgGray">날짜</div>
                <div className="flex-point bgGray">점수</div>
                <div className="flex-comment bgGray">등급</div>
              </div>

              {/*표 내용 */}
              {gradeDataList.map((gradeData, index) => {
                return <Table key={index} gradeData={gradeData}/>;
              })}
            </div>

            {/* 하단 도장 */}
            <div className="exam__grade-footer">
              <p>가족 퀴즈 모의고사 평가원장</p>
              <img src={Stamp} alt=""/>
            </div>
          </>

      }

    </div>
  );
}

// 표
const Table = ({gradeData}: { gradeData: ExamResult }) => {
  const navigate = useNavigate();

  // 등급
  const score = gradeData.score;
  const grade = getGradeSvg(score);

  return (
    <div className="exam-grade-data" onClick={() => navigate(`/exam/${gradeData.examId}`)}>
      <div className="flex-date">{gradeData.createdAt}</div>
      <div className="flex-point">{gradeData.score}/100</div>
      <div className="flex-comment">{grade}</div>
    </div>
  )
}
export default ExamGrade;