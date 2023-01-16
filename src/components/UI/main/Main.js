import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import './Main.css';
import main from '../../../assets/main.jpg';
import Carousel from "react-elastic-carousel";
import Card from '../card/Card';
import fruits from '../../../assets/fruits.jpg';
import Loader from "../loader/Loader";
import {useFetching} from "../../../hook/useFetching";
import CardService from "../../../service/main/CardService";

const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2},
    {width: 768, itemsToShow: 3},
    {width: 1000, itemsToShow: 4}
];

const Main = () => {
    const [fruitCards, setFruitCards] = useState([]);

    const [fetchFruitCards, isFruitCardsLoading, fruitCardsError] = useFetching(async () => {
        const response = await CardService.getItems();
        setFruitCards([...response.data]);
    });

    useEffect(() => {
        fetchFruitCards();
    }, []);

    return (
        <>
            <div className={"container"}>
                <div className={"main-image"}>
                    <img src={main} alt={"main"}/>
                </div>
            </div>
            <div className={"main-title"}>
                <Link to={"/fruits"} style={{textDecoration: "none"}}>
                    <h2>Fruits</h2>
                </Link>
            </div>
            <div className={"container"}>
                {fruitCardsError &&
                    <h1>Error: ${fruitCardsError}</h1>
                }
                {isFruitCardsLoading && <Loader/>}
                <Carousel style={{width: "1200px"}} breakPoints={breakPoints} pagination={false}
                          itemPadding={[20, 20, 20, 20]}>
                    {fruitCards.map(el => {
                        return <Card key={el.url} image={el.url} name={"Apple"} price={"320 tg/kg"} buttonText={"buy"}/>
                    })}
                    <Card image={fruits} name={"Check out other fruits"} price={""} buttonText={"more..."}/>
                </Carousel>
            </div>
        </>
    );
};

export default Main;