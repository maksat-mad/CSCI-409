import React from 'react';
import './MainCarousel.css';
import {Link} from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Card from '../UI/card/Card';
import Loader from "../loader/Loader";
import Error from '../error/Error';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2},
    {width: 768, itemsToShow: 3},
    {width: 1000, itemsToShow: 4}
];

const MainCarousel = ({error, loading, cards, name}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleCategoryChange = (categoryName) => {
        dispatch({type: 'UPDATE_CATEGORY', payload: categoryName});
    }

    return (
        <>
            <div className={"main-title"}>
                <Link to={"/category"} onClick={() => handleCategoryChange(name.toLowerCase())} style={{textDecoration: "none"}}>
                    <h2>{t(name)}</h2>
                </Link>
            </div>
            <div className={"container"}>
                {error && <Error message={error}/>}
                {!error && loading && <Loader/>}
                {!error && !loading &&
                    <Carousel style={{width: "1200px"}} breakPoints={breakPoints} pagination={false}
                              itemPadding={[20, 20, 20, 20]}>
                        {cards.map(el => {
                            return <Card
                                card={el}
                                key={el.id}
                            />
                        })}
                        <Card
                            category={name.toLowerCase()}
                        />
                    </Carousel>
                }
            </div>
        </>
    );
};

export default MainCarousel;