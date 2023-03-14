import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import cookies from "js-cookie";
import Loader from "../loader/Loader";
import ProductService from "../../../service/product/ProductService";

const UpdateProduct = () => {
    const {t} = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const location = useLocation();
    const { product } = location.state;

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [description, setDescription] = useState(product.url);
    const [maxNumBuy, setMaxNumBuy] = useState(product.id);
    const [numStock, setNumStock] = useState(product.id);
    const [productPrice, setProductPrice] = useState(product.id);
    const [productPicture, setProductPicture] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/update-product');
    }, []);

    const handleDescriptionChange = (e) => {
        setError('');
        setDescription(e.target.value);
    }

    const handleMaxNumBuyChange = (e) => {
        setError('');
        setMaxNumBuy(e.target.value);
    }

    const handleNumStockChange = (e) => {
        setError('');
        setNumStock(e.target.value);
    }

    const handleProductPriceChange = (e) => {
        setError('');
        setProductPrice(e.target.value);
    }

    const handleProductPictureChange = (e) => {
        setError('');
        let formData = new FormData();
        formData.append('image', e.target.file);
        setProductPicture(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (description.length > 50) {
            setError(t('description_error'));
            return;
        }

        if (maxNumBuy <= 0) {
            setError(t('max_num_error'));
            return;
        }

        if (numStock <= 0) {
            setError(t('num_stock_error'));
            return;
        }

        if (productPrice <= 0) {
            setError(t('product_price_error'));
            return;
        }

        setLoading(true);
        const body = {
            description: description,
            maxNumBuy: maxNumBuy,
            numStock: numStock,
            productPrice: productPrice,
            productPicture: productPicture
        }

        await ProductService.updateProduct(body)
            .then(() => setSuccess(t('update_product_success')))
            .catch(error => setError(t('update_product_error')))
            .finally(() => setLoading(false));
    }

    return (
        <>
            {success ?
                <>
                    <div className={"my-container input-success"}>
                        <h2>{success}</h2>
                    </div>
                    <div className={"my-container"}>
                        <Link to="/profile">{t('go_profile')}</Link>
                    </div>
                </>
                :
                <>
                    {loading ?
                        <div className={"container"}>
                            <Loader/>
                        </div>
                        :
                        <div className={"signup-login"}>
                            <div className={"container"}>
                                <h1>{t('update_product')}</h1>
                            </div>
                            <div className={"container"}>
                                {error &&
                                    <div className={"input-error"}>
                                        (!) {error}
                                    </div>
                                }
                            </div>
                            <div className={"container"}>
                                <div>
                                    <h2>{t('product_name')}: {product.id}</h2>
                                    <form onSubmit={handleSubmit}>
                                        <label>{t('write_product_description')}:</label><br/>
                                        <textarea
                                            className={"description"}
                                            placeholder={product.url}
                                            onChange={handleDescriptionChange}
                                            required
                                        >{product.url}</textarea><br/>
                                        <label htmlFor={"max_num_buy"}>{t('max_num_buy')}:</label><br/>
                                        <input type={'number'} id={"max_num_buy"} name={t("max_num_buy")} placeholder={product.id} onChange={handleMaxNumBuyChange}/><br/>
                                        <label htmlFor={"num_stock"}>{t('num_stock')}:</label><br/>
                                        <input type={'number'} id={"num_stock"} name={t("num_stock")} placeholder={product.id} onChange={handleNumStockChange}/><br/>
                                        <label htmlFor={"product_price"}>{t('product_price')}:</label><br/>
                                        <input type={'number'} id={"product_price"} name={t("product_price")} placeholder={product.id} onChange={handleProductPriceChange}/><br/>
                                        <label htmlFor={"product_picture"}>{t('product_picture')}:</label><br/>
                                        <input type={'file'} id={"product_picture"} name={t("product_picture")} onChange={handleProductPictureChange}/><br/>
                                        <div className={"container"}>
                                            <button disabled={loading} className={"input-button"} type="submit">{t('update')}</button>
                                        </div>
                                    </form>
                                    <div className={"my-container"}>
                                        <Link to="/profile">{t('cancel')}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    );
};

export default UpdateProduct;