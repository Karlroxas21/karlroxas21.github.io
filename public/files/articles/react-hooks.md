# React Hooks: Stop Writing Class Components, Start Writing Functions

###### _Karl Marx Roxas February 14, 2026_

## What's This About?

Before React 16.8, if you wanted your component to have state, handle side effects, or do anything beyond showing static HTML, you had to write a **class component**. Classes meant writing `this.state`, `this.setState`, binding methods in the constructor, and dealing with lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

It was a lot of ceremony just to make a counter.

**React Hooks** changed everything. They let you do all of that — state, side effects, context, refs — inside plain functions. No classes, no `this`, no binding. Just functions calling other functions.

Let's look at the old way first, then see how hooks make it better.

---

## The Pain: Class Components

### A Simple Counter — The Old Way

```tsx
import React, { Component } from 'react';

interface CounterState {
    count: number;
}

class Counter extends Component<{}, CounterState> {
    constructor(props: {}) {
        super(props);
        this.state = { count: 0 };

        // You HAVE to bind every method or `this` breaks
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    increment() {
        this.setState(prev => ({ count: prev.count + 1 }));
    }

    decrement() {
        this.setState(prev => ({ count: prev.count - 1 }));
    }

    reset() {
        this.setState({ count: 0 });
    }

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        );
    }
}
```

That's a lot of code for three buttons and a number. And it gets worse when you add side effects.

### Fetching Data — The Old Way

```tsx
import React, { Component } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserProfileState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

interface UserProfileProps {
    userId: number;
}

class UserProfile extends Component<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props);
        this.state = {
            user: null,
            isLoading: true,
            error: null,
        };
    }

    // Fetch when component first shows up
    componentDidMount() {
        this.fetchUser();
    }

    // Fetch again if the userId prop changes
    componentDidUpdate(prevProps: UserProfileProps) {
        if (prevProps.userId !== this.props.userId) {
            this.fetchUser();
        }
    }

    async fetchUser() {
        this.setState({ isLoading: true, error: null });

        try {
            const response = await fetch(`/api/users/${this.props.userId}`);
            const user: User = await response.json();
            this.setState({ user, isLoading: false });
        } catch (err) {
            this.setState({
                error: err instanceof Error ? err.message : 'Something went wrong',
                isLoading: false,
            });
        }
    }

    render() {
        const { user, isLoading, error } = this.state;

        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (!user) return null;

        return (
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        );
    }
}
```

### Why This Hurts

**1. Too much boilerplate.**
Constructor, `super(props)`, binding methods, `this.state`, `this.setState`, `this.props` — it's a lot of typing before you even get to the actual logic.

**2. `this` is confusing.**
Forget to bind a method? Your app crashes with `Cannot read property of undefined`. Use an arrow function in the render? You create a new function every render. There's no winning.

**3. Related logic is scattered.**
Look at the `UserProfile` class. The fetch logic is split across `componentDidMount` (initial fetch), `componentDidUpdate` (re-fetch on prop change), and `fetchUser` (the actual call). Three different places for one thing: "get user data when userId changes."

**4. Lifecycle methods mix unrelated stuff.**
Imagine you also need a window resize listener. Now `componentDidMount` does two things (fetch + add listener), and you need `componentWillUnmount` to clean up the listener. Unrelated logic gets stuffed into the same lifecycle method.

```tsx
componentDidMount() {
  this.fetchUser();                               // thing 1
  window.addEventListener("resize", this.onResize); // thing 2 (totally unrelated)
}

componentWillUnmount() {
  window.removeEventListener("resize", this.onResize); // cleanup for thing 2
}
```

**5. Sharing logic between components is hard.**
If two components need the same "fetch user" logic, you'd need to use Higher-Order Components (HOCs) or Render Props — both are messy patterns that wrap your component in extra layers.

---

## The Fix: React Hooks

Hooks are functions that start with `use`. They let you "hook into" React features from function components. Let's go through the main ones.

---

### useState — State Without Classes

The most basic hook. It gives you a value and a function to change it.

```tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
};
```

That's the entire counter. Compare it to the 30+ line class version above. Same behavior, a third of the code, no `this`, no constructor, no binding.

**How it works:**

- `useState(0)` says "start with 0"
- It returns a pair: the current value (`count`) and a setter (`setCount`)
- When you call `setCount`, React re-renders the component with the new value

**You can have multiple states:**

