import React from 'react';
import './MainCarousel.css';
import {Link} from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Card from '../card/Card';
import Loader from "../loader/Loader";

const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2},
    {width: 768, itemsToShow: 3},
    {width: 1000, itemsToShow: 4}
];

const MainCarousel = ({error, loading, cards, name}) => {
    return (
        <>
            <div className={"main-title"}>
                <Link to={"/category"} state={{category: name.toLowerCase()}} style={{textDecoration: "none"}}>
                    <h2>{name}</h2>
                </Link>
            </div>
            <div className={"container"}>
                {error &&
                    <h1>Error: {error}</h1>
                }
                {loading && <Loader/>}
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
            </div>
        </>
    );
};

export default MainCarousel;