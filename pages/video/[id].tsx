import Header from "@/components/Header";
import { UUID, randomUUID } from "crypto";
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
  Divider,
  Switch,
  Accordion,
} from "@mantine/core";

import { use, useEffect, useState } from "react";
import { Innertube, UniversalCache } from "youtubei.js";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useRouter } from "next/router";
import YouTubePlayer from "youtube-player";
import { useViewportSize } from "@mantine/hooks";
export default function Video() {
  const router = useRouter();
  const [videoData, setVideoData] = useState(Object);
  const [video_id, setVideoId] = useState(String);
  const [isLandscape, setIsLandscape] = useState(false);
  const [commentsByRelevance, setCommentsByRelevance] = useState(Array);
  const [commentsByNewest, setCommentsByNewest] = useState(Array);
  const [iframeLink, setIframeLink] = useState(String);
  const [sortByNewest, setSortByNewest] = useState(false);

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
      const commentsBR = await yt.getComments(id, "TOP_COMMENTS");
      const commentsBN = await yt.getComments(id, "NEWEST_FIRST");
      setCommentsByRelevance(commentsBR.contents);
      setCommentsByNewest(commentsBN.contents);
      setVideoData(video);
    };
    getVideoData(video_id);
    setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    if (router.query.t) {
      setIframeLink(
        `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&start=${router.query.t}`
      );
    } else {
      setIframeLink(
        `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1`
      );
    }
  });

  return (
    <div>
      <Header />
      {isLandscape ? (
        <Grid w={"90%"} m={"auto"} mt={"lg"}>
          <Grid.Col span={8}>
            {videoData.secondary_info && (
              <>
                <Card>
                  <Card.Section>
                    <iframe
                      id="ytplayer"
                      width="100%"
                      height="500px"
                      src={iframeLink}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </Card.Section>
                  <Text size="xl" fw={700} mt={"sm"} lineClamp={2}>
                    {videoData.primary_info?.title.text}
                  </Text>
                  <Group>
                    <Avatar
                      src={
                        videoData.secondary_info.owner.author.thumbnails[0].url
                      }
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
                  <Card
                    mt={"xs"}
                    radius={"sm"}
                    w={"100%"}
                    style={{ backgroundColor: "rgba(223,223,223,10)" }}
                  >
                    <Spoiler
                      maxHeight={50}
                      showLabel="続きを読む"
                      hideLabel="閉じる"
                    >
                      <Text size="sm" fw={600}>
                        {videoData.primary_info.view_count.text}・
                        {videoData.primary_info.published.text}公開
                      </Text>
                      {(
                        videoData.secondary_info?.description?.runs ??
                        ([
                          {
                            text: "概要欄は空です",
                          },
                        ] as Array<any>)
                      ).map((item: any) => (
                        <Text
                          onClick={
                            item.endpoint?.metadata?.url
                              ? () => {
                                  let redirectUrl =
                                    item.endpoint?.metadata?.url;

                                  if (
                                    redirectUrl.includes(
                                      "youtube.com/redirect"
                                    ) &&
                                    redirectUrl.includes("q=")
                                  ) {
                                    redirectUrl = decodeURIComponent(
                                      redirectUrl.split("q=")[1].split("&")[0]
                                    );
                                    console.log(redirectUrl);
                                  } else if (redirectUrl.includes("/watch")) {
                                    const video_id = redirectUrl
                                      .split("v=")[1]
                                      .split("&")[0];
                                    const time = redirectUrl.includes("t=")
                                      ? redirectUrl.split("t=")[1].split("&")[0]
                                      : "0";
                                    redirectUrl = `/video/${video_id}?t=${time}`;
                                  }
                                  if (redirectUrl.includes("http")) {
                                    // go to external link
                                    // create a link element
                                    const linkElement =
                                      document.createElement("a");
                                    // set link's href to the path
                                    linkElement.href = redirectUrl;
                                    // set link's target to _blank
                                    linkElement.target = "_blank";
                                    // simulate click on the link
                                    linkElement.click();
                                  } else if (redirectUrl.includes("t=")) {
                                    const time = parseInt(
                                      redirectUrl.split("t=")[1].split("&")[0]
                                    );
                                    console.log(time);
                                    const player =
                                      document.getElementById("ytplayer");
                                    player?.setAttribute(
                                      "src",
                                      `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&start=${time}`
                                    );
                                  } else {
                                    location.href = redirectUrl;
                                  }
                                }
                              : () => {}
                          }
                          color={item.endpoint ? "blue" : "black"}
                          style={{ cursor: (item.endpoint && "pointer") || "" }}
                          key={randomUUID()}
                        >
                          {item.text}
                        </Text>
                      ))}
                    </Spoiler>
                  </Card>
                </Card>
                <Group>
                  <Text size="xl" fw={700} mt={"sm"}>
                    {commentsByNewest.length}件のコメント
                  </Text>

                  <Switch
                    label="新しい順"
                    onChange={() => {
                      setSortByNewest(!sortByNewest);
                    }}
                    style={{ float: "right" }}
                    ml={"auto"}
                  />
                </Group>
                <Divider />
                {!sortByNewest
                  ? commentsByRelevance.map((item: any) => (
                      <Card w={"100%"} key={item.comment.comment_id}>
                        <Group>
                          <Avatar
                            src={item.comment.author.thumbnails[0].url}
                            size="md"
                            style={{ verticalAlign: "bottom" }}
                          />
                          <Text size="sm" color="gray">
                            {item.comment.author.name}
                          </Text>
                          <Text size="xs" color="gray">
                            {item.comment.published.text}
                          </Text>
                        </Group>
                        <Spoiler
                          maxHeight={50}
                          showLabel="更に表示"
                          hideLabel="閉じる"
                        >
                          {item.comment.content?.runs?.map((comment: any) => (
                            <>
                              <Text
                                onClick={
                                  comment.endpoint?.metadata?.url
                                    ? () => {
                                        let redirectUrl =
                                          comment.endpoint?.metadata?.url;

                                        if (
                                          redirectUrl.includes(
                                            "youtube.com/redirect"
                                          ) &&
                                          redirectUrl.includes("q=")
                                        ) {
                                          redirectUrl = decodeURIComponent(
                                            redirectUrl
                                              .split("q=")[1]
                                              .split("&")[0]
                                          );
                                          console.log(redirectUrl);
                                        } else if (
                                          redirectUrl.includes("/watch")
                                        ) {
                                          const video_id = redirectUrl
                                            .split("v=")[1]
                                            .split("&")[0];
                                          const time = redirectUrl.includes(
                                            "t="
                                          )
                                            ? redirectUrl
                                                .split("t=")[1]
                                                .split("&")[0]
                                            : "0";
                                          redirectUrl = `/video/${video_id}?t=${time}`;
                                        }
                                        if (redirectUrl.includes("http")) {
                                          // go to external link
                                          // create a link element
                                          const linkElement =
                                            document.createElement("a");
                                          // set link's href to the path
                                          linkElement.href = redirectUrl;
                                          // set link's target to _blank
                                          linkElement.target = "_blank";
                                          // simulate click on the link
                                          linkElement.click();
                                        } else if (redirectUrl.includes("t=")) {
                                          const time = parseInt(
                                            redirectUrl
                                              .split("t=")[1]
                                              .split("&")[0]
                                          );
                                          console.log(time);
                                          const player =
                                            document.getElementById("ytplayer");
                                          player?.setAttribute(
                                            "src",
                                            `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&start=${time}`
                                          );
                                        } else {
                                          location.href = redirectUrl;
                                        }
                                      }
                                    : () => {}
                                }
                                color={comment.endpoint ? "blue" : "black"}
                                style={{
                                  cursor: (comment.endpoint && "pointer") || "",
                                }}
                              >
                                {comment.text}
                              </Text>
                            </>
                          ))}
                        </Spoiler>
                        <Group>
                          <FiThumbsUp
                            style={{ verticalAlign: "bottom" }}
                            color="gray"
                          />
                          <Text size="sm" color="gray">
                            {item.comment.vote_count}
                          </Text>
                        </Group>
                      </Card>
                    ))
                  : commentsByNewest.map((item: any) => (
                      <Card w={"100%"} key={item.comment.comment_id}>
                        <Group>
                          <Avatar
                            src={item.comment.author.thumbnails[0].url}
                            size="md"
                            style={{ verticalAlign: "bottom" }}
                          />
                          <Text size="sm" color="gray">
                            {item.comment.author.name}
                          </Text>
                          <Text size="xs" color="gray">
                            {item.comment.published.text}
                          </Text>
                        </Group>
                        <Spoiler
                          maxHeight={50}
                          showLabel="更に表示"
                          hideLabel="閉じる"
                        >
                          {item.comment.content?.runs?.map((comment: any) => (
                            <>
                              <Text
                                onClick={
                                  comment.endpoint?.metadata?.url
                                    ? () => {
                                        let redirectUrl =
                                          comment.endpoint?.metadata?.url;

                                        if (
                                          redirectUrl.includes(
                                            "youtube.com/redirect"
                                          ) &&
                                          redirectUrl.includes("q=")
                                        ) {
                                          redirectUrl = decodeURIComponent(
                                            redirectUrl
                                              .split("q=")[1]
                                              .split("&")[0]
                                          );
                                          console.log(redirectUrl);
                                        } else if (
                                          redirectUrl.includes("/watch")
                                        ) {
                                          const video_id = redirectUrl
                                            .split("v=")[1]
                                            .split("&")[0];
                                          const time = redirectUrl.includes(
                                            "t="
                                          )
                                            ? redirectUrl
                                                .split("t=")[1]
                                                .split("&")[0]
                                            : "0";
                                          redirectUrl = `/video/${video_id}?t=${time}`;
                                        }
                                        if (redirectUrl.includes("http")) {
                                          // go to external link
                                          // create a link element
                                          const linkElement =
                                            document.createElement("a");
                                          // set link's href to the path
                                          linkElement.href = redirectUrl;
                                          // set link's target to _blank
                                          linkElement.target = "_blank";
                                          // simulate click on the link
                                          linkElement.click();
                                        } else if (redirectUrl.includes("t=")) {
                                          const time = parseInt(
                                            redirectUrl
                                              .split("t=")[1]
                                              .split("&")[0]
                                          );
                                          console.log(time);
                                          const player =
                                            document.getElementById("ytplayer");
                                          player?.setAttribute(
                                            "src",
                                            `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&start=${time}`
                                          );
                                        } else {
                                          location.href = redirectUrl;
                                        }
                                      }
                                    : () => {}
                                }
                                color={comment.endpoint ? "blue" : "black"}
                                style={{
                                  cursor: (comment.endpoint && "pointer") || "",
                                }}
                              >
                                {comment.text}
                              </Text>
                            </>
                          ))}
                        </Spoiler>
                        <Group>
                          <FiThumbsUp
                            style={{ verticalAlign: "bottom" }}
                            color="gray"
                          />
                          <Text size="sm" color="gray">
                            {item.comment.vote_count}
                          </Text>
                        </Group>
                      </Card>
                    ))}
              </>
            )}
          </Grid.Col>
          <Grid.Col span={4}>
            {videoData.watch_next_feed?.map((item: any) => (
              <Card
                p={"sm"}
                radius={"sm"}
                w={"100%"}
                key={item.id}
                onClick={() => {
                  location.href = `/video/${item.id}`;
                }}
                style={{ cursor: "pointer" }}
              >
                <Grid>
                  <Grid.Col span={6}>
                    <Image
                      src={item.thumbnails[0]?.url}
                      width={"100%"}
                      radius={"lg"}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="md" fw={600} lineClamp={2}>
                      {item.title?.text}
                    </Text>
                    <Group>
                      <Stack gap={"0"} mr={"auto"}>
                        <Text size="xs" color="gray" lineClamp={1}>
                          {item.author?.name}
                        </Text>
                        <Text size="xs" color="gray" lineClamp={1}>
                          {item.short_view_count?.text}
                        </Text>
                      </Stack>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Card>
            ))}
          </Grid.Col>
        </Grid>
      ) : (
        <Container w={"90%"} m={"auto"} mt={"lg"}>
          {videoData.secondary_info && (
            <>
              <Card>
                <Card.Section>
                  <iframe
                    id="ytplayer"
                    width="100%"
                    height="400px"
                    src={`https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </Card.Section>
                <Text size="xl" fw={700} mt={"sm"}>
                  {videoData.primary_info?.title.text}
                </Text>
                <Group>
                  <Avatar
                    src={
                      videoData.secondary_info.owner.author.thumbnails[0].url
                    }
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
                  maxHeight={50}
                  showLabel="続きを読む"
                  hideLabel="閉じる"
                >
                  <Text size="sm" fw={600}>
                    {videoData.primary_info.view_count.text}・
                    {videoData.primary_info.published.text}公開
                  </Text>
                  {(
                    videoData.secondary_info?.description?.runs ??
                    ([
                      {
                        text: "概要欄は空です",
                      },
                    ] as Array<any>)
                  ).map((item: any) => (
                    <Text
                      key={randomUUID()}
                      onClick={
                        item.endpoint?.metadata?.url
                          ? () => {
                              let redirectUrl = item.endpoint?.metadata?.url;

                              if (
                                redirectUrl.includes("youtube.com/redirect") &&
                                redirectUrl.includes("q=")
                              ) {
                                redirectUrl = decodeURIComponent(
                                  redirectUrl.split("q=")[1].split("&")[0]
                                );
                                console.log(redirectUrl);
                              } else if (redirectUrl.includes("/watch")) {
                                const video_id = redirectUrl
                                  .split("v=")[1]
                                  .split("&")[0];
                                const time = redirectUrl.includes("t=")
                                  ? redirectUrl.split("t=")[1].split("&")[0]
                                  : "0";
                                redirectUrl = `/video/${video_id}?t=${time}`;
                              }
                              if (redirectUrl.includes("http")) {
                                // go to external link
                                // create a link element
                                const linkElement = document.createElement("a");
                                // set link's href to the path
                                linkElement.href = redirectUrl;
                                // set link's target to _blank
                                linkElement.target = "_blank";
                                // simulate click on the link
                                linkElement.click();
                              } else if (redirectUrl.includes("t=")) {
                                const time = parseInt(
                                  redirectUrl.split("t=")[1].split("&")[0]
                                );
                                console.log(time);
                                const player =
                                  document.getElementById("ytplayer");
                                player?.setAttribute(
                                  "src",
                                  `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&start=${time}`
                                );
                              } else {
                                location.href = redirectUrl;
                              }
                            }
                          : () => {}
                      }
                      color={item.endpoint ? "blue" : "black"}
                      style={{ cursor: (item.endpoint && "pointer") || "" }}
                    >
                      {item.text}
                    </Text>
                  ))}
                </Spoiler>
              </Card>

              <Divider />
              <Accordion>
                <Accordion.Item value="コメント">
                  <Accordion.Control>
                    <Group>
                      <Text size="xl" fw={700} mt={"sm"}>
                        {commentsByNewest.length}件のコメント
                      </Text>

                      <Switch
                        label="新しい順"
                        onChange={() => {
                          setSortByNewest(!sortByNewest);
                        }}
                        style={{ float: "right" }}
                        ml={"auto"}
                      />
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    {!sortByNewest
                      ? commentsByRelevance.map((item: any) => (
                          <Card w={"100%"} key={item.comment.comment_id}>
                            <Group>
                              <Avatar
                                src={item.comment.author.thumbnails[0].url}
                                size="md"
                                style={{ verticalAlign: "bottom" }}
                              />
                              <Text size="sm" color="gray">
                                {item.comment.author.name}
                              </Text>
                              <Text size="xs" color="gray">
                                {item.comment.published.text}
                              </Text>
                            </Group>
                            <Spoiler
                              maxHeight={50}
                              showLabel="更に表示"
                              hideLabel="閉じる"
                            >
                              {item.comment.content?.runs?.map(
                                (comment: any) => (
                                  <>
                                    <Text
                                      onClick={
                                        comment.endpoint?.metadata?.url
                                          ? () => {
                                              let redirectUrl =
                                                comment.endpoint?.metadata?.url;

                                              if (
                                                redirectUrl.includes(
                                                  "youtube.com/redirect"
                                                ) &&
                                                redirectUrl.includes("q=")
                                              ) {
                                                redirectUrl =
                                                  decodeURIComponent(
                                                    redirectUrl
                                                      .split("q=")[1]
                                                      .split("&")[0]
                                                  );
                                                console.log(redirectUrl);
                                              } else if (
                                                redirectUrl.includes("/watch")
                                              ) {
                                                const video_id = redirectUrl
                                                  .split("v=")[1]
                                                  .split("&")[0];
                                                const time =
                                                  redirectUrl.includes("t=")
                                                    ? redirectUrl
                                                        .split("t=")[1]
                                                        .split("&")[0]
                                                    : "0";
                                                redirectUrl = `/video/${video_id}?t=${time}`;
                                              }
                                              if (
                                                redirectUrl.includes("http")
                                              ) {
                                                // go to external link
                                                // create a link element
                                                const linkElement =
                                                  document.createElement("a");
                                                // set link's href to the path
                                                linkElement.href = redirectUrl;
                                                // set link's target to _blank
                                                linkElement.target = "_blank";
                                                // simulate click on the link
                                                linkElement.click();
                                              } else if (
                                                redirectUrl.includes("t=")
                                              ) {
                                                const time = parseInt(
                                                  redirectUrl
                                                    .split("t=")[1]
                                                    .split("&")[0]
                                                );
                                                console.log(time);
                                                const player =
                                                  document.getElementById(
                                                    "ytplayer"
                                                  );
                                                player?.setAttribute(
                                                  "src",
                                                  `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&start=${time}`
                                                );
                                              } else {
                                                location.href = redirectUrl;
                                              }
                                            }
                                          : () => {}
                                      }
                                      color={
                                        comment.endpoint ? "blue" : "black"
                                      }
                                      style={{
                                        cursor:
                                          (comment.endpoint && "pointer") || "",
                                      }}
                                    >
                                      {comment.text}
                                    </Text>
                                  </>
                                )
                              )}
                            </Spoiler>
                            <Group>
                              <FiThumbsUp
                                style={{ verticalAlign: "bottom" }}
                                color="gray"
                              />
                              <Text size="sm" color="gray">
                                {item.comment.vote_count}
                              </Text>
                            </Group>
                          </Card>
                        ))
                      : commentsByNewest.map((item: any) => (
                          <Card w={"100%"} key={item.comment.comment_id}>
                            <Group>
                              <Avatar
                                src={item.comment.author.thumbnails[0].url}
                                size="md"
                                style={{ verticalAlign: "bottom" }}
                              />
                              <Text size="sm" color="gray">
                                {item.comment.author.name}
                              </Text>
                              <Text size="xs" color="gray">
                                {item.comment.published.text}
                              </Text>
                            </Group>
                            <Spoiler
                              maxHeight={50}
                              showLabel="更に表示"
                              hideLabel="閉じる"
                            >
                              {item.comment.content?.runs?.map(
                                (comment: any) => (
                                  <>
                                    <Text
                                      onClick={
                                        comment.endpoint?.metadata?.url
                                          ? () => {
                                              let redirectUrl =
                                                comment.endpoint?.metadata?.url;

                                              if (
                                                redirectUrl.includes(
                                                  "youtube.com/redirect"
                                                ) &&
                                                redirectUrl.includes("q=")
                                              ) {
                                                redirectUrl =
                                                  decodeURIComponent(
                                                    redirectUrl
                                                      .split("q=")[1]
                                                      .split("&")[0]
                                                  );
                                                console.log(redirectUrl);
                                              } else if (
                                                redirectUrl.includes("/watch")
                                              ) {
                                                const video_id = redirectUrl
                                                  .split("v=")[1]
                                                  .split("&")[0];
                                                const time =
                                                  redirectUrl.includes("t=")
                                                    ? redirectUrl
                                                        .split("t=")[1]
                                                        .split("&")[0]
                                                    : "0";
                                                redirectUrl = `/video/${video_id}?t=${time}`;
                                              }
                                              if (
                                                redirectUrl.includes("http")
                                              ) {
                                                // go to external link
                                                // create a link element
                                                const linkElement =
                                                  document.createElement("a");
                                                // set link's href to the path
                                                linkElement.href = redirectUrl;
                                                // set link's target to _blank
                                                linkElement.target = "_blank";
                                                // simulate click on the link
                                                linkElement.click();
                                              } else if (
                                                redirectUrl.includes("t=")
                                              ) {
                                                const time = parseInt(
                                                  redirectUrl
                                                    .split("t=")[1]
                                                    .split("&")[0]
                                                );
                                                console.log(time);
                                                const player =
                                                  document.getElementById(
                                                    "ytplayer"
                                                  );
                                                player?.setAttribute(
                                                  "src",
                                                  `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&start=${time}`
                                                );
                                              } else {
                                                location.href = redirectUrl;
                                              }
                                            }
                                          : () => {}
                                      }
                                      color={
                                        comment.endpoint ? "blue" : "black"
                                      }
                                      style={{
                                        cursor:
                                          (comment.endpoint && "pointer") || "",
                                      }}
                                    >
                                      {comment.text}
                                    </Text>
                                  </>
                                )
                              )}
                            </Spoiler>
                            <Group>
                              <FiThumbsUp
                                style={{ verticalAlign: "bottom" }}
                                color="gray"
                              />
                              <Text size="sm" color="gray">
                                {item.comment.vote_count}
                              </Text>
                            </Group>
                          </Card>
                        ))}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </>
          )}

          <Divider />
          {videoData.watch_next_feed?.map((item: any) => (
            <Card
              p={"sm"}
              radius={"sm"}
              w={"100%"}
              key={item.id}
              onClick={() => {
                location.href = `/video/${item.id}`;
              }}
              style={{ cursor: "pointer" }}
            >
              <Grid>
                <Grid.Col span={6}>
                  <Image
                    src={item.thumbnails[0]?.url}
                    width={"100%"}
                    radius={"lg"}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="xl" fw={600} lineClamp={4}>
                    {item.title?.text}
                  </Text>
                  <Group>
                    <Stack gap={"0"} mr={"auto"}>
                      <Text size="md" color="gray" lineClamp={1}>
                        {item.author?.name}
                      </Text>
                      <Text size="md" color="gray" lineClamp={1}>
                        {item.short_view_count?.text}
                      </Text>
                    </Stack>
                  </Group>
                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </Container>
      )}
    </div>
  );
}
