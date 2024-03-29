import Header from "@/components/game/Header";

import {
  Text,
  Container,
  AspectRatio,
  Group,
  Avatar,
  Anchor,
} from "@mantine/core";

export default function Game() {
  return (
    <>
      <Header />
      <Container maw={"90%"} mx="auto">
        <Text my="10" fz="20" fw="600">
          坊主がクレーン車で除夜の鐘を叩くゲーム
        </Text>
        <Group>
          <Avatar src="https://pbs.twimg.com/profile_images/1263633102821134336/LpPW79La.jpg" />
          <Text ml="xs">ニカイドウレンジ</Text>
          <Anchor href="https://unityroom.com/games/bozucrane" target="_blank">
            元サイト
          </Anchor>
        </Group>
        <AspectRatio
          ratio={16 / 9}
          mt={10}
          style={{ margin: "auto", border: "solid 1px #ccc", radius: "md" }}
        >
          <iframe
            src="https://kokohachi.github.io/bozu/boze"
            width="100%"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </AspectRatio>
      </Container>
    </>
  );
}
