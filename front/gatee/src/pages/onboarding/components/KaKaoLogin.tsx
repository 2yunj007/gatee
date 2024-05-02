import React from 'react';
import { ReactComponent as LineLogo } from "@assets/images/logo/logo_line.svg"
import { Link } from "react-router-dom";
import { ReactComponent as KaKao } from "@assets/images/signup/kakao_narrow.svg"

const KaKaoLogin = () => {
  // 카카오 로그인
  const web: string = "http//localhost:3000/signup"
  const mobile: string = "http://192.168.35.47:3000/signup"

  const loginWithKaKao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: mobile,
      scope: "profile_nickname",
    })
  }

  return (
    <div className="onboarding__container-center">

      <div className="slider__container">
        {/* 한줄 소개 */}
        <div className="textFlex">
          <h2>가족들과 같이, </h2><h1>가티</h1>
        </div>

        {/* 중간 부분 */}
        <div className="explain">

          {/* 로고 */}
          <LineLogo width={150} height={150}/>
          {/* 로고가 캡쳐화면만큼 크면 안되니까 div 요소 삽입하여 크기 조절 */}
          <div className="emptyBox"></div>

        </div>

        {/* 로그인 버튼 */}
        <button
          className="kakaoLoginButton"
          onClick={loginWithKaKao}
        >
          <KaKao className="kakaoLoginImage "/>
        </button>

      </div>
    </div>
  );
}

export default KaKaoLogin;