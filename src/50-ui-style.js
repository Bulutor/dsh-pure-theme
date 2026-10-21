// ---------------------------------------------------------------------------
// Settings-page styling. Every colour, radius and font comes from the host
// theme tokens, so the page follows the active DSH theme instead of imposing
// its own look.
// ---------------------------------------------------------------------------

// DSH 0.2.x picks settings-nav glyphs from a hard-coded id table and falls back
// to a gear for section ids it does not know. The slot contract has no icon
// option yet, so the plugin marks its own row and paints a palette with a mask.
// The SVG is monochrome: the pseudo-element inherits `currentColor`.
const NAV_ATTR = 'data-dsh-pure-theme-nav';
const NAV_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-width="1.6" stroke-linejoin="round" d="M12 2.8C6.8 2.8 2.8 6.4 2.8 11c0 4.6 4 8.2 9.2 8.2 1.2 0 2.2-1 2.2-2.2 0-.6-.3-1.2-.7-1.6-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0 .4.4 1 .6 1.6.6h.9c2.2 0 3.8-1.7 3.8-3.8 0-4.5-4-8-9.2-8Z"/><circle cx="7.2" cy="11.2" r="1.4" fill="black"/><circle cx="9.8" cy="7.6" r="1.4" fill="black"/><circle cx="14.2" cy="7.6" r="1.4" fill="black"/><circle cx="16.8" cy="11.2" r="1.4" fill="black"/></svg>`;
const NAV_ICON_MASK = `url("data:image/svg+xml,${encodeURIComponent(NAV_ICON_SVG)}")`;

const UI_CSS = `
.mst-page{display:flex;flex-direction:column;gap:14px;padding:16px 0 8px}
.mst-badge{display:inline-flex;align-items:center;gap:4px;font-size:11px;line-height:16px;padding:2px 8px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border:.5px solid var(--dsw-alias-border-l2);white-space:nowrap;max-width:min(320px,48%);min-width:0;flex:0 1 auto}
.mst-badge-label{opacity:.62}
.mst-badge-value{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}
.mst-card{border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-layer-2));padding:14px 16px}
.mst-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}
.mst-card-title{font-size:13px;line-height:20px;font-weight:500;color:var(--dsw-alias-label-primary)}
.mst-card-desc{font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary);margin-top:2px}
.mst-body{display:flex;flex-direction:column;gap:10px}
.mst-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mst-field{display:flex;align-items:center;gap:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}
.mst-divider{height:.5px;background:var(--dsw-alias-border-l2);margin:2px 0}
.mst-btn{height:28px;padding:0 10px;font:inherit;font-size:12px;line-height:1;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.mst-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}
.mst-btn:disabled{opacity:.5;cursor:default}
.mst-btn-primary{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--dsw-alias-label-primary-foreground,#fff)}
.mst-btn-ghost{background:transparent;border-color:transparent;color:var(--dsw-alias-label-secondary);padding:0 6px}
.mst-btn-ghost:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
.mst-btn-danger{color:var(--dsw-alias-state-error-primary,#ef4444)}
.mst-input,.mst-select{height:28px;padding:0 8px;font:inherit;font-size:12px;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);box-sizing:border-box}
.mst-input::placeholder{color:var(--dsw-alias-label-tertiary)}
.mst-input:focus,.mst-select:focus{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
.mst-grow{flex:1;min-width:0}
.mst-dots{display:flex;gap:3px;flex:none}
.mst-dot{width:12px;height:12px;border-radius:3px;border:.5px solid rgba(127,127,127,.45);box-shadow:0 0 0 .5px rgba(0,0,0,.22);flex:none}
.mst-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 8px;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;text-align:left}
.mst-chip:hover{background:var(--dsw-alias-interactive-bg-hover)}
.mst-chip[aria-pressed=true]{border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent)}
.mst-chips{display:flex;flex-wrap:wrap;gap:6px}
.mst-hint{font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary)}
.mst-mono{font-family:var(--ds-font-family-code,monospace)}
.mst-empty{padding:10px 12px;border:.5px dashed var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary);text-align:center}
.mst-saved{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
.mst-saved-list{max-height:224px;overflow-y:auto;padding-right:2px}
.mst-saved[data-active=true]{border-color:var(--dsw-alias-brand-primary)}
.mst-saved-main{flex:1;min-width:0}
.mst-saved-name{font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mst-saved-meta{font-size:10px;line-height:15px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mst-saved-actions{display:flex;gap:2px;flex:none}
.mst-drop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:16px;border:1px dashed var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);cursor:pointer;text-align:center;color:var(--dsw-alias-label-secondary);transition:border-color .12s ease,background .12s ease}
.mst-drop:hover,.mst-drop[data-over=true]{border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 6%,transparent)}
.mst-drop-main{font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary)}
.mst-drop-sub{font-size:10px;line-height:15px;color:var(--dsw-alias-label-tertiary)}
.mst-draft{display:flex;flex-direction:column;gap:8px;padding:10px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-2)}
.mst-color-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.mst-color{display:flex;align-items:center;gap:8px;min-width:0;padding:7px 8px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
.mst-swatch{position:relative;width:32px;height:32px;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);box-shadow:inset 0 0 0 1px rgba(255,255,255,.04);flex:none;cursor:pointer;overflow:hidden}
.mst-swatch input{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;opacity:0;cursor:pointer}
.mst-swatch:focus-within{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.mst-color-copy{flex:1;min-width:0}
.mst-color-name{font-size:12px;line-height:17px;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mst-color-hint{font-size:10px;line-height:14px;color:var(--dsw-alias-label-secondary);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.mst-hex{width:74px;height:26px;padding:0 6px;font:inherit;font-size:11px;font-family:var(--ds-font-family-code,monospace);text-transform:uppercase;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-layer-2));color:var(--dsw-alias-label-primary);box-sizing:border-box;flex:none}
.mst-hex:focus{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
.mst-preview{display:flex;height:156px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l2);overflow:hidden;position:relative}
.mst-preview-side{width:31%;padding:10px;display:flex;flex-direction:column;gap:7px;box-sizing:border-box}
.mst-preview-brand{font-size:10px;line-height:14px;font-weight:600;letter-spacing:.04em}
.mst-preview-nav{height:9px;border-radius:3px;opacity:.9}
.mst-preview-main{flex:1;padding:12px;display:flex;flex-direction:column;gap:8px;box-sizing:border-box}
.mst-preview-line{height:5px;border-radius:3px;opacity:.85}
.mst-preview-line.short{width:46%}
.mst-preview-spacer{flex:1}
.mst-preview-card{padding:7px 8px;border:.5px solid;border-radius:6px;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:10px;line-height:14px}
.mst-preview-button{padding:2px 7px;border-radius:5px;font-size:9px;line-height:14px;white-space:nowrap}
.mst-preview-input{height:28px;padding:0 8px;border:.5px solid;border-radius:6px;display:flex;align-items:center;font-size:10px;line-height:28px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mst-preview-label{position:absolute;right:8px;top:8px;font-size:9px;line-height:14px;padding:1px 5px;border-radius:999px;background:rgba(0,0,0,.32);color:rgba(255,255,255,.72)}
.mst-status{font-size:11px;line-height:17px}
.mst-ok{color:var(--dsw-alias-state-success-primary,#22c55e)}
.mst-warn{color:var(--dsw-alias-state-warn-primary,#d97706)}
.mst-error{color:var(--dsw-alias-state-error-primary,#ef4444)}
.mst-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:2px 2px 0}
[${NAV_ATTR}]>svg{display:none}
[${NAV_ATTR}]::before{content:"";width:16px;height:16px;flex:none;background:currentColor;-webkit-mask:${NAV_ICON_MASK} center/16px 16px no-repeat;mask:${NAV_ICON_MASK} center/16px 16px no-repeat}
@media (max-width:720px){.mst-color-grid{grid-template-columns:1fr}.mst-preview{height:144px}}
`;
