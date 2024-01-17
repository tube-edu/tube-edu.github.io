import Header from "@/components/game/Header";

import {
  Text,
  Container,
  AspectRatio,
  Space,
  Group,
  Avatar,
  Anchor,
} from "@mantine/core";

export default function Ocfl() {
  return (
    <>
      <Header />
      <Container maw={"90%"} mx="auto">
        <Text my="10" fz="20" fw="600">
          One Button Four Lights
        </Text>
        <Group>
          <Avatar src="https://pbs.twimg.com/profile_images/1278973577513955328/GkKlAAPW.jpg" />
          <Text ml="xs">ゆーじ</Text>
          <Anchor
            href="https://unityroom.com/games/one-button-four-lights"
            target="_blank"
          >
            元サイト
          </Anchor>
        </Group>
        <AspectRatio ratio={16/9} mx="auto">
          <iframe
            src="https://kokohachi.github.io/bozu/ocfl"
            width="100%"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </AspectRatio>
        <Space h="xl" />
      </Container>
    </>
  );
}
