import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";



export default function ProductIdPage(){

    const[product, setProduct] = useState({});

    const {id} = useParams();

    useEffect(() => {
        async function getProductById(){
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
                setProduct(res.data);
            }catch(e){
                alert(e.response.data.message)
            }
        }

        getProductById();
    }, [id]);


    return(
        <>
            <NavBar/>
            <BoxProduct>
                <BoxContent>
                    <img src={product.img} alt='imagem-do-produto'/>
                    <BoxDescriptions>
                        <p>{product.name}</p>
                        <p>R$ {(product.price / 100).toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 2 })}</p>
                        <p>Slot: {product.slot}</p>
                    </BoxDescriptions>
                </BoxContent>
            </BoxProduct>
        </>
    )
};


const BoxProduct = styled.div`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        background-color: #cbbef5;
        padding: 20px;
        img{
            border-radius: 10px;
            width: 500px;
            margin-bottom: 30px;
        }
`;

const BoxContent = styled.div`
      margin-top:50px;
      flex-direction: column;
      margin-bottom: 9%;
`;

const BoxDescriptions = styled.div`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: #ffffff;
    padding: 10px;
    background-color: black;
    p{
        margin: 10px;
    }
`;