import Header from "@/components/game/Header";
import { Avatar, SimpleGrid } from "@mantine/core";
import { Card, Image, Text, Badge, Button, Group, Anchor } from "@mantine/core";
import { useRouter } from "next/router";

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
            <Text fw={500}>坊主がクレーン車で除夜の鐘を叩くゲーム</Text>
          </Group>
          <Group mt={"xs"} mb={"xs"}>
            <Avatar
              size="sm"
              src="https://pbs.twimg.com/profile_images/1263633102821134336/LpPW79La.jpg"
            />
            <Anchor
              href={"https://unityroom.com/games/bozucrane"}
              target="_blank"
              size="sm"
              mb={"5px"}
            >
              ニカイドウレンジ - Unityroom
            </Anchor>
          </Group>
          <Text size="sm" c="dimmed">
            二重振り子を題材にしたシンプルな物理演算ゲームです。
          </Text>
          <Group mt="auto">
            <Badge mt={"sm"} ml={"xs"} variant="outline" color="teal" size="md">
              二重振り子
            </Badge>
            <Badge mt={"sm"} variant="outline" color="teal" size="md">
              物理演算
            </Badge>
          </Group>

          <Button
            variant="gradient"
            size="md"
            gradient={{ from: "cyan", to: "lime", deg: 90 }}
            fullWidth
            mt="md"
            radius="md"
            onClick={() => {
              router.push("/game/boze");
            }}
          >
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
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>おはじきサッカー</Text>
          </Group>
          <Group mt={"xs"} mb={"xs"}>
            <Anchor
              href={"https://gamesnacks.com/games/pocketchampions"}
              target="_blank"
              size="sm"
              mb={"5px"}
            >
              GameSnacks
            </Anchor>
          </Group>
          <Text size="sm" c="dimmed">
            定番のおはじきサッカー
          </Text>
          <Group mt="auto">
            <Badge mt={"sm"} ml={"xs"} variant="outline" color="teal" size="md">
              おはじき
            </Badge>
            <Badge mt={"sm"} variant="outline" color="teal" size="md">
              サッカー
            </Badge>
          </Group>

          <Button
            variant="gradient"
            size="md"
            gradient={{ from: "cyan", to: "lime", deg: 90 }}
            fullWidth
            mt="md"
            radius="md"
            onClick={() => {
              router.push("/game/soccer");
            }}
          >
            今すぐプレイ
          </Button>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://os-worker.unityroom.com/unityroom_production/icon/70490/icon_20231231_235635.gif?h=1704034595"
              height={160}
              alt="Norway"
            />
          </Card.Section>
          <Badge
            color="pink"
            variant="gradient"
            gradient={{ from: "pink", to: "yellow", deg: 159 }}
            mt="sm"
          >
            NEW
          </Badge>
          <Group justify="space-between" mt="xs">
            <Text fw={500}>シュレディンガーのキャットタワー</Text>
          </Group>
          <Group mt={"xs"} mb={"xs"}>
            <Avatar
              size="sm"
              src="https://os-worker.unityroom.com/unityroom_production/icon/39803/icon_20230124_081135.jpeg?h=1674515495"
            />
            <Anchor
              href={"https://unityroom.com/games/cattowerofshrodinger"}
              target="_blank"
              size="sm"
              mr={"0"}
            >
              samirin33 - Unityroom
            </Anchor>
          </Group>
          <Text size="sm" c="dimmed" mt={"auto"}>
            「シュレディンガーの猫」のような観測するまでモノの状態が確定しないという状況を利用したゲームです！
          </Text>
          <Group mt="auto">
            <Badge mt={"sm"} ml={"xs"} variant="outline" color="teal" size="md">
              シュレディンガー
            </Badge>
            <Badge mt={"sm"} variant="outline" color="teal" size="md">
              猫
            </Badge>
          </Group>

          <Button
            variant="gradient"
            size="md"
            gradient={{ from: "cyan", to: "lime", deg: 90 }}
            fullWidth
            mt="md"
            radius="md"
            onClick={() => {
              router.push("/game/cattower");
            }}
          >
            今すぐプレイ
          </Button>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://os-worker.unityroom.com/unityroom_production/icon/54979/icon_20230928_194209.gif?h=1695897729"
              height={160}
              alt="Norway"
            />
          </Card.Section>
          <Badge
            color="pink"
            variant="gradient"
            gradient={{ from: "pink", to: "yellow", deg: 159 }}
            mt="sm"
          >
            NEW
          </Badge>
          <Group justify="space-between" mt="xs">
            <Text fw={500}>One Button Four Lights</Text>
          </Group>
          <Group mt={"xs"} mb={"xs"}>
            <Avatar
              size="sm"
              src="https://os-worker.unityroom.com/unityroom_production/icon/54979/icon_20230928_194209.gif?h=1695897729"
            />
            <Anchor
              href={"https://unityroom.com/games/one-button-four-lights"}
              target="_blank"
              size="sm"
              mr={"0"}
            >
              ゆーじ - Unityroom
            </Anchor>
          </Group>
          <Text size="sm" c="dimmed" mt={"auto"}>
            ボタンを押して4つのライトを点灯させてください
          </Text>
          <Group mt="auto">
            <Badge mt={"sm"} ml={"xs"} variant="outline" color="teal" size="md">
              ４つのライト
            </Badge>
            <Badge mt={"sm"} variant="outline" color="teal" size="md">
              ボタン
            </Badge>
          </Group>

          <Button
            variant="gradient"
            size="md"
            gradient={{ from: "cyan", to: "lime", deg: 90 }}
            fullWidth
            mt="md"
            radius="md"
            onClick={() => {
              router.push("/game/ocfl");
            }}
          >
            今すぐプレイ
          </Button>
        </Card>
      </SimpleGrid>
    </>
  );
}
