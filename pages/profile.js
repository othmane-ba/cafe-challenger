import Layout from "../components/Layout";
import Divider from '@mui/material/Divider';
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile_details from "../components/profile";
import { isEmpty } from "../utils/Utils";
import Edit_Password from "../components/password";
export default function profile2() {
    const client = useSelector((state) => state.client);
    const [info,setInfo]=useState('')
    const router=useRouter()
    useEffect(()=>{
      const token=localStorage.getItem('new').split('||')
    if(isEmpty(token[1])){
        router.push('/login')
    }
    if(!isEmpty(client)){
      console.log(client)
      const adresse=isEmpty(client[0].address)?'':client[0].address
      const telephone=isEmpty(client[0].phone_number)?'':client[0].phone_number
      setInfo({nom:client[0].last_name,prenom:client[0].first_name,email:client[0].email,password:client[0].password,adresse:adresse,telephone:telephone})
      }  
    },[client])
    
  return (
    <Layout title="Espace client" subtitle="Détails du profil">
        <div className="container-wrapper flex h-full items-center justify-center py-7">
            <div className="grid grid-cols-1 gap-7 border border-gray-300 shadow-lg p-6 rounded-md max-w-full w-full">
                <div className='grid grid-cols-6 md:grid-cols-1 gap-2 py-5'>
                    <div>
                        <h1 className="text-primary text-xl font-semibold uppercase">Détails du profil</h1>
                    </div>
                    <div className="col-span-5">
                    {!isEmpty(client) && !isEmpty(info) && <Profile_details info={info}/>}
                    </div>
                </div>
                <Divider variant="middle" />
                <div className='grid grid-cols-6 md:grid-cols-1 gap-2 py-5'>
                    <div>
                        <h1 className="text-primary text-xl font-semibold uppercase">Modifier le mot de passe</h1>
                    </div>
                    <div className="col-span-5">
                    {!isEmpty(info) && <Edit_Password info={info}/>}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}