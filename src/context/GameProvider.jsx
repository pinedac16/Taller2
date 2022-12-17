import deckOfCardsApi from "../services/deckofcardsapi";
import GameContext from "./GameContext"
import { useState } from 'react'

const GameProvider = ({children}) => {

    const [idGame, setIdGame] = useState(null);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');
    const [playerOne, setPlayerOne] = useState({
        name: "",
        cards: []
    });
    const [playerTwo, setPlayerTwo] = useState({
        name: "",
        cards: []
    });
    const [winPlayerOne, setWinPlayerOne] = useState({
        ternas:0,
        cuartas: 0,
        win: false
    })
    const [winPlayerTwo, setWinPlayerTwo] = useState({
        ternas:0,
        cuartas: 0,
        win: false
    })
    

    const playGame = async()=>{
        await deckOfCardsApi.getIdGame().then((idDeck) =>{
            setIdGame(idDeck);
            startCardsPlayerOne(idDeck);
            startCardsPlayerTwo(idDeck);
        })
    }

    const startCardsPlayerOne = async(idDeck)=>{
        const cardsOne = await deckOfCardsApi.getCards(idDeck,10);
        console.log(cardsOne);
        setPlayerOne({...playerOne,cards:cardsOne})
        console.log(playerOne);
    }

    const startCardsPlayerTwo = async(idDeck)=>{
        const cardsTwo = await deckOfCardsApi.getCards(idDeck,10);
        setPlayerTwo({...playerTwo,cards:cardsTwo})
    }

    const requestCards = async()=>{
        const cards = await deckOfCardsApi.getCards(idGame,2);

        if(cards.length > 0){
            console.log("NUEVA CARTA");
            console.log(cards[0]);
            const cardChangeOne = playerOne.cards.find((card) => card.value === cards[0].value);
            const cardChangeTwo = playerTwo.cards.find((card) => card.value === cards[1].value);

            console.log("CARTA ENCONTRADA");
            console.log(cardChangeOne);

            playerOne.cards.map(card => {
                const noOccurence = playerOne.cards.filter(obj => obj.value === card.value).length;
                if(noOccurence === 3){
                    setWinPlayerOne({...winPlayerOne,ternas: winPlayerOne.ternas += 1});
                }
                if(noOccurence === 4){
                    setWinPlayerOne({...winPlayerOne,cuartas: winPlayerOne.cuartas += 1});
                }
                return true;
            })

            playerTwo.cards.map(card => {
                const noOccurence = playerTwo.cards.filter(obj => obj.value === card.value).length;
                if(noOccurence === 3){
                    setWinPlayerTwo({...winPlayerTwo,ternas: winPlayerTwo.ternas += 1});
                }
                if(noOccurence === 4){
                    setWinPlayerTwo({...winPlayerTwo,cuartas: winPlayerTwo.cuartas += 1});
                }
                return true;
            })

            if(winPlayerOne.ternas === 6 && winPlayerOne.cuartas === 4)
                setWinPlayerOne({...winPlayerOne,win: true});
            if(winPlayerTwo.ternas === 6 && winPlayerTwo.cuartas === 4)
                setWinPlayerTwo({...winPlayerTwo,win: true});
            
            if (winPlayerOne.win || winPlayerTwo.win) {
                setShowToast(true);
                const newOrderCards = [...playerOne.cards].sort((a, b) =>
                    a.value > b.value ? 1 : -1,
                );
                setPlayerOne({...playerOne, cards: newOrderCards});
                setWinName(winPlayerOne.win ? `Winner player ${playerOne.name}` : `Winner player ${playerTwo.name}`);
            }

            setWinPlayerOne({...winPlayerOne,ternas: 0, cuartas: 0});
            setWinPlayerTwo({...winPlayerTwo,ternas: 0, cuartas: 0});
            if(cardChangeOne){
                
                let change1 = false;
                let change2 = false;
                const newCardsOne1 = playerOne.cards.map(card => {
                    const noOccurence = playerOne.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 1 && !change1 && cards[0].value !== card.value){
                        change1 = true;
                        return cards[0];
                    }else{
                        return card;
                    }
                })

                const newCardsOne2 = playerOne.cards.map(card => {
                    const noOccurence = playerOne.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 2 && !change2 && cards[0].value !== card.value){
                        change2 = true;
                        return cards[0];
                    }else{
                        return card;
                    }
                })

                if(change1){
                    setPlayerOne({...playerOne,cards:newCardsOne1});
                }else if(change2){
                    setPlayerOne({...playerOne,cards:newCardsOne2});
                }

                playerOne.cards.map(card => {
                    const noOccurence = playerOne.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 3){
                        setWinPlayerOne({...winPlayerOne,ternas: winPlayerOne.ternas += 1});
                    }
                    if(noOccurence === 4){
                        setWinPlayerOne({...winPlayerOne,cuartas: winPlayerOne.cuartas += 1});
                    }
                    return true;
                })
            }

            if(cardChangeTwo){
                let change1 = false;
                let change2 = false;
                const newCardsTwo1 = playerTwo.cards.map(card => {
                    const noOccurence = playerTwo.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 1 && !change1 && cards[1].value !== card.value){
                        change1 = true;
                        return cards[1];
                    }else{
                        return card;
                    }
                })

                const newCardsTwo2 = playerTwo.cards.map(card => {
                    const noOccurence = playerTwo.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 2 && !change2 && cards[1].value !== card.value){
                        change2 = true;
                        return cards[0];
                    }else{
                        return card;
                    }
                })

                if(change1){
                    setPlayerTwo({...playerTwo,cards:newCardsTwo1});
                }else if(change2){
                    setPlayerTwo({...playerTwo,cards:newCardsTwo2});
                }

                playerTwo.cards.map(card => {
                    const noOccurence = playerTwo.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 3){
                        setWinPlayerTwo({...winPlayerTwo,ternas: winPlayerTwo.ternas += 1});
                    }
                    if(noOccurence === 4){
                        setWinPlayerTwo({...winPlayerTwo,cuartas: winPlayerTwo.cuartas += 1});
                    }
                    return true;
                })
                
            }


            if(winPlayerOne.ternas === 6 && winPlayerOne.cuartas === 4)
                setWinPlayerOne({...winPlayerOne,win: true});
            if(winPlayerTwo.ternas === 6 && winPlayerTwo.cuartas === 4)
                setWinPlayerTwo({...winPlayerTwo,win: true});
            
            if (winPlayerOne.win || winPlayerTwo.win) {
                setShowToast(true);
                const newOrderCardsOne = [...playerOne.cards].sort((a, b) =>
                    a.value > b.value ? 1 : -1,
                );
                setPlayerOne({...playerOne, cards: newOrderCardsOne});
                const newOrderCardsTwo = [...playerTwo.cards].sort((a, b) =>
                    a.value > b.value ? 1 : -1,
                );
                setPlayerTwo({...playerTwo, cards: newOrderCardsTwo});
                setWinName(winPlayerOne.win ? `Winner player ${playerOne.name}` : `Winner player ${playerTwo.name}`);
            }
        }else{
            setShowToast(true);
            setWinName("the deck is over");
        }
    }

  return (
    <GameContext.Provider 
        value={{
            playGame,
            startCardsPlayerOne,
            startCardsPlayerTwo,
            requestCards,
            playerOne, 
            setPlayerOne,
            playerTwo, 
            setPlayerTwo,
            showToast,
            setShowToast,
            winName
        }}>
        {children}
    </GameContext.Provider>
  )
}

export default GameProvider