import { useState } from "react"



function CategoriesChats() {
    const [categories,setCategories]=useState('categories')
    const [works,setWorks]=useState()
    function changeCategories() {
        
    }
    return(
        <>
        <div className="cate-Chats">Tus clientes</div>
        <div className="block-chat active-chat" >
                <div className="imgbx-chat">
                    <img src="https://d500.epimg.net/cincodias/imagenes/2017/05/18/smartphones/1495098488_805979_1495098787_noticia_normal.jpg"  />
                </div>
                <div className="details-chat">
                    <div className="listHead-chat" >
                        <h4 >Clientes</h4>
                        <p className="time" >2</p>
                    </div>
                    <div className="message-p-chat">
                    <p>dsfsdf</p> 
                    </div>
                </div>
            </div>
            <div className="block-chat active-chat" >
                <div className="imgbx-chat">
                    <img src="https://d500.epimg.net/cincodias/imagenes/2017/05/18/smartphones/1495098488_805979_1495098787_noticia_normal.jpg"  />
                </div>
                <div className="details-chat">
                    <div className="listHead-chat" >
                        <h4 >Clientes</h4>
                        <p className="time" >2</p>
                    </div>
                    <div className="message-p-chat">
                    <p>dsfsdf</p>
                    </div>
                </div>
            </div>
            <div className="block-chat active-chat" >
                <div className="imgbx-chat">
                    <img src="https://d500.epimg.net/cincodias/imagenes/2017/05/18/smartphones/1495098488_805979_1495098787_noticia_normal.jpg"  />
                </div>
                <div className="details-chat">
                    <div className="listHead-chat" >
                        <h4 >Clientes</h4>
                        <p className="time" >2</p>
                    </div>
                    <div className="message-p-chat">
                    <p>dsfsdf</p>
                    </div>
                </div>
            </div>
            <div className="block-chat active-chat" >
                <div className="imgbx-chat">
                    <img src="https://d500.epimg.net/cincodias/imagenes/2017/05/18/smartphones/1495098488_805979_1495098787_noticia_normal.jpg"  />
                </div>
                <div className="details-chat">
                    <div className="listHead-chat" >
                        <h4 >Clientes</h4>
                        <p className="time" >2</p>
                    </div>
                    <div className="message-p-chat">
                        <p>dsfsdf</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoriesChats