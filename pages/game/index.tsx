import Header from "@/components/game/Header";
import { SimpleGrid } from "@mantine/core";
import { Card, Image, Text, Badge, Button, Group, Anchor } from '@mantine/core';
import { useRouter } from 'next/router';

export default function Game() {
  const router = useRouter();
  return (
    <>
      <Header />
      <SimpleGrid cols={3} maw={"90%"} mx="auto" spacing="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://kokohachi.github.io/bozu/index_files/icon_20231227_191016.gif"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Badge color="pink" variant="gradient" gradient={{ from: 'pink', to: 'yellow', deg: 159 }} >NEW</Badge>

            <Text fw={500}>坊主がクレーン車で除夜の鐘を叩くゲーム</Text>
          </Group>
          <Anchor href={"https://unityroom.com/games/bozucrane"} target="_blank" size="sm" mb={"5px"}>by ニカイドウレンジ - Unityroom</Anchor>
          <Text size="sm" c="dimmed">
            二重振り子を題材にしたシンプルな物理演算ゲームです。
          </Text>
          <Group>
            <Badge mt={"sm"} ml={"xs"} variant="outline" color="teal" size="md">二重振り子</Badge>
            <Badge mt={"sm"} variant="outline" color="teal" size="md">物理演算</Badge>
          </Group>

          <Button variant="gradient" size="md" gradient={{ from: 'cyan', to: 'lime', deg: 90 }} fullWidth mt="md" radius="md" onClick={() => { router.push("/game/boze") }}>
            今すぐプレイ
          </Button>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://kokohachi.github.io/bozu/IMG_0008.jpeg"
              height={160}
              alt="Norway"
            />
          </Card.Section>
          <Badge color="pink" variant="gradient" gradient={{ from: 'pink', to: 'yellow', deg: 159 }} mt="md">NEW</Badge>
          <Group justify="space-between" mt="md" mb="xs">
            
            <Text fw={500}>おはじきサッカー</Text>
          </Group>
          <Anchor href={"https://gamesnacks.com/games/pocketchampions"} target="_blank" size="sm" mb={"5px"}>by GameSnacks</Anchor>
          <Text size="sm" c="dimmed">
            定番のおはじきサッカー
          </Text>
          <Group mt="auto">
            <Badge mt={"sm"} ml={"xs"} variant="outline" color="teal" size="md">おはじき</Badge>
            <Badge mt={"sm"} variant="outline" color="teal" size="md">サッカー</Badge>
          </Group>

          <Button variant="gradient" size="md" gradient={{ from: 'cyan', to: 'lime', deg: 90 }} fullWidth mt="md" radius="md" onClick={() => { router.push("/game/soccer") }}>
            今すぐプレイ
          </Button>
        </Card>
      </SimpleGrid>
    </>
  );
}