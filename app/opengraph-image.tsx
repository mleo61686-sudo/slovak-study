import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#ffffff",
          color: "#0f172a",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
          Flunio 🇸🇰 🇨🇿
        </div>
        <div style={{ marginTop: 18, fontSize: 34, fontWeight: 600 }}>
          Вивчення мов онлайн
        </div>
        <div style={{ marginTop: 22, fontSize: 26, color: "#334155" }}>
          Словацька • Чеська • Граматика • Словник • Вправи • A0–B2
        </div>
      </div>
    ),
    size
  );
}