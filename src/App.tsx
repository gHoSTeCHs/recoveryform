import Drain from './components/Drain';
// import DrainedComponent from './components/DrainedComponent';
// import { lostType } from './constants/data';

const App = () => {
	return (
		<div>
			<div className="flex flex-col md:flex-row gap-2 ">
				{/* {lostType.map((type) => (
					<div
						key={type.type}
						className="flex flex-col gap-2 bg-popover md:max-w-[300px] p-4 rounded-md hover:bg-popover/80 cursor-pointer"
						onClick={() => console.log('object')}>
						<div>
							<img
								src={type.image}
								alt={type.type}
								className="w-10 h-10 inline-block bg-muted p-0 rounded-md"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<h1 className="text-lg">{type.type}</h1>
							<p className="text-sm text-muted-foreground">
								{type.description}
							</p>
						</div>
					</div>
				))} */}
				{/* <DrainedComponent /> */}
				<Drain />
			</div>
		</div>
	);
};

export default App;