```tsx
const SignupForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [agreed, setAgreed] = useState<boolean>(false);

    const handleSubmit = () => {
        console.log({ name, email, age, agreed });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={e => setName(e.target.value)} />
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
            <label>
                <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />I agree
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
};
```

Each piece of state is independent. Clean, readable, no `this.state.name` nonsense.

**For objects and complex state**, you can store an object — just remember to spread the previous value:

```tsx
interface FormData {
    name: string;
    email: string;
    age: number;
}

const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
});

// Update one field without losing the rest
setForm(prev => ({ ...prev, name: 'Karl' }));
```

---

### useEffect — Side Effects Without Lifecycle Methods

`useEffect` is how you do things like fetching data, setting up listeners, or updating the document title. It replaces `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` — all three — with one function.

**The same UserProfile, rewritten with hooks:**

```tsx
import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserProfileProps {
    userId: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/users/${userId}`);
                const data: User = await response.json();
                setUser(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId]); // <-- only re-run when userId changes

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return null;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};
```

All the fetch logic is in one place. No `componentDidMount` + `componentDidUpdate` split.

**How the dependency array works:**

```tsx
// Runs once when the component first appears (like componentDidMount)
useEffect(() => {
    console.log('Component mounted');
}, []);

// Runs every time `userId` changes
useEffect(() => {
    fetchUser(userId);
}, [userId]);

// Runs after every single render (usually not what you want)
useEffect(() => {
    console.log('Something rendered');
});
```

**Cleanup — replacing componentWillUnmount:**

If your effect sets up something (like an event listener or a timer), return a function to clean it up:

```tsx
const WindowSize: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // This runs when the component is removed from the page
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <p>Window width: {width}px</p>;
};
```

Remember the class version where `componentDidMount` and `componentWillUnmount` had the setup and cleanup in two different places? Here, they're right next to each other. The "add listener" and "remove listener" live in the same block. Related logic stays together.

---

### useRef — Grab DOM Elements and Keep Values Between Renders

`useRef` does two things:

**1. Access DOM elements directly:**

```tsx
const TextInput: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Click the button..." />
            <button onClick={focusInput}>Focus the input</button>
        </div>
    );
};
```

**2. Keep a value that survives re-renders without causing re-renders:**

```tsx
const StopWatch: React.FC = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = () => {
        if (intervalRef.current) return; // already running
        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
    };

    const stop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const reset = () => {
        stop();
        setSeconds(0);
    };

    // Clean up on unmount
    useEffect(() => {
        return () => stop();
    }, []);

    return (
        <div>
            <p>{seconds}s</p>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};
```

The key difference from `useState`: changing a ref does **not** trigger a re-render. Use it for values you need to track but don't need to display.

---

### useMemo and useCallback — Skip Unnecessary Work

**useMemo** caches a calculated value so React doesn't recalculate it every render:

```tsx
interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
}

interface ProductListProps {
    products: Product[];
    category: string;
    sortBy: 'name' | 'price';
}

const ProductList: React.FC<ProductListProps> = ({ products, category, sortBy }) => {
    // This filtering and sorting only re-runs when products, category,
    // or sortBy actually change — not on every render
    const filteredProducts = useMemo(() => {
        const filtered = products.filter(p => category === 'all' || p.category === category);

        return filtered.sort((a, b) => {
            if (sortBy === 'price') return a.price - b.price;
            return a.name.localeCompare(b.name);
        });
    }, [products, category, sortBy]);

    return (
        <ul>
            {filteredProducts.map(p => (
                <li key={p.id}>
                    {p.name} — ${p.price}
                </li>
            ))}
        </ul>
    );
};
```

Without `useMemo`, that filter + sort would run on **every** render, even if the inputs didn't change. With 10,000 products, that's a noticeable slowdown.

**useCallback** does the same thing but for functions. It's useful when you pass functions to child components:

```tsx
interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    return (
        <input
            value={query}
            onChange={e => {
                setQuery(e.target.value);
                onSearch(e.target.value);
            }}
        />
    );
});

