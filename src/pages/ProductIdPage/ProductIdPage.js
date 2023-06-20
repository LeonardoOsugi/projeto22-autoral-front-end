import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import styled from "styled-components";
import {useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";



export default function ProductIdPage(){

    const[product, setProduct] = useState({});
    const[somaSlot, setSomaSlot] = useState();

    const { userLogged } = useContext(UserContext);

    const {id} = useParams();

    useEffect(() => {
        async function getProductById(){
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
                setProduct(res.data);
                setSomaSlot(res.data.slot);
            }catch(e){
                alert(e.response.data.message)
            }
        }

        getProductById();
    }, [id]);

    async function addCart(e){
        e.preventDefault();
        
        const config = {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
          };
        
        const body ={user_id: userLogged.user_id, product_id: product.id}
        try{
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/carts`, body, config);
            setSomaSlot(somaSlot - 1);
        }catch(e){
            alert(e.response.data.message)
        }
    }

    return(
        <>
            <NavBar/>
            <BoxProduct>
                <BoxContent>
                    <img src={product.img} alt='imagem-do-produto'/>
                    <BoxDescriptions>
                        <p>{product.name}</p>
                        <p>R$ {(product.price / 100).toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 2 })}</p>
                        <p>Slot: {somaSlot}</p>
                    </BoxDescriptions>
                </BoxContent>
                <BoxButton>
                    <button onClick={addCart}>
                        Adicione ao carrinho
                    </button>
                </BoxButton>
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

const BoxButton = styled.div`
    font-size: 40px;
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