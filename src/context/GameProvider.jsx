import deckOfCardsApi from "../services/deckofcardsapi";
import GameContext from "./GameContext"
import { useState } from 'react'

const GameProvider = ({children}) => {

    const [idGame, setIdGame] = useState(null);
    const [win, setWin] = useState(false);
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
            const winPlayerOne = {
                ternas:0,
                cuartas: 0,
                win: false
            }
            const winPlayerTwo = {
                ternas:0,
                cuartas: 0,
                win: false
            }
            const cardChangeOne = playerOne.cards.find((card) => card.value === cards[0].value);
            const cardChangeTwo = playerTwo.cards.find((card) => card.value === cards[1].value);

            console.log("CARTA ENCONTRADA");
            console.log(cardChangeOne);

            if(cardChangeOne){
                let change = false;
                const newCardsOne = playerOne.cards.map(card => {
                    const noOccurence = playerOne.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 1 && !change){
                        change = true;
                        return cards[0];
                    }else{
                        return card;
                    }
                })
                setPlayerOne({...playerOne,cards:newCardsOne});
                winPlayerOne.ternas = 0;
                winPlayerOne.cuartas = 0;
                playerOne.cards.map(card => {
                    const noOccurence = playerOne.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 3){
                        winPlayerOne.ternas = winPlayerOne.ternas + 1;
                    }
    
                    if(noOccurence === 4){
                        winPlayerOne.cuartas = winPlayerOne.cuartas + 1;
                    }
                    return true;
                })

                console.log("VALIDAR TERNAS Y CUARTAS ONE");
                console.log(winPlayerOne);
            }

            if(cardChangeTwo){
                let change = false;
                const newCardsTwo = playerTwo.cards.map(card => {
                    const noOccurence = playerTwo.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 1 && !change){
                        change = true;
                        return cards[0];
                    }else{
                        return card;
                    }
                })
                setPlayerTwo({...playerTwo,cards:newCardsTwo});
                winPlayerTwo.ternas = 0;
                winPlayerTwo.cuartas = 0;
                playerTwo.cards.map(card => {
                    const noOccurence = playerTwo.cards.filter(obj => obj.value === card.value).length;
                    if(noOccurence === 3){
                        winPlayerTwo.ternas = winPlayerTwo.ternas + 1;
                    }
    
                    if(noOccurence === 4){
                        winPlayerTwo.cuartas = winPlayerTwo.cuartas + 1;
                    }
                    return true;
                })

                console.log("VALIDAR TERNAS Y CUARTAS TWO");
                console.log(winPlayerTwo);
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