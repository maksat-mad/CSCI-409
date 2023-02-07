import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../../hook/useFetching";
import CardService from "../../../service/main/CardService";
import Loader from "../loader/Loader";
import './Product.css';
import SignInToContinue from "../ratings-button/SignInToContinue";
import {useAuth} from "../../../context/AuthContext";
import LeaveReview from "../ratings-button/LeaveReview";
import IndividualPhotoModal from "../modal/IndividualPhotoModal";
import Review from "../review/Review";

const Product = () => {
    const {currentUser} = useAuth();
    const {productId} = useParams();

    const [product, setProduct] = useState(null);
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);

    const [fetchProduct, isProductLoading, productError] = useFetching(async (productId) => {
        const response = await CardService.getItemById(productId);
        setProduct(response.data);
    });

    useEffect(() => {
        fetchProduct(productId);
    }, []);

    return (
        <div style={{padding: "2rem"}}>
            {productError &&
                <h1 className={"product-container"} >Error: {productError}</h1>
            }
            {isProductLoading && <div className={"product-container"}><Loader/></div>}
            {!isProductLoading && !productError && product === null &&
                <h1 className={"product-container"} >No such product</h1>
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
                                <div className={"container-ratings"}>
                                    {[...Array(3)].map(() =>
                                        <span className="fa fa-star checked"></span>
                                    )}
                                    {[...Array(5 - 3)].map(() =>
                                        <span className="fa fa-star"></span>
                                    )}
                                </div>
                                <p className={"product-container individual-text"}>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</p>
                                {currentUser ?
                                    <LeaveReview/>
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