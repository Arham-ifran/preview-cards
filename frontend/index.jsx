import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import UserInput from './src/pages/UserInput/userInput';
import { NotFound } from './src/pages/NotFound/notFound';
import './index.css';
import { Header } from './src/components/Header';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={UserInput} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
