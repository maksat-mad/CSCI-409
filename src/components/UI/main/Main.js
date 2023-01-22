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

    const navbarInput = useSelector(state => state.navbarInput);
    const [search, setSearch] = useState(false);

    const [fetchFruitCards, isFruitCardsLoading, fruitCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getCategory(limit, page);
        setFruitCards([...response.data]);
    });

    const [fetchVegetableCards, isVegetableCardsLoading, vegetableCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getCategory(limit, page);
        setVegetableCards([...response.data]);
    });

    const [fetchDrinkCards, isDrinkCardsLoading, drinkCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getCategory(limit, page);
        setDrinkCards([...response.data]);
    });

    const [fetchMeatCards, isMeatCardsLoading, meatCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getCategory(limit, page);
        setMeatCards([...response.data]);
    });

    useEffect(() => {
        fetchFruitCards();
        fetchVegetableCards();
        fetchDrinkCards();
        fetchMeatCards();
    }, []);

    useEffect(() => {
        console.log(navbarInput);
        if (navbarInput !== '') {
            setSearch(true);
        } else {
            setSearch(false);
        }
        console.log(search);
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
                        name={"Fruits"}
                    />
                    <MainCarousel
                        error={vegetableCardsError}
                        loading={isVegetableCardsLoading}
                        cards={vegetableCards}
                        name={"Vegetables"}
                    />
                    <MainCarousel
                        error={drinkCardsError}
                        loading={isDrinkCardsLoading}
                        cards={drinkCards}
                        name={"Drinks"}
                    />
                    <MainCarousel
                        error={meatCardsError}
                        loading={isMeatCardsLoading}
                        cards={meatCards}
                        name={"Meats"}
                    />
                </>
            }
        </>
    );
};

export default Main;