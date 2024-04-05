import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../store/cartSlice';
import { addwishProducts } from '../store/whishSlice';
import { fetchProducts, STATUSES } from '../store/productSlice';
import { CiSearch } from "react-icons/ci";
import Navbar from './Navbar';

function Products() {
    const { data: products, status } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    const handleSearchInput = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filtered = products.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredItems(filtered);
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd = (product) => {
        dispatch(addProductToCart(product)).then(() => {
            alert("Item added to cart!")
        });
    };

    const handleAddwish = async (product) => {
        dispatch(addwishProducts(product)).then(() => {
            alert("Item added to wishlist!")
        });
    };

    if (status === STATUSES.LOADING) {
        return <h2>LOADING.....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong...</h2>;
    }

    return (
        <div className='area'>
            <Navbar/>
            <div className="header">
                <h1>ALL PRODUCTS</h1>
                <div>
                    <input type="text" placeholder='search..' value={searchQuery} onChange={handleSearchInput} />
                    <CiSearch className='search' />
                </div>
            </div>
            <div className="productsWrapper">
                {searchQuery ? (
                    filteredItems.map((product) => (
                        <div className="card" key={product._id}>
                            <img src={product.image} alt="" />
                            <h4>{product.title}</h4>
                            <h5>{product.price}</h5>
                            <div className='buttons'>
                                <button onClick={() => handleAdd(product)} className="btn">
                                    Add to Cart
                                </button>
                                <button className='btn' onClick={() => handleAddwish(product)}>
                                    Add to Whishlist
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    products.map((product) => (
                        <div className="card" key={product._id}>
                            <img src={product.image} alt="" />
                            <h4>{product.title}</h4>
                            <h5>{product.price}</h5>
                            <div className='buttons'>
                                <button onClick={() => handleAdd(product)} className="btn">
                                    Add to Cart
                                </button>
                                <button className='btn' onClick={() => handleAddwish(product)}>
                                    Add to Whishlist
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Products;
