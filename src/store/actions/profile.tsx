import * as actionTypes from '@/store/action-types'
import {register, validate} from '@/api/profile';
import {push} from 'connected-react-router'
import {RegisterPayload} from "@/types/profile";
import {message} from "antd";
import {RegisterData} from "@/types/response";
import {AxiosResponse} from "axios";

export default  {
   validate() {
      return {
         type:actionTypes.VALIDATE,
         payload:validate()
      }
   },
   logout(){
      return function (dispatch:any) {
         sessionStorage.removeItem('access_token');
         dispatch(push('/login'))
      }
   },
   register(values:RegisterPayload) {
      return function (dispatch:any,getState:any) {
         (async function () {
            try {
              const result:AxiosResponse<RegisterData> = await register<RegisterData>(values)
               if(result.data.success) {
                  dispatch(push('/login'))
               }else {
                  message.error("注册失败")
               }
            }catch (error) {
               message.error('注册失败')
            }
         })()
      }
   }
}