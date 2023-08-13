import React,{useContext,useEffect,useState} from 'react'
import { Post } from './Post'
/*import {PostsTexts} from './PostTexts';
import { contextUser } from '../../Hooks/userContext';*/
export const ContainerPost = () => {

  return (
    <section className="container-post">
      <Post />
    </section>
  )
}
