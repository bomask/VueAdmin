import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'
import qs from 'qs'

export async function addBlog(data) {
  return request({
    url: '/blogManager/addBlog',
    method: 'post',
    data: data,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export async function labelList(data) {
  return request({
    url: '/blogManager/getLabel',
    method: 'get',
  })
}
