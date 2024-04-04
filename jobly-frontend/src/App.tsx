import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import "./App.scss";

function App() {
	return (
		<BrowserRouter>
			<div>
				<AuthProvider>
					<Navbar />
					<AppRoutes />
				</AuthProvider>
			</div>
		</BrowserRouter>
	);
}

export default App;
