import React from 'react'
import { UserCard } from './UserCard'
import { useState,useEffect,useContext } from 'react'
import { consultProfessions,consultViews } from '../../api/api'
import { contextUser } from '../../Hooks/userContext';

export const UserContain = () => {

  let context=useContext(contextUser)
  const [categories,setCategories]=useState("Desarrollador de software")
  const [professions,setProfessions]=useState([])
  const [loged,setLoged]=useState(false)

useEffect(()=>{
  async function loadProfessions() {
    if (categories == "Vistos") {
      const views = await consultViews()
      setProfessions(views.data);
    }else{
    const result= await consultProfessions(categories)
    setProfessions(result.data);
    }
  }
  loadProfessions()
},[categories])

useEffect(()=>{
  async function loadLoged() {
    if (context.loged) {
      setLoged(true)
      const views = await consultViews()
      if (views.data == "no views") {
        setLoged(false)
      }
    }
  }
  loadLoged()
},[])
  const chageCategorie=(event)=> {
    let profession= event.target.value
    if (profession!=categories) {
     setCategories(profession)
    }
   
  }

  return (

    <div className="main-categories">
      <section className="categories">
      <select name="profession" onChange={chageCategorie}>
                <option selected disabled>Elija una profesión</option>
                <option value="Diseñador grafico">Diseñador gráfico</option>
                <option value="Fotografo">Fotógrafo</option>
                <option value="Desarrollador de software">Desarrollador de software</option>
                <option value="Coach personal">Coach personal</option>
                <option value="Desarrollador de aplicaciones moviles">Desarrollador de aplicaciones móviles</option>
                <option value="Diseñador de interiores">Diseñador de interiores</option>
                {loged ? <option value="Vistos" >Vistos</option> : null} 
                
              </select>
              <div className="main-title">
                <p className='title-Profession-Catalogue'>{categories}</p>
              </div>
    </section>
    <section className="mega-user-contain">
        <UserCard arrayProfessions={{arrayProfessions:professions}}/>
    </section>
    </div>
  )
}
