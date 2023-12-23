import Header from "@/components/Header";
import dashjs from "dashjs";
import {
  Card,
  SimpleGrid,
  Space,
  Image,
  Text,
  Avatar,
  Group,
  Grid,
  Container,
  Spoiler,
  Stack,
  Badge,
} from "@mantine/core";

import { use, useEffect, useState } from "react";
import { Innertube, UniversalCache } from "youtubei.js";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useRouter } from "next/router";
import YouTubePlayer from "youtube-player";
export default function Video() {
  const router = useRouter();
  const [videoData, setVideoData] = useState(Object);
  const [video_id, setVideoId] = useState(String);
  useEffect(() => {
    const video_id = location.pathname.split("/")[2].split(".")[0];
    setVideoId(video_id);
    console.log(video_id);
    const getVideoData = async (id: string) => {
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
      const video = await yt.getInfo(id);
      console.log(video?.primary_info?.title.text);
      setVideoData(video);
    };
    getVideoData(video_id);
  }, []);

  return (
    <div>
      <Header />
      <Grid w={"90%"} m={"auto"} mt={"lg"}>
        <Grid.Col span={8}>
          {videoData.secondary_info && (
            <Card>
              <Card.Section>
                <video
                  id="videoPlayer"
                  controls
                  style={{ width: "100%", height: "auto" }}
                  src="blob:https://www.youtube-nocookie.com/b5c81a94-7f3a-4025-b5d3-0a4efd14d68f"
                  crossOrigin="anonymous"
                ></video>
              </Card.Section>
              <Text size="xl" fw={700} mt={"sm"}>
                {videoData.primary_info.title.text}
              </Text>
              <Group>
                <Avatar
                  src={videoData.secondary_info.owner.author.thumbnails[0].url}
                  size="md"
                  style={{ verticalAlign: "bottom" }}
                />
                <Stack gap={"0"} mr={"auto"}>
                  <Text size="md">
                    {videoData.secondary_info.owner.author.name}
                  </Text>
                  <Text size="xs" color="gray">
                    {videoData.secondary_info.owner.subscriber_count.text}
                  </Text>
                </Stack>
                <Badge color="gray" h={"30px"}>
                  <Text size="xl">
                    <FiThumbsUp />
                    {videoData.basic_info.like_count}
                  </Text>
                </Badge>
              </Group>
              <Spoiler
                mt={"sm"}
                maxHeight={50}
                showLabel="続きを読む"
                hideLabel="閉じる"
              >
                <Text size="sm" fw={600}>
                  {videoData.primary_info.view_count.text}・
                  {videoData.primary_info.published.text}公開
                </Text>
                <Text>{videoData.secondary_info.description.text}</Text>
              </Spoiler>
            </Card>
          )}
        </Grid.Col>
        <Grid.Col span={3}></Grid.Col>
      </Grid>
    </div>
  );
}
