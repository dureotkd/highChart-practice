import React from "react";
const Article = () => {
  const [article, setArticle] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      // 2초
      await wait(2000);
      const cloneArticle = [...article];
      for (let i = 0; i < 5000; i++) {
        cloneArticle.push(i);
      }
      setArticle(cloneArticle);
    })();
  }, []);

  return (
    <div>
      {article &&
        article.map((data, key) => {
          return <div key={key}>{data}</div>;
        })}
    </div>
  );
};

function wait(s) {
  return new Promise((resolve) => setTimeout(resolve, s));
}

export default Article;
