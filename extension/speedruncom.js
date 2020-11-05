'use strict'

const axios = require('axios');

module.exports = (nodecg) => {

	const speedruncomUsersRep = nodecg.Replicant('speedruncomUsers', {
		defaultValue: []
	});

	const searchSpeedruncomUserForRunner = () => {

		const name = nodecg.readReplicant('runner');

		axios.get(`https://www.speedrun.com/api/v1/users?lookup=${name}`)
			.then((response) => {
				speedruncomUsersRep.value = response.data.data;
			})
			.catch((err) => {
				nodecg.log.warn('Speedrun.comAPIの実行に失敗しました。');
				nodecg.log.warn(err);
			});
	}

	nodecg.listenFor('searchSpeedruncomUser', searchSpeedruncomUserForRunner);

	nodecg.Replicant('runner').on('change', (_) => {
		speedruncomUsersRep.value = [];
	});
}