const App: React.FC = () => {
    const [results, setResults] = useState<string[]>([]);

    // Without useCallback, this creates a new function every render,
    // which makes React.memo on SearchBar useless
    const handleSearch = useCallback((query: string) => {
        const filtered = allItems.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        setResults(filtered);
    }, []);

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <ul>
                {results.map(r => (
                    <li key={r}>{r}</li>
                ))}
            </ul>
        </div>
    );
};
```

**When to use them:**

- `useMemo` — when you're doing heavy calculations (filtering, sorting, mapping large arrays)
- `useCallback` — when you pass functions to child components wrapped in `React.memo`
- **Don't overuse them.** For simple stuff, the cost of memoizing is higher than just recalculating. Use them when you notice real performance issues or when dealing with large lists.

---

### useContext — Share Data Without Prop Drilling

`useContext` lets you read values from React Context without wrapping components in a `Consumer`:

```tsx
import React, { createContext, useContext, useState } from 'react';

// 1. Create the context with a shape
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// 2. Create a provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// 3. Create a custom hook for easy access
const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }
    return context;
};

// 4. Use it anywhere — no prop drilling
const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
            <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'} mode</button>
        </nav>
    );
};

// Wrap your app once
const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Navbar />
            <MainContent />
        </ThemeProvider>
    );
};
```

**Note:** Context is great for low-frequency updates (theme, locale, auth). For high-frequency updates (filters, form data, frequently changing lists), it can cause performance issues because every consumer re-renders on every change. That's where libraries like Zustand come in.

---

### useReducer — useState's Big Brother

When your state gets complicated — multiple fields that depend on each other — `useReducer` gives you more structure. Think of it as `useState` but with a switch statement that handles different actions.

```tsx
import React, { useReducer } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    discount: number;
}

// All the things that can happen to the cart
type CartAction =
    | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'APPLY_DISCOUNT'; payload: number }
    | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i => (i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload),
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(i =>
                    i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
                ),
            };
        case 'APPLY_DISCOUNT':
            return { ...state, discount: action.payload };
        case 'CLEAR_CART':
            return { items: [], discount: 0 };
        default:
            return state;
    }
};

const ShoppingCart: React.FC = () => {
    const [cart, dispatch] = useReducer(cartReducer, {
        items: [],
        discount: 0,
    });

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = total * (1 - cart.discount / 100);

    return (
        <div>
            {cart.items.map(item => (
                <div key={item.id}>
                    <span>
                        {item.name} x{item.quantity} — ${item.price * item.quantity}
                    </span>
                    <button
                        onClick={() =>
                            dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, quantity: item.quantity + 1 },
                            })
                        }>
                        +
                    </button>
                    <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>Remove</button>
                </div>
            ))}
            <p>Total: ${discountedTotal.toFixed(2)}</p>
            <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
        </div>
    );
};
```

**When to use `useReducer` over `useState`:**

- You have multiple related pieces of state (cart items + discount + coupon code)
- Next state depends on previous state in complex ways
- You want all your state logic in one testable function (the reducer)

---

## Building Custom Hooks — The Real Superpower

The best thing about hooks isn't any single one of them. It's that you can **combine them into your own hooks** and reuse that logic anywhere.

### Example: useLocalStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T | ((prev: T) => T)) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    };

    return [storedValue, setValue];
}

// Use it exactly like useState, but it survives page refreshes
const Settings: React.FC = () => {
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

    return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Current: {theme}</button>;
};
```

### Example: useFetch

```tsx
interface UseFetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const result: T = await response.json();

                if (!isCancelled) {
                    setData(result);
                    setIsLoading(false);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err instanceof Error ? err.message : 'Something went wrong');
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        // If the component unmounts or url changes before fetch finishes,
        // don't update state on an unmounted component
        return () => {
            isCancelled = true;
        };
    }, [url]);

    return { data, isLoading, error };
}

// Now any component can fetch data in one line
const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
    const { data: user, isLoading, error } = useFetch<User>(`/api/users/${userId}`);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return null;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};
```

### Example: useDebounce

```tsx
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

// Search input that waits for the user to stop typing
const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const debouncedQuery = useDebounce(query, 300);

    // This fetch only fires 300ms after the user stops typing
    const { data: results } = useFetch<string[]>(`/api/search?q=${debouncedQuery}`);

    return (
        <div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
            <ul>
                {results?.map(r => (
                    <li key={r}>{r}</li>
                ))}
            </ul>
        </div>
    );
};
```

Notice how `useDebounce` and `useFetch` stack together naturally. That's the power of custom hooks — they compose like building blocks.

---

## Before vs. After — Quick Comparison

