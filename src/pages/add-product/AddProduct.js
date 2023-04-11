import React, {useEffect, useState} from 'react';
import '../signup-login/Signup-Login.css';
import './AddProduct.css';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Select from "../../components/UI/select/Select";
import ProductService from "../../service/product/ProductService";
import Loader from "../../components/loader/Loader";


const AddProduct = () => {
    const {t} = useTranslation();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [productId, setProductId] = useState('1');
    const [productType, setProductType] = useState([]);
    const [products, setProducts] = useState([]);
    const [description, setDescription] = useState('');
    const [maxNumBuy, setMaxNumBuy] = useState(0);
    const [numStock, setNumStock] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [productPicture, setProductPicture] = useState(null);
    const imageMimeType = /image\/(png|jpg|jpeg)/i;


    useEffect( () => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/add-product');
        async function initialFetch() {
            await ProductService.getProductTypes(1)
                .then(response => setProductType([...response]));
            await ProductService.getProducts(1)
                .then(response => setProducts([...response]));
        }
        initialFetch();
    }, []);

    const handleProductIdChange = (id) => {
        setError('');
        setProductId(id);
    }

    const handleCategoryChange = async (id) => {
        setError('');
        setProductId('');

        let firstId = 0;
        await ProductService.getProductTypes(id)
            .then(response => {
                setProductType([...response]);
                firstId = response[0].value;
            });

        await ProductService.getProducts(firstId)
            .then(response => setProducts([...response]));

        setProductId(firstId);
    }

    const handleProductTypeChange = async (id) => {
        setError('');
        let firstId = 0;
        await ProductService.getProducts(id)
            .then(response => {
                setProducts([...response]);
                firstId = response[0].value;
            });
        setProductId(firstId);
    }

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
        if (!e.target.files[0].type.match(imageMimeType)) {
            setError(t('Invalid image format must be .png, .jpg, .jpeg'));
            setProductPicture(null);
            return;
        }
        setProductPicture(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (productId.length === 0) {
            setError(t('product_name_error'));
            return;
        }

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

        if (productPicture === null) {
            setError(t('no_picture_error'));
            return;
        }
        setLoading(true);

        const formData = new FormData();

        formData.append('file', productPicture);

        const recordAddDto = {
            productTypeId: productId,
            description: description,
            price: productPrice,
            quantity: numStock,
            limit: maxNumBuy,
            region: localStorage.getItem('city')
        }

        formData.append('recordAddDto', new Blob(
            [JSON.stringify(recordAddDto)],
            { type: "application/json" }
        ));

        await ProductService.addProduct(formData)
            .then(() => setSuccess(t('add_product_success')))
            .catch(error => setError(t('add_product_error')))
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
                                <h1>{t('add_product')}</h1>
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
                                    <form onSubmit={handleSubmit}>
                                        <label>{t('choose_product_category')}:</label><br/>
                                        <div className={"container"}>
                                            <Select
                                                onChange={handleCategoryChange}
                                                defaultValue={t("category")}
                                                options={[
                                                    {value: '1', name: t("fruit")},
                                                    {value: '2', name: t("vegetable")},
                                                    {value: '3', name: t("drink")},
                                                    {value: '4', name: t("meat")}
                                                ]}
                                            />
                                        </div>
                                        <label>{t('choose_product_type')}:</label><br/>
                                        <div className={"container"}>
                                            <Select
                                                defaultValue={t('select_product_type')}
                                                onChange={handleProductTypeChange}
                                                options={productType}
                                            />
                                        </div>
                                        <label>{t('choose_product')}:</label><br/>
                                        <div className={"container"}>
                                            <Select
                                                defaultValue={t('select_product')}
                                                onChange={handleProductIdChange}
                                                options={products}
                                            />
                                        </div>
                                        <label>{t('write_product_description')}:</label><br/>
                                        <textarea
                                            className={"description"}
                                            placeholder={t("write_product_description")}
                                            onChange={handleDescriptionChange}
                                            required
                                        ></textarea><br/>
                                        <label htmlFor={"max_num_buy"}>{t('max_num_buy')}:</label><br/>
                                        <input type={'number'} id={"max_num_buy"} name={t("max_num_buy")} onChange={handleMaxNumBuyChange} required/><br/>
                                        <label htmlFor={"num_stock"}>{t('num_stock')}:</label><br/>
                                        <input type={'number'} id={"num_stock"} name={t("num_stock")} onChange={handleNumStockChange} required/><br/>
                                        <label htmlFor={"product_price"}>{t('product_price')}:</label><br/>
                                        <input type={'number'} id={"product_price"} name={t("product_price")} onChange={handleProductPriceChange} required/><br/>
                                        <label htmlFor={"product_picture"}>{t('product_picture')}:</label><br/>
                                        <input type={'file'} accept={"image/*"} id={"product_picture"} name={t("product_picture")} onChange={handleProductPictureChange} required/><br/>
                                        <div className={"container"}>
                                            <button disabled={loading} className={"input-button"} type="submit">{t('add_product')}</button>
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

export default AddProduct;