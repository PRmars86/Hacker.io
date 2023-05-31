import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { getCookie, isAuth } from '../../../helpers/auth';
import { API } from '../../../config';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';


const Create = (token) => {
    const [state, setState] = useState({
        title: '',
        url: '',
        categories: [],
        loadedCategories: [],
        success: '',
        error: '',
        type: '',
        medium: ''
    });

    const { title, url, categories, loadedCategories, success, error, type, medium } = state;

    useEffect(() => {
        loadCategories();
    }, [success]);

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`);
        setState({ ...state, loadedCategories: response.data });
    };

    const handleTitleChange = e => {
        setState({ ...state, title: e.target.value, error: '', success: '' });
    };

    const handleURLChange = e => {
        setState({ ...state, url: e.target.value, error: '', success: '' });
    };

    const handleSubmit = async e => {
        // e.preventDefault();
        // // console.table({ title, url, categories, type, medium });
        // try {
        //     const response = await axios.post(
        //         `${API}/link`,
        //         { title, url, categories, type, medium },
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         }
        //     );
        //     setState({
        //         ...state,
        //         title: '',
        //         url: '',
        //         success: 'Link is created',
        //         error: '',
        //         loadedCategories: [],
        //         categories: [],
        //         type: '',
        //         medium: ''
        //     });
        // } catch (error) {
        //     console.log('LINK SUBMIT ERROR', error);
        //     setState({ ...state, error: error.response.data.error });
        // }
    };

    // link create form
    const submitLinkForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" className="form-control" onChange={handleTitleChange} value={title} />
            </div>
            <div className="form-group">
                <label className="text-muted">URL</label>
                <input type="url" className="form-control" onChange={handleURLChange} value={url} />
            </div>
            <div>
                <button disabled={!token} className="btn btn-outline-warning" type="submit">
                    {isAuth() || token ? 'Post' : 'Login to post'}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="row">
                <div className="col-md-12">
                    <h1>Submit Link</h1>
                    <br />
                    {JSON.stringify(loadedCategories.length)}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    xxx
                </div>
                <div className="col-md-8">
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {submitLinkForm()}
                </div>
            </div>
        </Layout>
    );
};

Create.getInitialProps = ({ req }) => {
    const token = getCookie('token', req);
    return { token };
};

export default Create;