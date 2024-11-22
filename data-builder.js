import globalTemps from './public/global_temps.json' with { type: "json" };

const getAvgDecadeTemp = () => {
	const clrs = [
		"#ff0000", "#00ff00", "#0000ff","#0000ff","#4CC3D9",
		"#EF2D5E", "#ff0000", "#00ff00", "#ff0000", "#00ff00",
		"#0000ff", "#0000ff", "#4CC3D9", "#EF2D5E", "#ff0000",
		"#00ff00", "#ff0000", "#00ff00", "#0000ff", "#0000ff",
		"#4CC3D9", "#EF2D5E", "#ff0000", "#00ff00"
	]

	const decadeMap = {};

	globalTemps.forEach(({ Year, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec }) => {
		const decade = Math.floor(Year / 10) * 10; // Calculate decade

		const monthTemps = [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec];
		const sumOfMonthTemps = monthTemps.reduce((a, b) => {
			if (a === '') { a = 0; }

			if (b === '') { b = 0; }

			return +a + +b;
		}, 0);

		const avgTempOfYear = (+sumOfMonthTemps / monthTemps.length) || 0;

		if (!decadeMap[decade]) {
			decadeMap[decade] = { sumOfTemp: 0, countOfTemp: 0 }; // Initialize sum and count for the decade
		}
		
		decadeMap[decade].sumOfTemp += avgTempOfYear;
		decadeMap[decade].countOfTemp += 1;
	});

	const getNextOdd = (() => {
		let current = -1; // Start with -1 so the first odd number is 1
		return () => {
			current += 2;
			return current;
		};
	})();

	// Calculate averages
	const averages = Object.entries(decadeMap).map(([decade, { sumOfTemp, countOfTemp }], index) => ({
		"decade": Number(decade),
		"average": sumOfTemp / countOfTemp,
		sumOfTemp,
		countOfTemp,
		"x": getNextOdd(),
		"y": (sumOfTemp / countOfTemp) * 10,
		"z": 0,
		"size": 1.5,
		"color": clrs[index]
	}));

	return averages;
}

const getMonthlyAvg = () => {
	const monthPercentage = {};
	const monthHashmap = {};
	const clrs = [
		"#ff0000", "#00ff00", "#0000ff","#0000ff","#4CC3D9",
		"#EF2D5E", "#ff0000", "#00ff00", "#ff0000", "#00ff00",
		"#0000ff", "#0000ff", "#4CC3D9", "#EF2D5E", "#ff0000",
		"#00ff00", "#ff0000", "#00ff00", "#0000ff", "#0000ff",
		"#4CC3D9", "#EF2D5E", "#ff0000", "#00ff00"
	];

	globalTemps.forEach((d) => {
		Object.entries(d).forEach(([key, value]) => {
			if (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].includes(key)) {
				if (!monthHashmap[key]) {
					monthHashmap[key] = { totalTemp: 0, count: 0 };
				}

				monthHashmap[key]['totalTemp'] += +value;
				monthHashmap[key]['count'] += 1;
			}
		});
	});

	// console.log(monthHashmap);

	const totalAvgTemp = Object.values(monthHashmap).reduce((a, b) => {
		return +a + +b.totalTemp;
	}, 0);


	Object.entries(monthHashmap).forEach(([key, value]) => {
		if (!monthPercentage[key]) {
			monthPercentage[key] = { size: 0, key };
		}

		monthPercentage[key].size = (value.totalTemp / totalAvgTemp) * 100;
	});

	const test = Object.entries(monthPercentage).map(([key, value], index) => {
		return {
			...value,
			month: key,
			color: clrs[index]
		}
	});

	// console.log(JSON.stringify(test));
}

export default { getAvgDecadeTemp, getMonthlyAvg };
