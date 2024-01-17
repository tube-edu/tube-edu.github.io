import {
  Text,
  Paper,
  Grid,
  Button,
  ActionIcon,
  Avatar,
  Autocomplete,
  Group,
} from "@mantine/core";
import { PiGameControllerDuotone } from "react-icons/pi";
import { PiYoutubeLogoDuotone } from "react-icons/pi";
import { Input } from "@mantine/core";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import Innertube, { UniversalCache } from "youtubei.js";
import { useRouter } from "next/navigation";

export default function Header(props: any) {
  const [autocompletedata, setAutocompletedata] = useState(Array<string>());
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleQueryChange = (query: string) => {
    props.setQuery(query);
  };
  const setNewAutoCompleteData = async (query: string) => {
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
        url.host = "kokohachi.deno.dev";
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
    const suggestions = await yt.getSearchSuggestions(query);
    setAutocompletedata(suggestions);
  };
  return (
    <Paper
      shadow="xl"
      radius="lg"
      withBorder
      w={"90%"}
      m={"auto"}
      p={"lg"}
      mt={"lg"}
      mb={"lg"}
    >
      <Grid>
        <Grid.Col span={3}>
          {/*change by viewport size*/}
          <Group>
          <Text
            size="xl"
            fw={700}
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          >
            <PiYoutubeLogoDuotone
              size={32}
              style={{
                verticalAlign: "bottom",
                marginRight: 8,
                color: "#e83976",
              }}
            />
            The Tube
          </Text>
          <Text fw="light">|</Text>
          <PiGameControllerDuotone  onClick={() => {router.push("/game")}} size={24} color={"green"}/>
          </Group>
        </Grid.Col>
        <Grid.Col span={8}>
          <Autocomplete
            size="sm"
            radius="lg"
            placeholder={"検索"}
            w={"80%"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                location.href = `/?q=${e.currentTarget.value}`;
              }
            }}
            onLoad={
              props.query
                ? (e: any) => (e.currentTarget.value = props.query)
                : undefined
            }
            onChange={(query: string) => {
              setQuery(query);
              if (query.length > 0) {
                setNewAutoCompleteData(query);
              }
            }}
            data={query.length > 0 ? autocompletedata : []}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Text size="sm" color="gray" fw={"lighter"} my={"6px"}>
            v 1.1.3
          </Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
