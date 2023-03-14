import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import ProductCard from "../card/ProductCard";
import {useFetching} from "../../../hook/useFetching";
import ProductService from "../../../service/product/ProductService";
import Error from "../error/Error";
import Loader from "../loader/Loader";
import {Link} from "react-router-dom";
import AreYouSureModal from "../modal/AreYouSureModal";
import ExitButton from "../exit-button/ExitButton";

const ProductsSale = () => {
    const {t} = useTranslation();
    const [myProducts, setMyProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(-1);
    const [isChange, setIsChange] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [fetchMyProducts, isMyProductsLoading, myProductsError] = useFetching(async () => {
        setIsLoading(true);
        const response = await ProductService.getProductsSale();
        setMyProducts([...response.data]);
        setIsLoading(false);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchMyProducts();
    }, []);

    useEffect(async () => {
        if (deleteId === -1) {
            return;
        }
        setIsLoading(true);
        await ProductService.removeProduct(deleteId)
            .then(() => console.log('deleted successfully'))
            .catch(() => console.log('failed to delete'));
        fetchMyProducts();
        setIsLoading(false);
    }, [isChange]);

    return (
        <>
            {isLoading ?
                <div className={"container"}>
                    <Loader/>
                </div>
            :
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
                                            setDeleteId={setDeleteId}
                                            setModalOpen={setModalOpen}
                                        />
                                    })}
                                </div>
                            </div>
                            <div className={"my-container"}>
                                <Link to="/profile">{t('cancel')}</Link>
                            </div>
                            <ExitButton link={"/profile"}/>
                            {modalOpen &&
                                <AreYouSureModal
                                    yes={t('yes')}
                                    no={t('no')}
                                    areYouSure={t('areYouSure')}
                                    setIsOpen={setModalOpen}
                                    isChange={isChange}
                                    setIsChange={setIsChange}
                                />
                            }
                        </>
                    }
                </>
            }
        </>
    );
};

export default ProductsSale;