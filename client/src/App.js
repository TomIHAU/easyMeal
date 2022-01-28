import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Cart from "./pages/Cart";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import MealPlan from "./pages/MealPlan";
import Nav from "./components/Nav";

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
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plan" element={<MealPlan />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
