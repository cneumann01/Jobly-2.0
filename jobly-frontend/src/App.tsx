import "./components/Navbar"
import AppRoutes from "./AppRoutes";
import "./App.scss";
import Navbar from "./components/Navbar";


function App() {
	return (
		<div>
      <Navbar />
			<AppRoutes />
		</div>
	);
}

export default App;
