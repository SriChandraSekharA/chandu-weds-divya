## Three.js Curtain Open Intro

A full-screen 3D curtain overlay covers the invitation on load. After ~1s, the two velvet panels part outward (left & right), then the overlay fades and unmounts so the Hero is revealed.

### Dependencies
- Add `three@^0.160`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122`.
  (Versions pinned to React 18 compatibility per project constraints.)

### New file: `src/components/wedding/CurtainIntro.tsx`
- React Three Fiber `<Canvas>` fixed full-screen, `z-[100]`, `pointer-events-none` after open.
- Two `PlaneGeometry` panels (left & right), each with subtle vertical wave displacement to mimic fabric folds.
- Custom `ShaderMaterial` (or `MeshStandardMaterial` + procedural stripes) for maroon velvet:
  - Base color: maroon (`hsl(var(--maroon))` hex equivalent).
  - Vertical fold shading via sine-based darkening.
  - Gold trim strip along the inner edge of each panel (thin emissive gold band).
  - Soft directional + ambient light for velvet sheen.
- Animation (using `useFrame` + a progress ref, eased with `easeInOutCubic`):
  - `t = 0 → 1.0s`: idle (curtain closed, slight idle sway).
  - `t = 1.0s → 3.2s`: panels translate on X away from center (`-0` → `-1.2 * width`, and `+0` → `+1.2 * width`), with a tiny scale-x squash so folds compress as they pull.
  - `t = 3.2s → 3.8s`: whole canvas fades opacity 1 → 0.
  - `t > 3.8s`: component unmounts via `setMounted(false)`.
- Optional gold tassel/rope decorations rendered as two thin meshes hanging at top edge.
- Honors `prefers-reduced-motion`: skips wave/idle sway, shortens open to 0.6s.

### Integration: `src/pages/Index.tsx`
- Render `<CurtainIntro />` once, above all other content, inside `LanguageProvider`.
- It self-manages mount/unmount; no other components change.
- LanguageToggle / MusicToggle remain functional underneath because curtain layer is non-interactive after open and unmounts shortly after.

### Performance / safety
- Canvas uses `dpr={[1, 1.5]}`, `frameloop="always"` only while mounted; unmounts entirely after intro to free GPU.
- Lazy-load via `React.lazy` + `Suspense` (fallback: a plain maroon div) so three.js doesn't block first paint.
- Snap-scroll container is unaffected; curtain is a sibling overlay.

### Visual spec
- Color: maroon `#6B1A1A` base, deeper `#3E0D0D` in folds, gold trim `#D4AF37` (matches existing gold tokens).
- 8–10 vertical folds per panel via shader sine.
- Soft vignette at top edge for depth.

### Out of scope
- No audio trigger change (music still unlocks on first user interaction).
- No changes to existing sections, language, or layout.
