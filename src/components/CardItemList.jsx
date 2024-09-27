import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [prevCard, setPrevCard] = useState(null);
  const toggleIsOpen = (list, ids) => {
    return list.map((item) =>
      ids.includes(item.id) ? { ...item, isOpen: !item.isOpen } : item
    );
  };

  const onClickHandler = (currentId) => {
    const currentCard = cardList.find((card) => card.id === currentId);
    if (currentCard.isOpen) return;
    setCardList((list) => toggleIsOpen(list, [currentId]));

    if (!prevCard) {
      setPrevCard(currentCard);
      return;
    }

    if (currentCard.name === prevCard.name) {
      console.log("macthed");
    } else {
      setTimeout(() => {
        setCardList((list) => toggleIsOpen(list, [currentId, prevCard.id]));
      }, 500);
    }
    setPrevCard(null);
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
