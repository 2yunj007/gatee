import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Header from "./components/Header";
import {getDetailExamResultApi} from "@api/exam";
import QuestionScored from "./components/QuestionItem";
import getScoreImage from "@utils/getScoreImage";
import {TransformedQuestionData} from "@type/index";


const ExamScored = () => {
  const params = useParams();
  const [examDetailResult, setExamDetailResult] = useState<TransformedQuestionData[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (params.examId) {
      getDetailExamResultApi(params.examId,
        res => {
          setExamDetailResult(res.data.examData);
          setScore(res.data.score);
        },
        err => {
          console.error(err);
        })
    }
  }, [params]);

  return (

    <div className="exam__scored">
      <Header/>

      {
        examDetailResult.length === 0 ?
          null :
          <>
            {/* 점수 */}
            <Grade score={score}/>

            {examDetailResult.map((item, index) => {
              return (<QuestionScored key={index} questionNumber={index} question={item}
              />)
            })}

            {/* 하단의 줄 두개 */}
            <div className="exam__scored-footer">
            </div>

            <Link to="/exam/grade" className="exam__scored--goto-grade">
              가족 성적표 보러가기
            </Link>
          </>
      }
    </div>
  );
}

const Grade = ({score}: { score: number }) => {
  return (
    <div className="exam__scored-mark">
      {/* 점수 */}
      {getScoreImage(score)}
    </div>)

}
export default ExamScored;