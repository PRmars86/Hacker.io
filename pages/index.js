import Layout from '../components/Layout';
import axios from 'axios';
import { API } from '../config'
import Link from 'next/link';

const Home = ({ categories }) => {
    const listCategories = () =>
        categories.map((c, i) => (
            <Link legacyBehavior href={`/links/${c.slug}`} key={i}>
                <a style={{ border: '1px solid red' }} className="bg-light p-3 col-md-4">
                    <div>
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={c.image && c.image.url}
                                    alt={c.name}
                                    style={{ width: '100px', height: 'auto' }}
                                    className="pr-3"
                                />
                            </div>
                            <div className="col-md-8">
                                <h3>{c.name}</h3>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        ));

    return (
        <Layout>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="font-weight-bold">Browse Tutorials/Courses</h1>
                    <br />
                </div>
            </div>

            <div className="row">{listCategories()}</div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const response = await axios.get(`${API}/categories`);
    return { props: { categories: response.data } };
};


// Home.getstaticProps = async () => {
//     const response = await axios.get(`${API}/categories`);
//     const rr = await response.data;
//     return {
//         categories: rr
//     };
// };

export default Home;
