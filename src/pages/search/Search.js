import React, {useEffect, useState} from 'react';
import './Search.css';
import CardService from "../../service/main/CardService";
import Loader from "../../components/loader/Loader";
import Card from '../../components/UI/card/Card';
import {useFetching} from "../../hook/useFetching";
import {getPageCount} from "../../utils/pages";
import Pagination from "../../components/pagination/Pagination";
import Select from "../../components/UI/select/Select";
import {useSelector} from "react-redux";
import NotFound from "../../components/not-found/NotFound";
import Error from '../../components/error/Error';
import {useTranslation} from "react-i18next";

const Search = () => {
    const limit = 15;
    const {t} = useTranslation();

    const navbarInput = useSelector(state => state.navbarInput);
    const selectedCity = useSelector(state => state.city);

    const [cards, setCards] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({category: '0', sort: 'DEFAULT',
        priceFrom: '0', priceTo: '0', query: navbarInput, city: selectedCity});

    const [fetchCards, isCardsLoading, cardsError] = useFetching(async (limit, page, filter) => {
        const response = await CardService.getItemsByFilter(limit, page, filter);
        setCards([...response.data.data.content]);
        const totalCount = response.data.data.totalElements;
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setFilter({...filter, query: navbarInput});
        fetchCards(limit, page, filter);
    }, [navbarInput]);

    useEffect(() => {
        setFilter({...filter, city: selectedCity});
        fetchCards(limit, page, filter);
    }, [selectedCity]);

    const changePage = (page) => {
        setPage(page);
        fetchCards(limit, page, filter);
    }

    const handleFilterApply = () => {
        fetchCards(limit, page, filter);
    }

    return (
        <div>
            <div className={"sort"}>
                <Select
                    value={filter.category}
                    onChange={selectedCategory => setFilter({...filter, category: selectedCategory})}
                    defaultValue={t("category")}
                    options={[
                        {value: '0', name: t("all")},
                        {value: '1', name: t("fruit")},
                        {value: '2', name: t("vegetable")},
                        {value: '3', name: t("drink")},
                        {value: '4', name: t("meat")}
                    ]}
                />
                <Select
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue={t("sorting")}
                    options={[
                        {value: 'DEFAULT', name: t('default')},
                        {value: 'NAME', name: t('title')},
                        {value: 'RATING', name: t('rating')},
                        {value: 'LOW_PRICE', name: t('low_price')},
                        {value: 'HIGH_PRICE', name: t('high_price')}
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
                        <button onClick={handleFilterApply} class={"filter-button"}>{t('apply_filter')}</button>
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

export default Search;