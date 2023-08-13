import { useEffect,useState,useContext } from "react";
import { postCategories,checkView,infoPack,updateView } from "../../api/api";
import { contextUser } from "../../Hooks/userContext";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export const PostRandom = () =>{

    let context=useContext(contextUser)
    let navigate=useNavigate()
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        async function loaddPosts() {
            const response = await postCategories()
          
            let postArray=[]
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i] != null) {
                postArray.push(response.data[i])
              }
            }
            setPosts(postArray)
        }
        loaddPosts()
        
    },[])

    async function goProfile(params) {
        if (context.loged) {
          const resView = await checkView({emailUser:params})
       
          await context.chageEmailProfessions(params)
          if(resView.data == "Yes seen"){
            
              if (context.emailProfessions!="null") {
              navigate('/ProfileProfessions')
              }else{
              console.log("no cambio");
              }
          }
          if(resView.data == "Not seen"){
            const response = await infoPack()
            if (response.data.data == "access") {
              const update = await updateView({emailUser:params})
              if (context.emailProfessions!="null") {
              navigate('/ProfileProfessions')
              }else{
              console.log("no cambio");
              }
            }else{
              Swal.fire({
                position: "center",
                icon: "warning",
                title: "Necesitas un paquete para ver el perfil",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              }); 
              navigate('/paquetes')
            }
          }
          
        }else{
          Swal.fire({
            position: "center",
                icon: "warning",
                title: "Necesitas iniciar sesión",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
          }); 
          navigate('/login')
        }
       
      }

    return (
        <>
        {posts.map((post)=>(
            <div data-aos="fade-up" data-aos-duration="500" className="post" key={post.email}>
            <div className="post-info">
              <div className='post-info--c'>
                <div className="post-icon">
                      <img src={post.iconUser} alt="icon"/>
                </div>
                  <div>
                    <h2 style={{cursor:"pointer"}} onClick={()=>{goProfile(post.email)}}>{post.name}</h2>
                    <p style={{cursor:"pointer"}} onClick={()=>{goProfile(post.email)}}>{post.profession}</p>
                  </div>
              </div>
            </div>
            <div className="post-img" >
            <img src={post.img} alt="" />
        </div>
            <div className="post-content">
                <h2>{post.name}</h2>
                <p>{post.description}</p>
            </div>
        </div>
        ))}
        </>
    )
}