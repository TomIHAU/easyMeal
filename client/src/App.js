import "./App.css";
import StoreProvider from "./utils/GlobalState/Provider";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import MealPlan from "./pages/MealPlan";
import FAQ from "./pages/FAQ";

import Nav from "./components/Nav";
import Cart from "./components/Cart";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StoreProvider>
          <Nav />
          <Cart />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/plan" element={<MealPlan />} />
          </Routes>
        </StoreProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
