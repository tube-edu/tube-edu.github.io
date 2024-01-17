import Header from "@/components/game/Header";

import { Text, Container, AspectRatio } from '@mantine/core';

export default function Game() {
  return (
    <>
      <Header />
      <Container maw={"90%"} mx="auto">
        <Text my="10" fz="20" fw="600">坊主がクレーン車で除夜の鐘を叩くゲーム</Text>
        <AspectRatio ratio={16 / 9}>
        <iframe src="https://kokohachi.github.io/bozu/boze" width="100%" frameBorder="0" scrolling="no"></iframe>
        </AspectRatio>
      </Container>
    </>
  );
}