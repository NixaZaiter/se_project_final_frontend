export const getItems = () => {
  return new Promise((resolve, reject) => {
    (resolve([
      {
        _id: "65f7368dfb74bd6a92114c85",
        title: "Some news article",
        url: "put some actual article URL here",
        urlToImage:
          "https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/a4080481202_10.jpg?quality=90&strip=all&crop=0,23.821989528796,100,52.356020942408",
        publishedAt: "2026-09-20T20:31:37Z",
        content:
          "<ul><li></li><li></li><li></li></ul>\r\nOpen Mike Eagle and Kenny Segal crafted a hip hop breakup masterpiece\r\nDOOMED! pairs Eagles deeply personal lyrics with some of Segals most commanding beats.\r\nby… [+4070 chars]",
      },
    ]),
      reject(`Promise rejected`));
  });
};

export const saveArticle = (article) => {
  return new Promise((resolve, reject) => {
    resolve({
      frontendId: article.frontendId,
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content,
      bookmarked: article.bookmarked,
      keyword: article.keyword,
    });
    reject(`Promise rejected`);
  });
};
