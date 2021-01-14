import * as actionTypes from '@/store/action-types'
import {login, register, validate} from '@/api/profile';
import {push} from 'connected-react-router'
import {LoginPayload, RegisterPayload} from '@/types/profile';
import {message} from "antd";
import {LoginData, RegisterData} from '@/types/response';

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
              const result:RegisterData = await register<RegisterData>(values)
               if(result.success) {
                  message.success("注册成功");
                  dispatch(push('/login'))
               }else {
                  message.error("注册失败")
               }
            }catch (error) {
               message.error('注册失败')
            }
         })()
      }
   },
   login(values:LoginPayload) {
      return function (dispatch:any,getState:any) {
         (async function () {
            try {
               const result:LoginData = await login<LoginData>(values)
               if(result.success) {
                  message.success("登录成功");
                  sessionStorage.setItem('access_token',result.data)
                  dispatch(push('/profile'))
               }else {
                  message.error("登录失败")
               }
            }catch (error) {
               message.error('登录失败')
            }
         })()
      }
   },
}