import React, { Suspense } from "react";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import ErrorBoundary from "./ErrorBoundry";

import { Routes, Route } from "react-router-dom";

import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";

const LazyMain = React.lazy(() => import("./views/Main"));
const LazyJob = React.lazy(() => import("./views/Job"));

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
  const [search, setSearch] = React.useState("");

  const { data, refetch, isFetching, isLoading } = useQuery(
    "MainArticle",
    async () => {
      return fetch(
        "https://api.github.com/repos/tannerlinsley/react-query"
      ).then((res) => res.json());
    },
    { enable: false }
  );

  const [height, setHeight] = React.useState(true);
  const test = () => {
    setHeight((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  if (isFetching || isLoading) {
    return <h1>?</h1>;
  }

  return (
    <div>
      {data.url}
      <form method="get" onSubmit={onSubmit}>
        <input
          type="text"
          name="sex"
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>HELLO</button>
      </form>
      <div
        id="test"
        style={{ height: height ? 300 : 0, backgroundColor: "red" }}
      >
        300높이 상자
      </div>
      <button type="button" onClick={test}>
        as
      </button>
    </div>
  );
});

const Main = React.memo(() => {
  return (
    <div>
      <MainArticle />
    </div>
  );
});

function User() {
  return <div>User</div>;
}

const Header = React.memo(() => {
  return <div>목록</div>;
});

const Footer = React.memo(() => {
  return <div>Footer</div>;
});

function Article() {
  return <div>Article</div>;
}

function AppIndex() {
  const [value, setValue] = React.useState("");

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route exact path="/" element={<LazyMain />} />
        <Route exact path="/Job" element={<LazyJob />} />
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
