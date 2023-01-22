import React, {useEffect, useState} from 'react';
import './Search.css';
import CardService from "../../../service/main/CardService";
import Loader from "../loader/Loader";
import Card from '../card/Card';
import {useFetching} from "../../../hook/useFetching";
import {getPageCount} from "../../utils/pages";
import Pagination from "../pagination/Pagination";
import Select from "../select/Select";

const Search = () => {
    const limit = 30;

    const [cards, setCards] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const [fetchCards, isCardsLoading, cardsError] = useFetching(async (limit, page) => {
        const response = await CardService.getCategory(limit, page);
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
            <div className={"sort"}>
                <Select
                    // value={filter.sort}
                    // onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue="Category"
                    options={[
                        {value: 'all', name: 'all'},
                        {value: 'fruit', name: 'fruit'},
                        {value: 'vegetable', name: 'vegetable'},
                        {value: 'drink', name: 'drink'},
                        {value: 'meat', name: 'meat'}
                    ]}
                />
                <Select
                    // value={filter.sort}
                    // onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue="Sorting"
                    options={[
                        {value: 'alphabet', name: 'alphabet'},
                        {value: 'rating', name: 'rating'},
                        {value: 'low price', name: 'low price'},
                        {value: 'high price', name: 'high price'}
                    ]}
                />
                <div className={"container"}>
                    <h4>Price range</h4>
                    <div>
                        <input className={"sort-inputs"}/>-<input className={"sort-inputs"}/>
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

export default Search;