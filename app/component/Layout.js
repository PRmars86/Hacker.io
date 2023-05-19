import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
    const head = () => (
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
    );

    const nav = () => (
        <ul className="nav nav-tabs bg-warning">
            <li className="nav-item">
                <a className="nav-link text-dark" href="">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-dark" href="">Login</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-dark" href="">Register</a>
            </li>
        </ul>
    );

    return <React.Fragment>{head()}{nav()}<div className="container pt-5 pb-5">{children}</div></React.Fragment>
}

export default Layout;