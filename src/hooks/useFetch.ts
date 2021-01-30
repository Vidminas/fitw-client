import React from "react";

type Status = "loading" | "error" | "ok";

export const useFetch = (url: string) => {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState<Status>("loading");

  const fetchData = React.useCallback(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetch(url, { signal: controller.signal })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStatus("ok");
        setData(data);
      })
      .catch((error) => {
        setStatus("error");
        if (error.name === "AbortError") {
          console.log(`Request to ${url} aborted!`);
        } else {
          console.log(error);
        }
      });
    return () => controller.abort();
  }, [url]);

  React.useEffect(fetchData, [fetchData]);

  return [data, status];
};
