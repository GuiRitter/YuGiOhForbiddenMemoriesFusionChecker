export const generateAttemptList = () => {

	let boardListWithNull = [0, 6, 7, 8, 9, 10];

	let handListWithNull = [0, 1, 2, 3, 4, 5];

	let getListWithoutElementIgnoringZero = (list, element) => {
		if (element === 0) {
			return list;
		};

		return list.filter(item => item !== element);
	};

	let addToListIfNotAlreadyExist = (list, element) => {
		element = JSON.stringify(element);

		if (list.includes(element)) {
			return list;
		}

		return [...list, element];
	};

	let attemptList = [];

	boardListWithNull.forEach(boardIndex => {
		handListWithNull.forEach(handAttempt5Index => {
			let handListWithout5 = getListWithoutElementIgnoringZero(handListWithNull, handAttempt5Index);

			handListWithout5.forEach(handAttempt4Index => {
				let handListWithout5And4 = getListWithoutElementIgnoringZero(handListWithout5, handAttempt4Index);

				handListWithout5And4.forEach(handAttempt3Index => {
					let handListWithout5And4And3 = getListWithoutElementIgnoringZero(handListWithout5And4, handAttempt3Index);

					handListWithout5And4And3.forEach(handAttempt2Index => {
						let handListWithout5And4And3And2 = getListWithoutElementIgnoringZero(handListWithout5And4And3, handAttempt2Index);

						handListWithout5And4And3And2.forEach(handAttempt1Index => {
							let attempt = [];

							if (boardIndex !== 0) {
								attempt = [...attempt, boardIndex];
							}

							if (handAttempt5Index !== 0) {
								attempt = [...attempt, handAttempt5Index];
							}

							if (handAttempt4Index !== 0) {
								attempt = [...attempt, handAttempt4Index];
							}

							if (handAttempt3Index !== 0) {
								attempt = [...attempt, handAttempt3Index];
							}

							if (handAttempt2Index !== 0) {
								attempt = [...attempt, handAttempt2Index];
							}

							if (handAttempt1Index !== 0) {
								attempt = [...attempt, handAttempt1Index];
							}

							if (attempt.length < 2) return;

							attemptList = addToListIfNotAlreadyExist(attemptList, attempt);
						});
					});
				});
			});
		});
	});

	return attemptList.map(list => JSON.parse(list));
};