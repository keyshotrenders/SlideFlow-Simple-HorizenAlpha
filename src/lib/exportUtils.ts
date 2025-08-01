/**
 * Browser-side placeholder export pipeline using ffmpeg.wasm design.
 * This function currently mocks frame generation so the UI flow works without native deps.
 * Replace internals with real ffmpeg.wasm usage during integration.
 */

export async function exportToMP4(
  images: File[],
  transitionMode: "random" | string,
  duration: number,
  useGPU: boolean = false,
  onProgress?: (p: number) => void
): Promise<Blob> {
  // Basic validation
  if (!images.length) {
    throw new Error("No images to export.");
  }

  // Simulate processing time proportional to image count and duration
  const totalSteps = Math.max(10, Math.min(200, Math.floor(images.length * Math.max(duration, 0.5) * 5)));
  for (let i = 0; i <= totalSteps; i++) {
    await sleep(20);
    onProgress?.(i / totalSteps);
  }

  // Produce a tiny valid MP4 stub so download works in tests until ffmpeg.wasm is integrated.
  // The following is a minimal ISO BMFF/MP4 file (ftyp + mdat placeholder).
  // Not a playable video, but sufficient as a placeholder artifact.
  const minimalMp4 = createMinimalMp4Stub();
  return new Blob([minimalMp4], { type: "video/mp4" });
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Returns a minimal MP4 byte array (not a real video). Replace with ffmpeg output later.
 */
function createMinimalMp4Stub(): Uint8Array {
  // ftyp box for isom
  const ftyp = new Uint8Array([
    0x00,0x00,0x00,0x18, // size 24
    0x66,0x74,0x79,0x70, // 'ftyp'
    0x69,0x73,0x6F,0x6D, // 'isom'
    0x00,0x00,0x02,0x00, // minor version
    0x69,0x73,0x6F,0x6D, // compatible brands
    0x69,0x73,0x6F,0x32,
  ]);

  // minimal mdat box with a few bytes
  const mdatPayload = new Uint8Array([0x00, 0x00, 0x00, 0x00]);
  const mdatSize = 8 + mdatPayload.length;
  const mdat = new Uint8Array(mdatSize);
  // size
  mdat[0] = (mdatSize >>> 24) & 0xff;
  mdat[1] = (mdatSize >>> 16) & 0xff;
  mdat[2] = (mdatSize >>> 8) & 0xff;
  mdat[3] = mdatSize & 0xff;
  // 'mdat'
  mdat[4] = 0x6D; mdat[5] = 0x64; mdat[6] = 0x61; mdat[7] = 0x74;
  // payload
  mdat.set(mdatPayload, 8);

  const out = new Uint8Array(ftyp.length + mdat.length);
  out.set(ftyp, 0);
  out.set(mdat, ftyp.length);
  return out;
}
