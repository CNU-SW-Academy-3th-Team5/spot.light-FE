import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async";
import {Link} from "react-router-dom";

export function FindPassword(){
    const titleStyle = {
        position: 'fixed',
        top: '10vh',
        left: '7vw',
        fontSize: '2.5vh',
        fontWeight: 'bold'
    };
    const formStyle = {
        position: 'fixed',
        top: '25vh',
        left: '50%',
        transform: 'translate(-50%)',
        fontSize: '2vh'
    };
    const passwordFormStyle = {
        position: 'fixed',
        top: '60vh',
        left: '50%',
        transform: 'translate(-50%)',
        fontSize: '3vh'
    };
    const loginBottomStyle = {
        position: 'fixed',
        top: '85vh',
        left: '71vw',
        fontSize: '2vh',
        display: 'flex',
        alignItems: 'center',
        color: 'black'
    };
    const findPasswordStyle = {
        width: '80vw',
        height: 'auto',
        margin: 0,
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '2vh 4vw 2vh 4vw',
        fontSize: '2vh',
        backgroundColor: 'rgb(128, 128, 128, 0.5)'
    };
    const findPasswordTextStyle = {
        margin: '1vh 0'
    };
    const findPasswordSubmitStyle = {
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
    const findPasswordPasswordTextStyle = {
        textAlign: 'center',
        marginBottom: '1vh'
    }
    const findPasswordLoginTextStyle = {
        marginRight: '2vw'
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Find Password</title>
                    <link href="https://fonts.googleapis.com/css?family=Material+Icons%7CMaterial+Icons+Outlined" rel="stylesheet" type="text/css" />
                </Helmet>
            </HelmetProvider>
            <div style={titleStyle}>비밀번호 찾기</div>
            <div style={formStyle}>
                <form>
                    <label>
                        <p style={findPasswordTextStyle}>name</p>
                        <input type="text" id="findPasswordName" style={findPasswordStyle} name="name" value="" />
                    </label>
                    <label>
                        <p style={findPasswordTextStyle}>email</p>
                        <input type="email" id="findPasswordEmail" style={findPasswordStyle} name="email" value="" />
                    </label>
                    <br/><br/>
                    <input type="submit" style={findPasswordSubmitStyle} value="done" />
                </form>
            </div>
            <div style={passwordFormStyle}>
                <p style={findPasswordPasswordTextStyle}>your password is</p>
                <input type="password" id="findPassword" style={findPasswordStyle} name="password" value="" />
            </div>
            <Link to="/login">
                <div style={loginBottomStyle}>
                    <span style={findPasswordLoginTextStyle}>Log in</span>
                    <span className="material-icons-outlined">login</span>
                </div>
            </Link>
        </>
    );
}