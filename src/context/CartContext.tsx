import { createContext, useContext, useReducer } from "react";

export interface CartItem {
	id: number | string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	variant: {
		color: string;
		size: string;
	};
}

interface CartState {
	items: CartItem[];
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
}

type CartAction =
	| { type: "ADD_ITEM"; payload: CartItem }
	| { type: "REMOVE_ITEM"; payload: number | string }
	| {
			type: "UPDATE_QUANTITY";
			payload: { id: number | string; quantity: number };
	  }
	| { type: "CLEAR_CART" };

interface CartContextType {
	state: CartState;
	addItem: (item: CartItem) => void;
	removeItem: (id: number | string) => void;
	updateQuantity: (id: number | string, quantity: number) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateTotals(items: CartItem[]): {
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
} {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const shipping = items.length > 0 ? 8 : 0; // $8 flat rate shipping if cart not empty
	const tax = subtotal * 0.13; // 13% tax
	const total = subtotal + shipping + tax;

	return {
		subtotal,
		shipping,
		tax,
		total,
	};
}

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD_ITEM": {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			let newItems: CartItem[];

			if (existingItem) {
				newItems = state.items.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: item.quantity + action.payload.quantity }
						: item
				);
			} else {
				newItems = [...state.items, action.payload];
			}

			return {
				...state,
				items: newItems,
				...calculateTotals(newItems),
			};
		}

		case "REMOVE_ITEM": {
			const newItems = state.items.filter((item) => item.id !== action.payload);
			return {
				...state,
				items: newItems,
				...calculateTotals(newItems),
			};
		}

		case "UPDATE_QUANTITY": {
			const newItems = state.items.map((item) =>
				item.id === action.payload.id
					? { ...item, quantity: action.payload.quantity }
					: item
			);
			return {
				...state,
				items: newItems,
				...calculateTotals(newItems),
			};
		}

		case "CLEAR_CART":
			return {
				items: [],
				subtotal: 0,
				shipping: 0,
				tax: 0,
				total: 0,
			};

		default:
			return state;
	}
}

const initialState: CartState = {
	items: [],
	subtotal: 0,
	shipping: 0,
	tax: 0,
	total: 0,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addItem = (item: CartItem) => {
		dispatch({ type: "ADD_ITEM", payload: item });
	};

	const removeItem = (id: number | string) => {
		dispatch({ type: "REMOVE_ITEM", payload: id });
	};

	const updateQuantity = (id: number | string, quantity: number) => {
		dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	return (
		<CartContext.Provider
			value={{
				state,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
