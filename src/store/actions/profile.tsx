import * as actionTypes from '@/store/action-types'
import {validate} from '@/api/profile';
import {push} from 'connected-react-router'

export default  {
   validate() {
      return {
         type:actionTypes.VALIDATE,
         payload:validate()
      }
   },
   logout(){
      return function (dispath:any) {
         console.log(11);
         sessionStorage.removeItem('access_token');
         dispath(push('/login'))
      }
   }
}