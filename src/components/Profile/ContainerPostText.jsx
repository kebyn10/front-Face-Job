import React,{useContext,useEffect,useState} from 'react'
import {PostsTexts} from './PostTexts';
/*import { Post } from './Post'
import { contextUser } from '../../Hooks/userContext';*/
export const ContainerPostText = () => {

  return (
    <section className="container-post">
      <PostsTexts />
    </section>
  )
}
