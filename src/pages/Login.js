import styled from "styled-components";
import logo from '../img/logo.png';
import { Link,useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react"
import axios from "axios"

export default function Login(){
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token){
            navigate("/")
        }
    }, [])
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    console.log(form)
    function handleForm(e) {
        e.preventDefault()
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`, form)
            .then(res => {
                localStorage.setItem("token", res.data.token)
                navigate('/')
            })
            .catch(err => {
                alert(err.response.data)
            })
    }
    return (
        <ContLogin>
            <img src={logo}/>
            <form onSubmit={handleForm}>
                <input placeholder="email" type="email" name="email" value={form.email} onChange={handleChange} required/>
                <input placeholder="senha" type="password" name="password" value={form.password} onChange={handleChange} required/>
                <button type="submit">Entrar</button>
            </form>
            <Link to={"/sign-up"}>
            <h1>Não tem uma conta? Cadastre-se!</h1>
            </Link>
        </ContLogin>
    )
}

const ContLogin = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-top:68px;
    img{
        margin-bottom:32px;
    }

    form{
        display:flex;
        flex-direction:column;
        align-items:center;
    }

    input{
        width: 303px;
        height: 45px;

        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-top:6px;

        ::placeholder{ 
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: #DBDBDB;
        }
    }
    button{
        width: 303px;
        height: 45px;
        margin-top:6px;
        background: #52B6FF;
        border-radius: 4.63636px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;

        color: #FFFFFF;
        border: none;
    }
    h1{
        margin-top:25px; 
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;

        color: #52B6FF;
    }

`