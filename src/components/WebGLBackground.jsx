import { useEffect, useRef } from 'react'

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  
  // Pseudo-random noise
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  // 2D Noise based on Morgan McGuire @morgan3d
  float noise(in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractional Brownian Motion
  float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 5; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      // Interaction distance
      float dist = distance(st, u_mouse);
      float mouseEffect = smoothstep(0.4, 0.0, dist) * 1.5;

      vec2 q = vec2(0.);
      q.x = fbm( st + 0.00 * u_time);
      q.y = fbm( st + vec2(1.0));

      vec2 r = vec2(0.);
      r.x = fbm( st + 1.0 * q + vec2(1.7,9.2) + 0.15 * u_time );
      r.y = fbm( st + 1.0 * q + vec2(8.3,2.8) + 0.126 * u_time );

      float f = fbm(st + r + mouseEffect * 0.5);

      // Sunset Palette
      vec3 color1 = vec3(0.10, 0.04, 0.12); // Deep plum base (#1A0A1E)
      vec3 color2 = vec3(0.42, 0.25, 0.31); // Muted rose
      vec3 color3 = vec3(1.00, 0.42, 0.62); // Bright blush
      vec3 color4 = vec3(1.00, 0.55, 0.41); // Coral

      vec3 color = mix(color1, color2, clamp(f*2.0, 0.0, 1.0));
      color = mix(color, color3, clamp(length(q), 0.0, 1.0));
      color = mix(color, color4, clamp(length(r.x), 0.0, 1.0));

      // Vignette
      float vignette = length(st - vec2(0.5, 0.5));
      color *= smoothstep(1.5, 0.5, vignette);

      gl_FragColor = vec4(color * 0.8, 1.0);
  }
`

export default function WebGLBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    // Setup shaders
    const compileShader = (type, source) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, source)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s))
        gl.deleteShader(s)
        return null
      }
      return s
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Setup geometry (full screen quad)
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1,  1,
      -1,  1, 1, -1,  1,  1
    ]), gl.STATIC_DRAW)
    const posAttr = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posAttr)
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const resLoc   = gl.getUniformLocation(program, 'u_resolution')
    const timeLoc  = gl.getUniformLocation(program, 'u_time')
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse')

    // State
    let mouse = [0.5, 0.5] // mapped to GL coordinates (0 to aspect_ratio)

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resLoc, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouse[0] = e.clientX / window.innerHeight // Normalize to aspect ratio
      mouse[1] = 1.0 - (e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)

    // Render loop
    let rafId
    const startTime = performance.now()
    const render = (now) => {
      gl.uniform1f(timeLoc, (now - startTime) * 0.0005)
      gl.uniform2f(mouseLoc, mouse[0], mouse[1])
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafId = requestAnimationFrame(render)
    }
    render(startTime)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      gl.deleteProgram(program)
    }
  }, [])

  return <canvas ref={canvasRef} className="webgl-bg-canvas" aria-hidden="true" />
}
