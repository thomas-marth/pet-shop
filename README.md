# Pet Shop

A modern front-end for an online pet supplies store built with React and Vite. It allows customers to browse categories, explore products, manage a shopping cart and submit orders.

## Features
- **Dynamic routing** powered by React Router for home, categories, product details, sales and cart pages.
- **Product catalog** with filtering, sorting and discount views to help users find the right items.
- **Product details** view with related items, zoomable images and add-to-cart controls.
- **Shopping cart** stored in localStorage with quantity management and order summary.
- **Order and discount forms** using React Hook Form with validation and API submission.
- **API integration** via Axios with configurable base URL.
- **State management** through Redux Toolkit slices for categories, products and cart.
- **Responsive UI** using Material UI components and custom theming.

## Tech Stack
- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [React Router 7](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)

## Getting Started
### Prerequisites
- Node.js 18+

### Installation
```bash
npm install
```

### Development server
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

### Production build
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

## Environment Variables
Create a `.env` file in the project root to override defaults.

| Variable        | Description                              | Default                                         |
| --------------- | ---------------------------------------- | ----------------------------------------------- |
| `VITE_API_URL`  | Base URL of the backend API used by axios | `https://petshop-project-backend.vercel.app` |

## Project Structure
- `src/pages` – application pages (home, categories, products, sales, cart).
- `src/components` – reusable UI building blocks such as product cards, forms and lists.
- `src/redux` – Redux Toolkit slices and store configuration.
- `src/shared` – shared utilities, HTTP client and validation rules.
- `src/ui` – smaller UI elements like breadcrumbs, filters and section headings.

## Scripts
| Command            | Description                      |
| ------------------ | -------------------------------- |
| `npm run dev`      | Start development server with HMR |
| `npm run build`    | Bundle application for production |
| `npm run preview`  | Preview the production build      |
| `npm run lint`     | Run ESLint checks                 |

## License
This project is currently unlicensed.
