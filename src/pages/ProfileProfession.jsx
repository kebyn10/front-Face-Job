import React from 'react'
import { Banner } from '../components/ProfileProfessions/BannerProfession'
import { ContainerPost } from '../components/ProfileProfessions/ContainerPostProfession'
import { Sidebar } from '../components/Header/Sidebar'
export const ProfileP = () => {

  return (
    <section className="section-profile">
      <Sidebar/>
      <Banner/>
      <ContainerPost/>
    </section>
  )
}
