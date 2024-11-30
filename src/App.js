import React, { useEffect, useRef, useState } from 'react';

import { cardMapOld, getCardMapFilteredOld } from './config/cardMap';
import { fusionMap } from './config/fusionMap';

import { generateAttemptList } from './util/attemptGenerator';
import { buildCell, buildRow, buildTable } from './util/html';

import './App.css';

const attemptList = generateAttemptList();

const indexToElementMap = {
	1: () => document.getElementById('hand1').value,
	2: () => document.getElementById('hand2').value,
	3: () => document.getElementById('hand3').value,
	4: () => document.getElementById('hand4').value,
	5: () => document.getElementById('hand5').value,
	6: () => document.getElementById('board6').value,
	7: () => document.getElementById('board7').value,
	8: () => document.getElementById('board8').value,
	9: () => document.getElementById('board9').value,
	10: () => document.getElementById('board10').value,
};

function attempToCardList(attempt) {

	let cardList = [];

	for (const index of attempt) {
		const card = indexToElementMap[index]();

		if ((!card) || (card === '0')) {
			return null;
		}

		cardList.push(card);
	}

	return cardList;
}

function buildOptionList(newCardMap) {
	return Object.entries(newCardMap).map(([key, value]) => <option value={key}>{value}</option>);
}

function componentDidMount(props) {
	document.body.classList.add('container');
}

function updateOptionList(filter, setter) {
	if (filter === '') {
		setter([]);
		return;
	}

	const cardMapFiltered = getCardMapFilteredOld(filter);
	const optionList = buildOptionList(cardMapFiltered);
	setter(optionList);
}

function App(props) {

	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props);
		}
	});

	const [board6List, setBoard6list] = useState([]);
	const [board7List, setBoard7list] = useState([]);
	const [board8List, setBoard8list] = useState([]);
	const [board9List, setBoard9list] = useState([]);
	const [board10List, setBoard10list] = useState([]);

	const [hand1List, setHand1List] = useState([]);
	const [hand2List, setHand2List] = useState([]);
	const [hand3List, setHand3List] = useState([]);
	const [hand4List, setHand4List] = useState([]);
	const [hand5List, setHand5List] = useState([]);

	return buildTable(
		buildRow('clearBoardRow', {},
			buildCell('clearBoard6Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
			buildCell('clearBoard7Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
			buildCell('clearBoard8Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
			buildCell('clearBoard9Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
			buildCell('clearBoard10Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
		),
		buildRow('filterBoardRow', {},
			buildCell('filterBoard6Cell', <input onChange={event => updateOptionList(event.target.value, setBoard6list)} />),
			buildCell('filterBoard7Cell', <input onChange={event => updateOptionList(event.target.value, setBoard7list)} />),
			buildCell('filterBoard8Cell', <input onChange={event => updateOptionList(event.target.value, setBoard8list)} />),
			buildCell('filterBoard9Cell', <input onChange={event => updateOptionList(event.target.value, setBoard9list)} />),
			buildCell('filterBoard10Cell', <input onChange={event => updateOptionList(event.target.value, setBoard10list)} />),
		),
		buildRow('optionBoardRow', {},
			buildCell('optionBoard6Cell', <select name='optionBoard6' id='board6'>{board6List}</select>),
			buildCell('optionBoard7Cell', <select name='optionBoard7' id='board7'>{board7List}</select>),
			buildCell('optionBoard8Cell', <select name='optionBoard8' id='board8'>{board8List}</select>),
			buildCell('optionBoard9Cell', <select name='optionBoard9' id='board9'>{board9List}</select>),
			buildCell('optionBoard10Cell', <select name='optionBoard10' id='board10'>{board10List}</select>),
		),
		buildRow('clearHandRow', {},
			buildCell('clearHand1Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
			buildCell('clearHand2Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
			buildCell('clearHand3Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
			buildCell('clearHand4Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
			buildCell('clearHand5Cell', <input onClick={() => alert('to do')} type='button' value='Clear' />),
		),
		buildRow('filterHandRow', {},
			buildCell('filterHand1Cell', <input onChange={event => updateOptionList(event.target.value, setHand1List)} />),
			buildCell('filterHand2Cell', <input onChange={event => updateOptionList(event.target.value, setHand2List)} />),
			buildCell('filterHand3Cell', <input onChange={event => updateOptionList(event.target.value, setHand3List)} />),
			buildCell('filterHand4Cell', <input onChange={event => updateOptionList(event.target.value, setHand4List)} />),
			buildCell('filterHand5Cell', <input onChange={event => updateOptionList(event.target.value, setHand5List)} />),
		),
		buildRow('optionHandRow', {},
			buildCell('optionHand1Cell', <select name='optionHand1' id='hand1'>{hand1List}</select>),
			buildCell('optionHand2Cell', <select name='optionHand2' id='hand2'>{hand2List}</select>),
			buildCell('optionHand3Cell', <select name='optionHand3' id='hand3'>{hand3List}</select>),
			buildCell('optionHand4Cell', <select name='optionHand4' id='hand4'>{hand4List}</select>),
			buildCell('optionHand5Cell', <select name='optionHand5' id='hand5'>{hand5List}</select>),
		),
		buildRow('commandRow', { colSpan: 5 },
			buildCell('commandCell', <input onClick={() => {
				const hand1 = document.getElementById('hand1').value;
				const hand2 = document.getElementById('hand2').value;
				const hand3 = document.getElementById('hand3').value;
				const hand4 = document.getElementById('hand4').value;
				const hand5 = document.getElementById('hand5').value;

				const board6 = document.getElementById('board6').value;
				const board7 = document.getElementById('board7').value;
				const board8 = document.getElementById('board8').value;
				const board9 = document.getElementById('board9').value;
				const board10 = document.getElementById('board10').value;

				const output = document.getElementById('output');

				const outputList = [];

				attemptList.forEach(attempt => {
					const cardList = attempToCardList(attempt);

					if (cardList === null) {
						return;
					}

					const fusionResult = cardList.reduce((object, currentCard) => {
						if (!object.isValid) {
							return object;
						}

						if (!object.card) {
							return {
								card: currentCard,
								isValid: true,
							}
						} else {
							const card = fusionMap[object.card][currentCard];

							return {
								card: card,
								isValid: !!card,
							}
						}
					}, {
						card: null,
						isValid: true,
					});

					if (!fusionResult.isValid) {
						return;
					}

					const cardNameList = cardList.map(card => cardMapOld[card]);

					outputList.push(`${cardNameList.join(' + ')} = ${cardMapOld[fusionResult.card]}`);
				});

				output.value = outputList.join('\n');
			}} type='button' value='Do it' />, { colSpan: 5 }),
		),
		buildRow('outputRow', { colSpan: 5 },
			buildCell('outputCell', <textarea id='output' rows='10' readOnly />, { colSpan: 5 }),
		)
	);
}

export default App;

