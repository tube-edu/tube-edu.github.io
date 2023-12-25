import Header from "@/components/Header";
import {
  Card,
  SimpleGrid,
  Space,
  Image,
  Text,
  Avatar,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Innertube, UniversalCache } from "youtubei.js/web";
export default function Home() {
  const [results, setResults] = useState(Array);
  const [query, setQuery] = useState("フリーレン");

  async function search(query: string) {
    const yt = await Innertube.create({
      generate_session_locally: true,
      lang: "ja",
      location: "JP",
      fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const url =
          typeof input === "string"
            ? new URL(input)
            : input instanceof URL
            ? input
            : new URL(input.url);

        // Transform the url for use with our proxy.
        url.searchParams.set("__host", url.host);
        url.host = "tube-backend.deno.dev";
        url.protocol = "https";

        const headers = init?.headers
          ? new Headers(init.headers)
          : input instanceof Request
          ? input.headers
          : new Headers();

        // Now serialize the headers.
        // @ts-ignore
        url.searchParams.set("__headers", JSON.stringify([...headers]));

        if (input instanceof Request) {
          // @ts-ignore
          input.duplex = "half";
        }

        // Copy over the request.
        const request = new Request(
          url,
          input instanceof Request ? input : undefined
        );

        headers.delete("user-agent");

        return fetch(
          request,
          init
            ? {
                ...init,
                headers,
              }
            : {
                headers,
              }
        );
        // failed to fetch

        // return fetch(request, init).then((res) => {
        //   console.log(res);
        //   return res;
        // });
      },
      cache: new UniversalCache(false),
    });
    const res = await yt.search(query, { type: "video" });
    //delete video without id from res.results
    const filtered = res.results?.filter((video: any) => video.id);
    setResults(filtered as Array<any>);
    console.log(res.results ? res.results[0] : "no results");
  }
  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      setQuery(params.get("q") || "フリーレン");
      search(params.get("q") || "フレーレン");
    } else {
      search(query || "おすすめ");
    }
  }, [query]);

  //search on load
  return (
    <div>
      <Header setQuery={setQuery} query={query} />
      <Space h={"lg"} />
      <SimpleGrid
        cols={{ xs: 1, sm: 2, md: 2, lg: 3 }}
        spacing="lg"
        verticalSpacing="lg"
        w={"90%"}
        m={"auto"}
      >
        {results.map((video: any) => (
          <Card
            shadow="md"
            radius={"md"}
            h={"350px"}
            key={video.id}
            onClick={() => (location.href = `/watcg?v=${video.id}`)}
            style={{ cursor: "pointer" }}
          >
            <Card.Section h={"250px"}>
              <Image
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                mah={"100%"}
                maw={"100%"}
                alt="Norway"
              />
            </Card.Section>

            <Text size="lg" lineClamp={1} mt={"xs"}>
              {video.title.text}
            </Text>
            <Group>
              <Avatar
                src={video.author.thumbnails[0].url}
                radius="xl"
                size="md"
              />
              <Text size="sm" color="gray">
                {video.author.name.slice(0, 30)}
                {video.author.name.length > 30 && "..."}
                <br />
                {video.published.text}・{video.short_view_count.text}
              </Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}
