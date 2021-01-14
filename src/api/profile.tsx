import axios from './index';
import {RegisterPayload} from "@/types/profile";
import {AxiosResponse} from "axios";

export function validate() {
  return axios.get('/user/validate');
}

export function register<T>(values:RegisterPayload) {
  return axios.post<T,AxiosResponse<T>>('/user/register',values)
}