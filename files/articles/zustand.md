# Zustand: Stop Passing Props Through 10 Components

###### _Karl Marx Roxas January 20, 2026_

## What's This About?

If you've ever built a React app bigger than a todo list, you've probably hit a wall. You start with a few `useState` calls and it's fine. Then your app grows. Suddenly, you're passing callbacks and state through 5 layers of components just so a tiny button at the bottom can update something at the top.

That's **prop drilling hell**. And it sucks.

**Zustand** is a tiny library (~1 KB) that fixes this. It lets any component grab exactly the data it needs from a shared store — no passing props down, no wrapping your app in providers, no boilerplate.

Let's look at the problem first, then the fix.

---

## The Pain: useState Everywhere

### A Simple Example That Gets Ugly Fast

Imagine you're building a product dashboard. You've got:

- A **sidebar** with filters (category, price, stock)
- A **header** showing how many filters are active
- A **main area** showing filtered products

All three need access to the same filter data. With `useState`, everything lives at the top:

```tsx
// App.tsx — the top-level component holds ALL the state
import React, { useState, useCallback } from 'react';

interface Filter {
    category: string;
    minPrice: number;
    maxPrice: number;
    inStock: boolean;
}

const App: React.FC = () => {
    const [filters, setFilters] = useState<Filter>({
        category: 'all',
        minPrice: 0,
        maxPrice: 1000,
        inStock: false,
    });
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    // One callback for every single thing a child might want to do
    const handleCategoryChange = useCallback((category: string) => {
        setFilters(prev => ({ ...prev, category }));
    }, []);

    const handlePriceChange = useCallback((minPrice: number, maxPrice: number) => {
        setFilters(prev => ({ ...prev, minPrice, maxPrice }));
    }, []);

    const handleStockToggle = useCallback(() => {
        setFilters(prev => ({ ...prev, inStock: !prev.inStock }));
    }, []);

    const handleSelectItem = useCallback((id: string) => {
        setSelectedItems(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
    }, []);

    const handleClearSelection = useCallback(() => {
        setSelectedItems([]);
    }, []);

    const handleResetFilters = useCallback(() => {
        setFilters({
            category: 'all',
            minPrice: 0,
            maxPrice: 1000,
            inStock: false,
        });
    }, []);

    // Look at all these props we need to pass down
    return (
        <div>
            <Header
                selectedCount={selectedItems.length}
                onClearSelection={handleClearSelection}
                onResetFilters={handleResetFilters}
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <Sidebar
                isOpen={isSidebarOpen}
                filters={filters}
                onCategoryChange={handleCategoryChange}
                onPriceChange={handlePriceChange}
                onStockToggle={handleStockToggle}
            />
            <MainContent filters={filters} selectedItems={selectedItems} onSelectItem={handleSelectItem} />
        </div>
    );
};
```

Already messy, right? And this is just **one level deep**. The Sidebar needs to pass those callbacks further down:

```tsx
// Sidebar.tsx — doesn't even USE these props, just passes them along
interface SidebarProps {
    isOpen: boolean;
    filters: Filter;
    onCategoryChange: (category: string) => void;
    onPriceChange: (min: number, max: number) => void;
    onStockToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, filters, onCategoryChange, onPriceChange, onStockToggle }) => {
    if (!isOpen) return null;

    return (
        <aside>
            {/* Pass it down again... */}
            <CategoryFilter selected={filters.category} onChange={onCategoryChange} />
            <PriceRangeFilter min={filters.minPrice} max={filters.maxPrice} onChange={onPriceChange} />
            <StockFilter isChecked={filters.inStock} onToggle={onStockToggle} />
        </aside>
    );
};
```

And finally, three levels deep, the actual component that needs the data:

```tsx
// PriceRangeFilter.tsx — the component that actually uses the data
interface PriceRangeFilterProps {
    min: number;
    max: number;
    onChange: (min: number, max: number) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ min, max, onChange }) => {
    return (
        <div>
            <label>Price Range</label>
            <input type="number" value={min} onChange={e => onChange(Number(e.target.value), max)} />
            <input type="number" value={max} onChange={e => onChange(min, Number(e.target.value))} />
        </div>
    );
};
```

### Why This Hurts

Let me spell out the problems:

**1. You're playing telephone.**
The `App` creates a callback. Passes it to `Sidebar`. `Sidebar` doesn't use it — just passes it to `PriceRangeFilter`. It's like asking your friend to hand a note to someone across the room instead of just talking to them directly.

**2. Adding anything new is a nightmare.**
Want to add a "brand" filter? You need to:

- Add state in `App`
- Create a callback in `App`
- Add the prop to `Sidebar`'s interface
- Pass it through `Sidebar`
- Create the `BrandFilter` component

That's 5 files touched for one filter.

**3. Everything re-renders when anything changes.**
When you type a price, `App` re-renders. That means `Header` re-renders (it doesn't care about price). `MainContent` re-renders (it hasn't fetched new data yet). `Sidebar` re-renders. Every child component re-renders. All because one number changed.

