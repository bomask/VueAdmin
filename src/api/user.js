import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'
import qs from 'qs'

export async function login(data) {
  // if (loginRSA) {
  //   data = await encryptedData(data)
  // }
  if (data) {
    console.log(data)
  }
  return request({
    url: '/login',
    method: 'post',
    data: data,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
