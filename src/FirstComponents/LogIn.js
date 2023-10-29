import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async";
import naverIcon from './naver.png';
import googleIcon from './google.png';
import {Link} from "react-router-dom";
import kakaoIcon from './kakao_login.png'


export function LogIn(){
    const titleStyle = {
        position: 'fixed',
        top: '15vh',
        left: '50%',
        transform: 'translate(-50%)',
        backgroundColor: 'transparent',
        fontSize: '3vh',
        fontWeight: 'bold'
    };
    const formStyle = {
        position: 'fixed',
        top: '23vh',
        left: '50%',
        transform: 'translate(-50%)',
        fontSize: '2vh'
    };
    const loginStyle = {
        width: '80vw',
        height: 'auto',
        margin: 0,
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '2vh 4vw 2vh 4vw',
        fontSize: '2vh',
        backgroundColor: 'rgb(128, 128, 128, 0.5)'
    };
    const loginTextStyle = {
        margin: '1vh 0'
    };
    const wayStyle = {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
        top: '60vh'
    };
    const wayDivStyle = {
        textAlign: 'center',
        padding: '2vh 3vw',
        fontSize: '1vh'
    };
    const wayDivAStyle = {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold'
    };
    const lineContainerStyle = {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        top: '67vh'
    };
    const linkedLoginStyle = {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
        top: '73vh'
    };
    const linkedLoginDivStyle = {
        margin: '2vh auto',
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: '10px',
        width: '8vh',
        height: '8vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    const loginSubmitStyle = {
        width: '25vw',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '1vh 2vw 1vh 2vw',
        fontSize: '2vh',
        backgroundColor: 'black',
        color: 'white'
    }
    const line1Style = {
        width: '33vw',
        height: '1px',
        backgroundColor: 'rgb(128, 128, 128, 0.5)'
    }
    const orStyle = {
        fontSize: '2vh',
        margin: '0 7vw'
    }
    const line2Style = {
        width: '33vw',
        height: '1px',
        backgroundColor: 'rgb(128, 128, 128, 0.5)'
    }
    const googleStyle = {
        width: '6vh',
        height: '6vh'
    }
    const naverStyle = {
        width: '6vh',
        height: '6vh'
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Log In</title>
                </Helmet>
            </HelmetProvider>
            <div style={titleStyle}>Spot.light</div>
            <div>
                <a href = "https://kauth.kakao.com/oauth/authorize?client_id=6d45b34bde95e3af7ac2fb1fc9ea6552&redirect_uri=http://localhost:8080/api/v1/auth&response_type=code"><img src = {kakaoIcon}/></a>
            </div>
        </>
    );
}