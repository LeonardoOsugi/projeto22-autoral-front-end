import styled from "styled-components";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage(){
    const [produtos, setProdutos] = useState(undefined);
    useEffect(() => {
        const URL = `${process.env.REACT_APP_API_BASE_URL}/products/`;

        
        const promise = axios.get(URL);
        promise.then((res) => setProdutos(res.data));
        promise.catch(error => console.log(error.data.message))
      }, []);
    return(
        <>
            <NavBar/>
            <CaixaProdutos>
                {produtos?.map((p) => 
                <Product key={p.id}>
                    <img src={p.img} alt="imagem-do-produto"/>
                    <Infos>
                        <p>{p.name}</p>
                        <p>R$ {p.price}</p>
                        <p>Slot: {p.slot}</p>
                    </Infos>
                </Product>
                )}
            </CaixaProdutos>
        </>
    )
};

const CaixaProdutos = styled.div`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        background-color: #cbbef5;
        margin: 220px;
        border-radius: 10px;
`;

const Product = styled.div`
     flex-wrap: wrap;
     flex-direction: column;
     background-color: #ffffff;
     margin:5%;
     padding: 20px;
     border-radius: 10px;
     img{
        width: 200px;
     }
`;

const Infos = styled.div`
        padding: 10px;
        background-color: black;
        color: white;
        border-radius: 10px;
`;