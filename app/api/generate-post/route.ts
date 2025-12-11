import { createCanvas, loadImage } from "@napi-rs/canvas";
import type { Image, SKRSContext2D } from "@napi-rs/canvas";

type Payload = {
  homeTeamName: string;
  homeLogoUrl: string;
  awayTeamName: string;
  awayLogoUrl: string;
  finalScore: string;
  competition?: string;
  matchDate?: string;
};

const CANVAS_SIZE = 1080;
const LOGO_SIZE = 230;
const PADDING = 100;
const CENTER = CANVAS_SIZE / 2;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const validatePayload = (body: unknown): { data?: Payload; error?: string } => {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid JSON body." };
  }

  const required = [
    "homeTeamName",
    "homeLogoUrl",
    "awayTeamName",
    "awayLogoUrl",
    "finalScore",
  ] as const;

  for (const key of required) {
    const value = (body as Record<string, unknown>)[key];
    if (typeof value !== "string" || value.trim().length === 0) {
      return { error: `Missing or invalid field: ${key}` };
    }
  }

  const {
    homeTeamName,
    homeLogoUrl,
    awayTeamName,
    awayLogoUrl,
    finalScore,
    competition,
    matchDate,
  } = body as Record<string, unknown>;

  return {
    data: {
      homeTeamName: (homeTeamName as string).trim(),
      homeLogoUrl: (homeLogoUrl as string).trim(),
      awayTeamName: (awayTeamName as string).trim(),
      awayLogoUrl: (awayLogoUrl as string).trim(),
      finalScore: (finalScore as string).trim(),
      competition:
        typeof competition === "string" ? competition.trim() : undefined,
      matchDate: typeof matchDate === "string" ? matchDate.trim() : undefined,
    },
  };
};

const fetchLogo = async (url: string) => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch logo: ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    return await loadImage(buffer);
  } catch {
    return null;
  }
};

const drawLogo = (
  ctx: SKRSContext2D,
  image: Image | null,
  x: number,
  y: number,
) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + LOGO_SIZE / 2, y + LOGO_SIZE / 2, LOGO_SIZE / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fill();
  ctx.clip();

  if (image) {
    ctx.drawImage(image, x, y, LOGO_SIZE, LOGO_SIZE);
  } else {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(x, y, LOGO_SIZE, LOGO_SIZE);
  }

  ctx.restore();
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const { data, error } = validatePayload(body);

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: error ?? "Invalid payload received." }),
        { status: 400 },
      );
    }

    const [homeLogo, awayLogo] = await Promise.all([
      fetchLogo(data.homeLogoUrl),
      fetchLogo(data.awayLogoUrl),
    ]);

    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_SIZE);
    gradient.addColorStop(0, "#0f172a");
    gradient.addColorStop(1, "#111827");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(PADDING / 2, PADDING / 2, CANVAS_SIZE - PADDING, CANVAS_SIZE - PADDING);

    ctx.fillStyle = "#e5e7eb";
    ctx.textAlign = "center";

    ctx.font = "bold 28px 'Arial'";
    if (data.competition) {
      ctx.fillText(data.competition.toUpperCase(), CENTER, 90);
    }

    ctx.font = "600 22px 'Arial'";
    ctx.fillText("FINAL", CENTER, 130);

    if (data.matchDate) {
      ctx.font = "20px 'Arial'";
      ctx.fillStyle = "#cbd5e1";
      ctx.fillText(data.matchDate, CENTER, 170);
      ctx.fillStyle = "#e5e7eb";
    }

    drawLogo(ctx, homeLogo, PADDING, 260);
    drawLogo(ctx, awayLogo, CANVAS_SIZE - PADDING - LOGO_SIZE, 260);

    ctx.font = "bold 48px 'Arial'";
    ctx.fillText(
      data.homeTeamName,
      PADDING + LOGO_SIZE / 2,
      260 + LOGO_SIZE + 60,
    );
    ctx.fillText(
      data.awayTeamName,
      CANVAS_SIZE - PADDING - LOGO_SIZE / 2,
      260 + LOGO_SIZE + 60,
    );

    ctx.font = "bold 160px 'Arial'";
    ctx.fillText(data.finalScore, CENTER, 620);

    ctx.font = "20px 'Arial'";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText("made with MatchPost", CENTER, CANVAS_SIZE - 50);

    const buffer = canvas.toBuffer("image/png");

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to generate image", details: `${err}` }),
      { status: 500 },
    );
  }
}
