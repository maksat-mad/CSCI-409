import React, {useEffect, useState} from 'react';
import './Main.css';
import main from '../../../assets/main.jpg';
import {useFetching} from "../../../hook/useFetching";
import CardService from "../../../service/main/CardService";
import {useSelector} from 'react-redux';
import Search from "../search/Search";
import MainCarousel from "../main-carousel/MainCarousel";

const Main = () => {
    const [fruitCards, setFruitCards] = useState([]);
    const [vegetableCards, setVegetableCards] = useState([]);
    const [drinkCards, setDrinkCards] = useState([]);
    const [meatCards, setMeatCards] = useState([]);
    const [search, setSearch] = useState(false);

    const navbarInput = useSelector(state => state.navbarInput);

    const [fetchFruitCards, isFruitCardsLoading, fruitCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getItems(limit, page, "fruits");
        setFruitCards([...response.data]);
    });

    const [fetchVegetableCards, isVegetableCardsLoading, vegetableCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getItems(limit, page, "vegetables");
        setVegetableCards([...response.data]);
    });

    const [fetchDrinkCards, isDrinkCardsLoading, drinkCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getItems(limit, page, "drinks");
        setDrinkCards([...response.data]);
    });

    const [fetchMeatCards, isMeatCardsLoading, meatCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getItems(limit, page, "meats");
        setMeatCards([...response.data]);
    });

    useEffect(() => {
        fetchFruitCards();
        fetchVegetableCards();
        fetchDrinkCards();
        fetchMeatCards();
    }, []);

    useEffect(() => {
        if (navbarInput !== '') {
            setSearch(true);
        } else {
            setSearch(false);
        }
    }, [navbarInput]);

    return (
        <>
            {search === true ?
                <Search/>
                :
                <>
                    <div className={"container"}>
                        <div className={"main-image"}>
                            <img src={main} alt={"main"}/>
                        </div>
                    </div>
                    <MainCarousel
                        error={fruitCardsError}
                        loading={isFruitCardsLoading}
                        cards={fruitCards}
                        name={"fruits"}
                    />
                    <MainCarousel
                        error={vegetableCardsError}
                        loading={isVegetableCardsLoading}
                        cards={vegetableCards}
                        name={"vegetables"}
                    />
                    <MainCarousel
                        error={drinkCardsError}
                        loading={isDrinkCardsLoading}
                        cards={drinkCards}
                        name={"drinks"}
                    />
                    <MainCarousel
                        error={meatCardsError}
                        loading={isMeatCardsLoading}
                        cards={meatCards}
                        name={"meats"}
                    />
                </>
            }
        </>
    );
};

export default Main;