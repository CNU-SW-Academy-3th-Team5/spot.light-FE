import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async";
import {Link} from "react-router-dom";

export function FindId(){
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
    const emailFormStyle = {
        position: 'fixed',
        top: '55vh',
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
    const findIdStyle = {
        width: '80vw',
        height: 'auto',
        margin: 0,
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '2vh 4vw 2vh 4vw',
        fontSize: '2vh',
        backgroundColor: 'rgb(128, 128, 128, 0.5)'
    };
    const findIdTextStyle = {
        margin: '1vh 0'
    };
    const findIdSubmitStyle = {
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
    };
    const findIdEmailTextStyle = {
        textAlign: 'center',
        marginBottom: '1vh'
    };
    const findIdLoginTextStyle = {
        marginRight: '2vw'
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Find Id</title>
                    <link href="https://fonts.googleapis.com/css?family=Material+Icons%7CMaterial+Icons+Outlined" rel="stylesheet" type="text/css" />
                </Helmet>
            </HelmetProvider>
            <div style={titleStyle}>아이디 찾기</div>
            <div style={formStyle}>
                <form>
                    <label>
                        <p style={findIdTextStyle}>name</p>
                        <input type="text" id="findIdName" style={findIdStyle} name="name" value="" />
                    </label>
                    <br/><br/>
                    <input type="submit" style={findIdSubmitStyle} value="done" />
                </form>
            </div>
            <div style={emailFormStyle}>
                <p style={findIdEmailTextStyle}>your email is</p>
                <input type="email" id="findIdEmail" style={findIdStyle} name="email" value="" />
            </div>
            <Link to="/login">
                <div style={loginBottomStyle}>
                    <span style={findIdLoginTextStyle}>Log in</span>
                    <span className="material-icons-outlined">login</span>
                </div>
            </Link>
        </>
    );
}