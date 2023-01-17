import React, {useEffect, useState} from 'react';
import './Category.css';
import CardService from "../../../service/main/CardService";
import Loader from "../loader/Loader";
import Card from '../card/Card';
import {useFetching} from "../../../hook/useFetching";
import {getPageCount} from "../../utils/pages";
import {useLocation} from 'react-router-dom';
import Pagination from "../pagination/Pagination";

const Category = () => {
    const [cards, setCards] = useState([]);
    const location = useLocation();
    const {category} = location.state;

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);

    const [fetchCards, isCardsLoading, cardsError] = useFetching(async (limit, page) => {
        const response = await CardService.getCategory(limit, page, category);
        setCards([...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => {
        fetchCards(limit, page);
    }, []);

    const changePage = (page) => {
        setPage(page);
        fetchCards(limit, page);
    }

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
                        <h4>Rating range (1-5)</h4>
                        <div>
                            <input className={"sort-inputs"}/>
                            -
                            <input className={"sort-inputs"}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"container"}>
                {cardsError &&
                    <h1>Error: ${cardsError}</h1>
                }
                {isCardsLoading && <Loader/>}
                <div className={"wrapper"}>
                    <div className={"cards-wrap"}>
                        {cards.map(el => {
                            return <Card key={el.url} image={el.url} name={"Apple"} price={"320 tg/kg"}
                                         buttonText={"buy"}/>
                        })}
                    </div>
                </div>
            </div>
            <div className={"container"}>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    changePage={changePage}
                />
            </div>
        </div>
    );
};

export default Category;