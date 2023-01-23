import React, {useEffect, useState} from 'react';
import '../search/Search.css';
import CardService from "../../../service/main/CardService";
import Loader from "../loader/Loader";
import Card from '../card/Card';
import {useFetching} from "../../../hook/useFetching";
import {getPageCount} from "../../utils/pages";
import Pagination from "../pagination/Pagination";
import Select from "../select/Select";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const Category = () => {
    const limit = 21;
    const { state } = useLocation();
    const category = state === null ? "all" : state.category;
    const navbarInput = useSelector(state => state.navbarInput);

    const [cards, setCards] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({category: 'all', sort: '', priceFrom: '', priceTo: '', query: ''});

    const [fetchCards, isCardsLoading, cardsError] = useFetching(async (limit, page, filter) => {
        const response = await CardService.getItemsByFilter(limit, page, filter);
        setCards([...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => {
        setFilter({...filter, category: category});
    }, []);

    useEffect(() => {
        fetchCards(limit, page, filter);
    }, [filter]);

    useEffect(() => {
        setFilter({...filter, query: navbarInput});
    }, [navbarInput]);

    const changePage = (page) => {
        setPage(page);
        fetchCards(limit, page, filter);
    }

    return (
        <div>
            <div className={"sort"}>
                <h2>{category}</h2>
                <Select
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue="Sorting"
                    options={[
                        {value: 'title', name: 'title'},
                        {value: 'rating', name: 'rating'},
                        {value: 'low price', name: 'low price'},
                        {value: 'high price', name: 'high price'}
                    ]}
                />
                <div className={"container"}>
                    <h4>Price range</h4>
                    <div>
                        <input
                            type="number"
                            className={"sort-inputs"}
                        />
                        -
                        <input
                            type="number"
                            className={"sort-inputs"}
                        />
                    </div>
                </div>
            </div>

            <div className={"container"}>
                {cardsError &&
                    <h1>Error: ${cardsError}</h1>
                }
                {isCardsLoading && <Loader/>}
                {!cardsError && cards.length === 0 &&
                    <h1>No items found</h1>
                }
                <div className={"wrapper"}>
                    <div className={"cards-wrap"}>
                        {cards.map(el => {
                            return <Card key={el.url} image={el.url}
                                         name={el.title.split(' ').slice(0,1).join('')}
                                         price={"320 tg/kg"}
                                         buttonText={"add to cart"}
                            />
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