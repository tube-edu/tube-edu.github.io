import Header from "@/components/Header";
import {
  Anchor,
  Avatar,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Modal,
  Stack,
  Tabs,
  Text,
  Tooltip,
} from "@mantine/core";
import { useState, useEffect } from "react";
import Innertube, { UniversalCache } from "youtubei.js";
import { Image } from "@mantine/core";
import { IoMdMusicalNote } from "react-icons/io";
import { VscChevronRight } from "react-icons/vsc";
import { useDisclosure } from "@mantine/hooks";

export default function Channel() {
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState(Object);
  const getChannelData = async (id: string) => {
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
    const channel = await yt.getChannel(id);
    setChannelData(channel);
    setLoading(false);
  };
  useEffect(() => {
    getChannelData("UCvpredjG93ifbCP1Y77JyFA");
    setLoading(false);
  }, []);
  return (
    <div>
      <Header />
      {!loading && (
        <>
          <Image src={channelData?.header?.banner[0].url} maw={"90%"} />
          <Grid mt={10} maw={"90%"} style={{ margin: "auto" }}>
            <Grid.Col span={2} maw={"90%"} style={{ margin: "auto" }}>
              <Center>
                <Avatar
                  size={"100%"}
                  src={channelData?.header?.author?.thumbnails[0]?.url}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={10} mt={10} maw={"90%"} style={{ margin: "auto" }}>
              <Stack gap={0}>
                <Group>
                  <Text fw={700} fz={30}>
                    {channelData?.header?.author?.name}
                  </Text>
                  <Tooltip label="公式アーティスト　チャンネル">
                    <Text
                      color="gray"
                      fz={20}
                      style={{ verticalAlign: "bottom" }}
                    >
                      <IoMdMusicalNote size={18} />
                    </Text>
                  </Tooltip>
                </Group>
                <Text color="gray" fz={15}>
                  {channelData?.header?.channel_handle?.text}・
                  {channelData?.header?.subscribers?.text}・
                  {channelData?.header?.videos_count?.text}
                </Text>
                <Text color="gray" fz={15} lineClamp={1}>
                  {channelData?.header?.tagline?.content}
                </Text>
                <Group>
                  <Text
                    onClick={() => {
                      window.open(
                        `https://${channelData?.header?.header_links?.first_link?.text}`
                      );
                    }}
                    color="blue"
                    fz={15}
                    style={{ cursor: "pointer" }}
                    ml={-5}
                  >
                    {channelData?.header?.header_links?.first_link?.text}
                  </Text>
                  <Text color="gray" fz={15} mr={-5}>
                    {channelData?.header?.header_links?.more?.text}
                  </Text>
                </Group>
              </Stack>
              <Tabs defaultValue="home" mt={10} color="pink">
                <Tabs.List>
                  <Tabs.Tab value="home">ホーム</Tabs.Tab>
                  <Tabs.Tab value="videos">動画</Tabs.Tab>
                  <Tabs.Tab value="shorts">ショート</Tabs.Tab>
                  <Tabs.Tab value="live">ライブ</Tabs.Tab>
                  <Tabs.Tab value="release">リリース</Tabs.Tab>
                  <Tabs.Tab value="playlist">再生リスト</Tabs.Tab>
                  <Tabs.Tab value="community">コミュニティ</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="home">Mess.</Tabs.Panel>

                <Tabs.Panel value="videos">Messages tab content</Tabs.Panel>

                <Tabs.Panel value="shorts">Settings tab content</Tabs.Panel>
              </Tabs>
            </Grid.Col>
          </Grid>
        </>
      )}
    </div>
  );
}
