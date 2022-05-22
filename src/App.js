import React, { Suspense } from "react";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import ErrorBoundary from "./ErrorBoundry";

import { Routes, Route } from "react-router-dom";

const wait = async (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const Popup = React.memo(() => {
  return <div>Popup</div>;
});

const MainArticle = React.memo(() => {
  const { data } = useQuery("MainArticle", async () => {
    await wait(4000);
    return fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    );
  });

  return (
    <div>
      <p>{data.name} !!!!!!!!</p>
    </div>
  );
});

const Main = React.memo(() => {
  const { data } = useQuery("repoData", async () => {
    await wait(2000);
    return fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    );
  });

  return (
    <div>
      <p>{data.name}</p>
      <p>{data.created_at}</p>
      <Suspense fallback={<div>Main-Article-Loading...</div>}>
        <MainArticle />
      </Suspense>
    </div>
  );
});

function User() {
  return <div>User</div>;
}

const Header = React.memo(() => {
  const { data } = useQuery("photosData", async () => {
    return fetch("https://jsonplaceholder.typicode.com/photos").then((res) =>
      res.json()
    );
  });

  return <div>목록</div>;
});

function Footer() {
  return <div>Footer</div>;
}

function AppIndex() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<div>Main Data Loading...</div>}>
              <Main />
            </Suspense>
          }
        />
        <Route exact path="/User" element={<User />} />
      </Routes>
      <Footer />

      <Routes>
        <Route exact path="/Popup" element={<Popup />} />
      </Routes>
    </React.Fragment>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>페이지 로딩중</div>}>
        <QueryClientProvider client={queryClient}>
          <AppIndex />
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
