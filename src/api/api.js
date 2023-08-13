import axios from "axios";
import Cookie from "universal-cookie";

//let url = "http://localhost:4000"
let url = "https://backend-face-job.onrender.com"
const cookie = new Cookie();
let token = cookie.get('token')
export const singUpUser = async(values) =>
    await axios.post(`${url}/registroCliente`, values) 

export const singInUser = async (values) =>
  await axios.post(`${url}/loginCliente`, values);


  export const loadInfoUser=async()=>
await axios.get(`${url}/dataUser`,{
  headers: {
    token: token,
  },
})
export const sendMailEmail = async (values) =>
  await axios.post(`${url}/senMailEmail`, values);

export const validateCodeEmail = async (param,values) =>
await axios.post(`${url}/recoveryEmail/${param}`, values);


export const updatePasswordEmail = async (param,values) =>
await axios.put(`${url}/updatePassEmail/${param}`, values);

export const updateDataUser = async (values) =>
await axios.post(`${url}/updateInfoU`,values,{headers:{token: token,}});

export const deleteDataUser = async (values) =>
await axios.post(`${url}/deleteClient`,values,{
  headers: {
    token: token,
  },
});

/* catalogo */
export const consultProfessions = async (param) =>
await axios.get(`${url}/consultCategories/${param}`,{
  headers: {
    token: token,
  },
})

export const consultProfileProfessions = async (param) =>
await axios.get(`${url}/consultProfile/${param}`);

export const consultTarget = async () =>
await axios.get(`${url}/consultTarget`,{headers:{token: token,}});

export const consultViews = async () =>
await axios.get(`${url}/consultViews`,{headers:{token: token,}});

export const postCategories = async () =>
await axios.get(`${url}/postCategories`,{headers:{token: token,}});

/*Pasarela de pagos*/

export const checkout = async (values) =>
await axios.post(`${url}/checkout`,values);

export const updatePack = async (values) =>
await axios.post(`${url}/updatePack/`,values,{headers:{token: token,}});

export const infoPack = async () =>
await axios.get(`${url}/infoPack`,{headers:{token: token,}});

export const checkView = async (values) =>
await axios.post(`${url}/checkView`,values,{headers:{token: token,}});

export const updateView = async (values) =>
await axios.post(`${url}/updateView`,values,{headers:{token: token,}});

export const getInfoPack = async () =>
await axios.get(`${url}/getInfoPack`,{headers:{token: token,}});


/*Admin*/
export const reports=async()=>
await axios.get(`${url}/reports`,{headers:{token:token}})

export const solucion=async(form)=>
await axios.post(`${url}/solucion`,form,{headers:{token:token}})

export const messagesUsers=async(form)=>
await axios.post(`${url}/messagesUsers`,form,{headers:{token:token}})

export const deleteAccountAdmin=async(form)=>
await axios.post(`${url}/deleteAccountAdmin`,form,{headers:{token:token}})
/*admin*/