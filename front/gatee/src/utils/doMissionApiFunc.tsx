import {doMissionApi} from "@api/mission";

const doMissionApiFunc = (type: string, amount: number | null) => {
  doMissionApi({
    type: type,
    photoCount: amount,
  },res => {
  },err => {
    console.log(err);
  })

};

export default doMissionApiFunc;