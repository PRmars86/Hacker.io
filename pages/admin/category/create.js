import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import Resizer from 'react-image-file-resizer';
//const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { API } from '../../../config';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
import Layout from '../../../components/Layout';
import withAdmin from '../../withAdmin';
//import 'react-quill/dist/quill.bubble.css';

const Create = ({ user, token }) => {
    const [state, setState] = useState({
        name: '',
        content: '',
        error: '',
        success: '',
        formData: typeof window && new FormData(),
        buttonText: 'Create',
        imageUploadText: 'Upload image'
    });

    const { name, content, success, error, formData, buttonText, imageUploadText } = state;


    const handleChange = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        const imageName = name === 'image' ? e.target.files[0] : 'Upload image';
        formData.set(name, value);
        setState({ ...state, [name]: value, error: '', success: '', imageUploadText: imageName });
    };

    // const handleContent = e => {
    //     console.log(e);
    //     setContent(e);
    //     setState({ ...state, success: '', error: '' });
    // };

    // const handleImage = event => {
    //     let fileInput = false;
    //     if (event.target.files[0]) {
    //         fileInput = true;
    //     }
    //     setImageUploadButtonName(event.target.files[0].name);
    //     if (fileInput) {
    //         Resizer.imageFileResizer(
    //             event.target.files[0],
    //             300,
    //             300,
    //             'JPEG',
    //             100,
    //             0,
    //             uri => {
    //                 // console.log(uri);
    //                 setState({ ...state, image: uri, success: '', error: '' });
    //             },
    //             'base64'
    //         );
    //     }
    // };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Creating' });
        //console.log(...formData);

        try {
            const response = await axios.post(
                `${API}/category`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('CATEGORY CREATE RESPONSE', response);
            //            setImageUploadButtonName('Upload image');
            setState({
                ...state,
                name: '',
                content: '',
                formData: '',
                buttonText: 'Created',
                imageUploadText: 'Upload image',
                success: `${response.data.name} is created`
            });
        } catch (error) {
            console.log('CATEGORY CREATE ERROR', error);
            setState({ ...state, buttonText: 'Create', error: error.response.data.error });
        }
    };

    const createCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Content</label>
                <textarea onChange={handleChange('content')} value={content} className="form-control" required />
            </div>
            <div className="form-group">
                <label className="btn btn-outline-secondary">
                    Upload image
                    <input onChange={handleChange('image')} type="file" accept="image/*" className="form-control" />
                </label>
            </div>
            <div>
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Create category</h1>
                    <br />
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {createCategoryForm()}
                </div>
            </div>
        </Layout>
    );
};

export default withAdmin(Create);
