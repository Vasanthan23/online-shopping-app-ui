import { useContext } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { AuthContext } from "../../../context/authContext";

export const Loader=()=>{
    const{isLoading}=useContext(AuthContext)

    return  <>{isLoading&&
        <div style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.8)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1000}}>
          <ProgressSpinner style={{width: '50px', height: '50px',display:"flex"}}  />
        </div>}</>
}