| Thing             | Class Components                                                    | Hooks                                         |
| ----------------- | ------------------------------------------------------------------- | --------------------------------------------- |
| State             | `this.state` + `this.setState`                                      | `useState`                                    |
| Side effects      | `componentDidMount` + `componentDidUpdate` + `componentWillUnmount` | `useEffect` (one function handles all three)  |
| DOM access        | `createRef` + `this.myRef`                                          | `useRef`                                      |
| Sharing logic     | HOCs, Render Props (messy wrappers)                                 | Custom hooks (just functions)                 |
| Reading context   | `<Context.Consumer>` wrapper                                        | `useContext` (one line)                       |
| Code organization | Related logic scattered across lifecycle methods                    | Related logic grouped in the same `useEffect` |
| Boilerplate       | Constructor, super, binding, render method                          | Just a function that returns JSX              |
| Testing           | Mount the whole class, simulate lifecycle                           | Call the hook, check the result               |
| Bundle size       | Bigger (class overhead)                                             | Smaller (plain functions)                     |

---

## The Rules of Hooks

There are only two rules. Break them and React gets confused:

**1. Only call hooks at the top level.**

Don't put hooks inside if statements, loops, or nested functions. React tracks hooks by the order they're called. If you skip one conditionally, every hook after it gets the wrong value.

```tsx
// BAD — don't do this
const MyComponent: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    if (isLoggedIn) {
        const [name, setName] = useState(''); // hook inside an if — breaks React
    }

    return <div />;
};

// GOOD — call the hook always, use the value conditionally
const MyComponent: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    const [name, setName] = useState('');

    if (!isLoggedIn) {
        return <p>Please log in</p>;
    }

    return <p>Hello, {name}</p>;
};
```

**2. Only call hooks from React functions.**

You can call hooks from:

- Function components
- Custom hooks (functions that start with `use`)

You cannot call them from regular JavaScript functions, class methods, or event handlers.

```tsx
// BAD — this is a regular function, not a component or hook
function getUser() {
    const [user, setUser] = useState(null); // won't work
}

// GOOD — prefix with "use" to make it a custom hook
function useUser() {
    const [user, setUser] = useState(null); // works fine
    return user;
}
```

---

## Common Mistakes and How to Avoid Them

### Forgetting the dependency array in useEffect

```tsx
// This runs on EVERY render — probably not what you want
useEffect(() => {
    fetchData();
});

// This runs only once
useEffect(() => {
    fetchData();
}, []);

// This runs when userId changes
useEffect(() => {
    fetchData(userId);
}, [userId]);
```

### Updating state based on old state

```tsx
// BAD — if you click fast, some clicks get lost
const increment = () => setCount(count + 1);

// GOOD — always gets the latest value
const increment = () => setCount(prev => prev + 1);
```

### Creating objects/arrays in the dependency array

```tsx
// BAD — { min: 0, max: 100 } is a new object every render,
// so useEffect thinks the dependency changed every time
useEffect(() => {
    fetchProducts(filters);
}, [{ min: 0, max: 100 }]);

// GOOD — use the actual values
useEffect(() => {
    fetchProducts(filters);
}, [filters.min, filters.max]);
```

---

## Wrapping Up

Hooks took the best parts of React — components, state, side effects — and made them work with plain functions. No more classes, no more `this`, no more scattering related logic across lifecycle methods.

Here's the cheat sheet:

| Hook          | What it does                                       | One-liner                                |
| ------------- | -------------------------------------------------- | ---------------------------------------- |
| `useState`    | Holds a value that triggers re-render when changed | "Give me state"                          |
| `useEffect`   | Runs code after render (fetch, listeners, timers)  | "Do something when X changes"            |
| `useRef`      | Holds a value that does NOT trigger re-render      | "Remember this, but don't re-render"     |
| `useMemo`     | Caches a calculated value                          | "Don't recalculate unless inputs change" |
| `useCallback` | Caches a function reference                        | "Don't recreate this function"           |
| `useContext`  | Reads from a Context                               | "Give me the nearest provider's value"   |
| `useReducer`  | Like useState but with a switch statement          | "Complex state with named actions"       |

And the real superpower: combine any of these into **custom hooks** that you can reuse across your whole app. `useFetch`, `useLocalStorage`, `useDebounce` — write them once, use them everywhere.

If you're still writing class components, there's never been a better time to switch.

---

_Links:_

- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
