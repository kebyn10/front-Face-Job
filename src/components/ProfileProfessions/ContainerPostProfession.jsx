import React,{useContext,useEffect,useState} from 'react'
import { Post } from './PostProfessions'
import {PostsTexts} from './PostTextsProfessions';
import { contextUser } from '../../Hooks/userContext';
export const ContainerPost = () => {
  let contextPosts=useContext(contextUser)


  return (
    <section className="container-post">
      {contextPosts.imagesTexts ? <Post  /> : <PostsTexts />} 
    </section>
  )
}
