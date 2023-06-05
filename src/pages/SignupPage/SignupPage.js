import styled from "styled-components";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage(){
    const [loading, setLoading] = useState(false);
    return(
        <CaixaSignup>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-MNOUQCNWHQtH49rEsmzkpa8zfjImuhz0Q&usqp=CAU" alt=""/>
            <Form onSubmit="">
                <input
                type="nome"
                placeholder="Nome"
                required
                />
                <input
                type="email"
                placeholder="E-mail"
                required
                />
                <input
                type="password"
                placeholder="Senha"
                required
                />
                <input
                type="password"
                placeholder="confirme sua senha"
                required
                />
                <Registro isLoading={loading}>
                    <button type="submit">
                        <strong>Cadastrar</strong>
                    </button>
                </Registro>
            </Form>

            <br />
            <Link to="/sign-in">
                <p>Já possui conta? Faça login!</p>
            </Link>
        </CaixaSignup>
    )
}

const CaixaSignup = styled.div`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-top: 10%;
        margin-left: 25%;
        margin-right: 25%;
        background-color: gray;
        padding-top: 20px;
        border-radius: 10px;
        img{
            width:25%;
            border-radius: 10px;
        }
        p{
            margin-bottom: 20px;
        }
`;

const Registro = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
background-color: #cdf2d6;
width: 225px;
height: 45px;
border: none;
border-radius: 5px;
outline: none;
button {
  outline: none;
  border: none;
  background-color: #cdf2d6;
  width: 225px;
  height: 45px;
  border-radius: 5px;
  color: #3d3d3d;
}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  outline: none;
  input {
    margin-top: 10px;
    width: 300px;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-family: "El Messiri", sans-serif;
  }
`;