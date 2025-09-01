import { useEffect, useRef } from "react";

export type CircuitOptions = {
  blurPx?: number;          // background blur
  opacity?: number;         // 0..1
  grid?: number;            // grid spacing
  chips?: number;           // number of chip pads
  pulses?: number;          // moving dots
  traceAlpha?: number;      // base traces alpha
  cyan?: string;            // rgba color for cyan glow
  teal?: string;            // rgba color for teal traces
  yellow?: string;          // rgba color for yellow pulses
  speedMin?: number;        // px/s
  speedMax?: number;        // px/s
};

export const useCircuitAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>, opts: CircuitOptions) => {
  const rafRef = useRef<number>(null);
  const tracesRef = useRef<any[]>([]);
  const pulsesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const {
      blurPx = 5,
      opacity = 0.35,
      grid = 28,
      chips = 6,
      pulses = 60,
      traceAlpha = 0.16,
      cyan = "rgba(0,255,255,0.8)",
      teal = "rgba(0,191,170,0.16)",
      yellow = "rgba(252,238,9,0.8)",
      speedMin = 16,
      speedMax = 34,
    } = opts;

    let W = 0;
    let H = 0;

    const setSize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const makePulse = (seg: any) => {
      const speed = speedMin + Math.random() * (speedMax - speedMin);
      const offset = Math.random();
      const color = Math.random() < 0.7 ? cyan : yellow;
      return {
        seg,
        t: offset,
        speed,
        color,
        size: 1.4 + Math.random() * 0.8,
      };
    };

    const buildCircuit = () => {
      tracesRef.current = [];
      pulsesRef.current = [];

      const cols = Math.ceil(W / grid);
      const rows = Math.ceil(H / grid);

      // horizontal
      for (let r = 2; r < rows - 2; r++) {
        if (Math.random() < 0.25) continue;
        const y = r * grid + (Math.random() * 4 - 2);
        tracesRef.current.push({ type: "h", y, x0: grid * 2, x1: W - grid * 2, w: 0.8 });
      }
      // vertical
      for (let c = 2; c < cols - 2; c++) {
        if (Math.random() < 0.25) continue;
        const x = c * grid + (Math.random() * 4 - 2);
        tracesRef.current.push({ type: "v", x, y0: grid * 2, y1: H - grid * 2, w: 0.8 });
      }
      // chip pads
      for (let i = 0; i < chips; i++) {
        const cw = 80 + Math.random() * 120;
        const ch = 40 + Math.random() * 80;
        const cx = Math.random() * (W - cw - 200) + 100;
        const cy = Math.random() * (H - ch - 160) + 80;
        tracesRef.current.push({ type: "rect", x: cx, y: cy, w: cw, h: ch });
      }
      // pulses
      for (let i = 0; i < pulses; i++) {
        const seg = tracesRef.current[Math.floor(Math.random() * tracesRef.current.length)];
        if (!seg || seg.type === "rect") {
          i--;
          continue;
        }
        pulsesRef.current.push(makePulse(seg));
      }
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, W, H);

      // base traces
      for (const s of tracesRef.current) {
        if (s.type === "h") {
          ctx.strokeStyle = teal.replace(/0\.16\)$/, `${traceAlpha})`);
          ctx.lineWidth = s.w;
          ctx.beginPath();
          ctx.moveTo(s.x0, s.y);
          ctx.lineTo(s.x1, s.y);
          ctx.stroke();
        } else if (s.type === "v") {
          ctx.strokeStyle = teal.replace(/0\.16\)$/, `${traceAlpha})`);
          ctx.lineWidth = s.w;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y0);
          ctx.lineTo(s.x, s.y1);
          ctx.stroke();
        } else if (s.type === "rect") {
          ctx.strokeStyle = "rgba(0,191,170,0.20)";
          ctx.lineWidth = 1;
          ctx.strokeRect(s.x, s.y, s.w, s.h);
        }
      }

      // electricity pulses
      for (const p of pulsesRef.current) {
        const length =
          p.seg.type === "h" ? p.seg.x1 - p.seg.x0 : p.seg.y1 - p.seg.y0;
        p.t += (p.speed * dt) / (Math.abs(length) + 1);
        if (p.t > 1) p.t -= 1;

        let x: number, y: number;
        if (p.seg.type === "h") {
          x = p.seg.x0 + p.t * length;
          y = p.seg.y;
        } else {
          x = p.seg.x;
          y = p.seg.y0 + p.t * length;
        }
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // fixed visual styling
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-2";
    canvas.style.filter = `blur(${blurPx}px) saturate(110%)`;
    canvas.style.opacity = String(opacity);
    canvas.style.pointerEvents = "none";

    // init
    setSize();
    buildCircuit();

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(50, now - last) / 1000; // clamp delta
      last = now;
      draw(dt);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      setSize();
      buildCircuit();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef, opts]);
}
