import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import ProductCard from "../card/ProductCard";
import {useFetching} from "../../../hook/useFetching";
import ProductService from "../../../service/product/ProductService";
import Error from "../error/Error";
import Loader from "../loader/Loader";
import {Link} from "react-router-dom";

const ProductsSale = () => {
    const {t} = useTranslation();
    const [myProducts, setMyProducts] = useState([]);

    const [fetchMyProducts, isMyProductsLoading, myProductsError] = useFetching(async () => {
        const response = await ProductService.getProductsSale();
        setMyProducts([...response.data]);
    });

    useEffect(() => {
        fetchMyProducts();
    }, []);

    return (
        <>
            {myProducts.length === 0
            ?
                <div className={"container"}>
                    <h1>{t('no_my_products_for_sale')}</h1>
                </div>
            :
                <>
                    <div className={"container"}>
                        {myProductsError && <Error message={myProductsError}/>}
                        {isMyProductsLoading && <Loader/>}
                    </div>
                    <div className={"container"}>
                        <h1>{t('my_products_for_sale')}</h1>
                    </div>
                    <div className={"container"}>
                        <div>
                            {myProducts.map(product => {
                                return <ProductCard
                                    card={product}
                                    one_item={t('one_item')}
                                    tg={t('tg')}
                                    update_product_info={t('update_product_info')}
                                    max_num_buy={t('max_num_buy')}
                                    num_stock={t('num_stock')}
                                    product_name={t('product_name')}
                                />
                            })}
                        </div>
                    </div>
                    <div className={"my-container"}>
                        <Link to="/profile">{t('cancel')}</Link>
                    </div>
                </>
            }
        </>
    );
};

export default ProductsSale;