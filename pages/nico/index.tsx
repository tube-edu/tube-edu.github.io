import Header from "@/components/nico/Header";

export default function Nico() {
  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h1>メンテナンス中です</h1>
        <p>しばらくお待ちください</p>
        <p>終了予定：1/2 0:00</p>
      </div>
    </div>
  );
}
