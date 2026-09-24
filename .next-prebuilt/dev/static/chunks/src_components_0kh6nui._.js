(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/CodeRain.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodeRain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function CodeRain() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeRain.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Set canvas dimensions
            const resizeCanvas = {
                "CodeRain.useEffect.resizeCanvas": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["CodeRain.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            const characters = "0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101".split("");
            const words = [
                "0x7F4A",
                "> sudo mount /identity",
                "ACCESS_GRANTED",
                "SYSTEM_ONLINE",
                "root@ryan:~$"
            ];
            const fontSize = 16;
            const columns = Math.floor(canvas.width / fontSize);
            const drops = [];
            // Initialize drops
            for(let x = 0; x < columns; x++){
                drops[x] = Math.random() * -100; // start at random positions above screen
            }
            const draw = {
                "CodeRain.useEffect.draw": ()=>{
                    // Create trailing effect by drawing semi-transparent background
                    // This fades the old characters
                    ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.font = `${fontSize}px monospace`;
                    for(let i = 0; i < drops.length; i++){
                        // Randomly decide whether to drop a single character or a full word
                        let text = characters[Math.floor(Math.random() * characters.length)];
                        let isWord = false;
                        if (Math.random() > 0.995) {
                            text = words[Math.floor(Math.random() * words.length)];
                            isWord = true;
                        }
                        // Set text style (brighter for the 'head' of the drop, overall opacity 15-20% max)
                        ctx.fillStyle = "rgba(0, 255, 65, 0.15)";
                        // Draw the text
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                        // Reset drop to top randomly when it goes off screen
                        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        // Move drop down
                        // Move faster if it's a word so it doesn't get cut off weirdly by the next frame, 
                        // but for classic matrix rain we just move down by 1.
                        drops[i]++;
                    }
                }
            }["CodeRain.useEffect.draw"];
            // Movement speed
            const interval = setInterval(draw, 50);
            return ({
                "CodeRain.useEffect": ()=>{
                    clearInterval(interval);
                    window.removeEventListener("resize", resizeCanvas);
                }
            })["CodeRain.useEffect"];
        }
    }["CodeRain.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "fixed inset-0 pointer-events-none z-0",
        style: {
            opacity: 0.8
        }
    }, void 0, false, {
        fileName: "[project]/src/components/CodeRain.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(CodeRain, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = CodeRain;
var _c;
__turbopack_context__.k.register(_c, "CodeRain");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
"use client";
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/Providers.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_0kh6nui._.js.map