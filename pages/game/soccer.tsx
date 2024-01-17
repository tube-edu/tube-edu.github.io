import Header from "@/components/game/Header";

import { Text, Container, AspectRatio } from '@mantine/core';

export default function Game() {
  return (
    <>
      <Header />
      <Container maw={"90%"} mx="auto">
        <Text my="10" fz="20" fw="600">おはじきサッカー</Text>
        <AspectRatio ratio={9 / 16}>
        <iframe src="https://kokohachi.github.io/pocket_champs" width="100%" frameBorder="0" scrolling="no"></iframe>
        </AspectRatio>
      </Container>
    </>
  );
}