**4. `useCallback` everywhere.**
Without `useCallback`, every re-render creates brand new function references. This breaks React's ability to skip re-rendering child components. So you end up wrapping every single handler in `useCallback`. It's noise.

**5. Testing is annoying.**
To test `PriceRangeFilter`, you need to create mock functions for `onChange`, simulate the entire prop chain, and check that the mock was called with the right arguments. More setup than actual test logic.

---

## The Fix: Zustand

### Install It

```bash
npm install zustand
```

### Create a Store

A store is just a file that holds your shared state and the functions to update it. Think of it as a "global notebook" that any component can read from or write to.

```tsx
// stores/dashboard-store.ts
import { create } from 'zustand';

interface Filter {
    category: string;
    minPrice: number;
    maxPrice: number;
    inStock: boolean;
}

// This describes everything the store holds and can do
interface DashboardStore {
    // Data
    filters: Filter;
    selectedItems: string[];
    isSidebarOpen: boolean;

    // Actions (functions that change the data)
    setCategory: (category: string) => void;
    setPriceRange: (min: number, max: number) => void;
    toggleStock: () => void;
    toggleItem: (id: string) => void;
    clearSelection: () => void;
    resetFilters: () => void;
    toggleSidebar: () => void;
}

const DEFAULT_FILTERS: Filter = {
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
};

// `create` gives you back a hook you can use in any component
export const useDashboardStore = create<DashboardStore>(set => ({
    // Starting values
    filters: { ...DEFAULT_FILTERS },
    selectedItems: [],
    isSidebarOpen: true,

    // Each action calls `set` to update the store
    setCategory: category =>
        set(state => ({
            filters: { ...state.filters, category },
        })),

    setPriceRange: (minPrice, maxPrice) =>
        set(state => ({
            filters: { ...state.filters, minPrice, maxPrice },
        })),

    toggleStock: () =>
        set(state => ({
            filters: { ...state.filters, inStock: !state.filters.inStock },
        })),

    toggleItem: id =>
        set(state => ({
            selectedItems: state.selectedItems.includes(id)
                ? state.selectedItems.filter(item => item !== id)
                : [...state.selectedItems, id],
        })),

    clearSelection: () => set({ selectedItems: [] }),

    resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),

    toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
```

That's the whole setup. No "Provider" wrapping your app. No "configureStore". No "createSlice". Just one `create` call.

### Now Look at the Components

**App becomes dead simple:**

```tsx
// App.tsx — no props, no state, no callbacks
const App: React.FC = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <MainContent />
        </div>
    );
};
```

That's it. For real.

**Header grabs what it needs directly:**

```tsx
// Header.tsx
import { useDashboardStore } from '../stores/dashboard-store';

const Header: React.FC = () => {
    // Each line picks ONE thing from the store
    const selectedCount = useDashboardStore(s => s.selectedItems.length);
    const clearSelection = useDashboardStore(s => s.clearSelection);
    const resetFilters = useDashboardStore(s => s.resetFilters);
    const toggleSidebar = useDashboardStore(s => s.toggleSidebar);

    return (
        <header>
            <button onClick={toggleSidebar}>Toggle Sidebar</button>
            <span>{selectedCount} selected</span>
            <button onClick={clearSelection}>Clear</button>
            <button onClick={resetFilters}>Reset Filters</button>
        </header>
    );
};
```

**PriceRangeFilter — zero props, no middleman:**

```tsx
// PriceRangeFilter.tsx
import { useDashboardStore } from '../stores/dashboard-store';

const PriceRangeFilter: React.FC = () => {
    const minPrice = useDashboardStore(s => s.filters.minPrice);
    const maxPrice = useDashboardStore(s => s.filters.maxPrice);
    const setPriceRange = useDashboardStore(s => s.setPriceRange);

    return (
        <div>
            <label>Price Range</label>
            <input type="number" value={minPrice} onChange={e => setPriceRange(Number(e.target.value), maxPrice)} />
            <input type="number" value={maxPrice} onChange={e => setPriceRange(minPrice, Number(e.target.value))} />
        </div>
    );
};
```

No props. No callback passed from a parent. The component goes straight to the store and gets what it needs. Like walking to the fridge yourself instead of asking your mom to ask your dad to grab you a drink.

**Sidebar becomes clean too:**

```tsx
// Sidebar.tsx
import { useDashboardStore } from '../stores/dashboard-store';

const Sidebar: React.FC = () => {
    const isSidebarOpen = useDashboardStore(s => s.isSidebarOpen);

    if (!isSidebarOpen) return null;

    return (
        <aside>
            <CategoryFilter />
            <PriceRangeFilter />
            <StockFilter />
        </aside>
    );
};
```

`Sidebar` only cares about one thing: is it open or not? It doesn't need to know about filters, callbacks, or anything else. Each child filter component handles its own state.

---

## Before vs. After — Quick Comparison

