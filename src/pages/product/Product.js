import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hook/useFetching";
import CardService from "../../service/main/CardService";
import Loader from "../../components/loader/Loader";
import './Product.css';
import SignInToContinue from "../../components/UI/ratings-button/SignInToContinue";
import {useAuth} from "../../context/AuthContext";
import LeaveReview from "../../components/UI/ratings-button/LeaveReview";
import IndividualPhotoModal from "../../components/modal/IndividualPhotoModal";
import Review from "../../components/review/Review";
import NotFound from "../../components/not-found/NotFound";
import Error from '../../components/error/Error';
import {useTranslation} from "react-i18next";

const Product = () => {
    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {productId} = useParams();

    const [product, setProduct] = useState(null);
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);

    const [fetchProduct, isProductLoading, productError] = useFetching(async (productId) => {
        const response = await CardService.getItemById(productId);
        setProduct(response.data);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/products/' + productId);
        fetchProduct(productId);
    }, []);

    return (
        <div style={{padding: "2rem"}}>
            {productError &&
                <div className={"product-container"} >
                    <Error message={productError}/>
                </div>
            }
            {isProductLoading && <div className={"product-container"}><Loader/></div>}
            {!isProductLoading && !productError && product === null &&
                <div className={"product-container"} >
                    <NotFound message={t('no_product')}/>
                </div>
            }
            {!productError && !isProductLoading && product !== null &&
                <>
                    <div className={"product-container"}>
                        <div className={"individual-photo-info"}>
                            <div className={"individual-photo"} onClick={() => setIsPictureModalOpen(true)}>
                                <img style={{width: "100%", height: "100%"}} src={product.url} alt={"product"}/>
                            </div>
                            <div className={"individual-info"}>
                                <h2 className={"product-container"}>{product.title.split(" ")[0]}</h2>
                                <div className={"container-ratings big-font-size"}>
                                    {[...Array(3)].map(() =>
                                        <span className="fa fa-star checked"></span>
                                    )}
                                    {[...Array(5 - 3)].map(() =>
                                        <span className="fa fa-star"></span>
                                    )}
                                </div>
                                <p className={"product-container individual-text"}>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</p>
                                {currentUser ?
                                    <>
                                        {currentUser.role === 'user' &&
                                            <LeaveReview productId={productId}/>
                                        }
                                    </>
                                    :
                                    <SignInToContinue productId={productId}/>
                                }
                            </div>
                        </div>
                    </div>
                    <Review productId={productId}/>
                </>
            }
            {isPictureModalOpen &&
                <IndividualPhotoModal setIsOpen={setIsPictureModalOpen} picture={product.url} />
            }
        </div>
    );
};

export default Product;