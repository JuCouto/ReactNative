import React, {createContext, useState} from "react";
import { UsuarioType } from "../models/UsuarioType";
import { LoginService } from "../services/loginService";

export const AutenticacaoContext = createContext({});

export const AutenticacaoProvider = ({children}) =>{
    const [usuario, setusuario] = useState<UsuarioType>();

    const login = async (email:string, senha:string) => {
        const respostaServiceLogin = await LoginService(email,senha);
        if(!respostaServiceLogin){
            return false;
        }else{
            setusuario({
                id:respostaServiceLogin?.id,
                name:respostaServiceLogin?.name,
                email:respostaServiceLogin?.email,
                token:respostaServiceLogin?.token,
            });
            return true;
        }
    };

    return (
        <AutenticacaoContext.Provider value={{
            login,
            usuario
        }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}