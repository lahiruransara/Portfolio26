import * as THREE from 'three';
import { Effect, BlendFunction } from "postprocessing";
import { Uniform, Vector2 } from "three";

const fragmentShader = `
// Basic uniforms
uniform float cellSize;
uniform bool invert;
uniform bool colorMode;
uniform int asciiStyle;

// PostFX uniforms
uniform float time;
uniform vec2 resolution;
uniform float scanlineIntensity;
uniform float targetFPS;
uniform int colorPalette;
uniform float glitchIntensity;
uniform float glitchFrequency;
uniform sampler2D inputBuffer;
uniform vec2 aspectRatio;

// Helper functions
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 applyColorPalette(vec3 color, int palette) {
  if (palette == 1) { // Green
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.1, lum * 0.9, 0.1);
  } else if (palette == 2) { // Amber
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(lum * 1.0, lum * 0.6, lum * 0.2);
  } else if (palette == 3) { // Cyan
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.0, lum * 0.8, lum);
  } else if (palette == 4) { // Blue
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.1, 0.2, lum);
  }
  return color;
}

float getChar(float brightness, vec2 p, int style, float time, vec2 cellCoord) {
  vec2 grid = floor(p * 4.0);
  float py = p.y * 4.0;
  float val = 0.0;

  if (style == 0) { // Standard
    if (brightness < 0.2) val = (grid.x == 1.0 && grid.y == 1.0) ? 0.3 : 0.0;
    else if (brightness < 0.35) val = (grid.x == 1.0 || grid.x == 2.0) && (grid.y == 1.0 || grid.y == 2.0) ? 1.0 : 0.0;
    else if (brightness < 0.5) val = (grid.y == 1.0 || grid.y == 2.0) ? 1.0 : 0.0;
    else if (brightness < 0.65) val = (grid.y == 0.0 || grid.y == 3.0) ? 1.0 : (grid.y == 1.0 || grid.y == 2.0) ? 0.5 : 0.0;
    else if (brightness < 0.8) val = (grid.x == 0.0 || grid.x == 2.0 || grid.y == 0.0 || grid.y == 2.0) ? 1.0 : 0.3;
    else val = 1.0;
  }

  else if (style == 1) { // Matrix Numbers (1-9) with Spacing
    if (p.x < 0.2 || p.x > 0.8) return 0.0;
    
    float cellSeed = random(cellCoord);
    // Asynchronize flicker by adding a unique time offset per cell
    float flicker = random(cellCoord + floor(time * 3.0 + cellSeed * 100.0));
    
    float b = brightness;
    // Shimmer on gray and white numbers (brightness > 0.15)
    if (brightness > 0.15 && cellSeed < 0.04) {
        b = fract(brightness + flicker);
    }
    
    int digit = int(clamp(b * 9.0 + 0.5, 1.0, 9.0));
    bool L = (p.x < 0.4); 
    bool R = (p.x > 0.6);
    bool thinH = (p.x > 0.35 && p.x < 0.65); 
    bool T   = (py > 4.2) && thinH;
    bool MID = (py > 2.3 && py < 2.7) && thinH;
    bool B   = (py < 0.8) && thinH;
    bool vT = (py > 2.5);
    bool vB = (py < 2.5);

    if (digit == 1) { // Lowest Density
      if (p.x > 0.45 && p.x < 0.55) val = 1.0;
    } else if (digit == 2) {
      if (T || R) val = 1.0;
    } else if (digit == 3) {
      if (MID || R || (L && vT)) val = 1.0;
    } else if (digit == 4) {
      if (T || MID || B || R) val = 1.0;
    } else if (digit == 5) {
      if (T || MID || B || (R && vT) || (L && vB)) val = 1.0;
    } else if (digit == 6) {
      if (T || MID || B || (L && vT) || (R && vB)) val = 1.0;
    } else if (digit == 7) {
      if (T || MID || B || L || (R && vB)) val = 1.0;
    } else if (digit == 8) {
      if (T || MID || B || R || (L && vT)) val = 1.0;
    } else if (digit == 9) { // Highest Density
      if (T || MID || B || L || R) val = 1.0;
    }
  }
  return val;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 cellCount = resolution / cellSize;
  vec2 cellCoord = floor(uv * cellCount);
  vec2 screenSampleUV = (cellCoord + 0.5) / cellCount;
  vec2 imageSampleUV = (screenSampleUV - 0.5) * aspectRatio + 0.5;
  vec4 cellColor = texture(inputBuffer, imageSampleUV);
  float brightness = dot(cellColor.rgb, vec3(0.299, 0.587, 0.114));
  if (invert) brightness = 1.0 - brightness;
  vec2 localUV = fract(uv * cellCount);
  float charValue = getChar(brightness, localUV, asciiStyle, time, cellCoord);
  vec3 finalColor = colorMode ? (cellColor.rgb * charValue) : vec3(brightness * charValue);
  finalColor = applyColorPalette(finalColor, colorPalette);
  outputColor = vec4(finalColor, 1.0);
}
`;

export interface AsciiEffectOptions {
  cellSize?: number;
  invert?: boolean;
  color?: boolean;
  style?: number;
  resolution?: Vector2;
  postfx?: {
    targetFPS?: number;
    colorPalette?: number;
    glitchIntensity?: number;
    glitchFrequency?: number;
  };
  inputBuffer?: THREE.Texture | null;
}

export class AsciiEffect extends Effect {
  private _time: number = 0;
  private _deltaAccumulator: number = 0;

  constructor(options: AsciiEffectOptions = {}) {
    const {
      cellSize = 9,
      invert = false,
      color = true,
      style = 1,
      resolution = new Vector2(1920, 1080),
      postfx = {}
    } = options;

    super("AsciiEffect", fragmentShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, Uniform>([
        ["cellSize", new Uniform(cellSize)],
        ["colorMode", new Uniform(color)],
        ["asciiStyle", new Uniform(style)],
        ["time", new Uniform(0)],
        ["resolution", new Uniform(resolution)],
        ["targetFPS", new Uniform(postfx.targetFPS || 0)],
        ["colorPalette", new Uniform(postfx.colorPalette || 0)],
        ["glitchIntensity", new Uniform(postfx.glitchIntensity || 0)],
        ["glitchFrequency", new Uniform(postfx.glitchFrequency || 0)],
        ["inputBuffer", new Uniform(options.inputBuffer || null)],
        ["invert", new Uniform(invert)],
        ["aspectRatio", new Uniform(new Vector2(1, 1))]
      ]),
    });
  }

  update(_renderer: THREE.WebGLRenderer, _inputBuffer: THREE.WebGLRenderTarget, deltaTime: number) {
    const targetFPS = this.uniforms.get("targetFPS")?.value || 0;

    if (targetFPS > 0) {
      const frameDuration = 1 / targetFPS;
      this._deltaAccumulator += deltaTime;
      if (this._deltaAccumulator >= frameDuration) {
        this._time += frameDuration;
        this._deltaAccumulator = this._deltaAccumulator % frameDuration;
      }
    } else {
      this._time += deltaTime;
    }

    const timeUniform = this.uniforms.get("time");
    if (timeUniform) timeUniform.value = this._time;
  }

  setCellSize(value: number) {
    const u = this.uniforms.get("cellSize");
    if (u) u.value = value;
  }

  setInvert(value: boolean) {
    const u = this.uniforms.get("invert");
    if (u) u.value = value;
  }

  setResolution(w: number, h: number) {
    const u = this.uniforms.get("resolution");
    if (u) u.value.set(w, h);
  }
}
