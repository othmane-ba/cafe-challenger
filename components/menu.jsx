
import { useEffect, useState } from "react";
import { isEmpty } from "../utils/Utils";
import Products from "../components/Products";
import { useSelector } from "react-redux";
export default function ChallengerMenu() {
    
  const categories = useSelector((state) => state.categories);
  const data = useSelector((state) => state.menu);
  const [menu,setMenu]=useState()
  const [parent1,setParent1]=useState(0)
  const [parent2,setParent2]=useState(0)
  const [active,setActive]=useState({parent:'',child:'',second:''})
  useEffect(()=>{
    setMenu(data)
    console.log('hello')
  },[data])
  const [categorieTitle,setCategorieTitle]=useState('toutes les catégories')
  const changeCategorie=(title,id)=>{
    setCategorieTitle(title)
    setMenu(data.filter(item=>item.categorie===id));
    setParent1(id)
    setActive({parent:id,child:'',second:''})
    setParent2("")
  }
  const changeChildCategorie=(title,id)=>{
    setCategorieTitle(title)
    setMenu(data.filter(item=>item.categorie===id));
    setParent2(id)
    setActive({...active,child:id,second:''})
  }
  const FinalCategorie=(title,id)=>{
    setCategorieTitle(title)
    setMenu(data.filter(item=>item.categorie===id));
    setActive({...active,second:id})
  }

  return (
    <div className="grid grid-cols-1 gap-4 py-14 justify-items-center">
        <div className="relative flex flex-col gap-2 items-center py-6 px-6 bg-white w-11/12 h-full rounded-md hover:scale-105 transition-all duration-300 sm:hidden">
              <div className="flex-1 flex flex-col items-center px-5">
              <h3 className="text-primary text-2xl font-semibold uppercase">Categories</h3>
            </div>
            <div className="grid grid-cols-8 lg:grid-cols-4 md:grid-cols-2 flex flex-wrap gap-5 place-items-center justify-center">
          {!isEmpty(categories) && categories.filter(item=>item.niveau===0)?.map((categorie) => (
            <div
              key={categorie.id}
              className={`cursor-pointer relative flex flex-col gap-2 py-5 items-center ${active.parent==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-full h-full rounded-md shadow-lg hover:scale-105 transition-all duration-300`}
              onClick={()=>changeCategorie(categorie.title,categorie.id)}
            >

              <div className="h-10">
                <img
                  className="w-full h-full object-contain rounded-md"
                  src={categorie.image}
                  alt="product-img"
                />
              </div>

              <div className="flex-1 flex flex-col items-center px-5">
                <h3 className={`text-l font-semibold ${active.parent==categorie.id? "text-white" :"text-primary"}`}>
                  {categorie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
          </div>
          <div className="grid grid-cols-12 gap-4 w-11/12">
        <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 flex flex-wrap gap-5 place-items-center justify-center">
                {!isEmpty(categories) && categories.filter(item=>item.niveau>0 && item.parent==parent1)?.map((categorie) => (
                  <div key={categorie.key} onClick={()=>changeChildCategorie(categorie.title,categorie.id)} className={`cursor-pointer relative flex flex-col gap-2 items-center py-6 ${active.child==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-full h-full rounded-md shadow-lg hover:scale-105 transition-all duration-300`}>
                  <div className="flex-1 flex flex-col items-center px-5">
                    <h3 className={`text-l font-semibold ${active.child==categorie.id? "text-white" :"text-primary"}`}>{categorie.title}</h3>
                  </div>
                </div>
                ))}
              </div>
        </div>
        <div className="col-span-11">
            <div className="text-center flex flex-col h-full">
              <div>
                <h2 className="text-secondary text-l font-semibold mt-5">Nos plats</h2>
                <h3 className="text-primary text-2xl font-semibold uppercase">{categorieTitle}</h3>
              </div>
              <div className="grid grid-cols-3 mx-8 lg:grid-cols-4 md:grid-cols-2 flex flex-wrap gap-5 place-items-center justify-center">
                {!isEmpty(categories) && categories.filter(item=>item.niveau==2 && item.parent==parent2)?.map((categorie) => (
                  <div key={categorie.key} onClick={()=>FinalCategorie(categorie.title,categorie.id)} className={`cursor-pointer relative flex flex-col gap-2 items-center py-6 ${active.second==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-full h-full rounded-md shadow-lg hover:scale-105 transition-all duration-300`}>
                  <div className="flex-1 flex flex-col items-center px-5">
                    <h3 className={`text-l font-semibold ${active.second==categorie.id? "text-white" :"text-primary"}`}>{categorie.title}</h3>
                  </div>
                </div>
                ))}
              </div>
              <div className="my-8 overflow-y-scroll max-h-screen flex-1">
                <Products items={menu} categorie={active}/>
              </div>
            </div>
            </div>
          </div>
      </div>
  )
}