import React from "react";

type Status = "loading" | "error" | "ok";
type FetchParams = {
  method: string;
  body?: string;
  headers?: Record<string, string>;
};

export const useFetch = (url: string, fetchParams: FetchParams) => {
  const [data, setData] = React.useState<any>(null);
  const [status, setStatus] = React.useState<Status>("loading");

  React.useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetch(url, {
      ...fetchParams,
      signal: controller.signal,
    })
      .then((response) => {
        console.log(response);
        setStatus(response.ok ? "ok" : "error");
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setStatus("error");
        setData(error);
        console.error(error);
      });
    return () => controller.abort();
  }, [url, fetchParams]);

  return [data, status];
};
