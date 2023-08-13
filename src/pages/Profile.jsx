import React from 'react'
import { Banner } from '../components/Profile/Banner'
import { ContainerPost } from '../components/Profile/ContainerPost'
import { Sidebar } from '../components/Header/Sidebar'
export const Profile = () => {
  return (
    <section className="section-profile">
      <Sidebar/>
      <Banner/>
      <ContainerPost/>
    </section>
  )
}
