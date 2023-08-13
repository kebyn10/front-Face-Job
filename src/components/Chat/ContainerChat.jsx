import LeftSide from '../Chat/LeftSide'
import RightSide from '../Chat/RightSide'
import { useContext } from 'react'
import { contextUser } from '../../Hooks/userContext'
import Cookie from "universal-cookie";

export const ContainerChat = () => {
    const context=useContext(contextUser)
    const cookie = new Cookie()

    cookie.set('style-left',"leftSide-chat")
    localStorage.setItem("style-left","leftSide-chat")
  return (
    <section className="chat-box">
            <LeftSide  text={{text:context.soket}}/>
            <RightSide text={{text:context.soket}}/>
    </section>
  )
}
