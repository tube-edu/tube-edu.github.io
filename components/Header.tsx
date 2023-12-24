import { Text, Paper, Grid, Button, ActionIcon, Avatar } from "@mantine/core";
import { PiYoutubeLogoDuotone } from "react-icons/pi";
import { Input } from "@mantine/core";
import { IoSearchOutline } from "react-icons/io5";

export default function Header(props: any) {
  const handleQueryChange = (query: string) => {
    props.setQuery(query);
  };
  return (
    <Paper
      shadow="xl"
      radius="lg"
      withBorder
      w={"90%"}
      m={"auto"}
      p={"lg"}
      mt={"lg"}
      mb={"lg"}
    >
      <Grid>
        <Grid.Col span={3}>
          {/*change by viewport size*/}
          <Text
            size="xl"
            fw={700}
            onClick={() => (location.href = "/")}
            style={{ cursor: "pointer" }}
          >
            <PiYoutubeLogoDuotone
              size={32}
              style={{
                verticalAlign: "bottom",
                marginRight: 8,
                color: "#e83976",
              }}
            />
            The Tube
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Input
            size="sm"
            radius="lg"
            placeholder={"検索"}
            w={"80%"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                location.href = `/?q=${e.currentTarget.value}`;
              }
            }}
            onLoad={
              props.query
                ? (e: any) => (e.currentTarget.value = props.query)
                : undefined
            }
          />
        </Grid.Col>
        <Grid.Col span={1}></Grid.Col>
      </Grid>
    </Paper>
  );
}
