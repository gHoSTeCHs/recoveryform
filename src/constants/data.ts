interface LostType {
	type: string;
	description: string;
	image: string;
}

export const lostType: LostType[] = [
	{
		type: 'Drainer',
		description: 'If you lost your assets via a drainer',
		image: '',
	},
	{
		type: 'Malicous Links',
		description: 'If you lost your assets by interacting with malicious links',
		image: '',
	},
	{
		type: 'Airdrop Links',
		description: 'If you lost your assets while trying to claim airdrops',
		image: '',
	},
	{
		type: 'Hacked wallet',
		description: 'If your wallet was hacked by malicious actors',
		image: '',
	},
];