| Thing                        | useState + Props                         | Zustand                                       |
| ---------------------------- | ---------------------------------------- | --------------------------------------------- |
| Where state lives            | Top-level component                      | Separate store file                           |
| How deep components get data | Props passed through every layer         | Direct — just import the store                |
| Adding a new filter          | Touch 3-5 files                          | Touch 2 files (store + new component)         |
| Callbacks                    | One per action, wrapped in `useCallback` | Built into the store                          |
| Re-renders                   | Everything re-renders on any change      | Only the component that uses the changed data |
| App component size           | 50+ lines with state and callbacks       | 5-10 lines                                    |
| Testing a leaf component     | Mock callbacks, simulate prop chain      | Import store, call action, check result       |

---

## Cool Things Zustand Can Do

### Only Re-render What Changed

When you write this:

```tsx
const category = useDashboardStore(s => s.filters.category);
```

Your component ONLY re-renders when `category` changes. If `minPrice` changes? Your component doesn't care, doesn't re-render. This is way better than React Context, where every consumer re-renders on every change.

### Pick Multiple Things Without Wasting Re-renders

If you need a few values at once, use `useShallow` to tell Zustand "only re-render if these specific values change":

```tsx
import { useShallow } from 'zustand/react/shallow';

const { minPrice, maxPrice } = useDashboardStore(
    useShallow(s => ({
        minPrice: s.filters.minPrice,
        maxPrice: s.filters.maxPrice,
    }))
);
```

### Save State to localStorage Automatically

Want filters to survive a page refresh? Add one middleware:

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDashboardStore = create<DashboardStore>()(
    persist(
        set => ({
            // ... same store as before
        }),
        { name: 'dashboard-filters' } // key in localStorage
    )
);
```

That's it. Zustand saves the state automatically when it changes and loads it back when the page opens. No manual `localStorage.getItem` / `setItem`.

### Async Stuff Just Works

Need to fetch data from an API? Just make the action `async`. No extra libraries, no "thunks", no middleware:

```tsx
interface ProductStore {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>(set => ({
    products: [],
    isLoading: false,
    error: null,

    fetchProducts: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch('/api/products');
            const products: Product[] = await response.json();
            set({ products, isLoading: false });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : 'Something went wrong',
                isLoading: false,
            });
        }
    },
}));
```

Use it in a component:

```tsx
const ProductList: React.FC = () => {
    const products = useProductStore(s => s.products);
    const isLoading = useProductStore(s => s.isLoading);
    const error = useProductStore(s => s.error);
    const fetchProducts = useProductStore(s => s.fetchProducts);

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {products.map(p => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    );
};
```

### Use State Outside of React

Sometimes you need to read or update state outside of a component — in a utility function, an event handler, or anywhere else. Zustand lets you do that:

```tsx
// Read state anywhere
const currentFilters = useDashboardStore.getState().filters;

// Update state anywhere
useDashboardStore.getState().resetFilters();

// Listen for changes
const unsubscribe = useDashboardStore.subscribe(state => {
    console.log('State changed:', state);
});
```

### DevTools Support

Want to see every state change in your browser? Add the `devtools` middleware and open Redux DevTools:

```tsx
import { devtools } from 'zustand/middleware';

export const useDashboardStore = create<DashboardStore>()(
    devtools(
        set => ({
            // ... same store
        }),
        { name: 'DashboardStore' }
    )
);
```

Now you get time-travel debugging — you can go back and forth through state changes to see what happened and when.

---

## When You Should Still Use useState

Zustand isn't meant to replace `useState` for everything. Keep using `useState` for:

- **A single component's stuff** — a dropdown being open/closed, a form input while typing, hover effects
- **Throwaway state** — stuff that doesn't matter once the component is gone
- **Very simple pages** — if only one component needs the data, `useState` is fine

**Rule of thumb:** If two or more components that aren't parent-child need the same data, use Zustand. If it's just one component's business, use `useState`.

---

## How to Start Using Zustand in an Existing App

You don't have to rewrite everything. Do it in small steps:

1. **Find a spot where prop drilling hurts** — look for components passing props they don't use
2. **Pull that state into a Zustand store**
3. **Update the leaf components** (the ones at the bottom) to use the store instead of props
4. **Work your way up** — remove the now-unused props from parent components
5. **Pick the next pain point and repeat**

Each step is a small change you can test and ship on its own.

---

## Wrapping Up

`useState` is great for local stuff inside a single component. But the moment two unrelated components need the same data, you're stuck passing props through every component in between. That's how you end up with 15-prop interfaces, `useCallback` on every function, and components that re-render for no reason.

Zustand fixes this with a dead simple idea: put shared state in a store, let any component grab what it needs. No providers, no boilerplate, barely any setup. It's about 1 KB, works with TypeScript out of the box, and has built-in support for localStorage persistence, async actions, and dev tools.

If your React app has components playing telephone with props, give Zustand a try. You'll probably delete more code than you write.

---

_Links:_

- [Zustand on GitHub](https://github.com/pmndrs/zustand)
- [Official Docs](https://zustand.docs.pmnd.rs/)
