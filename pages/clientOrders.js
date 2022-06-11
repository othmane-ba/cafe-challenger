import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ClientOrdersTable from "../components/clientOrders";
import Layout from "../components/Layout";
import { isEmpty } from "../utils/Utils";
export default function ClientOrders() {
  const orders = useSelector((state) => state.order);
  const router = useRouter()
  useEffect(()=>{
    const token=localStorage.getItem('new').split('||')
  if(isEmpty(token[1])){
      router.push('/')
  }
  })
  return (
    <Layout subtitle="Client commandes">
      <div>Commandes</div>
      <div className="container-wrapper flex h-full items-center justify-center py-7">
      <ClientOrdersTable orders={orders} /></div>
    </Layout>
  )
}