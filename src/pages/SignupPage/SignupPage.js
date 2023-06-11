import styled from "styled-components";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export default function SignupPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [category, setCategory] = useState("CLIENT");
    const [turnPage, setTurnPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault()
        console.log(category);
        const dadosCadastro = {name, email, password, confirmPassword, category}
        setLoading(true)

        try{    

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/sign-up`, dadosCadastro)
        console.log(process.env.REACT_APP_API_BASE_URL)
        
        } catch (err){
            if (err.response?.status === 422){
                alert("Senha e confirmação de senha devem ser iguais!")
            } else if (err.response?.status === 409){
                alert("Usuário ou email já cadastrados!")
            } else {
                alert("Não foi possível fazer o cadastro, favor tentar novamente mais tarde!")
            }        
            setLoading(false)
            return;
        }    
        
        setLoading(false)
        navigate("/sign-in")
    
    }

    function common(){
        setCategory("CLIENT");
        console.log(category);
        setTurnPage(true);
    }

    function seller(){
        setCategory("DEALER");
        console.log(category);
        setTurnPage(true);
    }
    return(
        <CaixaSignup>
            {turnPage === false?(
                <BoxOptions>
                    <BoxImgOptions>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-MNOUQCNWHQtH49rEsmzkpa8zfjImuhz0Q&usqp=CAU" alt=""/>
                    </BoxImgOptions>
                  <p>Você quer somente comprar produtos ou gostaria de vender seus próprios produtos também?</p>
                  <BoxButtonChoice>
                        <button onClick={common}>
                            Quero ser um cliente comum
                        </button>
                        <button onClick={seller}>
                            Quero poder vender também
                        </button>
                  </BoxButtonChoice>
                </BoxOptions>
            ):(
                <>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-MNOUQCNWHQtH49rEsmzkpa8zfjImuhz0Q&usqp=CAU" alt=""/>
                    <Form onSubmit={signUp}>
                        <input
                        type="nome"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
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
                        <input
                        type="password"
                        placeholder="confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                        <Registro isLoading={loading}>
                        {loading ? (
                            <ThreeDots 
                                height="40"
                                width="40"
                                color="#ffffff"
                            />
                        ):(
                            <button type="submit">
                                <strong>Cadastrar</strong>
                            </button>
                        )}
                        </Registro>
                    </Form>

                    <br />
                    <Link to="/sign-in">
                        <p>Já possui conta? Faça login!</p>
                    </Link>
                </>
            )}
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

const BoxButtonChoice = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;

        button{
            outline: none;
            border: none;
            background-color: #cdf2d6;
            width: 225px;
            height: 45px;
            border-radius: 5px;
        }

`;

const BoxOptions = styled.div`
      color: #ffffff;
      padding: 20px;
      p{
        font-size: 20px;
      }
`;

const BoxImgOptions = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
     margin-bottom: 20px;
     img{
        width:25%;
        border-radius: 10px;
      }
`;