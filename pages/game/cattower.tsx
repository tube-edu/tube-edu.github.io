import Header from "@/components/game/Header";

import {
  Text,
  Container,
  AspectRatio,
  Group,
  Avatar,
  Anchor,
} from "@mantine/core";

export default function Cattower() {
  return (
    <>
      <Header />
      <Container maw={"90%"} mx="auto">
        <Text my="10" fz="20" fw="600">
          シュレディンガーのキャットタワー
        </Text>
        <Group>
          <Avatar src="https://os-worker.unityroom.com/unityroom_production/icon/39803/icon_20230124_081135.jpeg?h=1674515495" />
          <Text ml="xs">samirin33</Text>
          <Anchor
            href="https://unityroom.com/games/cattowerofshrodinger"
            target="_blank"
          >
            元サイト
          </Anchor>
        </Group>
        <AspectRatio
          ratio={16 / 9}
          mt={10}
          style={{ margin: "auto", border: "solid 1px #ccc", radius: "md" }}
        >
          <iframe
            src="https://kokohachi.github.io/bozu/cat"
            width="100%"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </AspectRatio>
      </Container>
    </>
  );
}
