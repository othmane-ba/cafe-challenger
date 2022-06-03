import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Profile_details from "../components/profile";
import { isEmpty } from "../utils/Utils";

export default function Profile() {
  const router=useRouter()
  useEffect(()=>{
    const token=localStorage.getItem('new').split('||')
  if(isEmpty(token[1])){
      router.push('/login')
  }
  },[])
  
  return (
    <Layout title="Espace client" subtitle="Détails du profil">
        <Profile_details/>
    </Layout>
  )
}