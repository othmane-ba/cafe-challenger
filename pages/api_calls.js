import axios from 'axios';

export async function Api_get(action,param={}) {
let URL='http://192.168.100.63:4000/api/traite-commercial/'
URL+=action
  const token=localStorage.getItem('token')
  if(token){
    URL+='?token='+token
  }
    const result=await axios.get(URL)
  return result.data
}
export async function Api_post(action,data,param={}) {
let URL='http://192.168.100.63:4000/api/traite-commercial/'
URL+=action
  const token=localStorage.getItem('token')
  let query=''
  if(token){
    query+='?token='+token
  }
    for(const key in param){
      if(!query){
        query='?'
      }
      query+='&'+key+'='+param[key]
    }
    URL+=query
    console.log(data)
    const result = await axios.post(URL,{data})
  return result.data
}