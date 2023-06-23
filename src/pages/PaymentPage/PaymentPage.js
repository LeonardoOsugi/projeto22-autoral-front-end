import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import ValueTotalContext from "../../context/ValueTotalContext";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PaymentPage(){
    const [cvc, setCvc] = useState('');
    const [expiry, setExpiry] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [paymentFinished, setPaymentFinished] = useState(false);
    const {valueTotal} =  useContext(ValueTotalContext);
    const { userLogged } = useContext(UserContext);


    const [focusedField, setFocusedField] = useState('');

    const inputRefs = {
        number: useRef(null),
        name: useRef(null),
        expiry: useRef(null),
        cvc: useRef(null),
    };

    const handleInputFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    useEffect(() => {
        if (focusedField && inputRefs[focusedField].current) {
        inputRefs[focusedField].current.focus();
        }
    }, [focusedField, inputRefs]);

    async function addInfo(e){
        e.preventDefault();
        const body ={
            value: valueTotal,
            cardData:{
                issuer: name,
                number,
                name,
                expirationDate: expiry,
                cvc
            }
        };

        const config = {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
        };

        try{
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/payments`, body, config);
            setPaymentFinished(true);
        }catch(e){
            alert(e.response.data.message);
        }
    }


    return(
        <>
            <BoxPayment>
                <BoxInputs>
                    {paymentFinished === false?(
                        <>
                             <Cards cvc={cvc} expiry={expiry} focused={focusedField} name={name} number={number} />
                            <form onSubmit={addInfo}>
                                <input
                                ref={inputRefs.number}
                                type="tel"
                                name="number"
                                placeholder="Card Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                onFocus={() => handleInputFocus('number')}
                                maxLength={16}
                                min={0}
                                />
                                <h1>E.g.: 49..., 51..., 36..., 37...</h1>
                                <input
                                ref={inputRefs.name}
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => handleInputFocus('name')}
                                maxLength={15}
                                min={0}
                                />
                                <input
                                ref={inputRefs.expiry}
                                type="tel"
                                name="expiry"
                                placeholder="Valid Thru"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                onFocus={() => handleInputFocus('expiry')}
                                maxLength={4}
                                min={0}
                                />
                                <input
                                ref={inputRefs.cvc}
                                type="tel"
                                name="cvc"
                                placeholder="CVC"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                onFocus={() => handleInputFocus('cvc')}
                                maxLength={3}
                                min={0}
                                className="cvcInput"
                                />

                                <button type="submit">
                                    <strong>FINALIZAR PAGAMENTO</strong>
                                </button>
                            </form>
                        </>
                    ):(
                        
                        <Finished>
                            <p>PAGAMENTO REALIZADO COM SUCESSO!!!!</p>
                            <p>Logo receberá seu produto em sua casa</p>

                            <Link className="home" to="/">
                                <p>Volte para a página inicial</p>
                            </Link>
                        </Finished>
                        
                    )}
                   
                </BoxInputs>
            </BoxPayment>
        </>
    )
};


const BoxPayment = styled.div`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        background-color: #cbbef5;
        padding: 10%;
`;

const BoxInputs = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
        background-color: blue;
        padding: 5%;
        border-radius: 10px;
        margin-bottom: 70px;
        input{
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            text-decoration: none;
            margin-top: 20px;
            .cvcInput {
                max-width: 100px;
            }
        }
        button{
            margin-top: 20px;
            background-color: green;
            color: #ffffff;
            font-size: 15px;
            border-radius: 10px;
        }
`;

const Finished = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
            font-size: 40px;
            margin-bottom: 20px;
            color: #ffffff;
        }
        .home{
                font-size: 20px;
                background-color: green;
                padding: 20px;
                text-decoration: none;
                border-radius: 10px;
                margin-top: 95px;
        }
`;