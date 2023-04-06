import React, {useEffect, useState} from 'react';
import '../search/Search.css';
import CardService from "../../service/main/CardService";
import Loader from "../../components/loader/Loader";
import Card from '../../components/UI/card/Card';
import {useFetching} from "../../hook/useFetching";
import {getPageCount} from "../../utils/pages";
import Pagination from "../../components/pagination/Pagination";
import Select from "../../components/UI/select/Select";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import NotFound from "../../components/not-found/NotFound";
import Error from "../../components/error/Error";
import {useTranslation} from "react-i18next";

const Category = () => {
    const limit = 20;
    const {t} = useTranslation();
    const { state } = useLocation();
    const category = state === null ? "all" : state.category;
    const navbarInput = useSelector(state => state.navbarInput);
    const selectedCity = useSelector(state => state.city);

    const [cards, setCards] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({category: 'all', sort: '',
        priceFrom: '', priceTo: '', query: '', city: 'astana'});

    const [fetchCards, isCardsLoading, cardsError] = useFetching(async (limit, page, filter) => {
        const response = await CardService.getItemsByFilter(limit, page, filter);
        setCards([...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/category');
        setFilter({...filter, category: category});
    }, []);

    useEffect(() => {
        fetchCards(limit, page, filter);
    }, [filter]);

    useEffect(() => {
        setFilter({...filter, query: navbarInput});
    }, [navbarInput]);

    useEffect(() => {
        setFilter({...filter, city: selectedCity});
    }, [selectedCity]);

    const changePage = (page) => {
        setPage(page);
        fetchCards(limit, page, filter);
    }

    return (
        <div>
            <div className={"sort"}>
                <h2>{t(category)}</h2>
                <Select
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue={t("sorting")}
                    options={[
                        {value: 'title', name: t('title')},
                        {value: 'rating', name: t('rating')},
                        {value: 'low_price', name: t('low_price')},
                        {value: 'high_price', name: t('high_price')}
                    ]}
                />
                <div className={"container"}>
                    <h4>{t('price_range')}</h4>
                    <div>
                        <input
                            onChange={e => setFilter({...filter, priceFrom: e.target.value})}
                            type="number"
                            className={"sort-inputs"}
                        />
                        -
                        <input
                            onChange={e => setFilter({...filter, priceTo: e.target.value})}
                            type="number"
                            className={"sort-inputs"}
                        />
                    </div>
                </div>
            </div>
            <div className={"container"}>
                {cardsError && <Error message={cardsError}/>}
                {isCardsLoading && <Loader/>}
                {!isCardsLoading && !cardsError && cards.length === 0 &&
                    <NotFound message={t('no_items_found')}/>
                }
            </div>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div className={"cards-wrap"}>
                        {!cardsError && !isCardsLoading && cards.length !== 0 &&
                            cards.map(el => {
                                return <Card key={el.id} card={el}/>
                            })
                        }
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