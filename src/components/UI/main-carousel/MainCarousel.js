import React from 'react';
import './MainCarousel.css';
import {Link} from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Card from '../card/Card';
import Loader from "../loader/Loader";
import fruits from '../../../assets/fruits.jpg';
import vegetables from '../../../assets/vegetables.jpg';
import drinks from '../../../assets/drinks.jpg';
import meats from '../../../assets/meats.jpg';

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
                <Link to={"/category"} state={{category: "fruits"}} style={{textDecoration: "none"}}>
                    <h2>{name}</h2>
                </Link>
            </div>
            <div className={"container"}>
                {error &&
                    <h1>Error: ${error}</h1>
                }
                {loading && <Loader/>}
                <Carousel style={{width: "1200px"}} breakPoints={breakPoints} pagination={false}
                          itemPadding={[20, 20, 20, 20]}>
                    {cards.map(el => {
                        return <Card key={el.url} image={el.url}
                                     name={el.title.split(' ').slice(0,1).join('')}
                                     price={"320 tg/kg"}
                                     buttonText={"add to cart"}
                        />
                    })}
                    <Card image={
                        name === "Fruits" ? fruits :
                            name === "Vegetables" ? vegetables :
                                name === "Drinks" ? drinks : meats
                    }
                          name={"Check out other " + name}
                          price={""}
                          buttonText={"more..."}
                          category={name.toLowerCase()}
                    />
                </Carousel>
            </div>
        </>
    );
};

export default MainCarousel;