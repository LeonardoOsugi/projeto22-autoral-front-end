import styled from "styled-components";
import NavBar from "../../components/NavBar/NavBar";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import deletes from "../../assets/images/delete.svg";
import UserContext from "../../context/UserContext";
import ValueTotalContext from "../../context/ValueTotalContext";
import { Link } from "react-router-dom";

export default function CartPage(){
    const [cart, setCart] = useState([]);
    const { userLogged } = useContext(UserContext);
    const {valueTotal, setValueTotal} =  useContext(ValueTotalContext);

    const deleteCart = useCallback(async (id, price) => {
        const config = {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
        };
        try{
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/carts/${id}`, config);
            setValueTotal(valueTotal-price);
        }catch(e){
            alert(e.response.data.message);
        }
      }, [userLogged.token, setValueTotal, valueTotal]);

    useEffect(() => {
        async function getCarts(){
            let total = 0;
            const config = {
                headers: {
                  Authorization: `Bearer ${userLogged.token}`,
                },
              };
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/carts`, config);
                
                res.data.map((item) => {
                    return total += Number(item.products.price);
                });
                setValueTotal(total);
                setCart(res.data);
            }catch(e){
                alert(e.response.data.message)
            }
        }

        getCarts();
    },[userLogged.token, setValueTotal, deleteCart]);
    
    return(
        <>
            <NavBar/>
            <BoxCart>
                <NaoEDaSuaConst>
                    <p>Total a pagar: {(valueTotal/100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                    </p>
                    <Link to="/payment" className="button-payment">
                        <p>
                            Fazer pagamento
                        </p>
                    </Link>
                </NaoEDaSuaConst>
                <BoxCarts>
                    {cart.map((c) => 
                        <BoxProcuctsCart key={c.id}>
                            <img src={c.products.img} alt=""/>
                            <BoxDescriptions>
                                <p>{c.products.name}</p>
                                <p>R$ {(c.products.price/100).toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 2 })}</p>
                                <p>Slot: {c.products.slot}</p>
                            </BoxDescriptions>
                            <BoxDelete>
                                 <img onClick={() => deleteCart(c.id, c.products.price)} className="deletes-img" src={deletes} alt=""/>
                                 <p>DELETE</p>
                            </BoxDelete>
                        </BoxProcuctsCart>
                    )}
                </BoxCarts>
            </BoxCart>
        </>
    )
};

const BoxCart = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: #cbbef5;
        padding-right: 20px;
`;

const BoxCarts = styled.div`
        flex-direction: column;

`;

const BoxProcuctsCart = styled.div`
        display: flex;
        justify-content: space-around;
        margin: 20px;
        background-color: white;
        border-radius: 10px;
        img{
            width: 20%;
            border-radius: 10px;
        }
`;

const BoxDescriptions = styled.div`
        padding: 10px;
        flex-direction: column;
        font-size: 40px;
        background-color: black;
        color: white;
        align-items: center;
        justify-content: space-around;
        border-radius:10px;
        margin: 10px;
        p{
            margin-bottom: 20px;
        }
`;

const NaoEDaSuaConst = styled.div`
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        background-color: #cdf2d6;
        color: blue;
        padding: 20px;
        font-size: 40px;
        .button-payment{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            outline: none;
            border: none;
            background-color: black;
            width: 225px;
            height: 45px;
            border-radius: 5px;
            color: #ffffff;
            font-size: 20px;
            text-decoration: none;
        }
`;

const BoxDelete = styled.div`
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
            width: 50%;
            margin-bottom: 20%;
        }
`;