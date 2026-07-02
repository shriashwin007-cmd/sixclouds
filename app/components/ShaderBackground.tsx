"use client";
import { useEffect, useRef } from "react";

/*
  Custom WebGL shader background — golden nebula clouds + pixel grid pulse.
  Fixed full-screen canvas behind all content, mouse-reactive.
*/

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

// hash & noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(11.3, 7.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;

  float t = uTime * 0.06;

  // drifting golden nebula clouds (6 clouds vibe)
  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t * 0.7 + 3.0));
  vec2 r = vec2(fbm(p * 1.6 + q * 1.4 + vec2(1.7, 9.2) + t * 0.5),
                fbm(p * 1.6 + q * 1.4 + vec2(8.3, 2.8) - t * 0.3));
  float cloud = fbm(p * 1.6 + r * 1.2);

  // mouse glow
  vec2 m = (uMouse - 0.5 * uRes.xy) / uRes.y;
  float mg = exp(-length(p - m) * 3.2) * 0.35;

  // palette: deep black -> ember gold -> bright gold
  vec3 base = vec3(0.02, 0.018, 0.012);
  vec3 ember = vec3(0.32, 0.21, 0.03);
  vec3 gold  = vec3(1.0, 0.84, 0.0);

  float glow = smoothstep(0.3, 0.85, cloud);
  vec3 col = base;
  col += ember * glow * 0.9;
  col += gold * pow(glow, 3.0) * 0.5;
  col += vec3(0.5, 0.42, 0.05) * smoothstep(0.55, 1.0, fbm(p * 0.7 - t * 0.4)) * 0.35;
  col += gold * mg * 1.4;

  // subtle green scan tint at edges (CRT vibe)
  col += vec3(0.02, 0.12, 0.01) * pow(1.0 - uv.y, 6.0) * 0.4;

  // pixel grid pulse
  vec2 g = fract(gl_FragCoord.xy / 48.0);
  float gridLine = (step(g.x, 0.02) + step(g.y, 0.02));
  float pulse = 0.5 + 0.5 * sin(uTime * 0.8 + uv.x * 4.0 + uv.y * 3.0);
  col += vec3(1.0, 0.84, 0.0) * gridLine * 0.032 * pulse;

  // twinkling star pixels
  vec2 cell = floor(gl_FragCoord.xy / 3.0);
  float star = step(0.9985, hash(cell));
  float tw = 0.5 + 0.5 * sin(uTime * 3.0 + hash(cell * 1.7) * 40.0);
  col += vec3(1.0, 0.9, 0.4) * star * tw * 0.5;

  // vignette
  col *= 1.0 - 0.45 * dot(p, p);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let tx = mx, ty = my;
    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = window.innerHeight - e.clientY; };
    window.addEventListener("pointermove", onMove, { passive: true });

    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.5 : 0.66;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.5);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr * scale);
      canvas.height = Math.floor(window.innerHeight * dpr * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mx * dpr * scale, my * dpr * scale);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        imageRendering: "pixelated",
      }}
    />
  );
}
