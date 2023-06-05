import styled from "styled-components";

export default function NavBar(){
    return(
        <CaixaNavBar>
            <Buttons>
                Sing-up
            </Buttons>
            <p>Projeto Autoral E-comerce</p>
            <Buttons>
                Sing-in
            </Buttons>
        </CaixaNavBar>
    )
}

const CaixaNavBar = styled.div`
        height: 100px;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: white;
        p{
            font-size: 40px;
        }
`;

const Buttons = styled.div`
        background-color: #cbbef5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        width: 150px;
        height: 25px;
        border-radius: 10px;
`;