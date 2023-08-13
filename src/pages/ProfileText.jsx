import React from 'react'
import { Banner } from '../components/Profile/Banner'
import { ContainerPostText } from '../components/Profile/ContainerPostText'
import { Sidebar } from '../components/Header/Sidebar'
export const ProfileText = () => {
  return (
    <section className="section-profile">
      <Sidebar/>
      <Banner/>
      <ContainerPostText/>
    </section>
  )
}