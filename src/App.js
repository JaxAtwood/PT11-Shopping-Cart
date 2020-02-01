import React from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import ProductContext from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";

function App() {

	const initialCartState = () => 
		JSON.parse(window.localStorage.getItem("cart")) || [];
		//declaring/sets the initialstate value- reads the Item from localStorage, accesses the stored data with a key of "cart"
		//parse changes from string to object
		//returns the value within localstorage if any in localstorage or returns an emoty array
	
	const [products] = React.useState(data);
	const [cart, setCart] = React.useState(initialCartState);
	//allows us to update the value of the state- by passing in the initialCartState


	React.useEffect(() => {
		window.localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);
	//sets the item to localstorage with a key of cart, gives it an index of [cart] array
	//stringify changes from object to a string
	//cart is the parameter of the stringify method
	console.log(cart) // returns the items in the cart but JSON requires strings not objects so must parse and stringify

	const addItem = item => {
		if(!cart.find(cartItem => cartItem.id === item.id)) {
			//find is a function that uses the first item in an array and returns it if it meets the conditions specified
			//so if not in the cart, iterate through the array, assign each item an index of cartItem, compare the id to the item id
			//item id references back to the item of shopping cart 
			//key={item.id}
		setCart([...cart, item])
		//then if condition is met, it setsCart which updates the state to spread in the contents of the current cart and add the parameter of the add item function
		}
	};

	const removeItem = id => {
		setCart(cart.filter(item=> item.id !== id));
		//id is a parameter if the removeItem function- then call the setCart method to filter through the cart contents, iterate through each item giving it an index of item. Then comparing the item.id is not equal to the id. 
		//So if the item matches, it adds to the cart, if it doesn't match, then it removes it from the cart
		//doesn't actually remove anything it just updates the current state but because it is also being set/get in localstorage, it is persisted
	}

	return (
		<ProductContext.Provider value={{ products, addItem }}>
		<CartContext.Provider value={{ cart, removeItem }}>
		<div className="App">

			<Navigation />
			<Route exact path="/" component={Products} />
			<Route path="/cart" component={ShoppingCart} />
			
		</div>
		</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
