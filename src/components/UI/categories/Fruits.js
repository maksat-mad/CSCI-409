import React, {useEffect, useState} from 'react';
import './Category.css';
import CardService from "../../../service/main/CardService";
import Loader from "../loader/Loader";
import Card from '../card/Card';
import {useFetching} from "../../../hook/useFetching";
import fruits from "../../../assets/fruits.jpg";

const Fruits = () => {
    const [fruitCards, setFruitCards] = useState([]);

    const [fetchFruitCards, isFruitCardsLoading, fruitCardsError] = useFetching(async () => {
        const response = await CardService.getItems();
        setFruitCards([...response.data]);
    });

    useEffect(() => {
        fetchFruitCards();
    }, []);

    return (
        <div>
            <div className={"price-rating"}>
                <div className={"sort-dropdown"}>
                    <div className={"sort-by"}>
                        <div className={"sort-by-dropdown"}>
                            <input type={"checkbox"} id={"my-dropdown"} value="" name={"my-checkbox"}/>
                            <label htmlFor={"my-dropdown"}
                                   data-toggle={"dropdown"}>
                                Sort By
                            </label>
                            <ul>
                                <li><a href="#">alphabet</a></li>
                                <li><a href="#">low price</a></li>
                                <li><a href="#">high price</a></li>
                                <li><a href="#">new date</a></li>
                                <li><a href="#">old date</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"container"}>
                        <h4>Price range</h4>
                        <div>
                            <input className={"sort-inputs"}/>-<input className={"sort-inputs"}/>
                        </div>
                    </div>
                    <div className={"container"}>
                        <h4>Rating range</h4>
                        <div>
                            <input className={"sort-inputs"}/>-<input className={"sort-inputs"}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"container"}>
                {fruitCardsError &&
                    <h1>Error: ${fruitCardsError}</h1>
                }
                {isFruitCardsLoading && <Loader/>}
                <div>
                    {fruitCards.map(el => {
                        return <Card key={el.url} image={el.url} name={"Apple"} price={"320 tg/kg"} buttonText={"buy"}/>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Fruits;