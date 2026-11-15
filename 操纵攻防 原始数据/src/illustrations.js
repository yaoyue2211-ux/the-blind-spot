// 页面插画用内嵌 SVG 绘制，离线可见，不依赖外部图片服务。
const art = {
  independence: `<path d="M62 206V88l119-65 125 65v118"/><path d="M120 206v-79l61-34 64 34v79"/><path d="M181 206v-46"/><path d="M345 206V76h185v130M377 76V47h121v29"/><path d="M344 132h186"/><circle cx="438" cy="112" r="12"/>`,
  authority: `<path d="M103 205h402M146 205V82h314v123M125 82h356L303 31z"/><path d="M181 107v69m58-69v69m59-69v69m59-69v69m59-69v69"/><circle cx="304" cy="58" r="11"/>`,
  risk: `<path d="m307 30 112 64v100l-112 53-112-53V94z"/><path d="m195 94 112 67 112-67m-112 67v86"/><path d="M490 71v96m0 31v5"/><path d="M90 179h58m-29-29v58"/>`,
  responsibility: `<path d="M107 203h426M176 202l19-90h78l18 90m80 0 19-90h78l18 90"/><path d="M178 112h96l-48-48zm173 0h96l-48-48z"/><path d="M274 148h78"/><circle cx="313" cy="148" r="20"/>`,
  sunk_cost: `<path d="M118 204h393M160 204v-32h92v32m0-32v-33h92v33m0-33v-34h92v34m0-34V91h46"/><path d="M190 89c36 10 45-25 81-10s42 6 75-12 52-2 85-28"/><circle cx="431" cy="39" r="8"/>`,
  exit: `<path d="M181 205V44h207v161M224 205V77h120v128"/><path d="M285 205V118h59m-59 0 46-35"/><path d="M388 205h142M420 205V96h110"/><path d="M447 152h63"/>`,
  correction: `<path d="M131 205V64h156v141m0 0V64h156v141"/><path d="m207 96 24 25-24 26 25 22-18 36m120-109-23 26 23 24-20 22 19 27"/><path d="M466 74h76m-38-38v76"/>`,
  evaluation: `<path d="M304 24v39m0-39-150 32m150-32 150 32"/><path d="M141 55h325l-79 119H222z"/><circle cx="304" cy="163" r="14"/><path d="M304 177v28m-24 0h48"/>`,
  scarcity: `<path d="M225 34h158m-158 171h158m-141-171c0 53 124 69 124 85s-124 32-124 86m107-171c0 53-124 69-124 85s124 32 124 86"/><path d="M266 89h76m-91 63h106"/><path d="M126 62h46m-23-23v46m324 86h54m-27-27v54"/>`
};

export function heroImage() {
  return `<figure class="scene-image hero-image" role="img" aria-label="暗色走廊中，一扇半开的门投下红色光线"><svg viewBox="0 0 640 240" aria-hidden="true"><defs><linearGradient id="heroGlow" x1="0" x2="1"><stop stop-color="#ed3e38" stop-opacity=".02"/><stop offset="1" stop-color="#ed3e38" stop-opacity=".8"/></linearGradient></defs><path class="scene-frame" d="M34 218V77l164-54 166 54v141M198 218V88l84-28 82 28v130M365 218V68h204v150M414 218V96h110v122"/><path class="scene-accent" d="M365 68h204l-45 150H365z" fill="url(#heroGlow)"/><path class="scene-line" d="M34 218h572M115 110h55m-28-27v55M448 149h44"/><circle class="scene-dot" cx="469" cy="131" r="8"/></svg><figcaption>一束光之外，还有未看见的部分。</figcaption></figure>`;
}

export function sceneImage(dimension, alt) {
  const drawing = art[dimension] || art.independence;
  return `<figure class="scene-image question-image" role="img" aria-label="情境插画：${escapeAttr(alt)}"><svg viewBox="0 0 640 240" aria-hidden="true"><defs><linearGradient id="sceneWash" x1="0" x2="1"><stop stop-color="#171619"/><stop offset="1" stop-color="#291416"/></linearGradient></defs><rect x="1" y="1" width="638" height="238" fill="url(#sceneWash)"/><path class="scene-grid" d="M0 60h640M0 120h640M0 180h640M80 0v240M160 0v240M240 0v240M320 0v240M400 0v240M480 0v240M560 0v240"/><g class="scene-drawing">${drawing}</g><path class="scene-line" d="M24 218h592"/><circle class="scene-dot" cx="596" cy="28" r="4"/></svg><figcaption>SCENE STUDY / ${String(dimension).replace('_',' ').toUpperCase()}</figcaption></figure>`;
}

function escapeAttr(text) {
  return String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
