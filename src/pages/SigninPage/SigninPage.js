import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../context/UserContext";
import axios from "axios";

export default function SigninPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUserLogged} = useContext(UserContext);
    const navigate = useNavigate();

    function login(e){
        e.preventDefault();
        const body = { email, password };
        console.log(body);
        const promisse = axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/sign-in`, body)
        console.log(promisse);
        promisse.then((res) => {
            alert("Login realizado com sucesso! :)");
            setUserLogged(res.data);
            console.log(res.data);
            navigate("/");
        }).catch((e) => alert(e.response.data.message));
    }
    return(
        <CaixaSignin>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-MNOUQCNWHQtH49rEsmzkpa8zfjImuhz0Q&usqp=CAU" alt=""/>
            <Form onSubmit={login}>
                <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                <button type="submit">
                    <strong>Entrar</strong>
                </button>
            </Form>
            <br />
            <Link to="/sign-up">
            <p>Ainda não possui uma conta? Cadastre-se!</p>
            </Link>
        </CaixaSignin>
    )
}

const CaixaSignin = styled.div`
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  input {
    margin-top: 10px;
    width: 300px;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-family: "El Messiri", sans-serif;
  }
  button{
    margin-top: 20px;
    outline: none;
    border: none;
    background-color: #cdf2d6;
    width: 225px;
    height: 45px;
    border-radius: 5px;
    color: #3d3d3d;
  }
`;