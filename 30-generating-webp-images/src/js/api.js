export function getMotivationalPictures() {
	return new Promise(resolve => {
		setTimeout(() => {
			const mockedResponse = [
				'images/motivational-pictures/mountain.webp',
				'images/motivational-pictures/darts.webp',
				'images/motivational-pictures/passion.webp',
			];
			resolve(mockedResponse);
		}, 700);
	})
}