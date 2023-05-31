import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { isAuth, logout } from '../helpers/auth';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children }) => {
    const head = () => (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="/static/css/styles.css" />
        </React.Fragment>
    );

    const nav = () => (
        <ul className="nav nav-tabs bg-warning">
            <li className="nav-item">
                <Link href="/" className="nav-link text-dark">
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link href="/user/link/create" className="nav-link text-dark btn btn-success" style={{ borderRadius: '8px' }}>
                    Submit a link
                </Link>
            </li>

            {
                !isAuth() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link href="/login" className="nav-link text-dark">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/register" className="nav-link text-dark">
                                Register
                            </Link>
                        </li>
                    </React.Fragment>
                )

            }

            {
                isAuth() && isAuth().role === 'admin' && (
                    <li className="nav-item ml-auto">
                        <Link href="/admin" className="nav-link text-dark">
                            {isAuth().name}
                        </Link>
                    </li>
                )

            }

            {
                isAuth() && isAuth().role === 'subscriber' && (
                    <li className="nav-item ml-auto">
                        <Link href="/user" className="nav-link text-dark">
                            {isAuth().name}
                        </Link>
                    </li>
                )

            }

            {
                isAuth() && (
                    <li className="nav-item">
                        <a onClick={logout} className='nav-link text-dark'>Logout</a>
                    </li>
                )
            }
        </ul>
    );

    return (
        <React.Fragment>
            {head()} {nav()} <div className="container pt-5 pb-5">{children}</div>
        </React.Fragment>
    );
};

export default Layout;
