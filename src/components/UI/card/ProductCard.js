import React from 'react';
import '../../modal/Modal.css';
import './CartCard.css';
import {Link} from "react-router-dom";

const ProductCard = ({card, product_name, one_item, tg, update_product_info, max_num_buy, num_stock, setModalOpen, setDeleteId, exitPath}) => {
    const handleDelete = () => {
        setDeleteId(card.id);
        setModalOpen(true);
    }

    return (
        <div className={"cart-card"}>
            <div className={"mob-close close-outer"}>
                <span onClick={handleDelete} className="close close-inner black">&times;</span>
            </div>
            <div className={"cart-card-img"}>
                <img style={{width: "100%", height: "100%"}} src={card.photo} alt={"cart"}/>
            </div>
            <div className={"cart-card-content"}>
                <div>
                    <Link to={`/update-product`} state={{ product: card, exitPath: exitPath }} style={{textDecoration: "none"}}>
                        <p style={{margin: "0", padding: "10px"}}>{update_product_info}</p><br/>
                    </Link><br/>
                    <p style={{marginTop: "-50px", padding: "10px"}}>
                        {product_name}: {card.name}<br/>
                        {one_item} = {card.price} {tg}<br/>
                        {max_num_buy} = {card.limit}<br/>
                        {num_stock} = {card.quantity}<br/>
                    </p>
                </div>
            </div>
            <div className={"web-close close-outer"}>
                <span onClick={handleDelete} className="close close-inner black">&times;</span>
            </div>
        </div>
    );
};

export default ProductCard;