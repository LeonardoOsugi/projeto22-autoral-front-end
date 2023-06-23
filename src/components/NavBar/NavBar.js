import { Link } from "react-router-dom";
import styled from "styled-components";
import homeImage from "../../assets/images/homeImage.svg";
import cart from "../../assets/images/cart.svg";
export default function NavBar(){
    return(
        <>
            <CaixaNavBar>
                <Link className="not-sublime" to='/sign-up'>
                    <Buttons>
                        Sing-up
                    </Buttons>
                </Link>
                <p>Projeto Autoral E-comerce</p>
                <Link className="not-sublime" to='/sign-in'>
                    <Buttons>
                        Sing-in
                    </Buttons>
                </Link>
            </CaixaNavBar>
            <Menu>
                <Link to="/">
                    <img src={homeImage} alt=""/>
                </Link>
                <Link to="/cart">
                    <img src={cart} alt=""/>
                </Link>
            </Menu>
        </>
        
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
        .not-sublime{
            text-decoration: none;
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
        font-size: 20px;
`;

const Menu = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #A9A9A9;
        padding: 20px;
        img{
            width: 50px;
        }
`;