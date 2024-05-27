import React, {useEffect} from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import PhotoList from "@components/PhotoList";
import {PhotoOutletInfoContext} from "@type/index";
import {useFamilyStore} from "@store/useFamilyStore";
import {usePhotoStore} from "@store/usePhotoStore";
import {getListPhotoApi} from "@api/photo";


interface RouteParams {
  [key: string]: string | undefined;
}


const PhotoAllYearGroupDetail = () => {
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  const {familyId} = useFamilyStore();
  const params = useParams<RouteParams>();
  const {detailPhotoGroup, setDetailPhotoGroup} = usePhotoStore();

  // 상세 사진 불러오기
  const getListPhotoApiFunc = (payload: {
                                 familyId: string
                                 filter: string
                                 year: string
                                 month: string | null
                               }
  ) => {
    getListPhotoApi(
      payload,
      res => {
        setDetailPhotoGroup(res.data);
      }, err => {
        console.log(err);
      }
    );
  }

  useEffect(() => {
    // params에서 년 뽑아서 API 호출
    if (params.year) {
      const payload = {
        familyId: familyId,
        filter: "YEAR",
        year: params.year,
        month: null
      };
      getListPhotoApiFunc(payload);

    }
  }, [params.year]);

  return (
    <div>
      <div className="detail-tab--title">
        {params.year}년
      </div>
      <PhotoList editMode={editMode} photoGroup={detailPhotoGroup} handleChecked={handleChecked}/>
    </div>
  );
}

export default PhotoAllYearGroupDetail;