(function(){try{var style=document.createElement('style');style.id='booking-widget-styles';style.innerText="@layer base{*{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){*{outline-color:color-mix(in oklab,var(--ring)50%,transparent)}}body{background-color:var(--background);color:var(--foreground)}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) h1{font-size:var(--text-2xl);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) h2{font-size:var(--text-xl);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) h3{font-size:var(--text-lg);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) h4{font-size:var(--text-base);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) p{font-size:var(--text-base);font-weight:var(--font-weight-normal);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) label,:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) button{font-size:var(--text-base);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) input{font-size:var(--text-base);font-weight:var(--font-weight-normal);line-height:1.5}}/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-pan-x:initial;--tw-pan-y:initial;--tw-pinch-zoom:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:\"\"}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace;--color-red-50:oklch(97.1% .013 17.38);--color-red-100:oklch(93.6% .032 17.717);--color-red-200:oklch(88.5% .062 18.334);--color-red-300:oklch(80.8% .114 19.571);--color-red-400:oklch(70.4% .191 22.216);--color-red-500:oklch(63.7% .237 25.331);--color-red-600:oklch(57.7% .245 27.325);--color-red-700:oklch(50.5% .213 27.518);--color-red-800:oklch(44.4% .177 26.899);--color-amber-50:oklch(98.7% .022 95.277);--color-amber-100:oklch(96.2% .059 95.617);--color-amber-200:oklch(92.4% .12 95.746);--color-amber-600:oklch(66.6% .179 58.318);--color-amber-700:oklch(55.5% .163 48.998);--color-amber-800:oklch(47.3% .137 46.201);--color-yellow-50:oklch(98.7% .026 102.212);--color-yellow-100:oklch(97.3% .071 103.193);--color-yellow-200:oklch(94.5% .129 101.54);--color-yellow-600:oklch(68.1% .162 75.834);--color-yellow-700:oklch(55.4% .135 66.442);--color-yellow-800:oklch(47.6% .114 61.907);--color-green-50:oklch(98.2% .018 155.826);--color-green-100:oklch(96.2% .044 156.743);--color-green-200:oklch(92.5% .084 155.995);--color-green-600:oklch(62.7% .194 149.214);--color-green-700:oklch(52.7% .154 150.069);--color-green-800:oklch(44.8% .119 151.328);--color-emerald-50:oklch(97.9% .021 166.113);--color-emerald-100:oklch(95% .052 163.051);--color-emerald-200:oklch(90.5% .093 164.15);--color-emerald-300:oklch(84.5% .143 164.978);--color-emerald-400:oklch(76.5% .177 163.223);--color-emerald-500:oklch(69.6% .17 162.48);--color-emerald-600:oklch(59.6% .145 163.225);--color-emerald-700:oklch(50.8% .118 165.612);--color-emerald-800:oklch(43.2% .095 166.913);--color-teal-600:oklch(60% .118 184.704);--color-blue-50:oklch(97% .014 254.604);--color-blue-100:oklch(93.2% .032 255.585);--color-blue-200:oklch(88.2% .059 254.128);--color-blue-500:oklch(62.3% .214 259.815);--color-blue-600:oklch(54.6% .245 262.881);--color-blue-700:oklch(48.8% .243 264.376);--color-blue-800:oklch(42.4% .199 265.638);--color-indigo-50:oklch(96.2% .018 272.314);--color-indigo-100:oklch(93% .034 272.788);--color-indigo-200:oklch(87% .065 274.039);--color-indigo-300:oklch(78.5% .115 274.713);--color-indigo-400:oklch(67.3% .182 276.935);--color-indigo-500:oklch(58.5% .233 277.117);--color-indigo-600:oklch(51.1% .262 276.966);--color-indigo-700:oklch(45.7% .24 277.023);--color-indigo-800:oklch(39.8% .195 277.366);--color-indigo-900:oklch(35.9% .144 278.697);--color-purple-50:oklch(97.7% .014 308.299);--color-purple-100:oklch(94.6% .033 307.174);--color-purple-600:oklch(55.8% .288 302.321);--color-purple-700:oklch(49.6% .265 301.924);--color-rose-300:oklch(81% .117 11.638);--color-rose-400:oklch(71.2% .194 13.428);--color-rose-500:oklch(64.5% .246 16.439);--color-rose-600:oklch(58.6% .253 17.585);--color-slate-50:oklch(98.4% .003 247.858);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-400:oklch(70.4% .04 256.788);--color-slate-500:oklch(55.4% .046 257.417);--color-slate-600:oklch(44.6% .043 257.281);--color-slate-700:oklch(37.2% .044 257.287);--color-slate-800:oklch(27.9% .041 260.031);--color-slate-900:oklch(20.8% .042 265.755);--color-gray-50:oklch(98.5% .002 247.839);--color-gray-100:oklch(96.7% .003 264.542);--color-gray-200:oklch(92.8% .006 264.531);--color-gray-300:oklch(87.2% .01 258.338);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-500:oklch(55.1% .027 264.364);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-gray-800:oklch(27.8% .033 256.848);--color-gray-900:oklch(21% .034 264.665);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-xs:20rem;--container-sm:24rem;--container-md:28rem;--container-lg:32rem;--container-2xl:42rem;--container-3xl:48rem;--container-4xl:56rem;--container-6xl:72rem;--container-7xl:80rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-base:1rem;--text-base--line-height: 1.5 ;--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75/1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2/1.5);--text-3xl:1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--tracking-tight:-.025em;--tracking-wide:.025em;--tracking-wider:.05em;--tracking-widest:.1em;--leading-tight:1.25;--leading-relaxed:1.625;--radius-xs:.125rem;--radius-2xl:1rem;--ease-in:cubic-bezier(.4,0,1,1);--ease-out:cubic-bezier(0,0,.2,1);--ease-in-out:cubic-bezier(.4,0,.2,1);--animate-spin:spin 1s linear infinite;--animate-ping:ping 1s cubic-bezier(0,0,.2,1)infinite;--animate-pulse:pulse 2s cubic-bezier(.4,0,.6,1)infinite;--animate-bounce:bounce 1s infinite;--blur-sm:8px;--blur-md:12px;--aspect-video:16/9;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-border:var(--border)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){*{outline-color:color-mix(in oklab,var(--ring)50%,transparent)}}body{background-color:var(--background);color:var(--foreground)}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) h1{font-size:var(--text-2xl);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) h2{font-size:var(--text-xl);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) h3{font-size:var(--text-lg);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) h4{font-size:var(--text-base);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) p{font-size:var(--text-base);font-weight:var(--font-weight-normal);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) label,:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) button{font-size:var(--text-base);font-weight:var(--font-weight-medium);line-height:1.5}:where(:not(:has([class*=\" text-\"]),:not(:has([class^=text-])))) input{font-size:var(--text-base);font-weight:var(--font-weight-normal);line-height:1.5}}@layer components;@layer utilities{.\\@container\\/card-header{container:card-header/inline-size}.pointer-events-none{pointer-events:none}.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.not-sr-only{clip-path:none;white-space:normal;width:auto;height:auto;margin:0;padding:0;position:static;overflow:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.-inset-1{inset:calc(var(--spacing)*-1)}.inset-0{inset:calc(var(--spacing)*0)}.inset-x-0{inset-inline:calc(var(--spacing)*0)}.inset-y-0{inset-block:calc(var(--spacing)*0)}.-top-12{top:calc(var(--spacing)*-12)}.top-0{top:calc(var(--spacing)*0)}.top-1{top:calc(var(--spacing)*1)}.top-1\\.5{top:calc(var(--spacing)*1.5)}.top-1\\/2{top:50%}.top-2{top:calc(var(--spacing)*2)}.top-3{top:calc(var(--spacing)*3)}.top-3\\.5{top:calc(var(--spacing)*3.5)}.top-4{top:calc(var(--spacing)*4)}.top-5{top:calc(var(--spacing)*5)}.top-\\[1px\\]{top:1px}.top-\\[50\\%\\]{top:50%}.top-\\[60\\%\\]{top:60%}.top-full{top:100%}.-right-12{right:calc(var(--spacing)*-12)}.right-0{right:calc(var(--spacing)*0)}.right-1{right:calc(var(--spacing)*1)}.right-2{right:calc(var(--spacing)*2)}.right-3{right:calc(var(--spacing)*3)}.right-3\\.5{right:calc(var(--spacing)*3.5)}.right-4{right:calc(var(--spacing)*4)}.-bottom-12{bottom:calc(var(--spacing)*-12)}.bottom-0{bottom:calc(var(--spacing)*0)}.bottom-full{bottom:100%}.-left-12{left:calc(var(--spacing)*-12)}.left-0{left:calc(var(--spacing)*0)}.left-1{left:calc(var(--spacing)*1)}.left-1\\/2{left:50%}.left-2{left:calc(var(--spacing)*2)}.left-3{left:calc(var(--spacing)*3)}.left-3\\.5{left:calc(var(--spacing)*3.5)}.left-\\[50\\%\\]{left:50%}.isolate{isolation:isolate}.isolation-auto{isolation:auto}.-z-10{z-index:-10}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.z-\\[1\\]{z-index:1}.col-span-1{grid-column:span 1/span 1}.col-span-2{grid-column:span 2/span 2}.col-start-2{grid-column-start:2}.row-span-2{grid-row:span 2/span 2}.row-start-1{grid-row-start:1}.container{width:100%}@media(min-width:40rem){.container{max-width:40rem}}@media(min-width:48rem){.container{max-width:48rem}}@media(min-width:64rem){.container{max-width:64rem}}@media(min-width:80rem){.container{max-width:80rem}}@media(min-width:96rem){.container{max-width:96rem}}.-mx-1{margin-inline:calc(var(--spacing)*-1)}.mx-1{margin-inline:calc(var(--spacing)*1)}.mx-2{margin-inline:calc(var(--spacing)*2)}.mx-3\\.5{margin-inline:calc(var(--spacing)*3.5)}.mx-auto{margin-inline:auto}.my-0\\.5{margin-block:calc(var(--spacing)*.5)}.my-1{margin-block:calc(var(--spacing)*1)}.-mt-4{margin-top:calc(var(--spacing)*-4)}.mt-0\\.5{margin-top:calc(var(--spacing)*.5)}.mt-1{margin-top:calc(var(--spacing)*1)}.mt-1\\.5{margin-top:calc(var(--spacing)*1.5)}.mt-2{margin-top:calc(var(--spacing)*2)}.mt-3{margin-top:calc(var(--spacing)*3)}.mt-4{margin-top:calc(var(--spacing)*4)}.mt-5{margin-top:calc(var(--spacing)*5)}.mt-6{margin-top:calc(var(--spacing)*6)}.mt-8{margin-top:calc(var(--spacing)*8)}.mt-10{margin-top:calc(var(--spacing)*10)}.mt-auto{margin-top:auto}.mr-2{margin-right:calc(var(--spacing)*2)}.mb-1{margin-bottom:calc(var(--spacing)*1)}.mb-1\\.5{margin-bottom:calc(var(--spacing)*1.5)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.mb-3{margin-bottom:calc(var(--spacing)*3)}.mb-4{margin-bottom:calc(var(--spacing)*4)}.mb-5{margin-bottom:calc(var(--spacing)*5)}.mb-6{margin-bottom:calc(var(--spacing)*6)}.mb-8{margin-bottom:calc(var(--spacing)*8)}.-ml-2{margin-left:calc(var(--spacing)*-2)}.-ml-4{margin-left:calc(var(--spacing)*-4)}.ml-1{margin-left:calc(var(--spacing)*1)}.ml-2{margin-left:calc(var(--spacing)*2)}.ml-3{margin-left:calc(var(--spacing)*3)}.ml-4{margin-left:calc(var(--spacing)*4)}.ml-auto{margin-left:auto}.line-clamp-1{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.block{display:block}.contents{display:contents}.flex{display:flex}.flow-root{display:flow-root}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.inline-grid{display:inline-grid}.inline-table{display:inline-table}.list-item{display:list-item}.table{display:table}.table-caption{display:table-caption}.table-cell{display:table-cell}.table-column{display:table-column}.table-column-group{display:table-column-group}.table-footer-group{display:table-footer-group}.table-header-group{display:table-header-group}.table-row{display:table-row}.table-row-group{display:table-row-group}.field-sizing-content{field-sizing:content}.aspect-square{aspect-ratio:1}.aspect-video{aspect-ratio:var(--aspect-video)}.size-2{width:calc(var(--spacing)*2);height:calc(var(--spacing)*2)}.size-2\\.5{width:calc(var(--spacing)*2.5);height:calc(var(--spacing)*2.5)}.size-3{width:calc(var(--spacing)*3);height:calc(var(--spacing)*3)}.size-3\\.5{width:calc(var(--spacing)*3.5);height:calc(var(--spacing)*3.5)}.size-4{width:calc(var(--spacing)*4);height:calc(var(--spacing)*4)}.size-7{width:calc(var(--spacing)*7);height:calc(var(--spacing)*7)}.size-8{width:calc(var(--spacing)*8);height:calc(var(--spacing)*8)}.size-9{width:calc(var(--spacing)*9);height:calc(var(--spacing)*9)}.size-10{width:calc(var(--spacing)*10);height:calc(var(--spacing)*10)}.size-full{width:100%;height:100%}.h-0\\.5{height:calc(var(--spacing)*.5)}.h-1\\.5{height:calc(var(--spacing)*1.5)}.h-2{height:calc(var(--spacing)*2)}.h-2\\.5{height:calc(var(--spacing)*2.5)}.h-3{height:calc(var(--spacing)*3)}.h-3\\.5{height:calc(var(--spacing)*3.5)}.h-4{height:calc(var(--spacing)*4)}.h-4\\.5{height:calc(var(--spacing)*4.5)}.h-5{height:calc(var(--spacing)*5)}.h-6{height:calc(var(--spacing)*6)}.h-6\\.5{height:calc(var(--spacing)*6.5)}.h-7{height:calc(var(--spacing)*7)}.h-8{height:calc(var(--spacing)*8)}.h-9{height:calc(var(--spacing)*9)}.h-10{height:calc(var(--spacing)*10)}.h-12{height:calc(var(--spacing)*12)}.h-14{height:calc(var(--spacing)*14)}.h-16{height:calc(var(--spacing)*16)}.h-20{height:calc(var(--spacing)*20)}.h-24{height:calc(var(--spacing)*24)}.h-32{height:calc(var(--spacing)*32)}.h-40{height:calc(var(--spacing)*40)}.h-\\[1\\.15rem\\]{height:1.15rem}.h-\\[300px\\]{height:300px}.h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.h-\\[var\\(--radix-navigation-menu-viewport-height\\)\\]{height:var(--radix-navigation-menu-viewport-height)}.h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.h-auto{height:auto}.h-full{height:100%}.h-px{height:1px}.h-screen{height:100vh}.h-svh{height:100svh}.max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.max-h-48{max-height:calc(var(--spacing)*48)}.max-h-56{max-height:calc(var(--spacing)*56)}.max-h-64{max-height:calc(var(--spacing)*64)}.max-h-72{max-height:calc(var(--spacing)*72)}.max-h-80{max-height:calc(var(--spacing)*80)}.max-h-96{max-height:calc(var(--spacing)*96)}.max-h-\\[60vh\\]{max-height:60vh}.max-h-\\[70vh\\]{max-height:70vh}.max-h-\\[90vh\\]{max-height:90vh}.max-h-\\[92vh\\]{max-height:92vh}.max-h-\\[300px\\]{max-height:300px}.max-h-\\[360px\\]{max-height:360px}.max-h-\\[380px\\]{max-height:380px}.max-h-\\[500px\\]{max-height:500px}.max-h-\\[600px\\]{max-height:600px}.min-h-0{min-height:calc(var(--spacing)*0)}.min-h-4{min-height:calc(var(--spacing)*4)}.min-h-16{min-height:calc(var(--spacing)*16)}.min-h-\\[44px\\]{min-height:44px}.min-h-\\[48px\\]{min-height:48px}.min-h-\\[70px\\]{min-height:70px}.min-h-\\[100px\\]{min-height:100px}.min-h-\\[140px\\]{min-height:140px}.min-h-\\[400px\\]{min-height:400px}.min-h-screen{min-height:100vh}.min-h-svh{min-height:100svh}.w-\\(--sidebar-width\\){width:var(--sidebar-width)}.w-0{width:calc(var(--spacing)*0)}.w-1{width:calc(var(--spacing)*1)}.w-2{width:calc(var(--spacing)*2)}.w-2\\.5{width:calc(var(--spacing)*2.5)}.w-3{width:calc(var(--spacing)*3)}.w-3\\.5{width:calc(var(--spacing)*3.5)}.w-3\\/4{width:75%}.w-4{width:calc(var(--spacing)*4)}.w-4\\.5{width:calc(var(--spacing)*4.5)}.w-5{width:calc(var(--spacing)*5)}.w-6{width:calc(var(--spacing)*6)}.w-8{width:calc(var(--spacing)*8)}.w-9{width:calc(var(--spacing)*9)}.w-10{width:calc(var(--spacing)*10)}.w-11{width:calc(var(--spacing)*11)}.w-12{width:calc(var(--spacing)*12)}.w-14{width:calc(var(--spacing)*14)}.w-16{width:calc(var(--spacing)*16)}.w-20{width:calc(var(--spacing)*20)}.w-24{width:calc(var(--spacing)*24)}.w-32{width:calc(var(--spacing)*32)}.w-40{width:calc(var(--spacing)*40)}.w-48{width:calc(var(--spacing)*48)}.w-64{width:calc(var(--spacing)*64)}.w-72{width:calc(var(--spacing)*72)}.w-80{width:calc(var(--spacing)*80)}.w-\\[100px\\]{width:100px}.w-\\[300px\\]{width:300px}.w-\\[400px\\]{width:400px}.w-auto{width:auto}.w-fit{width:fit-content}.w-full{width:100%}.w-max{width:max-content}.w-px{width:1px}.max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.max-w-2xl{max-width:var(--container-2xl)}.max-w-3xl{max-width:var(--container-3xl)}.max-w-4xl{max-width:var(--container-4xl)}.max-w-6xl{max-width:var(--container-6xl)}.max-w-7xl{max-width:var(--container-7xl)}.max-w-\\[80px\\]{max-width:80px}.max-w-\\[160px\\]{max-width:160px}.max-w-\\[200px\\]{max-width:200px}.max-w-\\[1600px\\]{max-width:1600px}.max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.max-w-lg{max-width:var(--container-lg)}.max-w-max{max-width:max-content}.max-w-md{max-width:var(--container-md)}.max-w-xs{max-width:var(--container-xs)}.min-w-0{min-width:calc(var(--spacing)*0)}.min-w-5{min-width:calc(var(--spacing)*5)}.min-w-8{min-width:calc(var(--spacing)*8)}.min-w-9{min-width:calc(var(--spacing)*9)}.min-w-10{min-width:calc(var(--spacing)*10)}.min-w-\\[8rem\\]{min-width:8rem}.min-w-\\[12rem\\]{min-width:12rem}.min-w-\\[20px\\]{min-width:20px}.min-w-\\[120px\\]{min-width:120px}.min-w-\\[140px\\]{min-width:140px}.min-w-\\[200px\\]{min-width:200px}.min-w-\\[220px\\]{min-width:220px}.min-w-\\[300px\\]{min-width:300px}.min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.min-w-max{min-width:max-content}.flex-1{flex:1}.flex-shrink-0{flex-shrink:0}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.grow-0{flex-grow:0}.basis-full{flex-basis:100%}.caption-bottom{caption-side:bottom}.border-collapse{border-collapse:collapse}.origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.origin-\\(--radix-hover-card-content-transform-origin\\){transform-origin:var(--radix-hover-card-content-transform-origin)}.origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.origin-top{transform-origin:top}.origin-top-right{transform-origin:100% 0}.-translate-x-1\\/2{--tw-translate-x: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-x-\\[-50\\%\\]{--tw-translate-x:-50%;translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x)var(--tw-translate-y)}.-translate-y-1{--tw-translate-y:calc(var(--spacing)*-1);translate:var(--tw-translate-x)var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-0\\.5{--tw-translate-y:calc(var(--spacing)*.5);translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-\\[-50\\%\\]{--tw-translate-y:-50%;translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y: calc(-50% - 2px) ;translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-none{translate:none}.scale-105{--tw-scale-x:105%;--tw-scale-y:105%;--tw-scale-z:105%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-110{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-3d{scale:var(--tw-scale-x)var(--tw-scale-y)var(--tw-scale-z)}.rotate-45{rotate:45deg}.rotate-90{rotate:90deg}.rotate-180{rotate:180deg}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.animate-bounce{animation:var(--animate-bounce)}.animate-ping{animation:var(--animate-ping)}.animate-pulse{animation:var(--animate-pulse)}.animate-spin{animation:var(--animate-spin)}.cursor-default{cursor:default}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.touch-pinch-zoom{--tw-pinch-zoom:pinch-zoom;touch-action:var(--tw-pan-x,)var(--tw-pan-y,)var(--tw-pinch-zoom,)}.touch-none{touch-action:none}.resize{resize:both}.resize-none{resize:none}.scroll-my-1{scroll-margin-block:calc(var(--spacing)*1)}.scroll-py-1{scroll-padding-block:calc(var(--spacing)*1)}.list-none{list-style-type:none}.appearance-none{appearance:none}.auto-rows-min{grid-auto-rows:min-content}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-7{grid-template-columns:repeat(7,minmax(0,1fr))}.grid-cols-\\[0_1fr\\]{grid-template-columns:0 1fr}.grid-rows-\\[auto_auto\\]{grid-template-rows:auto auto}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-row{flex-direction:row}.flex-wrap{flex-wrap:wrap}.items-baseline{align-items:baseline}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.items-stretch{align-items:stretch}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.justify-items-start{justify-items:start}.gap-0\\.5{gap:calc(var(--spacing)*.5)}.gap-1{gap:calc(var(--spacing)*1)}.gap-1\\.5{gap:calc(var(--spacing)*1.5)}.gap-2{gap:calc(var(--spacing)*2)}.gap-2\\.5{gap:calc(var(--spacing)*2.5)}.gap-3{gap:calc(var(--spacing)*3)}.gap-4{gap:calc(var(--spacing)*4)}.gap-5{gap:calc(var(--spacing)*5)}.gap-6{gap:calc(var(--spacing)*6)}.gap-8{gap:calc(var(--spacing)*8)}.gap-10{gap:calc(var(--spacing)*10)}:where(.space-y-0\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*.5)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*.5)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*1)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*1)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*1.5)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*1.5)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*2)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*2)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*3)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*3)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*4)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*4)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*5)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*5)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*6)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*6)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*8)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*8)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-10>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*10)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*10)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-reverse>:not(:last-child)){--tw-space-y-reverse:1}.gap-x-3{column-gap:calc(var(--spacing)*3)}.gap-x-6{column-gap:calc(var(--spacing)*6)}:where(.space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing)*1)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing)*1)*calc(1 - var(--tw-space-x-reverse)))}:where(.space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing)*2)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing)*2)*calc(1 - var(--tw-space-x-reverse)))}:where(.space-x-reverse>:not(:last-child)){--tw-space-x-reverse:1}.gap-y-0\\.5{row-gap:calc(var(--spacing)*.5)}.gap-y-1{row-gap:calc(var(--spacing)*1)}.gap-y-3{row-gap:calc(var(--spacing)*3)}:where(.divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px*var(--tw-divide-x-reverse));border-inline-end-width:calc(1px*calc(1 - var(--tw-divide-x-reverse)))}:where(.divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px*var(--tw-divide-y-reverse));border-bottom-width:calc(1px*calc(1 - var(--tw-divide-y-reverse)))}:where(.divide-y-reverse>:not(:last-child)){--tw-divide-y-reverse:1}:where(.divide-gray-100>:not(:last-child)){border-color:var(--color-gray-100)}:where(.divide-gray-200>:not(:last-child)){border-color:var(--color-gray-200)}.self-end{align-self:flex-end}.self-start{align-self:flex-start}.justify-self-end{justify-self:flex-end}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-x-hidden{overflow-x:hidden}.overflow-y-auto{overflow-y:auto}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-\\[2px\\]{border-radius:2px}.rounded-\\[4px\\]{border-radius:4px}.rounded-\\[inherit\\]{border-radius:inherit}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius)}.rounded-md{border-radius:calc(var(--radius) - 2px)}.rounded-none{border-radius:0}.rounded-sm{border-radius:calc(var(--radius) - 4px)}.rounded-xl{border-radius:calc(var(--radius) + 4px)}.rounded-xs{border-radius:var(--radius-xs)}.rounded-s{border-start-start-radius:.25rem;border-end-start-radius:.25rem}.rounded-ss{border-start-start-radius:.25rem}.rounded-e{border-start-end-radius:.25rem;border-end-end-radius:.25rem}.rounded-se{border-start-end-radius:.25rem}.rounded-ee{border-end-end-radius:.25rem}.rounded-es{border-end-start-radius:.25rem}.rounded-t{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.rounded-l{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-tl{border-top-left-radius:.25rem}.rounded-tl-sm{border-top-left-radius:calc(var(--radius) - 4px)}.rounded-r{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.rounded-tr{border-top-right-radius:.25rem}.rounded-b{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-br{border-bottom-right-radius:.25rem}.rounded-bl{border-bottom-left-radius:.25rem}.border{border-style:var(--tw-border-style);border-width:1px}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-4{border-style:var(--tw-border-style);border-width:4px}.border-\\[1\\.5px\\]{border-style:var(--tw-border-style);border-width:1.5px}.border-x{border-inline-style:var(--tw-border-style);border-inline-width:1px}.border-y{border-block-style:var(--tw-border-style);border-block-width:1px}.border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-t-2{border-top-style:var(--tw-border-style);border-top-width:2px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-b-2{border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-none{--tw-border-style:none;border-style:none}.border-\\(--color-border\\){border-color:var(--color-border)}.border-amber-100{border-color:var(--color-amber-100)}.border-amber-200{border-color:var(--color-amber-200)}.border-blue-200{border-color:var(--color-blue-200)}.border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/50{border-color:color-mix(in oklab,var(--border)50%,transparent)}}.border-emerald-100{border-color:var(--color-emerald-100)}.border-emerald-200{border-color:var(--color-emerald-200)}.border-emerald-600{border-color:var(--color-emerald-600)}.border-emerald-600\\/20{border-color:#00976733}@supports (color:color-mix(in lab,red,red)){.border-emerald-600\\/20{border-color:color-mix(in oklab,var(--color-emerald-600)20%,transparent)}}.border-gray-50{border-color:var(--color-gray-50)}.border-gray-100{border-color:var(--color-gray-100)}.border-gray-200{border-color:var(--color-gray-200)}.border-gray-300{border-color:var(--color-gray-300)}.border-gray-600{border-color:var(--color-gray-600)}.border-green-200{border-color:var(--color-green-200)}.border-green-600{border-color:var(--color-green-600)}.border-indigo-50{border-color:var(--color-indigo-50)}.border-indigo-100{border-color:var(--color-indigo-100)}.border-indigo-200{border-color:var(--color-indigo-200)}.border-indigo-200\\/50{border-color:#c7d2ff80}@supports (color:color-mix(in lab,red,red)){.border-indigo-200\\/50{border-color:color-mix(in oklab,var(--color-indigo-200)50%,transparent)}}.border-indigo-400{border-color:var(--color-indigo-400)}.border-indigo-500{border-color:var(--color-indigo-500)}.border-indigo-600{border-color:var(--color-indigo-600)}.border-indigo-600\\/20{border-color:#4f39f633}@supports (color:color-mix(in lab,red,red)){.border-indigo-600\\/20{border-color:color-mix(in oklab,var(--color-indigo-600)20%,transparent)}}.border-input{border-color:var(--input)}.border-primary{border-color:var(--primary)}.border-purple-50{border-color:var(--color-purple-50)}.border-purple-100{border-color:var(--color-purple-100)}.border-red-100{border-color:var(--color-red-100)}.border-red-200{border-color:var(--color-red-200)}.border-red-300{border-color:var(--color-red-300)}.border-red-400{border-color:var(--color-red-400)}.border-red-500{border-color:var(--color-red-500)}.border-rose-300{border-color:var(--color-rose-300)}.border-rose-500{border-color:var(--color-rose-500)}.border-sidebar-border{border-color:var(--sidebar-border)}.border-slate-100{border-color:var(--color-slate-100)}.border-slate-200{border-color:var(--color-slate-200)}.border-slate-300{border-color:var(--color-slate-300)}.border-transparent{border-color:#0000}.border-white{border-color:var(--color-white)}.border-white\\/30{border-color:#ffffff4d}@supports (color:color-mix(in lab,red,red)){.border-white\\/30{border-color:color-mix(in oklab,var(--color-white)30%,transparent)}}.border-yellow-200{border-color:var(--color-yellow-200)}.border-t-indigo-600{border-top-color:var(--color-indigo-600)}.border-t-transparent{border-top-color:#0000}.border-t-white{border-top-color:var(--color-white)}.border-l-transparent{border-left-color:#0000}.bg-\\(--color-bg\\){background-color:var(--color-bg)}.bg-accent{background-color:var(--accent)}.bg-amber-50{background-color:var(--color-amber-50)}.bg-amber-100{background-color:var(--color-amber-100)}.bg-amber-600{background-color:var(--color-amber-600)}.bg-background{background-color:var(--background)}.bg-black{background-color:var(--color-black)}.bg-black\\/40{background-color:#0006}@supports (color:color-mix(in lab,red,red)){.bg-black\\/40{background-color:color-mix(in oklab,var(--color-black)40%,transparent)}}.bg-black\\/50{background-color:#00000080}@supports (color:color-mix(in lab,red,red)){.bg-black\\/50{background-color:color-mix(in oklab,var(--color-black)50%,transparent)}}.bg-black\\/60{background-color:#0009}@supports (color:color-mix(in lab,red,red)){.bg-black\\/60{background-color:color-mix(in oklab,var(--color-black)60%,transparent)}}.bg-blue-50{background-color:var(--color-blue-50)}.bg-blue-50\\/30{background-color:#eff6ff4d}@supports (color:color-mix(in lab,red,red)){.bg-blue-50\\/30{background-color:color-mix(in oklab,var(--color-blue-50)30%,transparent)}}.bg-blue-50\\/50{background-color:#eff6ff80}@supports (color:color-mix(in lab,red,red)){.bg-blue-50\\/50{background-color:color-mix(in oklab,var(--color-blue-50)50%,transparent)}}.bg-blue-100{background-color:var(--color-blue-100)}.bg-blue-100\\/80{background-color:#dbeafecc}@supports (color:color-mix(in lab,red,red)){.bg-blue-100\\/80{background-color:color-mix(in oklab,var(--color-blue-100)80%,transparent)}}.bg-blue-600{background-color:var(--color-blue-600)}.bg-border{background-color:var(--border)}.bg-card{background-color:var(--card)}.bg-destructive{background-color:var(--destructive)}.bg-emerald-50{background-color:var(--color-emerald-50)}.bg-emerald-100{background-color:var(--color-emerald-100)}.bg-emerald-400{background-color:var(--color-emerald-400)}.bg-emerald-600{background-color:var(--color-emerald-600)}.bg-foreground{background-color:var(--foreground)}.bg-gray-50{background-color:var(--color-gray-50)}.bg-gray-50\\/30{background-color:#f9fafb4d}@supports (color:color-mix(in lab,red,red)){.bg-gray-50\\/30{background-color:color-mix(in oklab,var(--color-gray-50)30%,transparent)}}.bg-gray-50\\/50{background-color:#f9fafb80}@supports (color:color-mix(in lab,red,red)){.bg-gray-50\\/50{background-color:color-mix(in oklab,var(--color-gray-50)50%,transparent)}}.bg-gray-100{background-color:var(--color-gray-100)}.bg-gray-100\\/50{background-color:#f3f4f680}@supports (color:color-mix(in lab,red,red)){.bg-gray-100\\/50{background-color:color-mix(in oklab,var(--color-gray-100)50%,transparent)}}.bg-gray-200{background-color:var(--color-gray-200)}.bg-gray-300{background-color:var(--color-gray-300)}.bg-gray-400{background-color:var(--color-gray-400)}.bg-gray-600{background-color:var(--color-gray-600)}.bg-gray-900{background-color:var(--color-gray-900)}.bg-green-50{background-color:var(--color-green-50)}.bg-green-50\\/30{background-color:#f0fdf44d}@supports (color:color-mix(in lab,red,red)){.bg-green-50\\/30{background-color:color-mix(in oklab,var(--color-green-50)30%,transparent)}}.bg-green-100{background-color:var(--color-green-100)}.bg-green-600{background-color:var(--color-green-600)}.bg-indigo-50{background-color:var(--color-indigo-50)}.bg-indigo-50\\/20{background-color:#eef2ff33}@supports (color:color-mix(in lab,red,red)){.bg-indigo-50\\/20{background-color:color-mix(in oklab,var(--color-indigo-50)20%,transparent)}}.bg-indigo-50\\/30{background-color:#eef2ff4d}@supports (color:color-mix(in lab,red,red)){.bg-indigo-50\\/30{background-color:color-mix(in oklab,var(--color-indigo-50)30%,transparent)}}.bg-indigo-50\\/50{background-color:#eef2ff80}@supports (color:color-mix(in lab,red,red)){.bg-indigo-50\\/50{background-color:color-mix(in oklab,var(--color-indigo-50)50%,transparent)}}.bg-indigo-100{background-color:var(--color-indigo-100)}.bg-indigo-600{background-color:var(--color-indigo-600)}.bg-input-background{background-color:var(--input-background)}.bg-muted,.bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/50{background-color:color-mix(in oklab,var(--muted)50%,transparent)}}.bg-popover{background-color:var(--popover)}.bg-primary,.bg-primary\\/20{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.bg-primary\\/20{background-color:color-mix(in oklab,var(--primary)20%,transparent)}}.bg-purple-50{background-color:var(--color-purple-50)}.bg-purple-50\\/30{background-color:#faf5ff4d}@supports (color:color-mix(in lab,red,red)){.bg-purple-50\\/30{background-color:color-mix(in oklab,var(--color-purple-50)30%,transparent)}}.bg-purple-100{background-color:var(--color-purple-100)}.bg-red-50{background-color:var(--color-red-50)}.bg-red-50\\/30{background-color:#fef2f24d}@supports (color:color-mix(in lab,red,red)){.bg-red-50\\/30{background-color:color-mix(in oklab,var(--color-red-50)30%,transparent)}}.bg-red-50\\/50{background-color:#fef2f280}@supports (color:color-mix(in lab,red,red)){.bg-red-50\\/50{background-color:color-mix(in oklab,var(--color-red-50)50%,transparent)}}.bg-red-100{background-color:var(--color-red-100)}.bg-red-500{background-color:var(--color-red-500)}.bg-red-600{background-color:var(--color-red-600)}.bg-secondary{background-color:var(--secondary)}.bg-sidebar{background-color:var(--sidebar)}.bg-sidebar-border{background-color:var(--sidebar-border)}.bg-slate-50{background-color:var(--color-slate-50)}.bg-slate-100{background-color:var(--color-slate-100)}.bg-slate-200{background-color:var(--color-slate-200)}.bg-slate-300{background-color:var(--color-slate-300)}.bg-slate-900\\/60{background-color:#0f172b99}@supports (color:color-mix(in lab,red,red)){.bg-slate-900\\/60{background-color:color-mix(in oklab,var(--color-slate-900)60%,transparent)}}.bg-transparent{background-color:#0000}.bg-white{background-color:var(--color-white)}.bg-white\\/20{background-color:#fff3}@supports (color:color-mix(in lab,red,red)){.bg-white\\/20{background-color:color-mix(in oklab,var(--color-white)20%,transparent)}}.bg-yellow-50{background-color:var(--color-yellow-50)}.bg-yellow-100{background-color:var(--color-yellow-100)}.bg-gradient-to-br{--tw-gradient-position:to bottom right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.bg-gradient-to-r{--tw-gradient-position:to right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.from-blue-50{--tw-gradient-from:var(--color-blue-50);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-blue-500{--tw-gradient-from:var(--color-blue-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-emerald-100{--tw-gradient-from:var(--color-emerald-100);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-emerald-500{--tw-gradient-from:var(--color-emerald-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-indigo-50{--tw-gradient-from:var(--color-indigo-50);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-indigo-400{--tw-gradient-from:var(--color-indigo-400);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-indigo-500{--tw-gradient-from:var(--color-indigo-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-indigo-600{--tw-gradient-from:var(--color-indigo-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-slate-50{--tw-gradient-from:var(--color-slate-50);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.via-white{--tw-gradient-via:var(--color-white);--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-via)var(--tw-gradient-via-position),var(--tw-gradient-to)var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.to-blue-600{--tw-gradient-to:var(--color-blue-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-emerald-200{--tw-gradient-to:var(--color-emerald-200);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-emerald-600{--tw-gradient-to:var(--color-emerald-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-indigo-50{--tw-gradient-to:var(--color-indigo-50);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-indigo-100{--tw-gradient-to:var(--color-indigo-100);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-indigo-500{--tw-gradient-to:var(--color-indigo-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-indigo-600{--tw-gradient-to:var(--color-indigo-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-indigo-700{--tw-gradient-to:var(--color-indigo-700);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-purple-100{--tw-gradient-to:var(--color-purple-100);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-purple-600{--tw-gradient-to:var(--color-purple-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-teal-600{--tw-gradient-to:var(--color-teal-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.bg-repeat{background-repeat:repeat}.mask-no-clip{-webkit-mask-clip:no-clip;mask-clip:no-clip}.mask-repeat{-webkit-mask-repeat:repeat;mask-repeat:repeat}.fill-current{fill:currentColor}.fill-primary{fill:var(--primary)}.stroke-\\[2\\.5\\]{stroke-width:2.5px}.stroke-\\[3\\],.stroke-\\[3px\\]{stroke-width:3px}.object-contain{object-fit:contain}.object-cover{object-fit:cover}.p-0{padding:calc(var(--spacing)*0)}.p-1{padding:calc(var(--spacing)*1)}.p-1\\.5{padding:calc(var(--spacing)*1.5)}.p-2{padding:calc(var(--spacing)*2)}.p-2\\.5{padding:calc(var(--spacing)*2.5)}.p-3{padding:calc(var(--spacing)*3)}.p-4{padding:calc(var(--spacing)*4)}.p-5{padding:calc(var(--spacing)*5)}.p-6{padding:calc(var(--spacing)*6)}.p-8{padding:calc(var(--spacing)*8)}.p-10{padding:calc(var(--spacing)*10)}.p-12{padding:calc(var(--spacing)*12)}.p-\\[3px\\]{padding:3px}.p-px{padding:1px}.px-1{padding-inline:calc(var(--spacing)*1)}.px-1\\.5{padding-inline:calc(var(--spacing)*1.5)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-2\\.5{padding-inline:calc(var(--spacing)*2.5)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-3\\.5{padding-inline:calc(var(--spacing)*3.5)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-5{padding-inline:calc(var(--spacing)*5)}.px-6{padding-inline:calc(var(--spacing)*6)}.px-8{padding-inline:calc(var(--spacing)*8)}.px-10{padding-inline:calc(var(--spacing)*10)}.py-0\\.5{padding-block:calc(var(--spacing)*.5)}.py-1{padding-block:calc(var(--spacing)*1)}.py-1\\.5{padding-block:calc(var(--spacing)*1.5)}.py-2{padding-block:calc(var(--spacing)*2)}.py-2\\.5{padding-block:calc(var(--spacing)*2.5)}.py-3{padding-block:calc(var(--spacing)*3)}.py-3\\.5{padding-block:calc(var(--spacing)*3.5)}.py-4{padding-block:calc(var(--spacing)*4)}.py-5{padding-block:calc(var(--spacing)*5)}.py-6{padding-block:calc(var(--spacing)*6)}.py-8{padding-block:calc(var(--spacing)*8)}.py-12{padding-block:calc(var(--spacing)*12)}.py-20{padding-block:calc(var(--spacing)*20)}.pt-0{padding-top:calc(var(--spacing)*0)}.pt-1{padding-top:calc(var(--spacing)*1)}.pt-2{padding-top:calc(var(--spacing)*2)}.pt-3{padding-top:calc(var(--spacing)*3)}.pt-4{padding-top:calc(var(--spacing)*4)}.pt-6{padding-top:calc(var(--spacing)*6)}.pt-8{padding-top:calc(var(--spacing)*8)}.pr-2{padding-right:calc(var(--spacing)*2)}.pr-2\\.5{padding-right:calc(var(--spacing)*2.5)}.pr-4{padding-right:calc(var(--spacing)*4)}.pr-8{padding-right:calc(var(--spacing)*8)}.pr-10{padding-right:calc(var(--spacing)*10)}.pr-11{padding-right:calc(var(--spacing)*11)}.pr-16{padding-right:calc(var(--spacing)*16)}.pb-2{padding-bottom:calc(var(--spacing)*2)}.pb-3{padding-bottom:calc(var(--spacing)*3)}.pb-4{padding-bottom:calc(var(--spacing)*4)}.pb-6{padding-bottom:calc(var(--spacing)*6)}.pb-10{padding-bottom:calc(var(--spacing)*10)}.pl-2{padding-left:calc(var(--spacing)*2)}.pl-3{padding-left:calc(var(--spacing)*3)}.pl-4{padding-left:calc(var(--spacing)*4)}.pl-8{padding-left:calc(var(--spacing)*8)}.pl-10{padding-left:calc(var(--spacing)*10)}.pl-11{padding-left:calc(var(--spacing)*11)}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.align-middle{vertical-align:middle}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[0\\.8rem\\]{font-size:.8rem}.text-\\[9px\\]{font-size:9px}.text-\\[10px\\]{font-size:10px}.leading-none{--tw-leading:1;line-height:1}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.tracking-wider{--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.tracking-widest{--tw-tracking:var(--tracking-widest);letter-spacing:var(--tracking-widest)}.text-balance{text-wrap:balance}.text-wrap{text-wrap:wrap}.break-words{overflow-wrap:break-word}.text-clip{text-overflow:clip}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.text-accent-foreground{color:var(--accent-foreground)}.text-amber-600{color:var(--color-amber-600)}.text-amber-700{color:var(--color-amber-700)}.text-amber-800{color:var(--color-amber-800)}.text-blue-600{color:var(--color-blue-600)}.text-blue-700{color:var(--color-blue-700)}.text-blue-800{color:var(--color-blue-800)}.text-card-foreground{color:var(--card-foreground)}.text-current{color:currentColor}.text-destructive{color:var(--destructive)}.text-emerald-50{color:var(--color-emerald-50)}.text-emerald-500{color:var(--color-emerald-500)}.text-emerald-600{color:var(--color-emerald-600)}.text-emerald-700{color:var(--color-emerald-700)}.text-emerald-800{color:var(--color-emerald-800)}.text-foreground{color:var(--foreground)}.text-gray-300{color:var(--color-gray-300)}.text-gray-400{color:var(--color-gray-400)}.text-gray-500{color:var(--color-gray-500)}.text-gray-600{color:var(--color-gray-600)}.text-gray-700{color:var(--color-gray-700)}.text-gray-800{color:var(--color-gray-800)}.text-gray-900{color:var(--color-gray-900)}.text-green-600{color:var(--color-green-600)}.text-green-700{color:var(--color-green-700)}.text-green-800{color:var(--color-green-800)}.text-indigo-100{color:var(--color-indigo-100)}.text-indigo-200{color:var(--color-indigo-200)}.text-indigo-500{color:var(--color-indigo-500)}.text-indigo-600{color:var(--color-indigo-600)}.text-indigo-600\\/70{color:#4f39f6b3}@supports (color:color-mix(in lab,red,red)){.text-indigo-600\\/70{color:color-mix(in oklab,var(--color-indigo-600)70%,transparent)}}.text-indigo-700{color:var(--color-indigo-700)}.text-indigo-900{color:var(--color-indigo-900)}.text-indigo-900\\/70{color:#312c85b3}@supports (color:color-mix(in lab,red,red)){.text-indigo-900\\/70{color:color-mix(in oklab,var(--color-indigo-900)70%,transparent)}}.text-muted-foreground{color:var(--muted-foreground)}.text-popover-foreground{color:var(--popover-foreground)}.text-primary{color:var(--primary)}.text-primary-foreground{color:var(--primary-foreground)}.text-purple-600{color:var(--color-purple-600)}.text-purple-600\\/70{color:#9810fab3}@supports (color:color-mix(in lab,red,red)){.text-purple-600\\/70{color:color-mix(in oklab,var(--color-purple-600)70%,transparent)}}.text-purple-700{color:var(--color-purple-700)}.text-red-500{color:var(--color-red-500)}.text-red-600{color:var(--color-red-600)}.text-red-700{color:var(--color-red-700)}.text-red-800{color:var(--color-red-800)}.text-rose-600{color:var(--color-rose-600)}.text-secondary-foreground{color:var(--secondary-foreground)}.text-sidebar-foreground,.text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab,red,red)){.text-sidebar-foreground\\/70{color:color-mix(in oklab,var(--sidebar-foreground)70%,transparent)}}.text-slate-400{color:var(--color-slate-400)}.text-slate-500{color:var(--color-slate-500)}.text-slate-600{color:var(--color-slate-600)}.text-slate-700{color:var(--color-slate-700)}.text-slate-800{color:var(--color-slate-800)}.text-slate-900{color:var(--color-slate-900)}.text-white{color:var(--color-white)}.text-white\\/90{color:#ffffffe6}@supports (color:color-mix(in lab,red,red)){.text-white\\/90{color:color-mix(in oklab,var(--color-white)90%,transparent)}}.text-yellow-600{color:var(--color-yellow-600)}.text-yellow-700{color:var(--color-yellow-700)}.text-yellow-800{color:var(--color-yellow-800)}.capitalize{text-transform:capitalize}.lowercase{text-transform:lowercase}.normal-case{text-transform:none}.uppercase{text-transform:uppercase}.italic{font-style:italic}.not-italic{font-style:normal}.diagonal-fractions{--tw-numeric-fraction:diagonal-fractions;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.lining-nums{--tw-numeric-figure:lining-nums;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.oldstyle-nums{--tw-numeric-figure:oldstyle-nums;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.ordinal{--tw-ordinal:ordinal;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.proportional-nums{--tw-numeric-spacing:proportional-nums;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.slashed-zero{--tw-slashed-zero:slashed-zero;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.stacked-fractions{--tw-numeric-fraction:stacked-fractions;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.normal-nums{font-variant-numeric:normal}.line-through{text-decoration-line:line-through}.no-underline{text-decoration-line:none}.overline{text-decoration-line:overline}.underline{text-decoration-line:underline}.decoration-dotted{text-decoration-style:dotted}.underline-offset-4{text-underline-offset:4px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.subpixel-antialiased{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}.opacity-0{opacity:0}.opacity-20{opacity:.2}.opacity-25{opacity:.25}.opacity-40{opacity:.4}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-70{opacity:.7}.opacity-75{opacity:.75}.opacity-80{opacity:.8}.opacity-100{opacity:1}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,hsl(var(--sidebar-border)));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-inner{--tw-shadow:inset 0 2px 4px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-0{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(0px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-1{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-4{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(4px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.inset-ring{--tw-inset-ring-shadow:inset 0 0 0 1px var(--tw-inset-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-emerald-200{--tw-shadow-color:oklch(90.5% .093 164.15)}@supports (color:color-mix(in lab,red,red)){.shadow-emerald-200{--tw-shadow-color:color-mix(in oklab,var(--color-emerald-200)var(--tw-shadow-alpha),transparent)}}.shadow-indigo-100{--tw-shadow-color:oklch(93% .034 272.788)}@supports (color:color-mix(in lab,red,red)){.shadow-indigo-100{--tw-shadow-color:color-mix(in oklab,var(--color-indigo-100)var(--tw-shadow-alpha),transparent)}}.shadow-indigo-200{--tw-shadow-color:oklch(87% .065 274.039)}@supports (color:color-mix(in lab,red,red)){.shadow-indigo-200{--tw-shadow-color:color-mix(in oklab,var(--color-indigo-200)var(--tw-shadow-alpha),transparent)}}.ring-gray-100{--tw-ring-color:var(--color-gray-100)}.ring-indigo-200{--tw-ring-color:var(--color-indigo-200)}.ring-indigo-500\\/10{--tw-ring-color:#625fff1a}@supports (color:color-mix(in lab,red,red)){.ring-indigo-500\\/10{--tw-ring-color:color-mix(in oklab,var(--color-indigo-500)10%,transparent)}}.ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){.ring-ring\\/50{--tw-ring-color:color-mix(in oklab,var(--ring)50%,transparent)}}.ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.ring-offset-background{--tw-ring-offset-color:var(--background)}.outline-hidden{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.outline-hidden{outline-offset:2px;outline:2px solid #0000}}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.drop-shadow{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#0000001a))drop-shadow(0 1px 1px var(--tw-drop-shadow-color,#0000000f));--tw-drop-shadow:drop-shadow(0 1px 2px #0000001a)drop-shadow(0 1px 1px #0000000f);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.grayscale{--tw-grayscale:grayscale(100%);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.sepia{--tw-sepia:sepia(100%);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.filter\\!{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)!important}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-grayscale{--tw-backdrop-grayscale:grayscale(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-invert{--tw-backdrop-invert:invert(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-sepia{--tw-backdrop-sepia:sepia(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition\\!{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events!important;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function))!important;transition-duration:var(--tw-duration,var(--default-transition-duration))!important}.transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-shadow{transition-property:box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-none{transition-property:none}.duration-75{--tw-duration:75ms;transition-duration:75ms}.duration-150{--tw-duration:.15s;transition-duration:.15s}.duration-200{--tw-duration:.2s;transition-duration:.2s}.duration-300{--tw-duration:.3s;transition-duration:.3s}.duration-500{--tw-duration:.5s;transition-duration:.5s}.duration-1000{--tw-duration:1s;transition-duration:1s}.ease-in{--tw-ease:var(--ease-in);transition-timing-function:var(--ease-in)}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-linear{--tw-ease:linear;transition-timing-function:linear}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.select-all{-webkit-user-select:all;user-select:all}.select-none{-webkit-user-select:none;user-select:none}:where(.divide-x-reverse>:not(:last-child)){--tw-divide-x-reverse:1}.ring-inset{--tw-ring-inset:inset}.group-focus-within\\:text-indigo-600:is(:where(.group):focus-within *){color:var(--color-indigo-600)}.group-focus-within\\/menu-item\\:opacity-100:is(:where(.group\\/menu-item):focus-within *){opacity:1}@media(hover:hover){.group-hover\\:scale-110:is(:where(.group):hover *){--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.group-hover\\:text-indigo-600:is(:where(.group):hover *){color:var(--color-indigo-600)}.group-hover\\:opacity-100:is(:where(.group):hover *){opacity:1}.group-hover\\/item\\:text-indigo-200:is(:where(.group\\/item):hover *){color:var(--color-indigo-200)}.group-hover\\/list\\:bg-white:is(:where(.group\\/list):hover *){background-color:var(--color-white)}.group-hover\\/list\\:text-slate-500:is(:where(.group\\/list):hover *){color:var(--color-slate-500)}.group-hover\\/list\\:text-slate-700:is(:where(.group\\/list):hover *){color:var(--color-slate-700)}.group-hover\\/menu-item\\:opacity-100:is(:where(.group\\/menu-item):hover *){opacity:1}.group-hover\\/meta\\:bg-indigo-50:is(:where(.group\\/meta):hover *){background-color:var(--color-indigo-50)}}.group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pr-8:is(:where(.group\\/menu-item):has([data-sidebar=menu-action]) *){padding-right:calc(var(--spacing)*8)}.group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.group)[data-collapsible=icon] *){margin-top:calc(var(--spacing)*-8)}.group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.group)[data-collapsible=icon] *){display:none}.group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.group)[data-collapsible=icon] *){width:calc(var(--spacing)*8)!important;height:calc(var(--spacing)*8)!important}.group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(var(--spacing)*4)))}.group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(var(--spacing)*4)) + 2px)}.group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.group)[data-collapsible=icon] *){overflow:hidden}.group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.group)[data-collapsible=icon] *){padding:calc(var(--spacing)*0)!important}.group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.group)[data-collapsible=icon] *){padding:calc(var(--spacing)*2)!important}.group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.group)[data-collapsible=icon] *){opacity:0}.group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width)*-1)}.group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width)*-1)}.group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.group)[data-collapsible=offcanvas] *){width:calc(var(--spacing)*0)}.group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.group)[data-disabled=true] *){pointer-events:none}.group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.group)[data-disabled=true] *){opacity:.5}.group-data-\\[side\\=left\\]\\:-right-4:is(:where(.group)[data-side=left] *){right:calc(var(--spacing)*-4)}.group-data-\\[side\\=left\\]\\:border-r:is(:where(.group)[data-side=left] *){border-right-style:var(--tw-border-style);border-right-width:1px}.group-data-\\[side\\=right\\]\\:left-0:is(:where(.group)[data-side=right] *){left:calc(var(--spacing)*0)}.group-data-\\[side\\=right\\]\\:rotate-180:is(:where(.group)[data-side=right] *){rotate:180deg}.group-data-\\[side\\=right\\]\\:border-l:is(:where(.group)[data-side=right] *){border-left-style:var(--tw-border-style);border-left-width:1px}.group-data-\\[state\\=open\\]\\:rotate-180:is(:where(.group)[data-state=open] *){rotate:180deg}.group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.group)[data-variant=floating] *){border-radius:var(--radius)}.group-data-\\[variant\\=floating\\]\\:border:is(:where(.group)[data-variant=floating] *){border-style:var(--tw-border-style);border-width:1px}.group-data-\\[variant\\=floating\\]\\:border-sidebar-border:is(:where(.group)[data-variant=floating] *){border-color:var(--sidebar-border)}.group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:top-full:is(:where(.group\\/navigation-menu)[data-viewport=false] *){top:100%}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:mt-1\\.5:is(:where(.group\\/navigation-menu)[data-viewport=false] *){margin-top:calc(var(--spacing)*1.5)}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:overflow-hidden:is(:where(.group\\/navigation-menu)[data-viewport=false] *){overflow:hidden}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:rounded-md:is(:where(.group\\/navigation-menu)[data-viewport=false] *){border-radius:calc(var(--radius) - 2px)}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:border:is(:where(.group\\/navigation-menu)[data-viewport=false] *){border-style:var(--tw-border-style);border-width:1px}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:bg-popover:is(:where(.group\\/navigation-menu)[data-viewport=false] *){background-color:var(--popover)}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:text-popover-foreground:is(:where(.group\\/navigation-menu)[data-viewport=false] *){color:var(--popover-foreground)}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:shadow:is(:where(.group\\/navigation-menu)[data-viewport=false] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:duration-200:is(:where(.group\\/navigation-menu)[data-viewport=false] *){--tw-duration:.2s;transition-duration:.2s}.peer-checked\\:bg-green-600:is(:where(.peer):checked~*){background-color:var(--color-green-600)}.peer-checked\\:bg-indigo-600:is(:where(.peer):checked~*){background-color:var(--color-indigo-600)}.peer-checked\\:bg-purple-600:is(:where(.peer):checked~*){background-color:var(--color-purple-600)}@media(hover:hover){.peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}}.peer-focus\\:ring-4:is(:where(.peer):focus~*){--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(4px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.peer-focus\\:ring-indigo-300:is(:where(.peer):focus~*){--tw-ring-color:var(--color-indigo-300)}.peer-focus\\:outline-none:is(:where(.peer):focus~*){--tw-outline-style:none;outline-style:none}.peer-disabled\\:cursor-not-allowed:is(:where(.peer):disabled~*){cursor:not-allowed}.peer-disabled\\:opacity-50:is(:where(.peer):disabled~*){opacity:.5}.peer-data-\\[active\\=true\\]\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.peer\\/menu-button)[data-active=true]~*){color:var(--sidebar-accent-foreground)}.peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.peer\\/menu-button)[data-size=default]~*){top:calc(var(--spacing)*1.5)}.peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.peer\\/menu-button)[data-size=lg]~*){top:calc(var(--spacing)*2.5)}.peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.peer\\/menu-button)[data-size=sm]~*){top:calc(var(--spacing)*1)}.selection\\:bg-primary ::selection{background-color:var(--primary)}.selection\\:bg-primary::selection{background-color:var(--primary)}.selection\\:text-primary-foreground ::selection{color:var(--primary-foreground)}.selection\\:text-primary-foreground::selection{color:var(--primary-foreground)}.file\\:inline-flex::file-selector-button{display:inline-flex}.file\\:h-7::file-selector-button{height:calc(var(--spacing)*7)}.file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.file\\:bg-transparent::file-selector-button{background-color:#0000}.file\\:text-sm::file-selector-button{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.file\\:font-medium::file-selector-button{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.file\\:text-foreground::file-selector-button{color:var(--foreground)}.placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:-inset-2:after{content:var(--tw-content);inset:calc(var(--spacing)*-2)}.after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(var(--spacing)*0)}.after\\:top-\\[2px\\]:after{content:var(--tw-content);top:2px}.after\\:top-\\[3px\\]:after{content:var(--tw-content);top:3px}.after\\:top-\\[4px\\]:after{content:var(--tw-content);top:4px}.after\\:left-1\\/2:after{content:var(--tw-content);left:50%}.after\\:left-\\[2px\\]:after{content:var(--tw-content);left:2px}.after\\:left-\\[3px\\]:after{content:var(--tw-content);left:3px}.after\\:left-\\[4px\\]:after{content:var(--tw-content);left:4px}.after\\:h-5:after{content:var(--tw-content);height:calc(var(--spacing)*5)}.after\\:h-\\[19px\\]:after{content:var(--tw-content);height:19px}.after\\:w-1:after{content:var(--tw-content);width:calc(var(--spacing)*1)}.after\\:w-5:after{content:var(--tw-content);width:calc(var(--spacing)*5)}.after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.after\\:w-\\[19px\\]:after{content:var(--tw-content);width:19px}.after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.after\\:border-gray-300:after{content:var(--tw-content);border-color:var(--color-gray-300)}.after\\:bg-white:after{content:var(--tw-content);background-color:var(--color-white)}.after\\:transition-all:after{content:var(--tw-content);transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.after\\:content-\\[\\'\\'\\]:after{--tw-content:\"\";content:var(--tw-content)}.group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full:is(:where(.group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);left:100%}.peer-checked\\:after\\:translate-x-\\[22px\\]:is(:where(.peer):checked~*):after{content:var(--tw-content);--tw-translate-x:22px;translate:var(--tw-translate-x)var(--tw-translate-y)}.peer-checked\\:after\\:translate-x-\\[28px\\]:is(:where(.peer):checked~*):after{content:var(--tw-content);--tw-translate-x:28px;translate:var(--tw-translate-x)var(--tw-translate-y)}.peer-checked\\:after\\:translate-x-full:is(:where(.peer):checked~*):after{content:var(--tw-content);--tw-translate-x:100%;translate:var(--tw-translate-x)var(--tw-translate-y)}.peer-checked\\:after\\:border-white:is(:where(.peer):checked~*):after{content:var(--tw-content);border-color:var(--color-white)}.first\\:rounded-l-md:first-child{border-top-left-radius:calc(var(--radius) - 2px);border-bottom-left-radius:calc(var(--radius) - 2px)}.first\\:border-l:first-child{border-left-style:var(--tw-border-style);border-left-width:1px}.last\\:mb-0:last-child{margin-bottom:calc(var(--spacing)*0)}.last\\:rounded-r-md:last-child{border-top-right-radius:calc(var(--radius) - 2px);border-bottom-right-radius:calc(var(--radius) - 2px)}.last\\:border-0:last-child{border-style:var(--tw-border-style);border-width:0}.last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.last\\:pb-0:last-child{padding-bottom:calc(var(--spacing)*0)}.focus-within\\:relative:focus-within{position:relative}.focus-within\\:z-20:focus-within{z-index:20}@media(hover:hover){.hover\\:scale-105:hover{--tw-scale-x:105%;--tw-scale-y:105%;--tw-scale-z:105%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:scale-\\[1\\.02\\]:hover{scale:1.02}.hover\\:rotate-90:hover{rotate:90deg}.hover\\:border-blue-600:hover{border-color:var(--color-blue-600)}.hover\\:border-gray-200:hover{border-color:var(--color-gray-200)}.hover\\:border-gray-300:hover{border-color:var(--color-gray-300)}.hover\\:border-gray-400:hover{border-color:var(--color-gray-400)}.hover\\:border-indigo-100:hover{border-color:var(--color-indigo-100)}.hover\\:border-indigo-300:hover{border-color:var(--color-indigo-300)}.hover\\:border-indigo-600:hover{border-color:var(--color-indigo-600)}.hover\\:border-red-400:hover{border-color:var(--color-red-400)}.hover\\:border-red-600:hover{border-color:var(--color-red-600)}.hover\\:border-rose-400:hover{border-color:var(--color-rose-400)}.hover\\:border-slate-400:hover{border-color:var(--color-slate-400)}.hover\\:\\!bg-indigo-600:hover{background-color:var(--color-indigo-600)!important}.hover\\:bg-accent:hover{background-color:var(--accent)}.hover\\:bg-amber-100:hover{background-color:var(--color-amber-100)}.hover\\:bg-amber-700:hover{background-color:var(--color-amber-700)}.hover\\:bg-blue-50:hover{background-color:var(--color-blue-50)}.hover\\:bg-blue-100\\/50:hover{background-color:#dbeafe80}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-blue-100\\/50:hover{background-color:color-mix(in oklab,var(--color-blue-100)50%,transparent)}}.hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab,var(--destructive)90%,transparent)}}.hover\\:bg-emerald-700:hover{background-color:var(--color-emerald-700)}.hover\\:bg-gray-50:hover{background-color:var(--color-gray-50)}.hover\\:bg-gray-50\\/50:hover{background-color:#f9fafb80}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-gray-50\\/50:hover{background-color:color-mix(in oklab,var(--color-gray-50)50%,transparent)}}.hover\\:bg-gray-100:hover{background-color:var(--color-gray-100)}.hover\\:bg-gray-200:hover{background-color:var(--color-gray-200)}.hover\\:bg-gray-400:hover{background-color:var(--color-gray-400)}.hover\\:bg-gray-800:hover{background-color:var(--color-gray-800)}.hover\\:bg-green-50:hover{background-color:var(--color-green-50)}.hover\\:bg-green-700:hover{background-color:var(--color-green-700)}.hover\\:bg-indigo-50:hover{background-color:var(--color-indigo-50)}.hover\\:bg-indigo-50\\/30:hover{background-color:#eef2ff4d}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-indigo-50\\/30:hover{background-color:color-mix(in oklab,var(--color-indigo-50)30%,transparent)}}.hover\\:bg-indigo-50\\/50:hover{background-color:#eef2ff80}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-indigo-50\\/50:hover{background-color:color-mix(in oklab,var(--color-indigo-50)50%,transparent)}}.hover\\:bg-indigo-100:hover{background-color:var(--color-indigo-100)}.hover\\:bg-indigo-200:hover{background-color:var(--color-indigo-200)}.hover\\:bg-indigo-600:hover{background-color:var(--color-indigo-600)}.hover\\:bg-indigo-700:hover{background-color:var(--color-indigo-700)}.hover\\:bg-muted:hover,.hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab,var(--muted)50%,transparent)}}.hover\\:bg-primary:hover,.hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab,var(--primary)90%,transparent)}}.hover\\:bg-purple-50\\/50:hover{background-color:#faf5ff80}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-purple-50\\/50:hover{background-color:color-mix(in oklab,var(--color-purple-50)50%,transparent)}}.hover\\:bg-red-50:hover{background-color:var(--color-red-50)}.hover\\:bg-red-600:hover{background-color:var(--color-red-600)}.hover\\:bg-red-700:hover{background-color:var(--color-red-700)}.hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab,var(--secondary)80%,transparent)}}.hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.hover\\:bg-slate-100:hover{background-color:var(--color-slate-100)}.hover\\:bg-transparent:hover{background-color:#0000}.hover\\:bg-white:hover{background-color:var(--color-white)}.hover\\:bg-white\\/10:hover{background-color:#ffffff1a}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-white\\/10:hover{background-color:color-mix(in oklab,var(--color-white)10%,transparent)}}.hover\\:bg-white\\/20:hover{background-color:#fff3}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-white\\/20:hover{background-color:color-mix(in oklab,var(--color-white)20%,transparent)}}.hover\\:bg-white\\/30:hover{background-color:#ffffff4d}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-white\\/30:hover{background-color:color-mix(in oklab,var(--color-white)30%,transparent)}}.hover\\:bg-white\\/40:hover{background-color:#fff6}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-white\\/40:hover{background-color:color-mix(in oklab,var(--color-white)40%,transparent)}}.hover\\:from-indigo-700:hover{--tw-gradient-from:var(--color-indigo-700);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.hover\\:to-indigo-800:hover{--tw-gradient-to:var(--color-indigo-800);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.hover\\:\\!text-indigo-200:hover{color:var(--color-indigo-200)!important}.hover\\:\\!text-white:hover{color:var(--color-white)!important}.hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}.hover\\:text-foreground:hover{color:var(--foreground)}.hover\\:text-gray-600:hover{color:var(--color-gray-600)}.hover\\:text-gray-700:hover{color:var(--color-gray-700)}.hover\\:text-gray-800:hover{color:var(--color-gray-800)}.hover\\:text-gray-900:hover{color:var(--color-gray-900)}.hover\\:text-indigo-600:hover{color:var(--color-indigo-600)}.hover\\:text-indigo-700:hover{color:var(--color-indigo-700)}.hover\\:text-indigo-800:hover{color:var(--color-indigo-800)}.hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.hover\\:text-red-600:hover{color:var(--color-red-600)}.hover\\:text-red-800:hover{color:var(--color-red-800)}.hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.hover\\:text-white:hover{color:var(--color-white)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-100:hover{opacity:1}.hover\\:shadow:hover{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,hsl(var(--sidebar-accent)));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-sm:hover{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-xl:hover{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring-1:hover{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring-4:hover{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(4px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-indigo-200:hover{--tw-shadow-color:oklch(87% .065 274.039)}@supports (color:color-mix(in lab,red,red)){.hover\\:shadow-indigo-200:hover{--tw-shadow-color:color-mix(in oklab,var(--color-indigo-200)var(--tw-shadow-alpha),transparent)}}.hover\\:shadow-indigo-300:hover{--tw-shadow-color:oklch(78.5% .115 274.713)}@supports (color:color-mix(in lab,red,red)){.hover\\:shadow-indigo-300:hover{--tw-shadow-color:color-mix(in oklab,var(--color-indigo-300)var(--tw-shadow-alpha),transparent)}}.hover\\:ring-blue-600:hover{--tw-ring-color:var(--color-blue-600)}.hover\\:brightness-95:hover{--tw-brightness:brightness(95%);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.focus\\:z-10:focus{z-index:10}.focus\\:border-indigo-500:focus{border-color:var(--color-indigo-500)}.focus\\:border-indigo-600:focus{border-color:var(--color-indigo-600)}.focus\\:border-rose-500:focus{border-color:var(--color-rose-500)}.focus\\:border-transparent:focus{border-color:#0000}.focus\\:bg-accent:focus{background-color:var(--accent)}.focus\\:bg-primary:focus{background-color:var(--primary)}.focus\\:bg-white:focus{background-color:var(--color-white)}.focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.focus\\:text-primary-foreground:focus{color:var(--primary-foreground)}.focus\\:ring-0:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(0px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-4:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(4px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-emerald-300:focus{--tw-ring-color:var(--color-emerald-300)}.focus\\:ring-emerald-500:focus{--tw-ring-color:var(--color-emerald-500)}.focus\\:ring-indigo-300:focus{--tw-ring-color:var(--color-indigo-300)}.focus\\:ring-indigo-500:focus{--tw-ring-color:var(--color-indigo-500)}.focus\\:ring-indigo-500\\/10:focus{--tw-ring-color:#625fff1a}@supports (color:color-mix(in lab,red,red)){.focus\\:ring-indigo-500\\/10:focus{--tw-ring-color:color-mix(in oklab,var(--color-indigo-500)10%,transparent)}}.focus\\:ring-indigo-500\\/20:focus{--tw-ring-color:#625fff33}@supports (color:color-mix(in lab,red,red)){.focus\\:ring-indigo-500\\/20:focus{--tw-ring-color:color-mix(in oklab,var(--color-indigo-500)20%,transparent)}}.focus\\:ring-indigo-600\\/10:focus{--tw-ring-color:#4f39f61a}@supports (color:color-mix(in lab,red,red)){.focus\\:ring-indigo-600\\/10:focus{--tw-ring-color:color-mix(in oklab,var(--color-indigo-600)10%,transparent)}}.focus\\:ring-red-500:focus{--tw-ring-color:var(--color-red-500)}.focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.focus\\:ring-rose-300:focus{--tw-ring-color:var(--color-rose-300)}.focus\\:ring-slate-300:focus{--tw-ring-color:var(--color-slate-300)}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,)0 0 0 var(--tw-ring-offset-width)var(--tw-ring-offset-color)}.focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.focus-visible\\:z-10:focus-visible{z-index:10}.focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-4:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(4px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab,var(--destructive)20%,transparent)}}.focus-visible\\:ring-ring:focus-visible,.focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab,var(--ring)50%,transparent)}}.focus-visible\\:ring-offset-1:focus-visible{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,)0 0 0 var(--tw-ring-offset-width)var(--tw-ring-offset-color)}.focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.active\\:scale-95:active{--tw-scale-x:95%;--tw-scale-y:95%;--tw-scale-z:95%;scale:var(--tw-scale-x)var(--tw-scale-y)}.active\\:scale-\\[0\\.98\\]:active{scale:.98}.active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.disabled\\:pointer-events-none:disabled{pointer-events:none}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:bg-gray-100:disabled{background-color:var(--color-gray-100)}.disabled\\:bg-gray-300:disabled{background-color:var(--color-gray-300)}.disabled\\:text-gray-400:disabled{color:var(--color-gray-400)}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-60:disabled{opacity:.6}:where([data-side=left]) .in-data-\\[side\\=left\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=right]) .in-data-\\[side\\=right\\]\\:cursor-e-resize{cursor:e-resize}.has-disabled\\:opacity-50:has(:disabled){opacity:.5}.has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.has-\\[\\>svg\\]\\:grid-cols-\\[calc\\(var\\(--spacing\\)\\*4\\)_1fr\\]:has(>svg){grid-template-columns:calc(var(--spacing)*4)1fr}.has-\\[\\>svg\\]\\:gap-x-3:has(>svg){column-gap:calc(var(--spacing)*3)}.has-\\[\\>svg\\]\\:px-2\\.5:has(>svg){padding-inline:calc(var(--spacing)*2.5)}.has-\\[\\>svg\\]\\:px-3:has(>svg){padding-inline:calc(var(--spacing)*3)}.has-\\[\\>svg\\]\\:px-4:has(>svg){padding-inline:calc(var(--spacing)*4)}.aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab,var(--destructive)20%,transparent)}}.aria-selected\\:bg-accent[aria-selected=true]{background-color:var(--accent)}.aria-selected\\:bg-primary[aria-selected=true]{background-color:var(--primary)}.aria-selected\\:text-accent-foreground[aria-selected=true]{color:var(--accent-foreground)}.aria-selected\\:text-muted-foreground[aria-selected=true]{color:var(--muted-foreground)}.aria-selected\\:text-primary-foreground[aria-selected=true]{color:var(--primary-foreground)}.aria-selected\\:opacity-100[aria-selected=true]{opacity:1}.data-\\[active\\=true\\]\\:z-10[data-active=true]{z-index:10}.data-\\[active\\=true\\]\\:border-ring[data-active=true]{border-color:var(--ring)}.data-\\[active\\=true\\]\\:bg-accent\\/50[data-active=true]{background-color:var(--accent)}@supports (color:color-mix(in lab,red,red)){.data-\\[active\\=true\\]\\:bg-accent\\/50[data-active=true]{background-color:color-mix(in oklab,var(--accent)50%,transparent)}}.data-\\[active\\=true\\]\\:bg-sidebar-accent[data-active=true]{background-color:var(--sidebar-accent)}.data-\\[active\\=true\\]\\:font-medium[data-active=true]{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.data-\\[active\\=true\\]\\:text-accent-foreground[data-active=true]{color:var(--accent-foreground)}.data-\\[active\\=true\\]\\:text-sidebar-accent-foreground[data-active=true]{color:var(--sidebar-accent-foreground)}.data-\\[active\\=true\\]\\:ring-\\[3px\\][data-active=true]{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.data-\\[active\\=true\\]\\:ring-ring\\/50[data-active=true]{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){.data-\\[active\\=true\\]\\:ring-ring\\/50[data-active=true]{--tw-ring-color:color-mix(in oklab,var(--ring)50%,transparent)}}@media(hover:hover){.data-\\[active\\=true\\]\\:hover\\:bg-accent[data-active=true]:hover{background-color:var(--accent)}}.data-\\[active\\=true\\]\\:focus\\:bg-accent[data-active=true]:focus{background-color:var(--accent)}.data-\\[active\\=true\\]\\:aria-invalid\\:border-destructive[data-active=true][aria-invalid=true]{border-color:var(--destructive)}.data-\\[active\\=true\\]\\:aria-invalid\\:ring-destructive\\/20[data-active=true][aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.data-\\[active\\=true\\]\\:aria-invalid\\:ring-destructive\\/20[data-active=true][aria-invalid=true]{--tw-ring-color:color-mix(in oklab,var(--destructive)20%,transparent)}}.data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.data-\\[error\\=true\\]\\:text-destructive[data-error=true]{color:var(--destructive)}.data-\\[inset\\]\\:pl-8[data-inset]{padding-left:calc(var(--spacing)*8)}.data-\\[orientation\\=horizontal\\]\\:h-4[data-orientation=horizontal]{height:calc(var(--spacing)*4)}.data-\\[orientation\\=horizontal\\]\\:h-full[data-orientation=horizontal]{height:100%}.data-\\[orientation\\=horizontal\\]\\:h-px[data-orientation=horizontal]{height:1px}.data-\\[orientation\\=horizontal\\]\\:w-full[data-orientation=horizontal]{width:100%}.data-\\[orientation\\=vertical\\]\\:h-full[data-orientation=vertical]{height:100%}.data-\\[orientation\\=vertical\\]\\:min-h-44[data-orientation=vertical]{min-height:calc(var(--spacing)*44)}.data-\\[orientation\\=vertical\\]\\:w-1\\.5[data-orientation=vertical]{width:calc(var(--spacing)*1.5)}.data-\\[orientation\\=vertical\\]\\:w-auto[data-orientation=vertical]{width:auto}.data-\\[orientation\\=vertical\\]\\:w-full[data-orientation=vertical]{width:100%}.data-\\[orientation\\=vertical\\]\\:w-px[data-orientation=vertical]{width:1px}.data-\\[orientation\\=vertical\\]\\:flex-col[data-orientation=vertical]{flex-direction:column}.data-\\[panel-group-direction\\=vertical\\]\\:h-px[data-panel-group-direction=vertical]{height:1px}.data-\\[panel-group-direction\\=vertical\\]\\:w-full[data-panel-group-direction=vertical]{width:100%}.data-\\[panel-group-direction\\=vertical\\]\\:flex-col[data-panel-group-direction=vertical]{flex-direction:column}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:left-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);left:calc(var(--spacing)*0)}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:h-1[data-panel-group-direction=vertical]:after{content:var(--tw-content);height:calc(var(--spacing)*1)}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:w-full[data-panel-group-direction=vertical]:after{content:var(--tw-content);width:100%}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:translate-x-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-x:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:-translate-y-1\\/2[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-y: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.data-\\[placeholder\\]\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.data-\\[selected\\=true\\]\\:bg-accent[data-selected=true]{background-color:var(--accent)}.data-\\[selected\\=true\\]\\:text-accent-foreground[data-selected=true]{color:var(--accent-foreground)}.data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(var(--spacing)*1);translate:var(--tw-translate-x)var(--tw-translate-y)}.data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(var(--spacing)*-1);translate:var(--tw-translate-x)var(--tw-translate-y)}.data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(var(--spacing)*1);translate:var(--tw-translate-x)var(--tw-translate-y)}.data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(var(--spacing)*-1);translate:var(--tw-translate-x)var(--tw-translate-y)}.data-\\[size\\=default\\]\\:h-9[data-size=default]{height:calc(var(--spacing)*9)}.data-\\[size\\=sm\\]\\:h-8[data-size=sm]{height:calc(var(--spacing)*8)}:is(.\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){:is(.\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab,var(--destructive)90%,transparent)}}:is(.\\*\\*\\:data-\\[slot\\=command-input-wrapper\\]\\:h-12 *)[data-slot=command-input-wrapper]{height:calc(var(--spacing)*12)}:is(.\\*\\*\\:data-\\[slot\\=navigation-menu-link\\]\\:focus\\:ring-0 *)[data-slot=navigation-menu-link]:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(0px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}:is(.\\*\\*\\:data-\\[slot\\=navigation-menu-link\\]\\:focus\\:outline-none *)[data-slot=navigation-menu-link]:focus{--tw-outline-style:none;outline-style:none}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:gap-2>*)[data-slot=select-value]{gap:calc(var(--spacing)*2)}.data-\\[state\\=active\\]\\:bg-card[data-state=active]{background-color:var(--card)}.data-\\[state\\=checked\\]\\:translate-x-\\[calc\\(100\\%-2px\\)\\][data-state=checked]{--tw-translate-x: calc(100% - 2px) ;translate:var(--tw-translate-x)var(--tw-translate-y)}.data-\\[state\\=checked\\]\\:border-primary[data-state=checked]{border-color:var(--primary)}.data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--primary)}.data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked]{color:var(--primary-foreground)}.data-\\[state\\=closed\\]\\:duration-300[data-state=closed]{--tw-duration:.3s;transition-duration:.3s}.data-\\[state\\=on\\]\\:bg-accent[data-state=on]{background-color:var(--accent)}.data-\\[state\\=on\\]\\:text-accent-foreground[data-state=on]{color:var(--accent-foreground)}.data-\\[state\\=open\\]\\:bg-accent[data-state=open],.data-\\[state\\=open\\]\\:bg-accent\\/50[data-state=open]{background-color:var(--accent)}@supports (color:color-mix(in lab,red,red)){.data-\\[state\\=open\\]\\:bg-accent\\/50[data-state=open]{background-color:color-mix(in oklab,var(--accent)50%,transparent)}}.data-\\[state\\=open\\]\\:bg-secondary[data-state=open]{background-color:var(--secondary)}.data-\\[state\\=open\\]\\:text-accent-foreground[data-state=open]{color:var(--accent-foreground)}.data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open]{color:var(--muted-foreground)}.data-\\[state\\=open\\]\\:opacity-100[data-state=open]{opacity:1}.data-\\[state\\=open\\]\\:duration-500[data-state=open]{--tw-duration:.5s;transition-duration:.5s}@media(hover:hover){.data-\\[state\\=open\\]\\:hover\\:bg-accent[data-state=open]:hover{background-color:var(--accent)}.data-\\[state\\=open\\]\\:hover\\:bg-sidebar-accent[data-state=open]:hover{background-color:var(--sidebar-accent)}.data-\\[state\\=open\\]\\:hover\\:text-sidebar-accent-foreground[data-state=open]:hover{color:var(--sidebar-accent-foreground)}}.data-\\[state\\=open\\]\\:focus\\:bg-accent[data-state=open]:focus{background-color:var(--accent)}.data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked]{--tw-translate-x:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.data-\\[state\\=unchecked\\]\\:bg-switch-background[data-state=unchecked]{background-color:var(--switch-background)}.data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}.data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab,var(--destructive)10%,transparent)}}.data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}.data-\\[variant\\=outline\\]\\:border-l-0[data-variant=outline]{border-left-style:var(--tw-border-style);border-left-width:0}.data-\\[variant\\=outline\\]\\:shadow-xs[data-variant=outline]{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.data-\\[variant\\=outline\\]\\:first\\:border-l[data-variant=outline]:first-child{border-left-style:var(--tw-border-style);border-left-width:1px}.data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(var(--spacing)*0)}.data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(var(--spacing)*0)}.data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(var(--spacing)*24)}.data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-lg[data-vaul-drawer-direction=bottom]{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(var(--spacing)*0)}.data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(var(--spacing)*0)}.data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(var(--spacing)*0)}.data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(var(--spacing)*0)}.data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(var(--spacing)*0)}.data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(var(--spacing)*0)}.data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(var(--spacing)*24)}.data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-lg[data-vaul-drawer-direction=top]{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@media(min-width:40rem){.sm\\:top-6{top:calc(var(--spacing)*6)}.sm\\:mb-3{margin-bottom:calc(var(--spacing)*3)}.sm\\:mb-6{margin-bottom:calc(var(--spacing)*6)}.sm\\:block{display:block}.sm\\:flex{display:flex}.sm\\:inline{display:inline}.sm\\:h-1{height:calc(var(--spacing)*1)}.sm\\:h-5{height:calc(var(--spacing)*5)}.sm\\:h-10{height:calc(var(--spacing)*10)}.sm\\:h-20{height:calc(var(--spacing)*20)}.sm\\:min-h-\\[48px\\]{min-height:48px}.sm\\:w-5{width:calc(var(--spacing)*5)}.sm\\:w-10{width:calc(var(--spacing)*10)}.sm\\:w-20{width:calc(var(--spacing)*20)}.sm\\:w-32{width:calc(var(--spacing)*32)}.sm\\:w-auto{width:auto}.sm\\:max-w-lg{max-width:var(--container-lg)}.sm\\:max-w-sm{max-width:var(--container-sm)}.sm\\:scale-110{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.sm\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}.sm\\:items-center{align-items:center}.sm\\:items-start{align-items:flex-start}.sm\\:justify-end{justify-content:flex-end}.sm\\:gap-2{gap:calc(var(--spacing)*2)}.sm\\:gap-2\\.5{gap:calc(var(--spacing)*2.5)}.sm\\:gap-6{gap:calc(var(--spacing)*6)}.sm\\:p-4{padding:calc(var(--spacing)*4)}.sm\\:p-6{padding:calc(var(--spacing)*6)}.sm\\:p-8{padding:calc(var(--spacing)*8)}.sm\\:p-12{padding:calc(var(--spacing)*12)}.sm\\:px-6{padding-inline:calc(var(--spacing)*6)}.sm\\:py-3{padding-block:calc(var(--spacing)*3)}.sm\\:pr-2\\.5{padding-right:calc(var(--spacing)*2.5)}.sm\\:pl-2\\.5{padding-left:calc(var(--spacing)*2.5)}.sm\\:text-left{text-align:left}.sm\\:text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.sm\\:text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.sm\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.sm\\:text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--container-sm)}}@media(min-width:48rem){.md\\:absolute{position:absolute}.md\\:col-span-2{grid-column:span 2/span 2}.md\\:mb-8{margin-bottom:calc(var(--spacing)*8)}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:w-64{width:calc(var(--spacing)*64)}.md\\:w-80{width:calc(var(--spacing)*80)}.md\\:w-\\[var\\(--radix-navigation-menu-viewport-width\\)\\]{width:var(--radix-navigation-menu-viewport-width)}.md\\:w-auto{width:auto}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:items-center{align-items:center}.md\\:gap-6{gap:calc(var(--spacing)*6)}.md\\:gap-8{gap:calc(var(--spacing)*8)}.md\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.md\\:border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.md\\:p-6{padding:calc(var(--spacing)*6)}.md\\:p-8{padding:calc(var(--spacing)*8)}.md\\:px-6{padding-inline:calc(var(--spacing)*6)}.md\\:px-8{padding-inline:calc(var(--spacing)*8)}.md\\:pt-0{padding-top:calc(var(--spacing)*0)}.md\\:pl-6{padding-left:calc(var(--spacing)*6)}.md\\:text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.md\\:text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.md\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.md\\:text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.md\\:opacity-0{opacity:0}.md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.peer)[data-variant=inset]~*){margin:calc(var(--spacing)*2)}.md\\:peer-data-\\[variant\\=inset\\]\\:ml-0:is(:where(.peer)[data-variant=inset]~*){margin-left:calc(var(--spacing)*0)}.md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.peer)[data-variant=inset]~*){border-radius:calc(var(--radius) + 4px)}.md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ml-2:is(:where(.peer)[data-variant=inset]~*):is(:where(.peer)[data-state=collapsed]~*){margin-left:calc(var(--spacing)*2)}.md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media(min-width:64rem){.lg\\:col-span-1{grid-column:span 1/span 1}.lg\\:col-span-2{grid-column:span 2/span 2}.lg\\:col-span-3{grid-column:span 3/span 3}.lg\\:hidden{display:none}.lg\\:h-6{height:calc(var(--spacing)*6)}.lg\\:h-12{height:calc(var(--spacing)*12)}.lg\\:w-6{width:calc(var(--spacing)*6)}.lg\\:w-12{width:calc(var(--spacing)*12)}.lg\\:w-80{width:calc(var(--spacing)*80)}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:flex-row{flex-direction:row}.lg\\:gap-6{gap:calc(var(--spacing)*6)}.lg\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.lg\\:border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.lg\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.lg\\:border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.lg\\:p-8{padding:calc(var(--spacing)*8)}.lg\\:px-8{padding-inline:calc(var(--spacing)*8)}.lg\\:pt-0{padding-top:calc(var(--spacing)*0)}.lg\\:pr-10{padding-right:calc(var(--spacing)*10)}.lg\\:pb-0{padding-bottom:calc(var(--spacing)*0)}.lg\\:pl-6{padding-left:calc(var(--spacing)*6)}.lg\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}}.dark\\:border-input:is(.dark *){border-color:var(--input)}.dark\\:bg-destructive\\/60:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-destructive\\/60:is(.dark *){background-color:color-mix(in oklab,var(--destructive)60%,transparent)}}.dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab,var(--input)30%,transparent)}}.dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}@media(hover:hover){.dark\\:hover\\:bg-accent\\/50:is(.dark *):hover{background-color:var(--accent)}@supports (color:color-mix(in lab,red,red)){.dark\\:hover\\:bg-accent\\/50:is(.dark *):hover{background-color:color-mix(in oklab,var(--accent)50%,transparent)}}.dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab,red,red)){.dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab,var(--input)50%,transparent)}}}.dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab,var(--destructive)40%,transparent)}}.dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab,var(--destructive)40%,transparent)}}.dark\\:data-\\[active\\=true\\]\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[data-active=true][aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.dark\\:data-\\[active\\=true\\]\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[data-active=true][aria-invalid=true]{--tw-ring-color:color-mix(in oklab,var(--destructive)40%,transparent)}}.dark\\:data-\\[state\\=active\\]\\:border-input:is(.dark *)[data-state=active]{border-color:var(--input)}.dark\\:data-\\[state\\=active\\]\\:bg-input\\/30:is(.dark *)[data-state=active]{background-color:var(--input)}@supports (color:color-mix(in lab,red,red)){.dark\\:data-\\[state\\=active\\]\\:bg-input\\/30:is(.dark *)[data-state=active]{background-color:color-mix(in oklab,var(--input)30%,transparent)}}.dark\\:data-\\[state\\=active\\]\\:text-foreground:is(.dark *)[data-state=active]{color:var(--foreground)}.dark\\:data-\\[state\\=checked\\]\\:bg-primary:is(.dark *)[data-state=checked]{background-color:var(--primary)}.dark\\:data-\\[state\\=checked\\]\\:bg-primary-foreground:is(.dark *)[data-state=checked]{background-color:var(--primary-foreground)}.dark\\:data-\\[state\\=unchecked\\]\\:bg-card-foreground:is(.dark *)[data-state=unchecked]{background-color:var(--card-foreground)}.dark\\:data-\\[state\\=unchecked\\]\\:bg-input\\/80:is(.dark *)[data-state=unchecked]{background-color:var(--input)}@supports (color:color-mix(in lab,red,red)){.dark\\:data-\\[state\\=unchecked\\]\\:bg-input\\/80:is(.dark *)[data-state=unchecked]{background-color:color-mix(in oklab,var(--input)80%,transparent)}}.dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab,var(--destructive)20%,transparent)}}.\\[\\&_\\.recharts-cartesian-axis-tick_text\\]\\:fill-muted-foreground .recharts-cartesian-axis-tick text{fill:var(--muted-foreground)}.\\[\\&_\\.recharts-cartesian-grid_line\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border\\/50 .recharts-cartesian-grid line[stroke=\"#ccc\"]{stroke:var(--border)}@supports (color:color-mix(in lab,red,red)){.\\[\\&_\\.recharts-cartesian-grid_line\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border\\/50 .recharts-cartesian-grid line[stroke=\"#ccc\"]{stroke:color-mix(in oklab,var(--border)50%,transparent)}}.\\[\\&_\\.recharts-curve\\.recharts-tooltip-cursor\\]\\:stroke-border .recharts-curve.recharts-tooltip-cursor{stroke:var(--border)}.\\[\\&_\\.recharts-dot\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-dot[stroke=\"#fff\"]{stroke:#0000}.\\[\\&_\\.recharts-layer\\]\\:outline-hidden .recharts-layer{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.\\[\\&_\\.recharts-layer\\]\\:outline-hidden .recharts-layer{outline-offset:2px;outline:2px solid #0000}}.\\[\\&_\\.recharts-polar-grid_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-polar-grid [stroke=\"#ccc\"]{stroke:var(--border)}.\\[\\&_\\.recharts-radial-bar-background-sector\\]\\:fill-muted .recharts-radial-bar-background-sector,.\\[\\&_\\.recharts-rectangle\\.recharts-tooltip-cursor\\]\\:fill-muted .recharts-rectangle.recharts-tooltip-cursor{fill:var(--muted)}.\\[\\&_\\.recharts-reference-line_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-reference-line [stroke=\"#ccc\"]{stroke:var(--border)}.\\[\\&_\\.recharts-sector\\]\\:outline-hidden .recharts-sector{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.\\[\\&_\\.recharts-sector\\]\\:outline-hidden .recharts-sector{outline-offset:2px;outline:2px solid #0000}}.\\[\\&_\\.recharts-sector\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-sector[stroke=\"#fff\"]{stroke:#0000}.\\[\\&_\\.recharts-surface\\]\\:outline-hidden .recharts-surface{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.\\[\\&_\\.recharts-surface\\]\\:outline-hidden .recharts-surface{outline-offset:2px;outline:2px solid #0000}}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading]{padding-inline:calc(var(--spacing)*2)}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading]{padding-block:calc(var(--spacing)*1.5)}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading]{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading]{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground [cmdk-group-heading]{color:var(--muted-foreground)}.\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group]{padding-inline:calc(var(--spacing)*2)}.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group]{padding-top:calc(var(--spacing)*0)}.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg{height:calc(var(--spacing)*5)}.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg{width:calc(var(--spacing)*5)}.\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input]{height:calc(var(--spacing)*12)}.\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item]{padding-inline:calc(var(--spacing)*2)}.\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item]{padding-block:calc(var(--spacing)*3)}.\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg{height:calc(var(--spacing)*5)}.\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg{width:calc(var(--spacing)*5)}.\\[\\&_p\\]\\:leading-relaxed p{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--spacing)*4);height:calc(var(--spacing)*4)}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'text-\\'\\]\\)\\]\\:text-muted-foreground svg:not([class*=text-]){color:var(--muted-foreground)}.\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.\\[\\&\\:has\\(\\>\\.day-range-end\\)\\]\\:rounded-r-md:has(>.day-range-end){border-top-right-radius:calc(var(--radius) - 2px);border-bottom-right-radius:calc(var(--radius) - 2px)}.\\[\\&\\:has\\(\\>\\.day-range-start\\)\\]\\:rounded-l-md:has(>.day-range-start){border-top-left-radius:calc(var(--radius) - 2px);border-bottom-left-radius:calc(var(--radius) - 2px)}.\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-md:has([aria-selected]){border-radius:calc(var(--radius) - 2px)}.\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:bg-accent:has([aria-selected]){background-color:var(--accent)}.first\\:\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-l-md:first-child:has([aria-selected]){border-top-left-radius:calc(var(--radius) - 2px);border-bottom-left-radius:calc(var(--radius) - 2px)}.last\\:\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-r-md:last-child:has([aria-selected]),.\\[\\&\\:has\\(\\[aria-selected\\]\\.day-range-end\\)\\]\\:rounded-r-md:has([aria-selected].day-range-end){border-top-right-radius:calc(var(--radius) - 2px);border-bottom-right-radius:calc(var(--radius) - 2px)}.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]){padding-right:calc(var(--spacing)*0)}.\\[\\.border-b\\]\\:pb-6.border-b{padding-bottom:calc(var(--spacing)*6)}.\\[\\.border-t\\]\\:pt-6.border-t{padding-top:calc(var(--spacing)*6)}:is(.\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(var(--spacing)*2)}:is(.data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:\\!text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)!important}.\\[\\&\\:last-child\\]\\:pb-6:last-child{padding-bottom:calc(var(--spacing)*6)}.\\[\\&\\>\\[role\\=checkbox\\]\\]\\:translate-y-\\[2px\\]>[role=checkbox]{--tw-translate-y:2px;translate:var(--tw-translate-x)var(--tw-translate-y)}.\\[\\&\\>button\\]\\:hidden>button{display:none}.\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.\\[\\&\\>svg\\]\\:size-3>svg{width:calc(var(--spacing)*3);height:calc(var(--spacing)*3)}.\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(var(--spacing)*3.5);height:calc(var(--spacing)*3.5)}.\\[\\&\\>svg\\]\\:size-4>svg{width:calc(var(--spacing)*4);height:calc(var(--spacing)*4)}.\\[\\&\\>svg\\]\\:h-2\\.5>svg{height:calc(var(--spacing)*2.5)}.\\[\\&\\>svg\\]\\:h-3>svg{height:calc(var(--spacing)*3)}.\\[\\&\\>svg\\]\\:w-2\\.5>svg{width:calc(var(--spacing)*2.5)}.\\[\\&\\>svg\\]\\:w-3>svg{width:calc(var(--spacing)*3)}.\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.\\[\\&\\>svg\\]\\:translate-y-0\\.5>svg{--tw-translate-y:calc(var(--spacing)*.5);translate:var(--tw-translate-x)var(--tw-translate-y)}.\\[\\&\\>svg\\]\\:text-current>svg{color:currentColor}.\\[\\&\\>svg\\]\\:text-muted-foreground>svg{color:var(--muted-foreground)}.\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:rotate-90[data-panel-group-direction=vertical]>div{rotate:90deg}.\\[\\&\\[data-state\\=open\\]\\>svg\\]\\:rotate-180[data-state=open]>svg{rotate:180deg}[data-side=left][data-collapsible=offcanvas] .\\[\\[data-side\\=left\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2{right:calc(var(--spacing)*-2)}[data-side=left][data-state=collapsed] .\\[\\[data-side\\=left\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=right][data-collapsible=offcanvas] .\\[\\[data-side\\=right\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2{left:calc(var(--spacing)*-2)}[data-side=right][data-state=collapsed] .\\[\\[data-side\\=right\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}@media(hover:hover){a.\\[a\\&\\]\\:hover\\:bg-accent:hover{background-color:var(--accent)}a.\\[a\\&\\]\\:hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){a.\\[a\\&\\]\\:hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab,var(--destructive)90%,transparent)}}a.\\[a\\&\\]\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){a.\\[a\\&\\]\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab,var(--primary)90%,transparent)}}a.\\[a\\&\\]\\:hover\\:bg-secondary\\/90:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab,red,red)){a.\\[a\\&\\]\\:hover\\:bg-secondary\\/90:hover{background-color:color-mix(in oklab,var(--secondary)90%,transparent)}}a.\\[a\\&\\]\\:hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}}}:root{--font-size:16px;--background:#fff;--foreground:oklch(14.5% 0 0);--card:#fff;--card-foreground:oklch(14.5% 0 0);--popover:oklch(100% 0 0);--popover-foreground:oklch(14.5% 0 0);--primary:#030213;--primary-foreground:oklch(100% 0 0);--secondary:oklch(95% .0058 264.53);--secondary-foreground:#030213;--muted:#ececf0;--muted-foreground:#717182;--accent:#e9ebef;--accent-foreground:#030213;--destructive:#d4183d;--destructive-foreground:#fff;--border:#0000001a;--input:transparent;--input-background:#f3f3f5;--switch-background:#cbced4;--font-weight-medium:500;--font-weight-normal:400;--ring:oklch(70.8% 0 0);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--radius:.625rem;--sidebar:oklch(98.5% 0 0);--sidebar-foreground:oklch(14.5% 0 0);--sidebar-primary:#030213;--sidebar-primary-foreground:oklch(98.5% 0 0);--sidebar-accent:oklch(97% 0 0);--sidebar-accent-foreground:oklch(20.5% 0 0);--sidebar-border:oklch(92.2% 0 0);--sidebar-ring:oklch(70.8% 0 0)}.dark{--background:oklch(14.5% 0 0);--foreground:oklch(98.5% 0 0);--card:oklch(14.5% 0 0);--card-foreground:oklch(98.5% 0 0);--popover:oklch(14.5% 0 0);--popover-foreground:oklch(98.5% 0 0);--primary:oklch(98.5% 0 0);--primary-foreground:oklch(20.5% 0 0);--secondary:oklch(26.9% 0 0);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(26.9% 0 0);--muted-foreground:oklch(70.8% 0 0);--accent:oklch(26.9% 0 0);--accent-foreground:oklch(98.5% 0 0);--destructive:oklch(39.6% .141 25.723);--destructive-foreground:oklch(63.7% .237 25.331);--border:oklch(26.9% 0 0);--input:oklch(26.9% 0 0);--ring:oklch(43.9% 0 0);--font-weight-medium:500;--font-weight-normal:400;--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(20.5% 0 0);--sidebar-foreground:oklch(98.5% 0 0);--sidebar-primary:oklch(48.8% .243 264.376);--sidebar-primary-foreground:oklch(98.5% 0 0);--sidebar-accent:oklch(26.9% 0 0);--sidebar-accent-foreground:oklch(98.5% 0 0);--sidebar-border:oklch(26.9% 0 0);--sidebar-ring:oklch(43.9% 0 0)}html{font-size:var(--font-size)}input::-ms-reveal{display:none}input::-ms-clear{display:none}.custom-scrollbar::-webkit-scrollbar{width:4px;height:4px}.custom-scrollbar::-webkit-scrollbar-track{background:0 0}.custom-scrollbar::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:20px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#cbd5e1}.dark .custom-scrollbar::-webkit-scrollbar-thumb{background:#334155}.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#475569}@keyframes fadeIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeIn{animation:.4s ease-out fadeIn}@property --tw-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-z{syntax:\"*\";inherits:false;initial-value:0}@property --tw-scale-x{syntax:\"*\";inherits:false;initial-value:1}@property --tw-scale-y{syntax:\"*\";inherits:false;initial-value:1}@property --tw-scale-z{syntax:\"*\";inherits:false;initial-value:1}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-pan-x{syntax:\"*\";inherits:false}@property --tw-pan-y{syntax:\"*\";inherits:false}@property --tw-pinch-zoom{syntax:\"*\";inherits:false}@property --tw-space-y-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-gradient-position{syntax:\"*\";inherits:false}@property --tw-gradient-from{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:\"*\";inherits:false}@property --tw-gradient-via-stops{syntax:\"*\";inherits:false}@property --tw-gradient-from-position{syntax:\"<length-percentage>\";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:\"<length-percentage>\";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:\"<length-percentage>\";inherits:false;initial-value:100%}@property --tw-leading{syntax:\"*\";inherits:false}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-tracking{syntax:\"*\";inherits:false}@property --tw-ordinal{syntax:\"*\";inherits:false}@property --tw-slashed-zero{syntax:\"*\";inherits:false}@property --tw-numeric-figure{syntax:\"*\";inherits:false}@property --tw-numeric-spacing{syntax:\"*\";inherits:false}@property --tw-numeric-fraction{syntax:\"*\";inherits:false}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}@property --tw-backdrop-blur{syntax:\"*\";inherits:false}@property --tw-backdrop-brightness{syntax:\"*\";inherits:false}@property --tw-backdrop-contrast{syntax:\"*\";inherits:false}@property --tw-backdrop-grayscale{syntax:\"*\";inherits:false}@property --tw-backdrop-hue-rotate{syntax:\"*\";inherits:false}@property --tw-backdrop-invert{syntax:\"*\";inherits:false}@property --tw-backdrop-opacity{syntax:\"*\";inherits:false}@property --tw-backdrop-saturate{syntax:\"*\";inherits:false}@property --tw-backdrop-sepia{syntax:\"*\";inherits:false}@property --tw-duration{syntax:\"*\";inherits:false}@property --tw-ease{syntax:\"*\";inherits:false}@property --tw-content{syntax:\"*\";inherits:false;initial-value:\"\"}@keyframes spin{to{transform:rotate(360deg)}}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}@keyframes pulse{50%{opacity:.5}}@keyframes bounce{0%,to{animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}\n";document.head.appendChild(style);}catch(e){console.error('Widget CSS injection failed',e);}})();function S1(e, n) {
  for (var o = 0; o < n.length; o++) {
    const i = n[o];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const a in i)
        if (a !== "default" && !(a in e)) {
          const l = Object.getOwnPropertyDescriptor(i, a);
          l && Object.defineProperty(e, a, l.get ? l : {
            enumerable: !0,
            get: () => i[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function Ld(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var dc = { exports: {} }, Ui = {}, fc = { exports: {} }, Pe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sm;
function C1() {
  if (Sm) return Pe;
  Sm = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.iterator;
  function x(L) {
    return L === null || typeof L != "object" ? null : (L = v && L[v] || L["@@iterator"], typeof L == "function" ? L : null);
  }
  var S = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, E = Object.assign, b = {};
  function k(L, D, U) {
    this.props = L, this.context = D, this.refs = b, this.updater = U || S;
  }
  k.prototype.isReactComponent = {}, k.prototype.setState = function(L, D) {
    if (typeof L != "object" && typeof L != "function" && L != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, L, D, "setState");
  }, k.prototype.forceUpdate = function(L) {
    this.updater.enqueueForceUpdate(this, L, "forceUpdate");
  };
  function R() {
  }
  R.prototype = k.prototype;
  function T(L, D, U) {
    this.props = L, this.context = D, this.refs = b, this.updater = U || S;
  }
  var A = T.prototype = new R();
  A.constructor = T, E(A, k.prototype), A.isPureReactComponent = !0;
  var F = Array.isArray, O = Object.prototype.hasOwnProperty, B = { current: null }, V = { key: !0, ref: !0, __self: !0, __source: !0 };
  function z(L, D, U) {
    var X, W = {}, oe = null, ee = null;
    if (D != null) for (X in D.ref !== void 0 && (ee = D.ref), D.key !== void 0 && (oe = "" + D.key), D) O.call(D, X) && !V.hasOwnProperty(X) && (W[X] = D[X]);
    var he = arguments.length - 2;
    if (he === 1) W.children = U;
    else if (1 < he) {
      for (var ye = Array(he), De = 0; De < he; De++) ye[De] = arguments[De + 2];
      W.children = ye;
    }
    if (L && L.defaultProps) for (X in he = L.defaultProps, he) W[X] === void 0 && (W[X] = he[X]);
    return { $$typeof: e, type: L, key: oe, ref: ee, props: W, _owner: B.current };
  }
  function q(L, D) {
    return { $$typeof: e, type: L.type, key: D, ref: L.ref, props: L.props, _owner: L._owner };
  }
  function ne(L) {
    return typeof L == "object" && L !== null && L.$$typeof === e;
  }
  function se(L) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + L.replace(/[=:]/g, function(U) {
      return D[U];
    });
  }
  var be = /\/+/g;
  function we(L, D) {
    return typeof L == "object" && L !== null && L.key != null ? se("" + L.key) : D.toString(36);
  }
  function xe(L, D, U, X, W) {
    var oe = typeof L;
    (oe === "undefined" || oe === "boolean") && (L = null);
    var ee = !1;
    if (L === null) ee = !0;
    else switch (oe) {
      case "string":
      case "number":
        ee = !0;
        break;
      case "object":
        switch (L.$$typeof) {
          case e:
          case n:
            ee = !0;
        }
    }
    if (ee) return ee = L, W = W(ee), L = X === "" ? "." + we(ee, 0) : X, F(W) ? (U = "", L != null && (U = L.replace(be, "$&/") + "/"), xe(W, D, U, "", function(De) {
      return De;
    })) : W != null && (ne(W) && (W = q(W, U + (!W.key || ee && ee.key === W.key ? "" : ("" + W.key).replace(be, "$&/") + "/") + L)), D.push(W)), 1;
    if (ee = 0, X = X === "" ? "." : X + ":", F(L)) for (var he = 0; he < L.length; he++) {
      oe = L[he];
      var ye = X + we(oe, he);
      ee += xe(oe, D, U, ye, W);
    }
    else if (ye = x(L), typeof ye == "function") for (L = ye.call(L), he = 0; !(oe = L.next()).done; ) oe = oe.value, ye = X + we(oe, he++), ee += xe(oe, D, U, ye, W);
    else if (oe === "object") throw D = String(L), Error("Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(L).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead.");
    return ee;
  }
  function Ee(L, D, U) {
    if (L == null) return L;
    var X = [], W = 0;
    return xe(L, X, "", "", function(oe) {
      return D.call(U, oe, W++);
    }), X;
  }
  function ge(L) {
    if (L._status === -1) {
      var D = L._result;
      D = D(), D.then(function(U) {
        (L._status === 0 || L._status === -1) && (L._status = 1, L._result = U);
      }, function(U) {
        (L._status === 0 || L._status === -1) && (L._status = 2, L._result = U);
      }), L._status === -1 && (L._status = 0, L._result = D);
    }
    if (L._status === 1) return L._result.default;
    throw L._result;
  }
  var te = { current: null }, j = { transition: null }, J = { ReactCurrentDispatcher: te, ReactCurrentBatchConfig: j, ReactCurrentOwner: B };
  function G() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Pe.Children = { map: Ee, forEach: function(L, D, U) {
    Ee(L, function() {
      D.apply(this, arguments);
    }, U);
  }, count: function(L) {
    var D = 0;
    return Ee(L, function() {
      D++;
    }), D;
  }, toArray: function(L) {
    return Ee(L, function(D) {
      return D;
    }) || [];
  }, only: function(L) {
    if (!ne(L)) throw Error("React.Children.only expected to receive a single React element child.");
    return L;
  } }, Pe.Component = k, Pe.Fragment = o, Pe.Profiler = a, Pe.PureComponent = T, Pe.StrictMode = i, Pe.Suspense = h, Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = J, Pe.act = G, Pe.cloneElement = function(L, D, U) {
    if (L == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + L + ".");
    var X = E({}, L.props), W = L.key, oe = L.ref, ee = L._owner;
    if (D != null) {
      if (D.ref !== void 0 && (oe = D.ref, ee = B.current), D.key !== void 0 && (W = "" + D.key), L.type && L.type.defaultProps) var he = L.type.defaultProps;
      for (ye in D) O.call(D, ye) && !V.hasOwnProperty(ye) && (X[ye] = D[ye] === void 0 && he !== void 0 ? he[ye] : D[ye]);
    }
    var ye = arguments.length - 2;
    if (ye === 1) X.children = U;
    else if (1 < ye) {
      he = Array(ye);
      for (var De = 0; De < ye; De++) he[De] = arguments[De + 2];
      X.children = he;
    }
    return { $$typeof: e, type: L.type, key: W, ref: oe, props: X, _owner: ee };
  }, Pe.createContext = function(L) {
    return L = { $$typeof: c, _currentValue: L, _currentValue2: L, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, L.Provider = { $$typeof: l, _context: L }, L.Consumer = L;
  }, Pe.createElement = z, Pe.createFactory = function(L) {
    var D = z.bind(null, L);
    return D.type = L, D;
  }, Pe.createRef = function() {
    return { current: null };
  }, Pe.forwardRef = function(L) {
    return { $$typeof: d, render: L };
  }, Pe.isValidElement = ne, Pe.lazy = function(L) {
    return { $$typeof: g, _payload: { _status: -1, _result: L }, _init: ge };
  }, Pe.memo = function(L, D) {
    return { $$typeof: p, type: L, compare: D === void 0 ? null : D };
  }, Pe.startTransition = function(L) {
    var D = j.transition;
    j.transition = {};
    try {
      L();
    } finally {
      j.transition = D;
    }
  }, Pe.unstable_act = G, Pe.useCallback = function(L, D) {
    return te.current.useCallback(L, D);
  }, Pe.useContext = function(L) {
    return te.current.useContext(L);
  }, Pe.useDebugValue = function() {
  }, Pe.useDeferredValue = function(L) {
    return te.current.useDeferredValue(L);
  }, Pe.useEffect = function(L, D) {
    return te.current.useEffect(L, D);
  }, Pe.useId = function() {
    return te.current.useId();
  }, Pe.useImperativeHandle = function(L, D, U) {
    return te.current.useImperativeHandle(L, D, U);
  }, Pe.useInsertionEffect = function(L, D) {
    return te.current.useInsertionEffect(L, D);
  }, Pe.useLayoutEffect = function(L, D) {
    return te.current.useLayoutEffect(L, D);
  }, Pe.useMemo = function(L, D) {
    return te.current.useMemo(L, D);
  }, Pe.useReducer = function(L, D, U) {
    return te.current.useReducer(L, D, U);
  }, Pe.useRef = function(L) {
    return te.current.useRef(L);
  }, Pe.useState = function(L) {
    return te.current.useState(L);
  }, Pe.useSyncExternalStore = function(L, D, U) {
    return te.current.useSyncExternalStore(L, D, U);
  }, Pe.useTransition = function() {
    return te.current.useTransition();
  }, Pe.version = "18.3.1", Pe;
}
var Cm;
function jd() {
  return Cm || (Cm = 1, fc.exports = C1()), fc.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bm;
function b1() {
  if (bm) return Ui;
  bm = 1;
  var e = jd(), n = Symbol.for("react.element"), o = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(d, h, p) {
    var g, v = {}, x = null, S = null;
    p !== void 0 && (x = "" + p), h.key !== void 0 && (x = "" + h.key), h.ref !== void 0 && (S = h.ref);
    for (g in h) i.call(h, g) && !l.hasOwnProperty(g) && (v[g] = h[g]);
    if (d && d.defaultProps) for (g in h = d.defaultProps, h) v[g] === void 0 && (v[g] = h[g]);
    return { $$typeof: n, type: d, key: x, ref: S, props: v, _owner: a.current };
  }
  return Ui.Fragment = o, Ui.jsx = c, Ui.jsxs = c, Ui;
}
var Em;
function E1() {
  return Em || (Em = 1, dc.exports = b1()), dc.exports;
}
var C = E1(), y = jd();
const Wy = /* @__PURE__ */ Ld(y), Od = /* @__PURE__ */ S1({
  __proto__: null,
  default: Wy
}, [y]);
var Ra = {}, hc = { exports: {} }, kt = {}, pc = { exports: {} }, mc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var km;
function k1() {
  return km || (km = 1, (function(e) {
    function n(j, J) {
      var G = j.length;
      j.push(J);
      e: for (; 0 < G; ) {
        var L = G - 1 >>> 1, D = j[L];
        if (0 < a(D, J)) j[L] = J, j[G] = D, G = L;
        else break e;
      }
    }
    function o(j) {
      return j.length === 0 ? null : j[0];
    }
    function i(j) {
      if (j.length === 0) return null;
      var J = j[0], G = j.pop();
      if (G !== J) {
        j[0] = G;
        e: for (var L = 0, D = j.length, U = D >>> 1; L < U; ) {
          var X = 2 * (L + 1) - 1, W = j[X], oe = X + 1, ee = j[oe];
          if (0 > a(W, G)) oe < D && 0 > a(ee, W) ? (j[L] = ee, j[oe] = G, L = oe) : (j[L] = W, j[X] = G, L = X);
          else if (oe < D && 0 > a(ee, G)) j[L] = ee, j[oe] = G, L = oe;
          else break e;
        }
      }
      return J;
    }
    function a(j, J) {
      var G = j.sortIndex - J.sortIndex;
      return G !== 0 ? G : j.id - J.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var l = performance;
      e.unstable_now = function() {
        return l.now();
      };
    } else {
      var c = Date, d = c.now();
      e.unstable_now = function() {
        return c.now() - d;
      };
    }
    var h = [], p = [], g = 1, v = null, x = 3, S = !1, E = !1, b = !1, k = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, T = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function A(j) {
      for (var J = o(p); J !== null; ) {
        if (J.callback === null) i(p);
        else if (J.startTime <= j) i(p), J.sortIndex = J.expirationTime, n(h, J);
        else break;
        J = o(p);
      }
    }
    function F(j) {
      if (b = !1, A(j), !E) if (o(h) !== null) E = !0, ge(O);
      else {
        var J = o(p);
        J !== null && te(F, J.startTime - j);
      }
    }
    function O(j, J) {
      E = !1, b && (b = !1, R(z), z = -1), S = !0;
      var G = x;
      try {
        for (A(J), v = o(h); v !== null && (!(v.expirationTime > J) || j && !se()); ) {
          var L = v.callback;
          if (typeof L == "function") {
            v.callback = null, x = v.priorityLevel;
            var D = L(v.expirationTime <= J);
            J = e.unstable_now(), typeof D == "function" ? v.callback = D : v === o(h) && i(h), A(J);
          } else i(h);
          v = o(h);
        }
        if (v !== null) var U = !0;
        else {
          var X = o(p);
          X !== null && te(F, X.startTime - J), U = !1;
        }
        return U;
      } finally {
        v = null, x = G, S = !1;
      }
    }
    var B = !1, V = null, z = -1, q = 5, ne = -1;
    function se() {
      return !(e.unstable_now() - ne < q);
    }
    function be() {
      if (V !== null) {
        var j = e.unstable_now();
        ne = j;
        var J = !0;
        try {
          J = V(!0, j);
        } finally {
          J ? we() : (B = !1, V = null);
        }
      } else B = !1;
    }
    var we;
    if (typeof T == "function") we = function() {
      T(be);
    };
    else if (typeof MessageChannel < "u") {
      var xe = new MessageChannel(), Ee = xe.port2;
      xe.port1.onmessage = be, we = function() {
        Ee.postMessage(null);
      };
    } else we = function() {
      k(be, 0);
    };
    function ge(j) {
      V = j, B || (B = !0, we());
    }
    function te(j, J) {
      z = k(function() {
        j(e.unstable_now());
      }, J);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(j) {
      j.callback = null;
    }, e.unstable_continueExecution = function() {
      E || S || (E = !0, ge(O));
    }, e.unstable_forceFrameRate = function(j) {
      0 > j || 125 < j ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : q = 0 < j ? Math.floor(1e3 / j) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, e.unstable_getFirstCallbackNode = function() {
      return o(h);
    }, e.unstable_next = function(j) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = x;
      }
      var G = x;
      x = J;
      try {
        return j();
      } finally {
        x = G;
      }
    }, e.unstable_pauseExecution = function() {
    }, e.unstable_requestPaint = function() {
    }, e.unstable_runWithPriority = function(j, J) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var G = x;
      x = j;
      try {
        return J();
      } finally {
        x = G;
      }
    }, e.unstable_scheduleCallback = function(j, J, G) {
      var L = e.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? L + G : L) : G = L, j) {
        case 1:
          var D = -1;
          break;
        case 2:
          D = 250;
          break;
        case 5:
          D = 1073741823;
          break;
        case 4:
          D = 1e4;
          break;
        default:
          D = 5e3;
      }
      return D = G + D, j = { id: g++, callback: J, priorityLevel: j, startTime: G, expirationTime: D, sortIndex: -1 }, G > L ? (j.sortIndex = G, n(p, j), o(h) === null && j === o(p) && (b ? (R(z), z = -1) : b = !0, te(F, G - L))) : (j.sortIndex = D, n(h, j), E || S || (E = !0, ge(O))), j;
    }, e.unstable_shouldYield = se, e.unstable_wrapCallback = function(j) {
      var J = x;
      return function() {
        var G = x;
        x = J;
        try {
          return j.apply(this, arguments);
        } finally {
          x = G;
        }
      };
    };
  })(mc)), mc;
}
var Pm;
function P1() {
  return Pm || (Pm = 1, pc.exports = k1()), pc.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tm;
function T1() {
  if (Tm) return kt;
  Tm = 1;
  var e = jd(), n = P1();
  function o(t) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, s = 1; s < arguments.length; s++) r += "&args[]=" + encodeURIComponent(arguments[s]);
    return "Minified React error #" + t + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var i = /* @__PURE__ */ new Set(), a = {};
  function l(t, r) {
    c(t, r), c(t + "Capture", r);
  }
  function c(t, r) {
    for (a[t] = r, t = 0; t < r.length; t++) i.add(r[t]);
  }
  var d = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), h = Object.prototype.hasOwnProperty, p = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, g = {}, v = {};
  function x(t) {
    return h.call(v, t) ? !0 : h.call(g, t) ? !1 : p.test(t) ? v[t] = !0 : (g[t] = !0, !1);
  }
  function S(t, r, s, u) {
    if (s !== null && s.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return u ? !1 : s !== null ? !s.acceptsBooleans : (t = t.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-");
      default:
        return !1;
    }
  }
  function E(t, r, s, u) {
    if (r === null || typeof r > "u" || S(t, r, s, u)) return !0;
    if (u) return !1;
    if (s !== null) switch (s.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function b(t, r, s, u, f, m, w) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = u, this.attributeNamespace = f, this.mustUseProperty = s, this.propertyName = t, this.type = r, this.sanitizeURL = m, this.removeEmptyString = w;
  }
  var k = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
    k[t] = new b(t, 0, !1, t, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
    var r = t[0];
    k[r] = new b(r, 1, !1, t[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
    k[t] = new b(t, 2, !1, t.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
    k[t] = new b(t, 2, !1, t, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
    k[t] = new b(t, 3, !1, t.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(t) {
    k[t] = new b(t, 3, !0, t, null, !1, !1);
  }), ["capture", "download"].forEach(function(t) {
    k[t] = new b(t, 4, !1, t, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(t) {
    k[t] = new b(t, 6, !1, t, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(t) {
    k[t] = new b(t, 5, !1, t.toLowerCase(), null, !1, !1);
  });
  var R = /[\-:]([a-z])/g;
  function T(t) {
    return t[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
    var r = t.replace(
      R,
      T
    );
    k[r] = new b(r, 1, !1, t, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
    var r = t.replace(R, T);
    k[r] = new b(r, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
    var r = t.replace(R, T);
    k[r] = new b(r, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(t) {
    k[t] = new b(t, 1, !1, t.toLowerCase(), null, !1, !1);
  }), k.xlinkHref = new b("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(t) {
    k[t] = new b(t, 1, !1, t.toLowerCase(), null, !0, !0);
  });
  function A(t, r, s, u) {
    var f = k.hasOwnProperty(r) ? k[r] : null;
    (f !== null ? f.type !== 0 : u || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (E(r, s, f, u) && (s = null), u || f === null ? x(r) && (s === null ? t.removeAttribute(r) : t.setAttribute(r, "" + s)) : f.mustUseProperty ? t[f.propertyName] = s === null ? f.type === 3 ? !1 : "" : s : (r = f.attributeName, u = f.attributeNamespace, s === null ? t.removeAttribute(r) : (f = f.type, s = f === 3 || f === 4 && s === !0 ? "" : "" + s, u ? t.setAttributeNS(u, r, s) : t.setAttribute(r, s))));
  }
  var F = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, O = Symbol.for("react.element"), B = Symbol.for("react.portal"), V = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), q = Symbol.for("react.profiler"), ne = Symbol.for("react.provider"), se = Symbol.for("react.context"), be = Symbol.for("react.forward_ref"), we = Symbol.for("react.suspense"), xe = Symbol.for("react.suspense_list"), Ee = Symbol.for("react.memo"), ge = Symbol.for("react.lazy"), te = Symbol.for("react.offscreen"), j = Symbol.iterator;
  function J(t) {
    return t === null || typeof t != "object" ? null : (t = j && t[j] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var G = Object.assign, L;
  function D(t) {
    if (L === void 0) try {
      throw Error();
    } catch (s) {
      var r = s.stack.trim().match(/\n( *(at )?)/);
      L = r && r[1] || "";
    }
    return `
` + L + t;
  }
  var U = !1;
  function X(t, r) {
    if (!t || U) return "";
    U = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch ($) {
          var u = $;
        }
        Reflect.construct(t, [], r);
      } else {
        try {
          r.call();
        } catch ($) {
          u = $;
        }
        t.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch ($) {
          u = $;
        }
        t();
      }
    } catch ($) {
      if ($ && u && typeof $.stack == "string") {
        for (var f = $.stack.split(`
`), m = u.stack.split(`
`), w = f.length - 1, P = m.length - 1; 1 <= w && 0 <= P && f[w] !== m[P]; ) P--;
        for (; 1 <= w && 0 <= P; w--, P--) if (f[w] !== m[P]) {
          if (w !== 1 || P !== 1)
            do
              if (w--, P--, 0 > P || f[w] !== m[P]) {
                var N = `
` + f[w].replace(" at new ", " at ");
                return t.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", t.displayName)), N;
              }
            while (1 <= w && 0 <= P);
          break;
        }
      }
    } finally {
      U = !1, Error.prepareStackTrace = s;
    }
    return (t = t ? t.displayName || t.name : "") ? D(t) : "";
  }
  function W(t) {
    switch (t.tag) {
      case 5:
        return D(t.type);
      case 16:
        return D("Lazy");
      case 13:
        return D("Suspense");
      case 19:
        return D("SuspenseList");
      case 0:
      case 2:
      case 15:
        return t = X(t.type, !1), t;
      case 11:
        return t = X(t.type.render, !1), t;
      case 1:
        return t = X(t.type, !0), t;
      default:
        return "";
    }
  }
  function oe(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case V:
        return "Fragment";
      case B:
        return "Portal";
      case q:
        return "Profiler";
      case z:
        return "StrictMode";
      case we:
        return "Suspense";
      case xe:
        return "SuspenseList";
    }
    if (typeof t == "object") switch (t.$$typeof) {
      case se:
        return (t.displayName || "Context") + ".Consumer";
      case ne:
        return (t._context.displayName || "Context") + ".Provider";
      case be:
        var r = t.render;
        return t = t.displayName, t || (t = r.displayName || r.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
      case Ee:
        return r = t.displayName || null, r !== null ? r : oe(t.type) || "Memo";
      case ge:
        r = t._payload, t = t._init;
        try {
          return oe(t(r));
        } catch {
        }
    }
    return null;
  }
  function ee(t) {
    var r = t.type;
    switch (t.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return t = r.render, t = t.displayName || t.name || "", r.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return oe(r);
      case 8:
        return r === z ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function he(t) {
    switch (typeof t) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function ye(t) {
    var r = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function De(t) {
    var r = ye(t) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(t.constructor.prototype, r), u = "" + t[r];
    if (!t.hasOwnProperty(r) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var f = s.get, m = s.set;
      return Object.defineProperty(t, r, { configurable: !0, get: function() {
        return f.call(this);
      }, set: function(w) {
        u = "" + w, m.call(this, w);
      } }), Object.defineProperty(t, r, { enumerable: s.enumerable }), { getValue: function() {
        return u;
      }, setValue: function(w) {
        u = "" + w;
      }, stopTracking: function() {
        t._valueTracker = null, delete t[r];
      } };
    }
  }
  function ve(t) {
    t._valueTracker || (t._valueTracker = De(t));
  }
  function Je(t) {
    if (!t) return !1;
    var r = t._valueTracker;
    if (!r) return !0;
    var s = r.getValue(), u = "";
    return t && (u = ye(t) ? t.checked ? "true" : "false" : t.value), t = u, t !== s ? (r.setValue(t), !0) : !1;
  }
  function Yt(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function eo(t, r) {
    var s = r.checked;
    return G({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? t._wrapperState.initialChecked });
  }
  function gs(t, r) {
    var s = r.defaultValue == null ? "" : r.defaultValue, u = r.checked != null ? r.checked : r.defaultChecked;
    s = he(r.value != null ? r.value : s), t._wrapperState = { initialChecked: u, initialValue: s, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function to(t, r) {
    r = r.checked, r != null && A(t, "checked", r, !1);
  }
  function ni(t, r) {
    to(t, r);
    var s = he(r.value), u = r.type;
    if (s != null) u === "number" ? (s === 0 && t.value === "" || t.value != s) && (t.value = "" + s) : t.value !== "" + s && (t.value = "" + s);
    else if (u === "submit" || u === "reset") {
      t.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? Tt(t, r.type, s) : r.hasOwnProperty("defaultValue") && Tt(t, r.type, he(r.defaultValue)), r.checked == null && r.defaultChecked != null && (t.defaultChecked = !!r.defaultChecked);
  }
  function ri(t, r, s) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var u = r.type;
      if (!(u !== "submit" && u !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + t._wrapperState.initialValue, s || r === t.value || (t.value = r), t.defaultValue = r;
    }
    s = t.name, s !== "" && (t.name = ""), t.defaultChecked = !!t._wrapperState.initialChecked, s !== "" && (t.name = s);
  }
  function Tt(t, r, s) {
    (r !== "number" || Yt(t.ownerDocument) !== t) && (s == null ? t.defaultValue = "" + t._wrapperState.initialValue : t.defaultValue !== "" + s && (t.defaultValue = "" + s));
  }
  var Er = Array.isArray;
  function Un(t, r, s, u) {
    if (t = t.options, r) {
      r = {};
      for (var f = 0; f < s.length; f++) r["$" + s[f]] = !0;
      for (s = 0; s < t.length; s++) f = r.hasOwnProperty("$" + t[s].value), t[s].selected !== f && (t[s].selected = f), f && u && (t[s].defaultSelected = !0);
    } else {
      for (s = "" + he(s), r = null, f = 0; f < t.length; f++) {
        if (t[f].value === s) {
          t[f].selected = !0, u && (t[f].defaultSelected = !0);
          return;
        }
        r !== null || t[f].disabled || (r = t[f]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function oi(t, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(o(91));
    return G({}, r, { value: void 0, defaultValue: void 0, children: "" + t._wrapperState.initialValue });
  }
  function ys(t, r) {
    var s = r.value;
    if (s == null) {
      if (s = r.children, r = r.defaultValue, s != null) {
        if (r != null) throw Error(o(92));
        if (Er(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0];
        }
        r = s;
      }
      r == null && (r = ""), s = r;
    }
    t._wrapperState = { initialValue: he(s) };
  }
  function vs(t, r) {
    var s = he(r.value), u = he(r.defaultValue);
    s != null && (s = "" + s, s !== t.value && (t.value = s), r.defaultValue == null && t.defaultValue !== s && (t.defaultValue = s)), u != null && (t.defaultValue = "" + u);
  }
  function Rl(t) {
    var r = t.textContent;
    r === t._wrapperState.initialValue && r !== "" && r !== null && (t.value = r);
  }
  function xs(t) {
    switch (t) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function ii(t, r) {
    return t == null || t === "http://www.w3.org/1999/xhtml" ? xs(r) : t === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : t;
  }
  var no, si = (function(t) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, s, u, f) {
      MSApp.execUnsafeLocalFunction(function() {
        return t(r, s, u, f);
      });
    } : t;
  })(function(t, r) {
    if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t) t.innerHTML = r;
    else {
      for (no = no || document.createElement("div"), no.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = no.firstChild; t.firstChild; ) t.removeChild(t.firstChild);
      for (; r.firstChild; ) t.appendChild(r.firstChild);
    }
  });
  function kn(t, r) {
    if (r) {
      var s = t.firstChild;
      if (s && s === t.lastChild && s.nodeType === 3) {
        s.nodeValue = r;
        return;
      }
    }
    t.textContent = r;
  }
  var Ot = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Wn = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ot).forEach(function(t) {
    Wn.forEach(function(r) {
      r = r + t.charAt(0).toUpperCase() + t.substring(1), Ot[r] = Ot[t];
    });
  });
  function ws(t, r, s) {
    return r == null || typeof r == "boolean" || r === "" ? "" : s || typeof r != "number" || r === 0 || Ot.hasOwnProperty(t) && Ot[t] ? ("" + r).trim() : r + "px";
  }
  function Ss(t, r) {
    t = t.style;
    for (var s in r) if (r.hasOwnProperty(s)) {
      var u = s.indexOf("--") === 0, f = ws(s, r[s], u);
      s === "float" && (s = "cssFloat"), u ? t.setProperty(s, f) : t[s] = f;
    }
  }
  var Cs = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function kr(t, r) {
    if (r) {
      if (Cs[t] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(o(137, t));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(o(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(o(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(o(62));
    }
  }
  function ai(t, r) {
    if (t.indexOf("-") === -1) return typeof r.is == "string";
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Hn = null;
  function li(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Q = null, fe = null, Me = null;
  function Le(t) {
    if (t = Ri(t)) {
      if (typeof Q != "function") throw Error(o(280));
      var r = t.stateNode;
      r && (r = Us(r), Q(t.stateNode, t.type, r));
    }
  }
  function pt(t) {
    fe ? Me ? Me.push(t) : Me = [t] : fe = t;
  }
  function xt() {
    if (fe) {
      var t = fe, r = Me;
      if (Me = fe = null, Le(t), r) for (t = 0; t < r.length; t++) Le(r[t]);
    }
  }
  function It(t, r) {
    return t(r);
  }
  function Kn() {
  }
  var Gt = !1;
  function ro(t, r, s) {
    if (Gt) return t(r, s);
    Gt = !0;
    try {
      return It(t, r, s);
    } finally {
      Gt = !1, (fe !== null || Me !== null) && (Kn(), xt());
    }
  }
  function Pn(t, r) {
    var s = t.stateNode;
    if (s === null) return null;
    var u = Us(s);
    if (u === null) return null;
    s = u[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (u = !u.disabled) || (t = t.type, u = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !u;
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (s && typeof s != "function") throw Error(o(231, r, typeof s));
    return s;
  }
  var Pr = !1;
  if (d) try {
    var ot = {};
    Object.defineProperty(ot, "passive", { get: function() {
      Pr = !0;
    } }), window.addEventListener("test", ot, ot), window.removeEventListener("test", ot, ot);
  } catch {
    Pr = !1;
  }
  function Nl(t, r, s, u, f, m, w, P, N) {
    var $ = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(s, $);
    } catch (K) {
      this.onError(K);
    }
  }
  var Tr = !1, it = null, Yn = !1, ui = null, Dl = { onError: function(t) {
    Tr = !0, it = t;
  } };
  function Nw(t, r, s, u, f, m, w, P, N) {
    Tr = !1, it = null, Nl.apply(Dl, arguments);
  }
  function Dw(t, r, s, u, f, m, w, P, N) {
    if (Nw.apply(this, arguments), Tr) {
      if (Tr) {
        var $ = it;
        Tr = !1, it = null;
      } else throw Error(o(198));
      Yn || (Yn = !0, ui = $);
    }
  }
  function Rr(t) {
    var r = t, s = t;
    if (t.alternate) for (; r.return; ) r = r.return;
    else {
      t = r;
      do
        r = t, (r.flags & 4098) !== 0 && (s = r.return), t = r.return;
      while (t);
    }
    return r.tag === 3 ? s : null;
  }
  function Wf(t) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (r === null && (t = t.alternate, t !== null && (r = t.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function Hf(t) {
    if (Rr(t) !== t) throw Error(o(188));
  }
  function Aw(t) {
    var r = t.alternate;
    if (!r) {
      if (r = Rr(t), r === null) throw Error(o(188));
      return r !== t ? null : t;
    }
    for (var s = t, u = r; ; ) {
      var f = s.return;
      if (f === null) break;
      var m = f.alternate;
      if (m === null) {
        if (u = f.return, u !== null) {
          s = u;
          continue;
        }
        break;
      }
      if (f.child === m.child) {
        for (m = f.child; m; ) {
          if (m === s) return Hf(f), t;
          if (m === u) return Hf(f), r;
          m = m.sibling;
        }
        throw Error(o(188));
      }
      if (s.return !== u.return) s = f, u = m;
      else {
        for (var w = !1, P = f.child; P; ) {
          if (P === s) {
            w = !0, s = f, u = m;
            break;
          }
          if (P === u) {
            w = !0, u = f, s = m;
            break;
          }
          P = P.sibling;
        }
        if (!w) {
          for (P = m.child; P; ) {
            if (P === s) {
              w = !0, s = m, u = f;
              break;
            }
            if (P === u) {
              w = !0, u = m, s = f;
              break;
            }
            P = P.sibling;
          }
          if (!w) throw Error(o(189));
        }
      }
      if (s.alternate !== u) throw Error(o(190));
    }
    if (s.tag !== 3) throw Error(o(188));
    return s.stateNode.current === s ? t : r;
  }
  function Kf(t) {
    return t = Aw(t), t !== null ? Yf(t) : null;
  }
  function Yf(t) {
    if (t.tag === 5 || t.tag === 6) return t;
    for (t = t.child; t !== null; ) {
      var r = Yf(t);
      if (r !== null) return r;
      t = t.sibling;
    }
    return null;
  }
  var Gf = n.unstable_scheduleCallback, Xf = n.unstable_cancelCallback, Mw = n.unstable_shouldYield, Lw = n.unstable_requestPaint, He = n.unstable_now, jw = n.unstable_getCurrentPriorityLevel, Al = n.unstable_ImmediatePriority, Qf = n.unstable_UserBlockingPriority, bs = n.unstable_NormalPriority, Ow = n.unstable_LowPriority, Zf = n.unstable_IdlePriority, Es = null, cn = null;
  function Iw(t) {
    if (cn && typeof cn.onCommitFiberRoot == "function") try {
      cn.onCommitFiberRoot(Es, t, void 0, (t.current.flags & 128) === 128);
    } catch {
    }
  }
  var Xt = Math.clz32 ? Math.clz32 : Vw, _w = Math.log, Fw = Math.LN2;
  function Vw(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (_w(t) / Fw | 0) | 0;
  }
  var ks = 64, Ps = 4194304;
  function ci(t) {
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return t & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return t;
    }
  }
  function Ts(t, r) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var u = 0, f = t.suspendedLanes, m = t.pingedLanes, w = s & 268435455;
    if (w !== 0) {
      var P = w & ~f;
      P !== 0 ? u = ci(P) : (m &= w, m !== 0 && (u = ci(m)));
    } else w = s & ~f, w !== 0 ? u = ci(w) : m !== 0 && (u = ci(m));
    if (u === 0) return 0;
    if (r !== 0 && r !== u && (r & f) === 0 && (f = u & -u, m = r & -r, f >= m || f === 16 && (m & 4194240) !== 0)) return r;
    if ((u & 4) !== 0 && (u |= s & 16), r = t.entangledLanes, r !== 0) for (t = t.entanglements, r &= u; 0 < r; ) s = 31 - Xt(r), f = 1 << s, u |= t[s], r &= ~f;
    return u;
  }
  function $w(t, r) {
    switch (t) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function zw(t, r) {
    for (var s = t.suspendedLanes, u = t.pingedLanes, f = t.expirationTimes, m = t.pendingLanes; 0 < m; ) {
      var w = 31 - Xt(m), P = 1 << w, N = f[w];
      N === -1 ? ((P & s) === 0 || (P & u) !== 0) && (f[w] = $w(P, r)) : N <= r && (t.expiredLanes |= P), m &= ~P;
    }
  }
  function Ml(t) {
    return t = t.pendingLanes & -1073741825, t !== 0 ? t : t & 1073741824 ? 1073741824 : 0;
  }
  function qf() {
    var t = ks;
    return ks <<= 1, (ks & 4194240) === 0 && (ks = 64), t;
  }
  function Ll(t) {
    for (var r = [], s = 0; 31 > s; s++) r.push(t);
    return r;
  }
  function di(t, r, s) {
    t.pendingLanes |= r, r !== 536870912 && (t.suspendedLanes = 0, t.pingedLanes = 0), t = t.eventTimes, r = 31 - Xt(r), t[r] = s;
  }
  function Bw(t, r) {
    var s = t.pendingLanes & ~r;
    t.pendingLanes = r, t.suspendedLanes = 0, t.pingedLanes = 0, t.expiredLanes &= r, t.mutableReadLanes &= r, t.entangledLanes &= r, r = t.entanglements;
    var u = t.eventTimes;
    for (t = t.expirationTimes; 0 < s; ) {
      var f = 31 - Xt(s), m = 1 << f;
      r[f] = 0, u[f] = -1, t[f] = -1, s &= ~m;
    }
  }
  function jl(t, r) {
    var s = t.entangledLanes |= r;
    for (t = t.entanglements; s; ) {
      var u = 31 - Xt(s), f = 1 << u;
      f & r | t[u] & r && (t[u] |= r), s &= ~f;
    }
  }
  var Ne = 0;
  function Jf(t) {
    return t &= -t, 1 < t ? 4 < t ? (t & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var eh, Ol, th, nh, rh, Il = !1, Rs = [], Gn = null, Xn = null, Qn = null, fi = /* @__PURE__ */ new Map(), hi = /* @__PURE__ */ new Map(), Zn = [], Uw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function oh(t, r) {
    switch (t) {
      case "focusin":
      case "focusout":
        Gn = null;
        break;
      case "dragenter":
      case "dragleave":
        Xn = null;
        break;
      case "mouseover":
      case "mouseout":
        Qn = null;
        break;
      case "pointerover":
      case "pointerout":
        fi.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        hi.delete(r.pointerId);
    }
  }
  function pi(t, r, s, u, f, m) {
    return t === null || t.nativeEvent !== m ? (t = { blockedOn: r, domEventName: s, eventSystemFlags: u, nativeEvent: m, targetContainers: [f] }, r !== null && (r = Ri(r), r !== null && Ol(r)), t) : (t.eventSystemFlags |= u, r = t.targetContainers, f !== null && r.indexOf(f) === -1 && r.push(f), t);
  }
  function Ww(t, r, s, u, f) {
    switch (r) {
      case "focusin":
        return Gn = pi(Gn, t, r, s, u, f), !0;
      case "dragenter":
        return Xn = pi(Xn, t, r, s, u, f), !0;
      case "mouseover":
        return Qn = pi(Qn, t, r, s, u, f), !0;
      case "pointerover":
        var m = f.pointerId;
        return fi.set(m, pi(fi.get(m) || null, t, r, s, u, f)), !0;
      case "gotpointercapture":
        return m = f.pointerId, hi.set(m, pi(hi.get(m) || null, t, r, s, u, f)), !0;
    }
    return !1;
  }
  function ih(t) {
    var r = Nr(t.target);
    if (r !== null) {
      var s = Rr(r);
      if (s !== null) {
        if (r = s.tag, r === 13) {
          if (r = Wf(s), r !== null) {
            t.blockedOn = r, rh(t.priority, function() {
              th(s);
            });
            return;
          }
        } else if (r === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ns(t) {
    if (t.blockedOn !== null) return !1;
    for (var r = t.targetContainers; 0 < r.length; ) {
      var s = Fl(t.domEventName, t.eventSystemFlags, r[0], t.nativeEvent);
      if (s === null) {
        s = t.nativeEvent;
        var u = new s.constructor(s.type, s);
        Hn = u, s.target.dispatchEvent(u), Hn = null;
      } else return r = Ri(s), r !== null && Ol(r), t.blockedOn = s, !1;
      r.shift();
    }
    return !0;
  }
  function sh(t, r, s) {
    Ns(t) && s.delete(r);
  }
  function Hw() {
    Il = !1, Gn !== null && Ns(Gn) && (Gn = null), Xn !== null && Ns(Xn) && (Xn = null), Qn !== null && Ns(Qn) && (Qn = null), fi.forEach(sh), hi.forEach(sh);
  }
  function mi(t, r) {
    t.blockedOn === r && (t.blockedOn = null, Il || (Il = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, Hw)));
  }
  function gi(t) {
    function r(f) {
      return mi(f, t);
    }
    if (0 < Rs.length) {
      mi(Rs[0], t);
      for (var s = 1; s < Rs.length; s++) {
        var u = Rs[s];
        u.blockedOn === t && (u.blockedOn = null);
      }
    }
    for (Gn !== null && mi(Gn, t), Xn !== null && mi(Xn, t), Qn !== null && mi(Qn, t), fi.forEach(r), hi.forEach(r), s = 0; s < Zn.length; s++) u = Zn[s], u.blockedOn === t && (u.blockedOn = null);
    for (; 0 < Zn.length && (s = Zn[0], s.blockedOn === null); ) ih(s), s.blockedOn === null && Zn.shift();
  }
  var oo = F.ReactCurrentBatchConfig, Ds = !0;
  function Kw(t, r, s, u) {
    var f = Ne, m = oo.transition;
    oo.transition = null;
    try {
      Ne = 1, _l(t, r, s, u);
    } finally {
      Ne = f, oo.transition = m;
    }
  }
  function Yw(t, r, s, u) {
    var f = Ne, m = oo.transition;
    oo.transition = null;
    try {
      Ne = 4, _l(t, r, s, u);
    } finally {
      Ne = f, oo.transition = m;
    }
  }
  function _l(t, r, s, u) {
    if (Ds) {
      var f = Fl(t, r, s, u);
      if (f === null) tu(t, r, u, As, s), oh(t, u);
      else if (Ww(f, t, r, s, u)) u.stopPropagation();
      else if (oh(t, u), r & 4 && -1 < Uw.indexOf(t)) {
        for (; f !== null; ) {
          var m = Ri(f);
          if (m !== null && eh(m), m = Fl(t, r, s, u), m === null && tu(t, r, u, As, s), m === f) break;
          f = m;
        }
        f !== null && u.stopPropagation();
      } else tu(t, r, u, null, s);
    }
  }
  var As = null;
  function Fl(t, r, s, u) {
    if (As = null, t = li(u), t = Nr(t), t !== null) if (r = Rr(t), r === null) t = null;
    else if (s = r.tag, s === 13) {
      if (t = Wf(r), t !== null) return t;
      t = null;
    } else if (s === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      t = null;
    } else r !== t && (t = null);
    return As = t, null;
  }
  function ah(t) {
    switch (t) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (jw()) {
          case Al:
            return 1;
          case Qf:
            return 4;
          case bs:
          case Ow:
            return 16;
          case Zf:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var qn = null, Vl = null, Ms = null;
  function lh() {
    if (Ms) return Ms;
    var t, r = Vl, s = r.length, u, f = "value" in qn ? qn.value : qn.textContent, m = f.length;
    for (t = 0; t < s && r[t] === f[t]; t++) ;
    var w = s - t;
    for (u = 1; u <= w && r[s - u] === f[m - u]; u++) ;
    return Ms = f.slice(t, 1 < u ? 1 - u : void 0);
  }
  function Ls(t) {
    var r = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && r === 13 && (t = 13)) : t = r, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function js() {
    return !0;
  }
  function uh() {
    return !1;
  }
  function Rt(t) {
    function r(s, u, f, m, w) {
      this._reactName = s, this._targetInst = f, this.type = u, this.nativeEvent = m, this.target = w, this.currentTarget = null;
      for (var P in t) t.hasOwnProperty(P) && (s = t[P], this[P] = s ? s(m) : m[P]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? js : uh, this.isPropagationStopped = uh, this;
    }
    return G(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = js);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = js);
    }, persist: function() {
    }, isPersistent: js }), r;
  }
  var io = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
    return t.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, $l = Rt(io), yi = G({}, io, { view: 0, detail: 0 }), Gw = Rt(yi), zl, Bl, vi, Os = G({}, yi, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Wl, button: 0, buttons: 0, relatedTarget: function(t) {
    return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
  }, movementX: function(t) {
    return "movementX" in t ? t.movementX : (t !== vi && (vi && t.type === "mousemove" ? (zl = t.screenX - vi.screenX, Bl = t.screenY - vi.screenY) : Bl = zl = 0, vi = t), zl);
  }, movementY: function(t) {
    return "movementY" in t ? t.movementY : Bl;
  } }), ch = Rt(Os), Xw = G({}, Os, { dataTransfer: 0 }), Qw = Rt(Xw), Zw = G({}, yi, { relatedTarget: 0 }), Ul = Rt(Zw), qw = G({}, io, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Jw = Rt(qw), eS = G({}, io, { clipboardData: function(t) {
    return "clipboardData" in t ? t.clipboardData : window.clipboardData;
  } }), tS = Rt(eS), nS = G({}, io, { data: 0 }), dh = Rt(nS), rS = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, oS = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, iS = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function sS(t) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(t) : (t = iS[t]) ? !!r[t] : !1;
  }
  function Wl() {
    return sS;
  }
  var aS = G({}, yi, { key: function(t) {
    if (t.key) {
      var r = rS[t.key] || t.key;
      if (r !== "Unidentified") return r;
    }
    return t.type === "keypress" ? (t = Ls(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? oS[t.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Wl, charCode: function(t) {
    return t.type === "keypress" ? Ls(t) : 0;
  }, keyCode: function(t) {
    return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
  }, which: function(t) {
    return t.type === "keypress" ? Ls(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
  } }), lS = Rt(aS), uS = G({}, Os, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), fh = Rt(uS), cS = G({}, yi, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Wl }), dS = Rt(cS), fS = G({}, io, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), hS = Rt(fS), pS = G({}, Os, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mS = Rt(pS), gS = [9, 13, 27, 32], Hl = d && "CompositionEvent" in window, xi = null;
  d && "documentMode" in document && (xi = document.documentMode);
  var yS = d && "TextEvent" in window && !xi, hh = d && (!Hl || xi && 8 < xi && 11 >= xi), ph = " ", mh = !1;
  function gh(t, r) {
    switch (t) {
      case "keyup":
        return gS.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function yh(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var so = !1;
  function vS(t, r) {
    switch (t) {
      case "compositionend":
        return yh(r);
      case "keypress":
        return r.which !== 32 ? null : (mh = !0, ph);
      case "textInput":
        return t = r.data, t === ph && mh ? null : t;
      default:
        return null;
    }
  }
  function xS(t, r) {
    if (so) return t === "compositionend" || !Hl && gh(t, r) ? (t = lh(), Ms = Vl = qn = null, so = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return hh && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var wS = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function vh(t) {
    var r = t && t.nodeName && t.nodeName.toLowerCase();
    return r === "input" ? !!wS[t.type] : r === "textarea";
  }
  function xh(t, r, s, u) {
    pt(u), r = $s(r, "onChange"), 0 < r.length && (s = new $l("onChange", "change", null, s, u), t.push({ event: s, listeners: r }));
  }
  var wi = null, Si = null;
  function SS(t) {
    _h(t, 0);
  }
  function Is(t) {
    var r = fo(t);
    if (Je(r)) return t;
  }
  function CS(t, r) {
    if (t === "change") return r;
  }
  var wh = !1;
  if (d) {
    var Kl;
    if (d) {
      var Yl = "oninput" in document;
      if (!Yl) {
        var Sh = document.createElement("div");
        Sh.setAttribute("oninput", "return;"), Yl = typeof Sh.oninput == "function";
      }
      Kl = Yl;
    } else Kl = !1;
    wh = Kl && (!document.documentMode || 9 < document.documentMode);
  }
  function Ch() {
    wi && (wi.detachEvent("onpropertychange", bh), Si = wi = null);
  }
  function bh(t) {
    if (t.propertyName === "value" && Is(Si)) {
      var r = [];
      xh(r, Si, t, li(t)), ro(SS, r);
    }
  }
  function bS(t, r, s) {
    t === "focusin" ? (Ch(), wi = r, Si = s, wi.attachEvent("onpropertychange", bh)) : t === "focusout" && Ch();
  }
  function ES(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") return Is(Si);
  }
  function kS(t, r) {
    if (t === "click") return Is(r);
  }
  function PS(t, r) {
    if (t === "input" || t === "change") return Is(r);
  }
  function TS(t, r) {
    return t === r && (t !== 0 || 1 / t === 1 / r) || t !== t && r !== r;
  }
  var Qt = typeof Object.is == "function" ? Object.is : TS;
  function Ci(t, r) {
    if (Qt(t, r)) return !0;
    if (typeof t != "object" || t === null || typeof r != "object" || r === null) return !1;
    var s = Object.keys(t), u = Object.keys(r);
    if (s.length !== u.length) return !1;
    for (u = 0; u < s.length; u++) {
      var f = s[u];
      if (!h.call(r, f) || !Qt(t[f], r[f])) return !1;
    }
    return !0;
  }
  function Eh(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function kh(t, r) {
    var s = Eh(t);
    t = 0;
    for (var u; s; ) {
      if (s.nodeType === 3) {
        if (u = t + s.textContent.length, t <= r && u >= r) return { node: s, offset: r - t };
        t = u;
      }
      e: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break e;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = Eh(s);
    }
  }
  function Ph(t, r) {
    return t && r ? t === r ? !0 : t && t.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Ph(t, r.parentNode) : "contains" in t ? t.contains(r) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function Th() {
    for (var t = window, r = Yt(); r instanceof t.HTMLIFrameElement; ) {
      try {
        var s = typeof r.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) t = r.contentWindow;
      else break;
      r = Yt(t.document);
    }
    return r;
  }
  function Gl(t) {
    var r = t && t.nodeName && t.nodeName.toLowerCase();
    return r && (r === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || r === "textarea" || t.contentEditable === "true");
  }
  function RS(t) {
    var r = Th(), s = t.focusedElem, u = t.selectionRange;
    if (r !== s && s && s.ownerDocument && Ph(s.ownerDocument.documentElement, s)) {
      if (u !== null && Gl(s)) {
        if (r = u.start, t = u.end, t === void 0 && (t = r), "selectionStart" in s) s.selectionStart = r, s.selectionEnd = Math.min(t, s.value.length);
        else if (t = (r = s.ownerDocument || document) && r.defaultView || window, t.getSelection) {
          t = t.getSelection();
          var f = s.textContent.length, m = Math.min(u.start, f);
          u = u.end === void 0 ? m : Math.min(u.end, f), !t.extend && m > u && (f = u, u = m, m = f), f = kh(s, m);
          var w = kh(
            s,
            u
          );
          f && w && (t.rangeCount !== 1 || t.anchorNode !== f.node || t.anchorOffset !== f.offset || t.focusNode !== w.node || t.focusOffset !== w.offset) && (r = r.createRange(), r.setStart(f.node, f.offset), t.removeAllRanges(), m > u ? (t.addRange(r), t.extend(w.node, w.offset)) : (r.setEnd(w.node, w.offset), t.addRange(r)));
        }
      }
      for (r = [], t = s; t = t.parentNode; ) t.nodeType === 1 && r.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
      for (typeof s.focus == "function" && s.focus(), s = 0; s < r.length; s++) t = r[s], t.element.scrollLeft = t.left, t.element.scrollTop = t.top;
    }
  }
  var NS = d && "documentMode" in document && 11 >= document.documentMode, ao = null, Xl = null, bi = null, Ql = !1;
  function Rh(t, r, s) {
    var u = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Ql || ao == null || ao !== Yt(u) || (u = ao, "selectionStart" in u && Gl(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = { anchorNode: u.anchorNode, anchorOffset: u.anchorOffset, focusNode: u.focusNode, focusOffset: u.focusOffset }), bi && Ci(bi, u) || (bi = u, u = $s(Xl, "onSelect"), 0 < u.length && (r = new $l("onSelect", "select", null, r, s), t.push({ event: r, listeners: u }), r.target = ao)));
  }
  function _s(t, r) {
    var s = {};
    return s[t.toLowerCase()] = r.toLowerCase(), s["Webkit" + t] = "webkit" + r, s["Moz" + t] = "moz" + r, s;
  }
  var lo = { animationend: _s("Animation", "AnimationEnd"), animationiteration: _s("Animation", "AnimationIteration"), animationstart: _s("Animation", "AnimationStart"), transitionend: _s("Transition", "TransitionEnd") }, Zl = {}, Nh = {};
  d && (Nh = document.createElement("div").style, "AnimationEvent" in window || (delete lo.animationend.animation, delete lo.animationiteration.animation, delete lo.animationstart.animation), "TransitionEvent" in window || delete lo.transitionend.transition);
  function Fs(t) {
    if (Zl[t]) return Zl[t];
    if (!lo[t]) return t;
    var r = lo[t], s;
    for (s in r) if (r.hasOwnProperty(s) && s in Nh) return Zl[t] = r[s];
    return t;
  }
  var Dh = Fs("animationend"), Ah = Fs("animationiteration"), Mh = Fs("animationstart"), Lh = Fs("transitionend"), jh = /* @__PURE__ */ new Map(), Oh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Jn(t, r) {
    jh.set(t, r), l(r, [t]);
  }
  for (var ql = 0; ql < Oh.length; ql++) {
    var Jl = Oh[ql], DS = Jl.toLowerCase(), AS = Jl[0].toUpperCase() + Jl.slice(1);
    Jn(DS, "on" + AS);
  }
  Jn(Dh, "onAnimationEnd"), Jn(Ah, "onAnimationIteration"), Jn(Mh, "onAnimationStart"), Jn("dblclick", "onDoubleClick"), Jn("focusin", "onFocus"), Jn("focusout", "onBlur"), Jn(Lh, "onTransitionEnd"), c("onMouseEnter", ["mouseout", "mouseover"]), c("onMouseLeave", ["mouseout", "mouseover"]), c("onPointerEnter", ["pointerout", "pointerover"]), c("onPointerLeave", ["pointerout", "pointerover"]), l("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), l("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), l("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Ei = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), MS = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ei));
  function Ih(t, r, s) {
    var u = t.type || "unknown-event";
    t.currentTarget = s, Dw(u, r, void 0, t), t.currentTarget = null;
  }
  function _h(t, r) {
    r = (r & 4) !== 0;
    for (var s = 0; s < t.length; s++) {
      var u = t[s], f = u.event;
      u = u.listeners;
      e: {
        var m = void 0;
        if (r) for (var w = u.length - 1; 0 <= w; w--) {
          var P = u[w], N = P.instance, $ = P.currentTarget;
          if (P = P.listener, N !== m && f.isPropagationStopped()) break e;
          Ih(f, P, $), m = N;
        }
        else for (w = 0; w < u.length; w++) {
          if (P = u[w], N = P.instance, $ = P.currentTarget, P = P.listener, N !== m && f.isPropagationStopped()) break e;
          Ih(f, P, $), m = N;
        }
      }
    }
    if (Yn) throw t = ui, Yn = !1, ui = null, t;
  }
  function je(t, r) {
    var s = r[au];
    s === void 0 && (s = r[au] = /* @__PURE__ */ new Set());
    var u = t + "__bubble";
    s.has(u) || (Fh(r, t, 2, !1), s.add(u));
  }
  function eu(t, r, s) {
    var u = 0;
    r && (u |= 4), Fh(s, t, u, r);
  }
  var Vs = "_reactListening" + Math.random().toString(36).slice(2);
  function ki(t) {
    if (!t[Vs]) {
      t[Vs] = !0, i.forEach(function(s) {
        s !== "selectionchange" && (MS.has(s) || eu(s, !1, t), eu(s, !0, t));
      });
      var r = t.nodeType === 9 ? t : t.ownerDocument;
      r === null || r[Vs] || (r[Vs] = !0, eu("selectionchange", !1, r));
    }
  }
  function Fh(t, r, s, u) {
    switch (ah(r)) {
      case 1:
        var f = Kw;
        break;
      case 4:
        f = Yw;
        break;
      default:
        f = _l;
    }
    s = f.bind(null, r, s, t), f = void 0, !Pr || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (f = !0), u ? f !== void 0 ? t.addEventListener(r, s, { capture: !0, passive: f }) : t.addEventListener(r, s, !0) : f !== void 0 ? t.addEventListener(r, s, { passive: f }) : t.addEventListener(r, s, !1);
  }
  function tu(t, r, s, u, f) {
    var m = u;
    if ((r & 1) === 0 && (r & 2) === 0 && u !== null) e: for (; ; ) {
      if (u === null) return;
      var w = u.tag;
      if (w === 3 || w === 4) {
        var P = u.stateNode.containerInfo;
        if (P === f || P.nodeType === 8 && P.parentNode === f) break;
        if (w === 4) for (w = u.return; w !== null; ) {
          var N = w.tag;
          if ((N === 3 || N === 4) && (N = w.stateNode.containerInfo, N === f || N.nodeType === 8 && N.parentNode === f)) return;
          w = w.return;
        }
        for (; P !== null; ) {
          if (w = Nr(P), w === null) return;
          if (N = w.tag, N === 5 || N === 6) {
            u = m = w;
            continue e;
          }
          P = P.parentNode;
        }
      }
      u = u.return;
    }
    ro(function() {
      var $ = m, K = li(s), Y = [];
      e: {
        var H = jh.get(t);
        if (H !== void 0) {
          var re = $l, ae = t;
          switch (t) {
            case "keypress":
              if (Ls(s) === 0) break e;
            case "keydown":
            case "keyup":
              re = lS;
              break;
            case "focusin":
              ae = "focus", re = Ul;
              break;
            case "focusout":
              ae = "blur", re = Ul;
              break;
            case "beforeblur":
            case "afterblur":
              re = Ul;
              break;
            case "click":
              if (s.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              re = ch;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              re = Qw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              re = dS;
              break;
            case Dh:
            case Ah:
            case Mh:
              re = Jw;
              break;
            case Lh:
              re = hS;
              break;
            case "scroll":
              re = Gw;
              break;
            case "wheel":
              re = mS;
              break;
            case "copy":
            case "cut":
            case "paste":
              re = tS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              re = fh;
          }
          var ce = (r & 4) !== 0, Ke = !ce && t === "scroll", I = ce ? H !== null ? H + "Capture" : null : H;
          ce = [];
          for (var M = $, _; M !== null; ) {
            _ = M;
            var Z = _.stateNode;
            if (_.tag === 5 && Z !== null && (_ = Z, I !== null && (Z = Pn(M, I), Z != null && ce.push(Pi(M, Z, _)))), Ke) break;
            M = M.return;
          }
          0 < ce.length && (H = new re(H, ae, null, s, K), Y.push({ event: H, listeners: ce }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (H = t === "mouseover" || t === "pointerover", re = t === "mouseout" || t === "pointerout", H && s !== Hn && (ae = s.relatedTarget || s.fromElement) && (Nr(ae) || ae[Tn])) break e;
          if ((re || H) && (H = K.window === K ? K : (H = K.ownerDocument) ? H.defaultView || H.parentWindow : window, re ? (ae = s.relatedTarget || s.toElement, re = $, ae = ae ? Nr(ae) : null, ae !== null && (Ke = Rr(ae), ae !== Ke || ae.tag !== 5 && ae.tag !== 6) && (ae = null)) : (re = null, ae = $), re !== ae)) {
            if (ce = ch, Z = "onMouseLeave", I = "onMouseEnter", M = "mouse", (t === "pointerout" || t === "pointerover") && (ce = fh, Z = "onPointerLeave", I = "onPointerEnter", M = "pointer"), Ke = re == null ? H : fo(re), _ = ae == null ? H : fo(ae), H = new ce(Z, M + "leave", re, s, K), H.target = Ke, H.relatedTarget = _, Z = null, Nr(K) === $ && (ce = new ce(I, M + "enter", ae, s, K), ce.target = _, ce.relatedTarget = Ke, Z = ce), Ke = Z, re && ae) t: {
              for (ce = re, I = ae, M = 0, _ = ce; _; _ = uo(_)) M++;
              for (_ = 0, Z = I; Z; Z = uo(Z)) _++;
              for (; 0 < M - _; ) ce = uo(ce), M--;
              for (; 0 < _ - M; ) I = uo(I), _--;
              for (; M--; ) {
                if (ce === I || I !== null && ce === I.alternate) break t;
                ce = uo(ce), I = uo(I);
              }
              ce = null;
            }
            else ce = null;
            re !== null && Vh(Y, H, re, ce, !1), ae !== null && Ke !== null && Vh(Y, Ke, ae, ce, !0);
          }
        }
        e: {
          if (H = $ ? fo($) : window, re = H.nodeName && H.nodeName.toLowerCase(), re === "select" || re === "input" && H.type === "file") var de = CS;
          else if (vh(H)) if (wh) de = PS;
          else {
            de = ES;
            var pe = bS;
          }
          else (re = H.nodeName) && re.toLowerCase() === "input" && (H.type === "checkbox" || H.type === "radio") && (de = kS);
          if (de && (de = de(t, $))) {
            xh(Y, de, s, K);
            break e;
          }
          pe && pe(t, H, $), t === "focusout" && (pe = H._wrapperState) && pe.controlled && H.type === "number" && Tt(H, "number", H.value);
        }
        switch (pe = $ ? fo($) : window, t) {
          case "focusin":
            (vh(pe) || pe.contentEditable === "true") && (ao = pe, Xl = $, bi = null);
            break;
          case "focusout":
            bi = Xl = ao = null;
            break;
          case "mousedown":
            Ql = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ql = !1, Rh(Y, s, K);
            break;
          case "selectionchange":
            if (NS) break;
          case "keydown":
          case "keyup":
            Rh(Y, s, K);
        }
        var me;
        if (Hl) e: {
          switch (t) {
            case "compositionstart":
              var Ce = "onCompositionStart";
              break e;
            case "compositionend":
              Ce = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Ce = "onCompositionUpdate";
              break e;
          }
          Ce = void 0;
        }
        else so ? gh(t, s) && (Ce = "onCompositionEnd") : t === "keydown" && s.keyCode === 229 && (Ce = "onCompositionStart");
        Ce && (hh && s.locale !== "ko" && (so || Ce !== "onCompositionStart" ? Ce === "onCompositionEnd" && so && (me = lh()) : (qn = K, Vl = "value" in qn ? qn.value : qn.textContent, so = !0)), pe = $s($, Ce), 0 < pe.length && (Ce = new dh(Ce, t, null, s, K), Y.push({ event: Ce, listeners: pe }), me ? Ce.data = me : (me = yh(s), me !== null && (Ce.data = me)))), (me = yS ? vS(t, s) : xS(t, s)) && ($ = $s($, "onBeforeInput"), 0 < $.length && (K = new dh("onBeforeInput", "beforeinput", null, s, K), Y.push({ event: K, listeners: $ }), K.data = me));
      }
      _h(Y, r);
    });
  }
  function Pi(t, r, s) {
    return { instance: t, listener: r, currentTarget: s };
  }
  function $s(t, r) {
    for (var s = r + "Capture", u = []; t !== null; ) {
      var f = t, m = f.stateNode;
      f.tag === 5 && m !== null && (f = m, m = Pn(t, s), m != null && u.unshift(Pi(t, m, f)), m = Pn(t, r), m != null && u.push(Pi(t, m, f))), t = t.return;
    }
    return u;
  }
  function uo(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5);
    return t || null;
  }
  function Vh(t, r, s, u, f) {
    for (var m = r._reactName, w = []; s !== null && s !== u; ) {
      var P = s, N = P.alternate, $ = P.stateNode;
      if (N !== null && N === u) break;
      P.tag === 5 && $ !== null && (P = $, f ? (N = Pn(s, m), N != null && w.unshift(Pi(s, N, P))) : f || (N = Pn(s, m), N != null && w.push(Pi(s, N, P)))), s = s.return;
    }
    w.length !== 0 && t.push({ event: r, listeners: w });
  }
  var LS = /\r\n?/g, jS = /\u0000|\uFFFD/g;
  function $h(t) {
    return (typeof t == "string" ? t : "" + t).replace(LS, `
`).replace(jS, "");
  }
  function zs(t, r, s) {
    if (r = $h(r), $h(t) !== r && s) throw Error(o(425));
  }
  function Bs() {
  }
  var nu = null, ru = null;
  function ou(t, r) {
    return t === "textarea" || t === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var iu = typeof setTimeout == "function" ? setTimeout : void 0, OS = typeof clearTimeout == "function" ? clearTimeout : void 0, zh = typeof Promise == "function" ? Promise : void 0, IS = typeof queueMicrotask == "function" ? queueMicrotask : typeof zh < "u" ? function(t) {
    return zh.resolve(null).then(t).catch(_S);
  } : iu;
  function _S(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function su(t, r) {
    var s = r, u = 0;
    do {
      var f = s.nextSibling;
      if (t.removeChild(s), f && f.nodeType === 8) if (s = f.data, s === "/$") {
        if (u === 0) {
          t.removeChild(f), gi(r);
          return;
        }
        u--;
      } else s !== "$" && s !== "$?" && s !== "$!" || u++;
      s = f;
    } while (s);
    gi(r);
  }
  function er(t) {
    for (; t != null; t = t.nextSibling) {
      var r = t.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = t.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return t;
  }
  function Bh(t) {
    t = t.previousSibling;
    for (var r = 0; t; ) {
      if (t.nodeType === 8) {
        var s = t.data;
        if (s === "$" || s === "$!" || s === "$?") {
          if (r === 0) return t;
          r--;
        } else s === "/$" && r++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  var co = Math.random().toString(36).slice(2), dn = "__reactFiber$" + co, Ti = "__reactProps$" + co, Tn = "__reactContainer$" + co, au = "__reactEvents$" + co, FS = "__reactListeners$" + co, VS = "__reactHandles$" + co;
  function Nr(t) {
    var r = t[dn];
    if (r) return r;
    for (var s = t.parentNode; s; ) {
      if (r = s[Tn] || s[dn]) {
        if (s = r.alternate, r.child !== null || s !== null && s.child !== null) for (t = Bh(t); t !== null; ) {
          if (s = t[dn]) return s;
          t = Bh(t);
        }
        return r;
      }
      t = s, s = t.parentNode;
    }
    return null;
  }
  function Ri(t) {
    return t = t[dn] || t[Tn], !t || t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3 ? null : t;
  }
  function fo(t) {
    if (t.tag === 5 || t.tag === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Us(t) {
    return t[Ti] || null;
  }
  var lu = [], ho = -1;
  function tr(t) {
    return { current: t };
  }
  function Oe(t) {
    0 > ho || (t.current = lu[ho], lu[ho] = null, ho--);
  }
  function Ae(t, r) {
    ho++, lu[ho] = t.current, t.current = r;
  }
  var nr = {}, ut = tr(nr), wt = tr(!1), Dr = nr;
  function po(t, r) {
    var s = t.type.contextTypes;
    if (!s) return nr;
    var u = t.stateNode;
    if (u && u.__reactInternalMemoizedUnmaskedChildContext === r) return u.__reactInternalMemoizedMaskedChildContext;
    var f = {}, m;
    for (m in s) f[m] = r[m];
    return u && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = r, t.__reactInternalMemoizedMaskedChildContext = f), f;
  }
  function St(t) {
    return t = t.childContextTypes, t != null;
  }
  function Ws() {
    Oe(wt), Oe(ut);
  }
  function Uh(t, r, s) {
    if (ut.current !== nr) throw Error(o(168));
    Ae(ut, r), Ae(wt, s);
  }
  function Wh(t, r, s) {
    var u = t.stateNode;
    if (r = r.childContextTypes, typeof u.getChildContext != "function") return s;
    u = u.getChildContext();
    for (var f in u) if (!(f in r)) throw Error(o(108, ee(t) || "Unknown", f));
    return G({}, s, u);
  }
  function Hs(t) {
    return t = (t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext || nr, Dr = ut.current, Ae(ut, t), Ae(wt, wt.current), !0;
  }
  function Hh(t, r, s) {
    var u = t.stateNode;
    if (!u) throw Error(o(169));
    s ? (t = Wh(t, r, Dr), u.__reactInternalMemoizedMergedChildContext = t, Oe(wt), Oe(ut), Ae(ut, t)) : Oe(wt), Ae(wt, s);
  }
  var Rn = null, Ks = !1, uu = !1;
  function Kh(t) {
    Rn === null ? Rn = [t] : Rn.push(t);
  }
  function $S(t) {
    Ks = !0, Kh(t);
  }
  function rr() {
    if (!uu && Rn !== null) {
      uu = !0;
      var t = 0, r = Ne;
      try {
        var s = Rn;
        for (Ne = 1; t < s.length; t++) {
          var u = s[t];
          do
            u = u(!0);
          while (u !== null);
        }
        Rn = null, Ks = !1;
      } catch (f) {
        throw Rn !== null && (Rn = Rn.slice(t + 1)), Gf(Al, rr), f;
      } finally {
        Ne = r, uu = !1;
      }
    }
    return null;
  }
  var mo = [], go = 0, Ys = null, Gs = 0, _t = [], Ft = 0, Ar = null, Nn = 1, Dn = "";
  function Mr(t, r) {
    mo[go++] = Gs, mo[go++] = Ys, Ys = t, Gs = r;
  }
  function Yh(t, r, s) {
    _t[Ft++] = Nn, _t[Ft++] = Dn, _t[Ft++] = Ar, Ar = t;
    var u = Nn;
    t = Dn;
    var f = 32 - Xt(u) - 1;
    u &= ~(1 << f), s += 1;
    var m = 32 - Xt(r) + f;
    if (30 < m) {
      var w = f - f % 5;
      m = (u & (1 << w) - 1).toString(32), u >>= w, f -= w, Nn = 1 << 32 - Xt(r) + f | s << f | u, Dn = m + t;
    } else Nn = 1 << m | s << f | u, Dn = t;
  }
  function cu(t) {
    t.return !== null && (Mr(t, 1), Yh(t, 1, 0));
  }
  function du(t) {
    for (; t === Ys; ) Ys = mo[--go], mo[go] = null, Gs = mo[--go], mo[go] = null;
    for (; t === Ar; ) Ar = _t[--Ft], _t[Ft] = null, Dn = _t[--Ft], _t[Ft] = null, Nn = _t[--Ft], _t[Ft] = null;
  }
  var Nt = null, Dt = null, Ie = !1, Zt = null;
  function Gh(t, r) {
    var s = Bt(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = r, s.return = t, r = t.deletions, r === null ? (t.deletions = [s], t.flags |= 16) : r.push(s);
  }
  function Xh(t, r) {
    switch (t.tag) {
      case 5:
        var s = t.type;
        return r = r.nodeType !== 1 || s.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (t.stateNode = r, Nt = t, Dt = er(r.firstChild), !0) : !1;
      case 6:
        return r = t.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (t.stateNode = r, Nt = t, Dt = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (s = Ar !== null ? { id: Nn, overflow: Dn } : null, t.memoizedState = { dehydrated: r, treeContext: s, retryLane: 1073741824 }, s = Bt(18, null, null, 0), s.stateNode = r, s.return = t, t.child = s, Nt = t, Dt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function fu(t) {
    return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
  }
  function hu(t) {
    if (Ie) {
      var r = Dt;
      if (r) {
        var s = r;
        if (!Xh(t, r)) {
          if (fu(t)) throw Error(o(418));
          r = er(s.nextSibling);
          var u = Nt;
          r && Xh(t, r) ? Gh(u, s) : (t.flags = t.flags & -4097 | 2, Ie = !1, Nt = t);
        }
      } else {
        if (fu(t)) throw Error(o(418));
        t.flags = t.flags & -4097 | 2, Ie = !1, Nt = t;
      }
    }
  }
  function Qh(t) {
    for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13; ) t = t.return;
    Nt = t;
  }
  function Xs(t) {
    if (t !== Nt) return !1;
    if (!Ie) return Qh(t), Ie = !0, !1;
    var r;
    if ((r = t.tag !== 3) && !(r = t.tag !== 5) && (r = t.type, r = r !== "head" && r !== "body" && !ou(t.type, t.memoizedProps)), r && (r = Dt)) {
      if (fu(t)) throw Zh(), Error(o(418));
      for (; r; ) Gh(t, r), r = er(r.nextSibling);
    }
    if (Qh(t), t.tag === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      e: {
        for (t = t.nextSibling, r = 0; t; ) {
          if (t.nodeType === 8) {
            var s = t.data;
            if (s === "/$") {
              if (r === 0) {
                Dt = er(t.nextSibling);
                break e;
              }
              r--;
            } else s !== "$" && s !== "$!" && s !== "$?" || r++;
          }
          t = t.nextSibling;
        }
        Dt = null;
      }
    } else Dt = Nt ? er(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Zh() {
    for (var t = Dt; t; ) t = er(t.nextSibling);
  }
  function yo() {
    Dt = Nt = null, Ie = !1;
  }
  function pu(t) {
    Zt === null ? Zt = [t] : Zt.push(t);
  }
  var zS = F.ReactCurrentBatchConfig;
  function Ni(t, r, s) {
    if (t = s.ref, t !== null && typeof t != "function" && typeof t != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1) throw Error(o(309));
          var u = s.stateNode;
        }
        if (!u) throw Error(o(147, t));
        var f = u, m = "" + t;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === m ? r.ref : (r = function(w) {
          var P = f.refs;
          w === null ? delete P[m] : P[m] = w;
        }, r._stringRef = m, r);
      }
      if (typeof t != "string") throw Error(o(284));
      if (!s._owner) throw Error(o(290, t));
    }
    return t;
  }
  function Qs(t, r) {
    throw t = Object.prototype.toString.call(r), Error(o(31, t === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : t));
  }
  function qh(t) {
    var r = t._init;
    return r(t._payload);
  }
  function Jh(t) {
    function r(I, M) {
      if (t) {
        var _ = I.deletions;
        _ === null ? (I.deletions = [M], I.flags |= 16) : _.push(M);
      }
    }
    function s(I, M) {
      if (!t) return null;
      for (; M !== null; ) r(I, M), M = M.sibling;
      return null;
    }
    function u(I, M) {
      for (I = /* @__PURE__ */ new Map(); M !== null; ) M.key !== null ? I.set(M.key, M) : I.set(M.index, M), M = M.sibling;
      return I;
    }
    function f(I, M) {
      return I = dr(I, M), I.index = 0, I.sibling = null, I;
    }
    function m(I, M, _) {
      return I.index = _, t ? (_ = I.alternate, _ !== null ? (_ = _.index, _ < M ? (I.flags |= 2, M) : _) : (I.flags |= 2, M)) : (I.flags |= 1048576, M);
    }
    function w(I) {
      return t && I.alternate === null && (I.flags |= 2), I;
    }
    function P(I, M, _, Z) {
      return M === null || M.tag !== 6 ? (M = ic(_, I.mode, Z), M.return = I, M) : (M = f(M, _), M.return = I, M);
    }
    function N(I, M, _, Z) {
      var de = _.type;
      return de === V ? K(I, M, _.props.children, Z, _.key) : M !== null && (M.elementType === de || typeof de == "object" && de !== null && de.$$typeof === ge && qh(de) === M.type) ? (Z = f(M, _.props), Z.ref = Ni(I, M, _), Z.return = I, Z) : (Z = wa(_.type, _.key, _.props, null, I.mode, Z), Z.ref = Ni(I, M, _), Z.return = I, Z);
    }
    function $(I, M, _, Z) {
      return M === null || M.tag !== 4 || M.stateNode.containerInfo !== _.containerInfo || M.stateNode.implementation !== _.implementation ? (M = sc(_, I.mode, Z), M.return = I, M) : (M = f(M, _.children || []), M.return = I, M);
    }
    function K(I, M, _, Z, de) {
      return M === null || M.tag !== 7 ? (M = $r(_, I.mode, Z, de), M.return = I, M) : (M = f(M, _), M.return = I, M);
    }
    function Y(I, M, _) {
      if (typeof M == "string" && M !== "" || typeof M == "number") return M = ic("" + M, I.mode, _), M.return = I, M;
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case O:
            return _ = wa(M.type, M.key, M.props, null, I.mode, _), _.ref = Ni(I, null, M), _.return = I, _;
          case B:
            return M = sc(M, I.mode, _), M.return = I, M;
          case ge:
            var Z = M._init;
            return Y(I, Z(M._payload), _);
        }
        if (Er(M) || J(M)) return M = $r(M, I.mode, _, null), M.return = I, M;
        Qs(I, M);
      }
      return null;
    }
    function H(I, M, _, Z) {
      var de = M !== null ? M.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number") return de !== null ? null : P(I, M, "" + _, Z);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case O:
            return _.key === de ? N(I, M, _, Z) : null;
          case B:
            return _.key === de ? $(I, M, _, Z) : null;
          case ge:
            return de = _._init, H(
              I,
              M,
              de(_._payload),
              Z
            );
        }
        if (Er(_) || J(_)) return de !== null ? null : K(I, M, _, Z, null);
        Qs(I, _);
      }
      return null;
    }
    function re(I, M, _, Z, de) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number") return I = I.get(_) || null, P(M, I, "" + Z, de);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case O:
            return I = I.get(Z.key === null ? _ : Z.key) || null, N(M, I, Z, de);
          case B:
            return I = I.get(Z.key === null ? _ : Z.key) || null, $(M, I, Z, de);
          case ge:
            var pe = Z._init;
            return re(I, M, _, pe(Z._payload), de);
        }
        if (Er(Z) || J(Z)) return I = I.get(_) || null, K(M, I, Z, de, null);
        Qs(M, Z);
      }
      return null;
    }
    function ae(I, M, _, Z) {
      for (var de = null, pe = null, me = M, Ce = M = 0, nt = null; me !== null && Ce < _.length; Ce++) {
        me.index > Ce ? (nt = me, me = null) : nt = me.sibling;
        var Re = H(I, me, _[Ce], Z);
        if (Re === null) {
          me === null && (me = nt);
          break;
        }
        t && me && Re.alternate === null && r(I, me), M = m(Re, M, Ce), pe === null ? de = Re : pe.sibling = Re, pe = Re, me = nt;
      }
      if (Ce === _.length) return s(I, me), Ie && Mr(I, Ce), de;
      if (me === null) {
        for (; Ce < _.length; Ce++) me = Y(I, _[Ce], Z), me !== null && (M = m(me, M, Ce), pe === null ? de = me : pe.sibling = me, pe = me);
        return Ie && Mr(I, Ce), de;
      }
      for (me = u(I, me); Ce < _.length; Ce++) nt = re(me, I, Ce, _[Ce], Z), nt !== null && (t && nt.alternate !== null && me.delete(nt.key === null ? Ce : nt.key), M = m(nt, M, Ce), pe === null ? de = nt : pe.sibling = nt, pe = nt);
      return t && me.forEach(function(fr) {
        return r(I, fr);
      }), Ie && Mr(I, Ce), de;
    }
    function ce(I, M, _, Z) {
      var de = J(_);
      if (typeof de != "function") throw Error(o(150));
      if (_ = de.call(_), _ == null) throw Error(o(151));
      for (var pe = de = null, me = M, Ce = M = 0, nt = null, Re = _.next(); me !== null && !Re.done; Ce++, Re = _.next()) {
        me.index > Ce ? (nt = me, me = null) : nt = me.sibling;
        var fr = H(I, me, Re.value, Z);
        if (fr === null) {
          me === null && (me = nt);
          break;
        }
        t && me && fr.alternate === null && r(I, me), M = m(fr, M, Ce), pe === null ? de = fr : pe.sibling = fr, pe = fr, me = nt;
      }
      if (Re.done) return s(
        I,
        me
      ), Ie && Mr(I, Ce), de;
      if (me === null) {
        for (; !Re.done; Ce++, Re = _.next()) Re = Y(I, Re.value, Z), Re !== null && (M = m(Re, M, Ce), pe === null ? de = Re : pe.sibling = Re, pe = Re);
        return Ie && Mr(I, Ce), de;
      }
      for (me = u(I, me); !Re.done; Ce++, Re = _.next()) Re = re(me, I, Ce, Re.value, Z), Re !== null && (t && Re.alternate !== null && me.delete(Re.key === null ? Ce : Re.key), M = m(Re, M, Ce), pe === null ? de = Re : pe.sibling = Re, pe = Re);
      return t && me.forEach(function(w1) {
        return r(I, w1);
      }), Ie && Mr(I, Ce), de;
    }
    function Ke(I, M, _, Z) {
      if (typeof _ == "object" && _ !== null && _.type === V && _.key === null && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case O:
            e: {
              for (var de = _.key, pe = M; pe !== null; ) {
                if (pe.key === de) {
                  if (de = _.type, de === V) {
                    if (pe.tag === 7) {
                      s(I, pe.sibling), M = f(pe, _.props.children), M.return = I, I = M;
                      break e;
                    }
                  } else if (pe.elementType === de || typeof de == "object" && de !== null && de.$$typeof === ge && qh(de) === pe.type) {
                    s(I, pe.sibling), M = f(pe, _.props), M.ref = Ni(I, pe, _), M.return = I, I = M;
                    break e;
                  }
                  s(I, pe);
                  break;
                } else r(I, pe);
                pe = pe.sibling;
              }
              _.type === V ? (M = $r(_.props.children, I.mode, Z, _.key), M.return = I, I = M) : (Z = wa(_.type, _.key, _.props, null, I.mode, Z), Z.ref = Ni(I, M, _), Z.return = I, I = Z);
            }
            return w(I);
          case B:
            e: {
              for (pe = _.key; M !== null; ) {
                if (M.key === pe) if (M.tag === 4 && M.stateNode.containerInfo === _.containerInfo && M.stateNode.implementation === _.implementation) {
                  s(I, M.sibling), M = f(M, _.children || []), M.return = I, I = M;
                  break e;
                } else {
                  s(I, M);
                  break;
                }
                else r(I, M);
                M = M.sibling;
              }
              M = sc(_, I.mode, Z), M.return = I, I = M;
            }
            return w(I);
          case ge:
            return pe = _._init, Ke(I, M, pe(_._payload), Z);
        }
        if (Er(_)) return ae(I, M, _, Z);
        if (J(_)) return ce(I, M, _, Z);
        Qs(I, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" ? (_ = "" + _, M !== null && M.tag === 6 ? (s(I, M.sibling), M = f(M, _), M.return = I, I = M) : (s(I, M), M = ic(_, I.mode, Z), M.return = I, I = M), w(I)) : s(I, M);
    }
    return Ke;
  }
  var vo = Jh(!0), ep = Jh(!1), Zs = tr(null), qs = null, xo = null, mu = null;
  function gu() {
    mu = xo = qs = null;
  }
  function yu(t) {
    var r = Zs.current;
    Oe(Zs), t._currentValue = r;
  }
  function vu(t, r, s) {
    for (; t !== null; ) {
      var u = t.alternate;
      if ((t.childLanes & r) !== r ? (t.childLanes |= r, u !== null && (u.childLanes |= r)) : u !== null && (u.childLanes & r) !== r && (u.childLanes |= r), t === s) break;
      t = t.return;
    }
  }
  function wo(t, r) {
    qs = t, mu = xo = null, t = t.dependencies, t !== null && t.firstContext !== null && ((t.lanes & r) !== 0 && (Ct = !0), t.firstContext = null);
  }
  function Vt(t) {
    var r = t._currentValue;
    if (mu !== t) if (t = { context: t, memoizedValue: r, next: null }, xo === null) {
      if (qs === null) throw Error(o(308));
      xo = t, qs.dependencies = { lanes: 0, firstContext: t };
    } else xo = xo.next = t;
    return r;
  }
  var Lr = null;
  function xu(t) {
    Lr === null ? Lr = [t] : Lr.push(t);
  }
  function tp(t, r, s, u) {
    var f = r.interleaved;
    return f === null ? (s.next = s, xu(r)) : (s.next = f.next, f.next = s), r.interleaved = s, An(t, u);
  }
  function An(t, r) {
    t.lanes |= r;
    var s = t.alternate;
    for (s !== null && (s.lanes |= r), s = t, t = t.return; t !== null; ) t.childLanes |= r, s = t.alternate, s !== null && (s.childLanes |= r), s = t, t = t.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var or = !1;
  function wu(t) {
    t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function np(t, r) {
    t = t.updateQueue, r.updateQueue === t && (r.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, effects: t.effects });
  }
  function Mn(t, r) {
    return { eventTime: t, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function ir(t, r, s) {
    var u = t.updateQueue;
    if (u === null) return null;
    if (u = u.shared, (Te & 2) !== 0) {
      var f = u.pending;
      return f === null ? r.next = r : (r.next = f.next, f.next = r), u.pending = r, An(t, s);
    }
    return f = u.interleaved, f === null ? (r.next = r, xu(u)) : (r.next = f.next, f.next = r), u.interleaved = r, An(t, s);
  }
  function Js(t, r, s) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (s & 4194240) !== 0)) {
      var u = r.lanes;
      u &= t.pendingLanes, s |= u, r.lanes = s, jl(t, s);
    }
  }
  function rp(t, r) {
    var s = t.updateQueue, u = t.alternate;
    if (u !== null && (u = u.updateQueue, s === u)) {
      var f = null, m = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var w = { eventTime: s.eventTime, lane: s.lane, tag: s.tag, payload: s.payload, callback: s.callback, next: null };
          m === null ? f = m = w : m = m.next = w, s = s.next;
        } while (s !== null);
        m === null ? f = m = r : m = m.next = r;
      } else f = m = r;
      s = { baseState: u.baseState, firstBaseUpdate: f, lastBaseUpdate: m, shared: u.shared, effects: u.effects }, t.updateQueue = s;
      return;
    }
    t = s.lastBaseUpdate, t === null ? s.firstBaseUpdate = r : t.next = r, s.lastBaseUpdate = r;
  }
  function ea(t, r, s, u) {
    var f = t.updateQueue;
    or = !1;
    var m = f.firstBaseUpdate, w = f.lastBaseUpdate, P = f.shared.pending;
    if (P !== null) {
      f.shared.pending = null;
      var N = P, $ = N.next;
      N.next = null, w === null ? m = $ : w.next = $, w = N;
      var K = t.alternate;
      K !== null && (K = K.updateQueue, P = K.lastBaseUpdate, P !== w && (P === null ? K.firstBaseUpdate = $ : P.next = $, K.lastBaseUpdate = N));
    }
    if (m !== null) {
      var Y = f.baseState;
      w = 0, K = $ = N = null, P = m;
      do {
        var H = P.lane, re = P.eventTime;
        if ((u & H) === H) {
          K !== null && (K = K.next = {
            eventTime: re,
            lane: 0,
            tag: P.tag,
            payload: P.payload,
            callback: P.callback,
            next: null
          });
          e: {
            var ae = t, ce = P;
            switch (H = r, re = s, ce.tag) {
              case 1:
                if (ae = ce.payload, typeof ae == "function") {
                  Y = ae.call(re, Y, H);
                  break e;
                }
                Y = ae;
                break e;
              case 3:
                ae.flags = ae.flags & -65537 | 128;
              case 0:
                if (ae = ce.payload, H = typeof ae == "function" ? ae.call(re, Y, H) : ae, H == null) break e;
                Y = G({}, Y, H);
                break e;
              case 2:
                or = !0;
            }
          }
          P.callback !== null && P.lane !== 0 && (t.flags |= 64, H = f.effects, H === null ? f.effects = [P] : H.push(P));
        } else re = { eventTime: re, lane: H, tag: P.tag, payload: P.payload, callback: P.callback, next: null }, K === null ? ($ = K = re, N = Y) : K = K.next = re, w |= H;
        if (P = P.next, P === null) {
          if (P = f.shared.pending, P === null) break;
          H = P, P = H.next, H.next = null, f.lastBaseUpdate = H, f.shared.pending = null;
        }
      } while (!0);
      if (K === null && (N = Y), f.baseState = N, f.firstBaseUpdate = $, f.lastBaseUpdate = K, r = f.shared.interleaved, r !== null) {
        f = r;
        do
          w |= f.lane, f = f.next;
        while (f !== r);
      } else m === null && (f.shared.lanes = 0);
      Ir |= w, t.lanes = w, t.memoizedState = Y;
    }
  }
  function op(t, r, s) {
    if (t = r.effects, r.effects = null, t !== null) for (r = 0; r < t.length; r++) {
      var u = t[r], f = u.callback;
      if (f !== null) {
        if (u.callback = null, u = s, typeof f != "function") throw Error(o(191, f));
        f.call(u);
      }
    }
  }
  var Di = {}, fn = tr(Di), Ai = tr(Di), Mi = tr(Di);
  function jr(t) {
    if (t === Di) throw Error(o(174));
    return t;
  }
  function Su(t, r) {
    switch (Ae(Mi, r), Ae(Ai, t), Ae(fn, Di), t = r.nodeType, t) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : ii(null, "");
        break;
      default:
        t = t === 8 ? r.parentNode : r, r = t.namespaceURI || null, t = t.tagName, r = ii(r, t);
    }
    Oe(fn), Ae(fn, r);
  }
  function So() {
    Oe(fn), Oe(Ai), Oe(Mi);
  }
  function ip(t) {
    jr(Mi.current);
    var r = jr(fn.current), s = ii(r, t.type);
    r !== s && (Ae(Ai, t), Ae(fn, s));
  }
  function Cu(t) {
    Ai.current === t && (Oe(fn), Oe(Ai));
  }
  var Fe = tr(0);
  function ta(t) {
    for (var r = t; r !== null; ) {
      if (r.tag === 13) {
        var s = r.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || s.data === "$?" || s.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var bu = [];
  function Eu() {
    for (var t = 0; t < bu.length; t++) bu[t]._workInProgressVersionPrimary = null;
    bu.length = 0;
  }
  var na = F.ReactCurrentDispatcher, ku = F.ReactCurrentBatchConfig, Or = 0, Ve = null, Xe = null, et = null, ra = !1, Li = !1, ji = 0, BS = 0;
  function ct() {
    throw Error(o(321));
  }
  function Pu(t, r) {
    if (r === null) return !1;
    for (var s = 0; s < r.length && s < t.length; s++) if (!Qt(t[s], r[s])) return !1;
    return !0;
  }
  function Tu(t, r, s, u, f, m) {
    if (Or = m, Ve = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, na.current = t === null || t.memoizedState === null ? KS : YS, t = s(u, f), Li) {
      m = 0;
      do {
        if (Li = !1, ji = 0, 25 <= m) throw Error(o(301));
        m += 1, et = Xe = null, r.updateQueue = null, na.current = GS, t = s(u, f);
      } while (Li);
    }
    if (na.current = sa, r = Xe !== null && Xe.next !== null, Or = 0, et = Xe = Ve = null, ra = !1, r) throw Error(o(300));
    return t;
  }
  function Ru() {
    var t = ji !== 0;
    return ji = 0, t;
  }
  function hn() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return et === null ? Ve.memoizedState = et = t : et = et.next = t, et;
  }
  function $t() {
    if (Xe === null) {
      var t = Ve.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Xe.next;
    var r = et === null ? Ve.memoizedState : et.next;
    if (r !== null) et = r, Xe = t;
    else {
      if (t === null) throw Error(o(310));
      Xe = t, t = { memoizedState: Xe.memoizedState, baseState: Xe.baseState, baseQueue: Xe.baseQueue, queue: Xe.queue, next: null }, et === null ? Ve.memoizedState = et = t : et = et.next = t;
    }
    return et;
  }
  function Oi(t, r) {
    return typeof r == "function" ? r(t) : r;
  }
  function Nu(t) {
    var r = $t(), s = r.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var u = Xe, f = u.baseQueue, m = s.pending;
    if (m !== null) {
      if (f !== null) {
        var w = f.next;
        f.next = m.next, m.next = w;
      }
      u.baseQueue = f = m, s.pending = null;
    }
    if (f !== null) {
      m = f.next, u = u.baseState;
      var P = w = null, N = null, $ = m;
      do {
        var K = $.lane;
        if ((Or & K) === K) N !== null && (N = N.next = { lane: 0, action: $.action, hasEagerState: $.hasEagerState, eagerState: $.eagerState, next: null }), u = $.hasEagerState ? $.eagerState : t(u, $.action);
        else {
          var Y = {
            lane: K,
            action: $.action,
            hasEagerState: $.hasEagerState,
            eagerState: $.eagerState,
            next: null
          };
          N === null ? (P = N = Y, w = u) : N = N.next = Y, Ve.lanes |= K, Ir |= K;
        }
        $ = $.next;
      } while ($ !== null && $ !== m);
      N === null ? w = u : N.next = P, Qt(u, r.memoizedState) || (Ct = !0), r.memoizedState = u, r.baseState = w, r.baseQueue = N, s.lastRenderedState = u;
    }
    if (t = s.interleaved, t !== null) {
      f = t;
      do
        m = f.lane, Ve.lanes |= m, Ir |= m, f = f.next;
      while (f !== t);
    } else f === null && (s.lanes = 0);
    return [r.memoizedState, s.dispatch];
  }
  function Du(t) {
    var r = $t(), s = r.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var u = s.dispatch, f = s.pending, m = r.memoizedState;
    if (f !== null) {
      s.pending = null;
      var w = f = f.next;
      do
        m = t(m, w.action), w = w.next;
      while (w !== f);
      Qt(m, r.memoizedState) || (Ct = !0), r.memoizedState = m, r.baseQueue === null && (r.baseState = m), s.lastRenderedState = m;
    }
    return [m, u];
  }
  function sp() {
  }
  function ap(t, r) {
    var s = Ve, u = $t(), f = r(), m = !Qt(u.memoizedState, f);
    if (m && (u.memoizedState = f, Ct = !0), u = u.queue, Au(cp.bind(null, s, u, t), [t]), u.getSnapshot !== r || m || et !== null && et.memoizedState.tag & 1) {
      if (s.flags |= 2048, Ii(9, up.bind(null, s, u, f, r), void 0, null), tt === null) throw Error(o(349));
      (Or & 30) !== 0 || lp(s, r, f);
    }
    return f;
  }
  function lp(t, r, s) {
    t.flags |= 16384, t = { getSnapshot: r, value: s }, r = Ve.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Ve.updateQueue = r, r.stores = [t]) : (s = r.stores, s === null ? r.stores = [t] : s.push(t));
  }
  function up(t, r, s, u) {
    r.value = s, r.getSnapshot = u, dp(r) && fp(t);
  }
  function cp(t, r, s) {
    return s(function() {
      dp(r) && fp(t);
    });
  }
  function dp(t) {
    var r = t.getSnapshot;
    t = t.value;
    try {
      var s = r();
      return !Qt(t, s);
    } catch {
      return !0;
    }
  }
  function fp(t) {
    var r = An(t, 1);
    r !== null && tn(r, t, 1, -1);
  }
  function hp(t) {
    var r = hn();
    return typeof t == "function" && (t = t()), r.memoizedState = r.baseState = t, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Oi, lastRenderedState: t }, r.queue = t, t = t.dispatch = HS.bind(null, Ve, t), [r.memoizedState, t];
  }
  function Ii(t, r, s, u) {
    return t = { tag: t, create: r, destroy: s, deps: u, next: null }, r = Ve.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Ve.updateQueue = r, r.lastEffect = t.next = t) : (s = r.lastEffect, s === null ? r.lastEffect = t.next = t : (u = s.next, s.next = t, t.next = u, r.lastEffect = t)), t;
  }
  function pp() {
    return $t().memoizedState;
  }
  function oa(t, r, s, u) {
    var f = hn();
    Ve.flags |= t, f.memoizedState = Ii(1 | r, s, void 0, u === void 0 ? null : u);
  }
  function ia(t, r, s, u) {
    var f = $t();
    u = u === void 0 ? null : u;
    var m = void 0;
    if (Xe !== null) {
      var w = Xe.memoizedState;
      if (m = w.destroy, u !== null && Pu(u, w.deps)) {
        f.memoizedState = Ii(r, s, m, u);
        return;
      }
    }
    Ve.flags |= t, f.memoizedState = Ii(1 | r, s, m, u);
  }
  function mp(t, r) {
    return oa(8390656, 8, t, r);
  }
  function Au(t, r) {
    return ia(2048, 8, t, r);
  }
  function gp(t, r) {
    return ia(4, 2, t, r);
  }
  function yp(t, r) {
    return ia(4, 4, t, r);
  }
  function vp(t, r) {
    if (typeof r == "function") return t = t(), r(t), function() {
      r(null);
    };
    if (r != null) return t = t(), r.current = t, function() {
      r.current = null;
    };
  }
  function xp(t, r, s) {
    return s = s != null ? s.concat([t]) : null, ia(4, 4, vp.bind(null, r, t), s);
  }
  function Mu() {
  }
  function wp(t, r) {
    var s = $t();
    r = r === void 0 ? null : r;
    var u = s.memoizedState;
    return u !== null && r !== null && Pu(r, u[1]) ? u[0] : (s.memoizedState = [t, r], t);
  }
  function Sp(t, r) {
    var s = $t();
    r = r === void 0 ? null : r;
    var u = s.memoizedState;
    return u !== null && r !== null && Pu(r, u[1]) ? u[0] : (t = t(), s.memoizedState = [t, r], t);
  }
  function Cp(t, r, s) {
    return (Or & 21) === 0 ? (t.baseState && (t.baseState = !1, Ct = !0), t.memoizedState = s) : (Qt(s, r) || (s = qf(), Ve.lanes |= s, Ir |= s, t.baseState = !0), r);
  }
  function US(t, r) {
    var s = Ne;
    Ne = s !== 0 && 4 > s ? s : 4, t(!0);
    var u = ku.transition;
    ku.transition = {};
    try {
      t(!1), r();
    } finally {
      Ne = s, ku.transition = u;
    }
  }
  function bp() {
    return $t().memoizedState;
  }
  function WS(t, r, s) {
    var u = ur(t);
    if (s = { lane: u, action: s, hasEagerState: !1, eagerState: null, next: null }, Ep(t)) kp(r, s);
    else if (s = tp(t, r, s, u), s !== null) {
      var f = gt();
      tn(s, t, u, f), Pp(s, r, u);
    }
  }
  function HS(t, r, s) {
    var u = ur(t), f = { lane: u, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Ep(t)) kp(r, f);
    else {
      var m = t.alternate;
      if (t.lanes === 0 && (m === null || m.lanes === 0) && (m = r.lastRenderedReducer, m !== null)) try {
        var w = r.lastRenderedState, P = m(w, s);
        if (f.hasEagerState = !0, f.eagerState = P, Qt(P, w)) {
          var N = r.interleaved;
          N === null ? (f.next = f, xu(r)) : (f.next = N.next, N.next = f), r.interleaved = f;
          return;
        }
      } catch {
      } finally {
      }
      s = tp(t, r, f, u), s !== null && (f = gt(), tn(s, t, u, f), Pp(s, r, u));
    }
  }
  function Ep(t) {
    var r = t.alternate;
    return t === Ve || r !== null && r === Ve;
  }
  function kp(t, r) {
    Li = ra = !0;
    var s = t.pending;
    s === null ? r.next = r : (r.next = s.next, s.next = r), t.pending = r;
  }
  function Pp(t, r, s) {
    if ((s & 4194240) !== 0) {
      var u = r.lanes;
      u &= t.pendingLanes, s |= u, r.lanes = s, jl(t, s);
    }
  }
  var sa = { readContext: Vt, useCallback: ct, useContext: ct, useEffect: ct, useImperativeHandle: ct, useInsertionEffect: ct, useLayoutEffect: ct, useMemo: ct, useReducer: ct, useRef: ct, useState: ct, useDebugValue: ct, useDeferredValue: ct, useTransition: ct, useMutableSource: ct, useSyncExternalStore: ct, useId: ct, unstable_isNewReconciler: !1 }, KS = { readContext: Vt, useCallback: function(t, r) {
    return hn().memoizedState = [t, r === void 0 ? null : r], t;
  }, useContext: Vt, useEffect: mp, useImperativeHandle: function(t, r, s) {
    return s = s != null ? s.concat([t]) : null, oa(
      4194308,
      4,
      vp.bind(null, r, t),
      s
    );
  }, useLayoutEffect: function(t, r) {
    return oa(4194308, 4, t, r);
  }, useInsertionEffect: function(t, r) {
    return oa(4, 2, t, r);
  }, useMemo: function(t, r) {
    var s = hn();
    return r = r === void 0 ? null : r, t = t(), s.memoizedState = [t, r], t;
  }, useReducer: function(t, r, s) {
    var u = hn();
    return r = s !== void 0 ? s(r) : r, u.memoizedState = u.baseState = r, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: r }, u.queue = t, t = t.dispatch = WS.bind(null, Ve, t), [u.memoizedState, t];
  }, useRef: function(t) {
    var r = hn();
    return t = { current: t }, r.memoizedState = t;
  }, useState: hp, useDebugValue: Mu, useDeferredValue: function(t) {
    return hn().memoizedState = t;
  }, useTransition: function() {
    var t = hp(!1), r = t[0];
    return t = US.bind(null, t[1]), hn().memoizedState = t, [r, t];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(t, r, s) {
    var u = Ve, f = hn();
    if (Ie) {
      if (s === void 0) throw Error(o(407));
      s = s();
    } else {
      if (s = r(), tt === null) throw Error(o(349));
      (Or & 30) !== 0 || lp(u, r, s);
    }
    f.memoizedState = s;
    var m = { value: s, getSnapshot: r };
    return f.queue = m, mp(cp.bind(
      null,
      u,
      m,
      t
    ), [t]), u.flags |= 2048, Ii(9, up.bind(null, u, m, s, r), void 0, null), s;
  }, useId: function() {
    var t = hn(), r = tt.identifierPrefix;
    if (Ie) {
      var s = Dn, u = Nn;
      s = (u & ~(1 << 32 - Xt(u) - 1)).toString(32) + s, r = ":" + r + "R" + s, s = ji++, 0 < s && (r += "H" + s.toString(32)), r += ":";
    } else s = BS++, r = ":" + r + "r" + s.toString(32) + ":";
    return t.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, YS = {
    readContext: Vt,
    useCallback: wp,
    useContext: Vt,
    useEffect: Au,
    useImperativeHandle: xp,
    useInsertionEffect: gp,
    useLayoutEffect: yp,
    useMemo: Sp,
    useReducer: Nu,
    useRef: pp,
    useState: function() {
      return Nu(Oi);
    },
    useDebugValue: Mu,
    useDeferredValue: function(t) {
      var r = $t();
      return Cp(r, Xe.memoizedState, t);
    },
    useTransition: function() {
      var t = Nu(Oi)[0], r = $t().memoizedState;
      return [t, r];
    },
    useMutableSource: sp,
    useSyncExternalStore: ap,
    useId: bp,
    unstable_isNewReconciler: !1
  }, GS = { readContext: Vt, useCallback: wp, useContext: Vt, useEffect: Au, useImperativeHandle: xp, useInsertionEffect: gp, useLayoutEffect: yp, useMemo: Sp, useReducer: Du, useRef: pp, useState: function() {
    return Du(Oi);
  }, useDebugValue: Mu, useDeferredValue: function(t) {
    var r = $t();
    return Xe === null ? r.memoizedState = t : Cp(r, Xe.memoizedState, t);
  }, useTransition: function() {
    var t = Du(Oi)[0], r = $t().memoizedState;
    return [t, r];
  }, useMutableSource: sp, useSyncExternalStore: ap, useId: bp, unstable_isNewReconciler: !1 };
  function qt(t, r) {
    if (t && t.defaultProps) {
      r = G({}, r), t = t.defaultProps;
      for (var s in t) r[s] === void 0 && (r[s] = t[s]);
      return r;
    }
    return r;
  }
  function Lu(t, r, s, u) {
    r = t.memoizedState, s = s(u, r), s = s == null ? r : G({}, r, s), t.memoizedState = s, t.lanes === 0 && (t.updateQueue.baseState = s);
  }
  var aa = { isMounted: function(t) {
    return (t = t._reactInternals) ? Rr(t) === t : !1;
  }, enqueueSetState: function(t, r, s) {
    t = t._reactInternals;
    var u = gt(), f = ur(t), m = Mn(u, f);
    m.payload = r, s != null && (m.callback = s), r = ir(t, m, f), r !== null && (tn(r, t, f, u), Js(r, t, f));
  }, enqueueReplaceState: function(t, r, s) {
    t = t._reactInternals;
    var u = gt(), f = ur(t), m = Mn(u, f);
    m.tag = 1, m.payload = r, s != null && (m.callback = s), r = ir(t, m, f), r !== null && (tn(r, t, f, u), Js(r, t, f));
  }, enqueueForceUpdate: function(t, r) {
    t = t._reactInternals;
    var s = gt(), u = ur(t), f = Mn(s, u);
    f.tag = 2, r != null && (f.callback = r), r = ir(t, f, u), r !== null && (tn(r, t, u, s), Js(r, t, u));
  } };
  function Tp(t, r, s, u, f, m, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(u, m, w) : r.prototype && r.prototype.isPureReactComponent ? !Ci(s, u) || !Ci(f, m) : !0;
  }
  function Rp(t, r, s) {
    var u = !1, f = nr, m = r.contextType;
    return typeof m == "object" && m !== null ? m = Vt(m) : (f = St(r) ? Dr : ut.current, u = r.contextTypes, m = (u = u != null) ? po(t, f) : nr), r = new r(s, m), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = aa, t.stateNode = r, r._reactInternals = t, u && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = f, t.__reactInternalMemoizedMaskedChildContext = m), r;
  }
  function Np(t, r, s, u) {
    t = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(s, u), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(s, u), r.state !== t && aa.enqueueReplaceState(r, r.state, null);
  }
  function ju(t, r, s, u) {
    var f = t.stateNode;
    f.props = s, f.state = t.memoizedState, f.refs = {}, wu(t);
    var m = r.contextType;
    typeof m == "object" && m !== null ? f.context = Vt(m) : (m = St(r) ? Dr : ut.current, f.context = po(t, m)), f.state = t.memoizedState, m = r.getDerivedStateFromProps, typeof m == "function" && (Lu(t, r, m, s), f.state = t.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (r = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), r !== f.state && aa.enqueueReplaceState(f, f.state, null), ea(t, s, f, u), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308);
  }
  function Co(t, r) {
    try {
      var s = "", u = r;
      do
        s += W(u), u = u.return;
      while (u);
      var f = s;
    } catch (m) {
      f = `
Error generating stack: ` + m.message + `
` + m.stack;
    }
    return { value: t, source: r, stack: f, digest: null };
  }
  function Ou(t, r, s) {
    return { value: t, source: null, stack: s ?? null, digest: r ?? null };
  }
  function Iu(t, r) {
    try {
      console.error(r.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var XS = typeof WeakMap == "function" ? WeakMap : Map;
  function Dp(t, r, s) {
    s = Mn(-1, s), s.tag = 3, s.payload = { element: null };
    var u = r.value;
    return s.callback = function() {
      pa || (pa = !0, Zu = u), Iu(t, r);
    }, s;
  }
  function Ap(t, r, s) {
    s = Mn(-1, s), s.tag = 3;
    var u = t.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = r.value;
      s.payload = function() {
        return u(f);
      }, s.callback = function() {
        Iu(t, r);
      };
    }
    var m = t.stateNode;
    return m !== null && typeof m.componentDidCatch == "function" && (s.callback = function() {
      Iu(t, r), typeof u != "function" && (ar === null ? ar = /* @__PURE__ */ new Set([this]) : ar.add(this));
      var w = r.stack;
      this.componentDidCatch(r.value, { componentStack: w !== null ? w : "" });
    }), s;
  }
  function Mp(t, r, s) {
    var u = t.pingCache;
    if (u === null) {
      u = t.pingCache = new XS();
      var f = /* @__PURE__ */ new Set();
      u.set(r, f);
    } else f = u.get(r), f === void 0 && (f = /* @__PURE__ */ new Set(), u.set(r, f));
    f.has(s) || (f.add(s), t = u1.bind(null, t, r, s), r.then(t, t));
  }
  function Lp(t) {
    do {
      var r;
      if ((r = t.tag === 13) && (r = t.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function jp(t, r, s, u, f) {
    return (t.mode & 1) === 0 ? (t === r ? t.flags |= 65536 : (t.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (r = Mn(-1, 1), r.tag = 2, ir(s, r, 1))), s.lanes |= 1), t) : (t.flags |= 65536, t.lanes = f, t);
  }
  var QS = F.ReactCurrentOwner, Ct = !1;
  function mt(t, r, s, u) {
    r.child = t === null ? ep(r, null, s, u) : vo(r, t.child, s, u);
  }
  function Op(t, r, s, u, f) {
    s = s.render;
    var m = r.ref;
    return wo(r, f), u = Tu(t, r, s, u, m, f), s = Ru(), t !== null && !Ct ? (r.updateQueue = t.updateQueue, r.flags &= -2053, t.lanes &= ~f, Ln(t, r, f)) : (Ie && s && cu(r), r.flags |= 1, mt(t, r, u, f), r.child);
  }
  function Ip(t, r, s, u, f) {
    if (t === null) {
      var m = s.type;
      return typeof m == "function" && !oc(m) && m.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (r.tag = 15, r.type = m, _p(t, r, m, u, f)) : (t = wa(s.type, null, u, r, r.mode, f), t.ref = r.ref, t.return = r, r.child = t);
    }
    if (m = t.child, (t.lanes & f) === 0) {
      var w = m.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Ci, s(w, u) && t.ref === r.ref) return Ln(t, r, f);
    }
    return r.flags |= 1, t = dr(m, u), t.ref = r.ref, t.return = r, r.child = t;
  }
  function _p(t, r, s, u, f) {
    if (t !== null) {
      var m = t.memoizedProps;
      if (Ci(m, u) && t.ref === r.ref) if (Ct = !1, r.pendingProps = u = m, (t.lanes & f) !== 0) (t.flags & 131072) !== 0 && (Ct = !0);
      else return r.lanes = t.lanes, Ln(t, r, f);
    }
    return _u(t, r, s, u, f);
  }
  function Fp(t, r, s) {
    var u = r.pendingProps, f = u.children, m = t !== null ? t.memoizedState : null;
    if (u.mode === "hidden") if ((r.mode & 1) === 0) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ae(Eo, At), At |= s;
    else {
      if ((s & 1073741824) === 0) return t = m !== null ? m.baseLanes | s : s, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: t, cachePool: null, transitions: null }, r.updateQueue = null, Ae(Eo, At), At |= t, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, u = m !== null ? m.baseLanes : s, Ae(Eo, At), At |= u;
    }
    else m !== null ? (u = m.baseLanes | s, r.memoizedState = null) : u = s, Ae(Eo, At), At |= u;
    return mt(t, r, f, s), r.child;
  }
  function Vp(t, r) {
    var s = r.ref;
    (t === null && s !== null || t !== null && t.ref !== s) && (r.flags |= 512, r.flags |= 2097152);
  }
  function _u(t, r, s, u, f) {
    var m = St(s) ? Dr : ut.current;
    return m = po(r, m), wo(r, f), s = Tu(t, r, s, u, m, f), u = Ru(), t !== null && !Ct ? (r.updateQueue = t.updateQueue, r.flags &= -2053, t.lanes &= ~f, Ln(t, r, f)) : (Ie && u && cu(r), r.flags |= 1, mt(t, r, s, f), r.child);
  }
  function $p(t, r, s, u, f) {
    if (St(s)) {
      var m = !0;
      Hs(r);
    } else m = !1;
    if (wo(r, f), r.stateNode === null) ua(t, r), Rp(r, s, u), ju(r, s, u, f), u = !0;
    else if (t === null) {
      var w = r.stateNode, P = r.memoizedProps;
      w.props = P;
      var N = w.context, $ = s.contextType;
      typeof $ == "object" && $ !== null ? $ = Vt($) : ($ = St(s) ? Dr : ut.current, $ = po(r, $));
      var K = s.getDerivedStateFromProps, Y = typeof K == "function" || typeof w.getSnapshotBeforeUpdate == "function";
      Y || typeof w.UNSAFE_componentWillReceiveProps != "function" && typeof w.componentWillReceiveProps != "function" || (P !== u || N !== $) && Np(r, w, u, $), or = !1;
      var H = r.memoizedState;
      w.state = H, ea(r, u, w, f), N = r.memoizedState, P !== u || H !== N || wt.current || or ? (typeof K == "function" && (Lu(r, s, K, u), N = r.memoizedState), (P = or || Tp(r, s, P, u, H, N, $)) ? (Y || typeof w.UNSAFE_componentWillMount != "function" && typeof w.componentWillMount != "function" || (typeof w.componentWillMount == "function" && w.componentWillMount(), typeof w.UNSAFE_componentWillMount == "function" && w.UNSAFE_componentWillMount()), typeof w.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof w.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = u, r.memoizedState = N), w.props = u, w.state = N, w.context = $, u = P) : (typeof w.componentDidMount == "function" && (r.flags |= 4194308), u = !1);
    } else {
      w = r.stateNode, np(t, r), P = r.memoizedProps, $ = r.type === r.elementType ? P : qt(r.type, P), w.props = $, Y = r.pendingProps, H = w.context, N = s.contextType, typeof N == "object" && N !== null ? N = Vt(N) : (N = St(s) ? Dr : ut.current, N = po(r, N));
      var re = s.getDerivedStateFromProps;
      (K = typeof re == "function" || typeof w.getSnapshotBeforeUpdate == "function") || typeof w.UNSAFE_componentWillReceiveProps != "function" && typeof w.componentWillReceiveProps != "function" || (P !== Y || H !== N) && Np(r, w, u, N), or = !1, H = r.memoizedState, w.state = H, ea(r, u, w, f);
      var ae = r.memoizedState;
      P !== Y || H !== ae || wt.current || or ? (typeof re == "function" && (Lu(r, s, re, u), ae = r.memoizedState), ($ = or || Tp(r, s, $, u, H, ae, N) || !1) ? (K || typeof w.UNSAFE_componentWillUpdate != "function" && typeof w.componentWillUpdate != "function" || (typeof w.componentWillUpdate == "function" && w.componentWillUpdate(u, ae, N), typeof w.UNSAFE_componentWillUpdate == "function" && w.UNSAFE_componentWillUpdate(u, ae, N)), typeof w.componentDidUpdate == "function" && (r.flags |= 4), typeof w.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof w.componentDidUpdate != "function" || P === t.memoizedProps && H === t.memoizedState || (r.flags |= 4), typeof w.getSnapshotBeforeUpdate != "function" || P === t.memoizedProps && H === t.memoizedState || (r.flags |= 1024), r.memoizedProps = u, r.memoizedState = ae), w.props = u, w.state = ae, w.context = N, u = $) : (typeof w.componentDidUpdate != "function" || P === t.memoizedProps && H === t.memoizedState || (r.flags |= 4), typeof w.getSnapshotBeforeUpdate != "function" || P === t.memoizedProps && H === t.memoizedState || (r.flags |= 1024), u = !1);
    }
    return Fu(t, r, s, u, m, f);
  }
  function Fu(t, r, s, u, f, m) {
    Vp(t, r);
    var w = (r.flags & 128) !== 0;
    if (!u && !w) return f && Hh(r, s, !1), Ln(t, r, m);
    u = r.stateNode, QS.current = r;
    var P = w && typeof s.getDerivedStateFromError != "function" ? null : u.render();
    return r.flags |= 1, t !== null && w ? (r.child = vo(r, t.child, null, m), r.child = vo(r, null, P, m)) : mt(t, r, P, m), r.memoizedState = u.state, f && Hh(r, s, !0), r.child;
  }
  function zp(t) {
    var r = t.stateNode;
    r.pendingContext ? Uh(t, r.pendingContext, r.pendingContext !== r.context) : r.context && Uh(t, r.context, !1), Su(t, r.containerInfo);
  }
  function Bp(t, r, s, u, f) {
    return yo(), pu(f), r.flags |= 256, mt(t, r, s, u), r.child;
  }
  var Vu = { dehydrated: null, treeContext: null, retryLane: 0 };
  function $u(t) {
    return { baseLanes: t, cachePool: null, transitions: null };
  }
  function Up(t, r, s) {
    var u = r.pendingProps, f = Fe.current, m = !1, w = (r.flags & 128) !== 0, P;
    if ((P = w) || (P = t !== null && t.memoizedState === null ? !1 : (f & 2) !== 0), P ? (m = !0, r.flags &= -129) : (t === null || t.memoizedState !== null) && (f |= 1), Ae(Fe, f & 1), t === null)
      return hu(r), t = r.memoizedState, t !== null && (t = t.dehydrated, t !== null) ? ((r.mode & 1) === 0 ? r.lanes = 1 : t.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824, null) : (w = u.children, t = u.fallback, m ? (u = r.mode, m = r.child, w = { mode: "hidden", children: w }, (u & 1) === 0 && m !== null ? (m.childLanes = 0, m.pendingProps = w) : m = Sa(w, u, 0, null), t = $r(t, u, s, null), m.return = r, t.return = r, m.sibling = t, r.child = m, r.child.memoizedState = $u(s), r.memoizedState = Vu, t) : zu(r, w));
    if (f = t.memoizedState, f !== null && (P = f.dehydrated, P !== null)) return ZS(t, r, w, u, P, f, s);
    if (m) {
      m = u.fallback, w = r.mode, f = t.child, P = f.sibling;
      var N = { mode: "hidden", children: u.children };
      return (w & 1) === 0 && r.child !== f ? (u = r.child, u.childLanes = 0, u.pendingProps = N, r.deletions = null) : (u = dr(f, N), u.subtreeFlags = f.subtreeFlags & 14680064), P !== null ? m = dr(P, m) : (m = $r(m, w, s, null), m.flags |= 2), m.return = r, u.return = r, u.sibling = m, r.child = u, u = m, m = r.child, w = t.child.memoizedState, w = w === null ? $u(s) : { baseLanes: w.baseLanes | s, cachePool: null, transitions: w.transitions }, m.memoizedState = w, m.childLanes = t.childLanes & ~s, r.memoizedState = Vu, u;
    }
    return m = t.child, t = m.sibling, u = dr(m, { mode: "visible", children: u.children }), (r.mode & 1) === 0 && (u.lanes = s), u.return = r, u.sibling = null, t !== null && (s = r.deletions, s === null ? (r.deletions = [t], r.flags |= 16) : s.push(t)), r.child = u, r.memoizedState = null, u;
  }
  function zu(t, r) {
    return r = Sa({ mode: "visible", children: r }, t.mode, 0, null), r.return = t, t.child = r;
  }
  function la(t, r, s, u) {
    return u !== null && pu(u), vo(r, t.child, null, s), t = zu(r, r.pendingProps.children), t.flags |= 2, r.memoizedState = null, t;
  }
  function ZS(t, r, s, u, f, m, w) {
    if (s)
      return r.flags & 256 ? (r.flags &= -257, u = Ou(Error(o(422))), la(t, r, w, u)) : r.memoizedState !== null ? (r.child = t.child, r.flags |= 128, null) : (m = u.fallback, f = r.mode, u = Sa({ mode: "visible", children: u.children }, f, 0, null), m = $r(m, f, w, null), m.flags |= 2, u.return = r, m.return = r, u.sibling = m, r.child = u, (r.mode & 1) !== 0 && vo(r, t.child, null, w), r.child.memoizedState = $u(w), r.memoizedState = Vu, m);
    if ((r.mode & 1) === 0) return la(t, r, w, null);
    if (f.data === "$!") {
      if (u = f.nextSibling && f.nextSibling.dataset, u) var P = u.dgst;
      return u = P, m = Error(o(419)), u = Ou(m, u, void 0), la(t, r, w, u);
    }
    if (P = (w & t.childLanes) !== 0, Ct || P) {
      if (u = tt, u !== null) {
        switch (w & -w) {
          case 4:
            f = 2;
            break;
          case 16:
            f = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            f = 32;
            break;
          case 536870912:
            f = 268435456;
            break;
          default:
            f = 0;
        }
        f = (f & (u.suspendedLanes | w)) !== 0 ? 0 : f, f !== 0 && f !== m.retryLane && (m.retryLane = f, An(t, f), tn(u, t, f, -1));
      }
      return rc(), u = Ou(Error(o(421))), la(t, r, w, u);
    }
    return f.data === "$?" ? (r.flags |= 128, r.child = t.child, r = c1.bind(null, t), f._reactRetry = r, null) : (t = m.treeContext, Dt = er(f.nextSibling), Nt = r, Ie = !0, Zt = null, t !== null && (_t[Ft++] = Nn, _t[Ft++] = Dn, _t[Ft++] = Ar, Nn = t.id, Dn = t.overflow, Ar = r), r = zu(r, u.children), r.flags |= 4096, r);
  }
  function Wp(t, r, s) {
    t.lanes |= r;
    var u = t.alternate;
    u !== null && (u.lanes |= r), vu(t.return, r, s);
  }
  function Bu(t, r, s, u, f) {
    var m = t.memoizedState;
    m === null ? t.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: u, tail: s, tailMode: f } : (m.isBackwards = r, m.rendering = null, m.renderingStartTime = 0, m.last = u, m.tail = s, m.tailMode = f);
  }
  function Hp(t, r, s) {
    var u = r.pendingProps, f = u.revealOrder, m = u.tail;
    if (mt(t, r, u.children, s), u = Fe.current, (u & 2) !== 0) u = u & 1 | 2, r.flags |= 128;
    else {
      if (t !== null && (t.flags & 128) !== 0) e: for (t = r.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Wp(t, s, r);
        else if (t.tag === 19) Wp(t, s, r);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === r) break e;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === r) break e;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      u &= 1;
    }
    if (Ae(Fe, u), (r.mode & 1) === 0) r.memoizedState = null;
    else switch (f) {
      case "forwards":
        for (s = r.child, f = null; s !== null; ) t = s.alternate, t !== null && ta(t) === null && (f = s), s = s.sibling;
        s = f, s === null ? (f = r.child, r.child = null) : (f = s.sibling, s.sibling = null), Bu(r, !1, f, s, m);
        break;
      case "backwards":
        for (s = null, f = r.child, r.child = null; f !== null; ) {
          if (t = f.alternate, t !== null && ta(t) === null) {
            r.child = f;
            break;
          }
          t = f.sibling, f.sibling = s, s = f, f = t;
        }
        Bu(r, !0, s, null, m);
        break;
      case "together":
        Bu(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function ua(t, r) {
    (r.mode & 1) === 0 && t !== null && (t.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Ln(t, r, s) {
    if (t !== null && (r.dependencies = t.dependencies), Ir |= r.lanes, (s & r.childLanes) === 0) return null;
    if (t !== null && r.child !== t.child) throw Error(o(153));
    if (r.child !== null) {
      for (t = r.child, s = dr(t, t.pendingProps), r.child = s, s.return = r; t.sibling !== null; ) t = t.sibling, s = s.sibling = dr(t, t.pendingProps), s.return = r;
      s.sibling = null;
    }
    return r.child;
  }
  function qS(t, r, s) {
    switch (r.tag) {
      case 3:
        zp(r), yo();
        break;
      case 5:
        ip(r);
        break;
      case 1:
        St(r.type) && Hs(r);
        break;
      case 4:
        Su(r, r.stateNode.containerInfo);
        break;
      case 10:
        var u = r.type._context, f = r.memoizedProps.value;
        Ae(Zs, u._currentValue), u._currentValue = f;
        break;
      case 13:
        if (u = r.memoizedState, u !== null)
          return u.dehydrated !== null ? (Ae(Fe, Fe.current & 1), r.flags |= 128, null) : (s & r.child.childLanes) !== 0 ? Up(t, r, s) : (Ae(Fe, Fe.current & 1), t = Ln(t, r, s), t !== null ? t.sibling : null);
        Ae(Fe, Fe.current & 1);
        break;
      case 19:
        if (u = (s & r.childLanes) !== 0, (t.flags & 128) !== 0) {
          if (u) return Hp(t, r, s);
          r.flags |= 128;
        }
        if (f = r.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Ae(Fe, Fe.current), u) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Fp(t, r, s);
    }
    return Ln(t, r, s);
  }
  var Kp, Uu, Yp, Gp;
  Kp = function(t, r) {
    for (var s = r.child; s !== null; ) {
      if (s.tag === 5 || s.tag === 6) t.appendChild(s.stateNode);
      else if (s.tag !== 4 && s.child !== null) {
        s.child.return = s, s = s.child;
        continue;
      }
      if (s === r) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === r) return;
        s = s.return;
      }
      s.sibling.return = s.return, s = s.sibling;
    }
  }, Uu = function() {
  }, Yp = function(t, r, s, u) {
    var f = t.memoizedProps;
    if (f !== u) {
      t = r.stateNode, jr(fn.current);
      var m = null;
      switch (s) {
        case "input":
          f = eo(t, f), u = eo(t, u), m = [];
          break;
        case "select":
          f = G({}, f, { value: void 0 }), u = G({}, u, { value: void 0 }), m = [];
          break;
        case "textarea":
          f = oi(t, f), u = oi(t, u), m = [];
          break;
        default:
          typeof f.onClick != "function" && typeof u.onClick == "function" && (t.onclick = Bs);
      }
      kr(s, u);
      var w;
      s = null;
      for ($ in f) if (!u.hasOwnProperty($) && f.hasOwnProperty($) && f[$] != null) if ($ === "style") {
        var P = f[$];
        for (w in P) P.hasOwnProperty(w) && (s || (s = {}), s[w] = "");
      } else $ !== "dangerouslySetInnerHTML" && $ !== "children" && $ !== "suppressContentEditableWarning" && $ !== "suppressHydrationWarning" && $ !== "autoFocus" && (a.hasOwnProperty($) ? m || (m = []) : (m = m || []).push($, null));
      for ($ in u) {
        var N = u[$];
        if (P = f?.[$], u.hasOwnProperty($) && N !== P && (N != null || P != null)) if ($ === "style") if (P) {
          for (w in P) !P.hasOwnProperty(w) || N && N.hasOwnProperty(w) || (s || (s = {}), s[w] = "");
          for (w in N) N.hasOwnProperty(w) && P[w] !== N[w] && (s || (s = {}), s[w] = N[w]);
        } else s || (m || (m = []), m.push(
          $,
          s
        )), s = N;
        else $ === "dangerouslySetInnerHTML" ? (N = N ? N.__html : void 0, P = P ? P.__html : void 0, N != null && P !== N && (m = m || []).push($, N)) : $ === "children" ? typeof N != "string" && typeof N != "number" || (m = m || []).push($, "" + N) : $ !== "suppressContentEditableWarning" && $ !== "suppressHydrationWarning" && (a.hasOwnProperty($) ? (N != null && $ === "onScroll" && je("scroll", t), m || P === N || (m = [])) : (m = m || []).push($, N));
      }
      s && (m = m || []).push("style", s);
      var $ = m;
      (r.updateQueue = $) && (r.flags |= 4);
    }
  }, Gp = function(t, r, s, u) {
    s !== u && (r.flags |= 4);
  };
  function _i(t, r) {
    if (!Ie) switch (t.tailMode) {
      case "hidden":
        r = t.tail;
        for (var s = null; r !== null; ) r.alternate !== null && (s = r), r = r.sibling;
        s === null ? t.tail = null : s.sibling = null;
        break;
      case "collapsed":
        s = t.tail;
        for (var u = null; s !== null; ) s.alternate !== null && (u = s), s = s.sibling;
        u === null ? r || t.tail === null ? t.tail = null : t.tail.sibling = null : u.sibling = null;
    }
  }
  function dt(t) {
    var r = t.alternate !== null && t.alternate.child === t.child, s = 0, u = 0;
    if (r) for (var f = t.child; f !== null; ) s |= f.lanes | f.childLanes, u |= f.subtreeFlags & 14680064, u |= f.flags & 14680064, f.return = t, f = f.sibling;
    else for (f = t.child; f !== null; ) s |= f.lanes | f.childLanes, u |= f.subtreeFlags, u |= f.flags, f.return = t, f = f.sibling;
    return t.subtreeFlags |= u, t.childLanes = s, r;
  }
  function JS(t, r, s) {
    var u = r.pendingProps;
    switch (du(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return dt(r), null;
      case 1:
        return St(r.type) && Ws(), dt(r), null;
      case 3:
        return u = r.stateNode, So(), Oe(wt), Oe(ut), Eu(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (t === null || t.child === null) && (Xs(r) ? r.flags |= 4 : t === null || t.memoizedState.isDehydrated && (r.flags & 256) === 0 || (r.flags |= 1024, Zt !== null && (ec(Zt), Zt = null))), Uu(t, r), dt(r), null;
      case 5:
        Cu(r);
        var f = jr(Mi.current);
        if (s = r.type, t !== null && r.stateNode != null) Yp(t, r, s, u, f), t.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!u) {
            if (r.stateNode === null) throw Error(o(166));
            return dt(r), null;
          }
          if (t = jr(fn.current), Xs(r)) {
            u = r.stateNode, s = r.type;
            var m = r.memoizedProps;
            switch (u[dn] = r, u[Ti] = m, t = (r.mode & 1) !== 0, s) {
              case "dialog":
                je("cancel", u), je("close", u);
                break;
              case "iframe":
              case "object":
              case "embed":
                je("load", u);
                break;
              case "video":
              case "audio":
                for (f = 0; f < Ei.length; f++) je(Ei[f], u);
                break;
              case "source":
                je("error", u);
                break;
              case "img":
              case "image":
              case "link":
                je(
                  "error",
                  u
                ), je("load", u);
                break;
              case "details":
                je("toggle", u);
                break;
              case "input":
                gs(u, m), je("invalid", u);
                break;
              case "select":
                u._wrapperState = { wasMultiple: !!m.multiple }, je("invalid", u);
                break;
              case "textarea":
                ys(u, m), je("invalid", u);
            }
            kr(s, m), f = null;
            for (var w in m) if (m.hasOwnProperty(w)) {
              var P = m[w];
              w === "children" ? typeof P == "string" ? u.textContent !== P && (m.suppressHydrationWarning !== !0 && zs(u.textContent, P, t), f = ["children", P]) : typeof P == "number" && u.textContent !== "" + P && (m.suppressHydrationWarning !== !0 && zs(
                u.textContent,
                P,
                t
              ), f = ["children", "" + P]) : a.hasOwnProperty(w) && P != null && w === "onScroll" && je("scroll", u);
            }
            switch (s) {
              case "input":
                ve(u), ri(u, m, !0);
                break;
              case "textarea":
                ve(u), Rl(u);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof m.onClick == "function" && (u.onclick = Bs);
            }
            u = f, r.updateQueue = u, u !== null && (r.flags |= 4);
          } else {
            w = f.nodeType === 9 ? f : f.ownerDocument, t === "http://www.w3.org/1999/xhtml" && (t = xs(s)), t === "http://www.w3.org/1999/xhtml" ? s === "script" ? (t = w.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild)) : typeof u.is == "string" ? t = w.createElement(s, { is: u.is }) : (t = w.createElement(s), s === "select" && (w = t, u.multiple ? w.multiple = !0 : u.size && (w.size = u.size))) : t = w.createElementNS(t, s), t[dn] = r, t[Ti] = u, Kp(t, r, !1, !1), r.stateNode = t;
            e: {
              switch (w = ai(s, u), s) {
                case "dialog":
                  je("cancel", t), je("close", t), f = u;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  je("load", t), f = u;
                  break;
                case "video":
                case "audio":
                  for (f = 0; f < Ei.length; f++) je(Ei[f], t);
                  f = u;
                  break;
                case "source":
                  je("error", t), f = u;
                  break;
                case "img":
                case "image":
                case "link":
                  je(
                    "error",
                    t
                  ), je("load", t), f = u;
                  break;
                case "details":
                  je("toggle", t), f = u;
                  break;
                case "input":
                  gs(t, u), f = eo(t, u), je("invalid", t);
                  break;
                case "option":
                  f = u;
                  break;
                case "select":
                  t._wrapperState = { wasMultiple: !!u.multiple }, f = G({}, u, { value: void 0 }), je("invalid", t);
                  break;
                case "textarea":
                  ys(t, u), f = oi(t, u), je("invalid", t);
                  break;
                default:
                  f = u;
              }
              kr(s, f), P = f;
              for (m in P) if (P.hasOwnProperty(m)) {
                var N = P[m];
                m === "style" ? Ss(t, N) : m === "dangerouslySetInnerHTML" ? (N = N ? N.__html : void 0, N != null && si(t, N)) : m === "children" ? typeof N == "string" ? (s !== "textarea" || N !== "") && kn(t, N) : typeof N == "number" && kn(t, "" + N) : m !== "suppressContentEditableWarning" && m !== "suppressHydrationWarning" && m !== "autoFocus" && (a.hasOwnProperty(m) ? N != null && m === "onScroll" && je("scroll", t) : N != null && A(t, m, N, w));
              }
              switch (s) {
                case "input":
                  ve(t), ri(t, u, !1);
                  break;
                case "textarea":
                  ve(t), Rl(t);
                  break;
                case "option":
                  u.value != null && t.setAttribute("value", "" + he(u.value));
                  break;
                case "select":
                  t.multiple = !!u.multiple, m = u.value, m != null ? Un(t, !!u.multiple, m, !1) : u.defaultValue != null && Un(
                    t,
                    !!u.multiple,
                    u.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof f.onClick == "function" && (t.onclick = Bs);
              }
              switch (s) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u = !!u.autoFocus;
                  break e;
                case "img":
                  u = !0;
                  break e;
                default:
                  u = !1;
              }
            }
            u && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return dt(r), null;
      case 6:
        if (t && r.stateNode != null) Gp(t, r, t.memoizedProps, u);
        else {
          if (typeof u != "string" && r.stateNode === null) throw Error(o(166));
          if (s = jr(Mi.current), jr(fn.current), Xs(r)) {
            if (u = r.stateNode, s = r.memoizedProps, u[dn] = r, (m = u.nodeValue !== s) && (t = Nt, t !== null)) switch (t.tag) {
              case 3:
                zs(u.nodeValue, s, (t.mode & 1) !== 0);
                break;
              case 5:
                t.memoizedProps.suppressHydrationWarning !== !0 && zs(u.nodeValue, s, (t.mode & 1) !== 0);
            }
            m && (r.flags |= 4);
          } else u = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(u), u[dn] = r, r.stateNode = u;
        }
        return dt(r), null;
      case 13:
        if (Oe(Fe), u = r.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (Ie && Dt !== null && (r.mode & 1) !== 0 && (r.flags & 128) === 0) Zh(), yo(), r.flags |= 98560, m = !1;
          else if (m = Xs(r), u !== null && u.dehydrated !== null) {
            if (t === null) {
              if (!m) throw Error(o(318));
              if (m = r.memoizedState, m = m !== null ? m.dehydrated : null, !m) throw Error(o(317));
              m[dn] = r;
            } else yo(), (r.flags & 128) === 0 && (r.memoizedState = null), r.flags |= 4;
            dt(r), m = !1;
          } else Zt !== null && (ec(Zt), Zt = null), m = !0;
          if (!m) return r.flags & 65536 ? r : null;
        }
        return (r.flags & 128) !== 0 ? (r.lanes = s, r) : (u = u !== null, u !== (t !== null && t.memoizedState !== null) && u && (r.child.flags |= 8192, (r.mode & 1) !== 0 && (t === null || (Fe.current & 1) !== 0 ? Qe === 0 && (Qe = 3) : rc())), r.updateQueue !== null && (r.flags |= 4), dt(r), null);
      case 4:
        return So(), Uu(t, r), t === null && ki(r.stateNode.containerInfo), dt(r), null;
      case 10:
        return yu(r.type._context), dt(r), null;
      case 17:
        return St(r.type) && Ws(), dt(r), null;
      case 19:
        if (Oe(Fe), m = r.memoizedState, m === null) return dt(r), null;
        if (u = (r.flags & 128) !== 0, w = m.rendering, w === null) if (u) _i(m, !1);
        else {
          if (Qe !== 0 || t !== null && (t.flags & 128) !== 0) for (t = r.child; t !== null; ) {
            if (w = ta(t), w !== null) {
              for (r.flags |= 128, _i(m, !1), u = w.updateQueue, u !== null && (r.updateQueue = u, r.flags |= 4), r.subtreeFlags = 0, u = s, s = r.child; s !== null; ) m = s, t = u, m.flags &= 14680066, w = m.alternate, w === null ? (m.childLanes = 0, m.lanes = t, m.child = null, m.subtreeFlags = 0, m.memoizedProps = null, m.memoizedState = null, m.updateQueue = null, m.dependencies = null, m.stateNode = null) : (m.childLanes = w.childLanes, m.lanes = w.lanes, m.child = w.child, m.subtreeFlags = 0, m.deletions = null, m.memoizedProps = w.memoizedProps, m.memoizedState = w.memoizedState, m.updateQueue = w.updateQueue, m.type = w.type, t = w.dependencies, m.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), s = s.sibling;
              return Ae(Fe, Fe.current & 1 | 2), r.child;
            }
            t = t.sibling;
          }
          m.tail !== null && He() > ko && (r.flags |= 128, u = !0, _i(m, !1), r.lanes = 4194304);
        }
        else {
          if (!u) if (t = ta(w), t !== null) {
            if (r.flags |= 128, u = !0, s = t.updateQueue, s !== null && (r.updateQueue = s, r.flags |= 4), _i(m, !0), m.tail === null && m.tailMode === "hidden" && !w.alternate && !Ie) return dt(r), null;
          } else 2 * He() - m.renderingStartTime > ko && s !== 1073741824 && (r.flags |= 128, u = !0, _i(m, !1), r.lanes = 4194304);
          m.isBackwards ? (w.sibling = r.child, r.child = w) : (s = m.last, s !== null ? s.sibling = w : r.child = w, m.last = w);
        }
        return m.tail !== null ? (r = m.tail, m.rendering = r, m.tail = r.sibling, m.renderingStartTime = He(), r.sibling = null, s = Fe.current, Ae(Fe, u ? s & 1 | 2 : s & 1), r) : (dt(r), null);
      case 22:
      case 23:
        return nc(), u = r.memoizedState !== null, t !== null && t.memoizedState !== null !== u && (r.flags |= 8192), u && (r.mode & 1) !== 0 ? (At & 1073741824) !== 0 && (dt(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : dt(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(o(156, r.tag));
  }
  function e1(t, r) {
    switch (du(r), r.tag) {
      case 1:
        return St(r.type) && Ws(), t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
      case 3:
        return So(), Oe(wt), Oe(ut), Eu(), t = r.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (r.flags = t & -65537 | 128, r) : null;
      case 5:
        return Cu(r), null;
      case 13:
        if (Oe(Fe), t = r.memoizedState, t !== null && t.dehydrated !== null) {
          if (r.alternate === null) throw Error(o(340));
          yo();
        }
        return t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
      case 19:
        return Oe(Fe), null;
      case 4:
        return So(), null;
      case 10:
        return yu(r.type._context), null;
      case 22:
      case 23:
        return nc(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ca = !1, ft = !1, t1 = typeof WeakSet == "function" ? WeakSet : Set, ie = null;
  function bo(t, r) {
    var s = t.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (u) {
      ze(t, r, u);
    }
    else s.current = null;
  }
  function Wu(t, r, s) {
    try {
      s();
    } catch (u) {
      ze(t, r, u);
    }
  }
  var Xp = !1;
  function n1(t, r) {
    if (nu = Ds, t = Th(), Gl(t)) {
      if ("selectionStart" in t) var s = { start: t.selectionStart, end: t.selectionEnd };
      else e: {
        s = (s = t.ownerDocument) && s.defaultView || window;
        var u = s.getSelection && s.getSelection();
        if (u && u.rangeCount !== 0) {
          s = u.anchorNode;
          var f = u.anchorOffset, m = u.focusNode;
          u = u.focusOffset;
          try {
            s.nodeType, m.nodeType;
          } catch {
            s = null;
            break e;
          }
          var w = 0, P = -1, N = -1, $ = 0, K = 0, Y = t, H = null;
          t: for (; ; ) {
            for (var re; Y !== s || f !== 0 && Y.nodeType !== 3 || (P = w + f), Y !== m || u !== 0 && Y.nodeType !== 3 || (N = w + u), Y.nodeType === 3 && (w += Y.nodeValue.length), (re = Y.firstChild) !== null; )
              H = Y, Y = re;
            for (; ; ) {
              if (Y === t) break t;
              if (H === s && ++$ === f && (P = w), H === m && ++K === u && (N = w), (re = Y.nextSibling) !== null) break;
              Y = H, H = Y.parentNode;
            }
            Y = re;
          }
          s = P === -1 || N === -1 ? null : { start: P, end: N };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (ru = { focusedElem: t, selectionRange: s }, Ds = !1, ie = r; ie !== null; ) if (r = ie, t = r.child, (r.subtreeFlags & 1028) !== 0 && t !== null) t.return = r, ie = t;
    else for (; ie !== null; ) {
      r = ie;
      try {
        var ae = r.alternate;
        if ((r.flags & 1024) !== 0) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ae !== null) {
              var ce = ae.memoizedProps, Ke = ae.memoizedState, I = r.stateNode, M = I.getSnapshotBeforeUpdate(r.elementType === r.type ? ce : qt(r.type, ce), Ke);
              I.__reactInternalSnapshotBeforeUpdate = M;
            }
            break;
          case 3:
            var _ = r.stateNode.containerInfo;
            _.nodeType === 1 ? _.textContent = "" : _.nodeType === 9 && _.documentElement && _.removeChild(_.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(o(163));
        }
      } catch (Z) {
        ze(r, r.return, Z);
      }
      if (t = r.sibling, t !== null) {
        t.return = r.return, ie = t;
        break;
      }
      ie = r.return;
    }
    return ae = Xp, Xp = !1, ae;
  }
  function Fi(t, r, s) {
    var u = r.updateQueue;
    if (u = u !== null ? u.lastEffect : null, u !== null) {
      var f = u = u.next;
      do {
        if ((f.tag & t) === t) {
          var m = f.destroy;
          f.destroy = void 0, m !== void 0 && Wu(r, s, m);
        }
        f = f.next;
      } while (f !== u);
    }
  }
  function da(t, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var s = r = r.next;
      do {
        if ((s.tag & t) === t) {
          var u = s.create;
          s.destroy = u();
        }
        s = s.next;
      } while (s !== r);
    }
  }
  function Hu(t) {
    var r = t.ref;
    if (r !== null) {
      var s = t.stateNode;
      switch (t.tag) {
        case 5:
          t = s;
          break;
        default:
          t = s;
      }
      typeof r == "function" ? r(t) : r.current = t;
    }
  }
  function Qp(t) {
    var r = t.alternate;
    r !== null && (t.alternate = null, Qp(r)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (r = t.stateNode, r !== null && (delete r[dn], delete r[Ti], delete r[au], delete r[FS], delete r[VS])), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  function Zp(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 4;
  }
  function qp(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Zp(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ku(t, r, s) {
    var u = t.tag;
    if (u === 5 || u === 6) t = t.stateNode, r ? s.nodeType === 8 ? s.parentNode.insertBefore(t, r) : s.insertBefore(t, r) : (s.nodeType === 8 ? (r = s.parentNode, r.insertBefore(t, s)) : (r = s, r.appendChild(t)), s = s._reactRootContainer, s != null || r.onclick !== null || (r.onclick = Bs));
    else if (u !== 4 && (t = t.child, t !== null)) for (Ku(t, r, s), t = t.sibling; t !== null; ) Ku(t, r, s), t = t.sibling;
  }
  function Yu(t, r, s) {
    var u = t.tag;
    if (u === 5 || u === 6) t = t.stateNode, r ? s.insertBefore(t, r) : s.appendChild(t);
    else if (u !== 4 && (t = t.child, t !== null)) for (Yu(t, r, s), t = t.sibling; t !== null; ) Yu(t, r, s), t = t.sibling;
  }
  var st = null, Jt = !1;
  function sr(t, r, s) {
    for (s = s.child; s !== null; ) Jp(t, r, s), s = s.sibling;
  }
  function Jp(t, r, s) {
    if (cn && typeof cn.onCommitFiberUnmount == "function") try {
      cn.onCommitFiberUnmount(Es, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        ft || bo(s, r);
      case 6:
        var u = st, f = Jt;
        st = null, sr(t, r, s), st = u, Jt = f, st !== null && (Jt ? (t = st, s = s.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(s) : t.removeChild(s)) : st.removeChild(s.stateNode));
        break;
      case 18:
        st !== null && (Jt ? (t = st, s = s.stateNode, t.nodeType === 8 ? su(t.parentNode, s) : t.nodeType === 1 && su(t, s), gi(t)) : su(st, s.stateNode));
        break;
      case 4:
        u = st, f = Jt, st = s.stateNode.containerInfo, Jt = !0, sr(t, r, s), st = u, Jt = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!ft && (u = s.updateQueue, u !== null && (u = u.lastEffect, u !== null))) {
          f = u = u.next;
          do {
            var m = f, w = m.destroy;
            m = m.tag, w !== void 0 && ((m & 2) !== 0 || (m & 4) !== 0) && Wu(s, r, w), f = f.next;
          } while (f !== u);
        }
        sr(t, r, s);
        break;
      case 1:
        if (!ft && (bo(s, r), u = s.stateNode, typeof u.componentWillUnmount == "function")) try {
          u.props = s.memoizedProps, u.state = s.memoizedState, u.componentWillUnmount();
        } catch (P) {
          ze(s, r, P);
        }
        sr(t, r, s);
        break;
      case 21:
        sr(t, r, s);
        break;
      case 22:
        s.mode & 1 ? (ft = (u = ft) || s.memoizedState !== null, sr(t, r, s), ft = u) : sr(t, r, s);
        break;
      default:
        sr(t, r, s);
    }
  }
  function em(t) {
    var r = t.updateQueue;
    if (r !== null) {
      t.updateQueue = null;
      var s = t.stateNode;
      s === null && (s = t.stateNode = new t1()), r.forEach(function(u) {
        var f = d1.bind(null, t, u);
        s.has(u) || (s.add(u), u.then(f, f));
      });
    }
  }
  function en(t, r) {
    var s = r.deletions;
    if (s !== null) for (var u = 0; u < s.length; u++) {
      var f = s[u];
      try {
        var m = t, w = r, P = w;
        e: for (; P !== null; ) {
          switch (P.tag) {
            case 5:
              st = P.stateNode, Jt = !1;
              break e;
            case 3:
              st = P.stateNode.containerInfo, Jt = !0;
              break e;
            case 4:
              st = P.stateNode.containerInfo, Jt = !0;
              break e;
          }
          P = P.return;
        }
        if (st === null) throw Error(o(160));
        Jp(m, w, f), st = null, Jt = !1;
        var N = f.alternate;
        N !== null && (N.return = null), f.return = null;
      } catch ($) {
        ze(f, r, $);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) tm(r, t), r = r.sibling;
  }
  function tm(t, r) {
    var s = t.alternate, u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (en(r, t), pn(t), u & 4) {
          try {
            Fi(3, t, t.return), da(3, t);
          } catch (ce) {
            ze(t, t.return, ce);
          }
          try {
            Fi(5, t, t.return);
          } catch (ce) {
            ze(t, t.return, ce);
          }
        }
        break;
      case 1:
        en(r, t), pn(t), u & 512 && s !== null && bo(s, s.return);
        break;
      case 5:
        if (en(r, t), pn(t), u & 512 && s !== null && bo(s, s.return), t.flags & 32) {
          var f = t.stateNode;
          try {
            kn(f, "");
          } catch (ce) {
            ze(t, t.return, ce);
          }
        }
        if (u & 4 && (f = t.stateNode, f != null)) {
          var m = t.memoizedProps, w = s !== null ? s.memoizedProps : m, P = t.type, N = t.updateQueue;
          if (t.updateQueue = null, N !== null) try {
            P === "input" && m.type === "radio" && m.name != null && to(f, m), ai(P, w);
            var $ = ai(P, m);
            for (w = 0; w < N.length; w += 2) {
              var K = N[w], Y = N[w + 1];
              K === "style" ? Ss(f, Y) : K === "dangerouslySetInnerHTML" ? si(f, Y) : K === "children" ? kn(f, Y) : A(f, K, Y, $);
            }
            switch (P) {
              case "input":
                ni(f, m);
                break;
              case "textarea":
                vs(f, m);
                break;
              case "select":
                var H = f._wrapperState.wasMultiple;
                f._wrapperState.wasMultiple = !!m.multiple;
                var re = m.value;
                re != null ? Un(f, !!m.multiple, re, !1) : H !== !!m.multiple && (m.defaultValue != null ? Un(
                  f,
                  !!m.multiple,
                  m.defaultValue,
                  !0
                ) : Un(f, !!m.multiple, m.multiple ? [] : "", !1));
            }
            f[Ti] = m;
          } catch (ce) {
            ze(t, t.return, ce);
          }
        }
        break;
      case 6:
        if (en(r, t), pn(t), u & 4) {
          if (t.stateNode === null) throw Error(o(162));
          f = t.stateNode, m = t.memoizedProps;
          try {
            f.nodeValue = m;
          } catch (ce) {
            ze(t, t.return, ce);
          }
        }
        break;
      case 3:
        if (en(r, t), pn(t), u & 4 && s !== null && s.memoizedState.isDehydrated) try {
          gi(r.containerInfo);
        } catch (ce) {
          ze(t, t.return, ce);
        }
        break;
      case 4:
        en(r, t), pn(t);
        break;
      case 13:
        en(r, t), pn(t), f = t.child, f.flags & 8192 && (m = f.memoizedState !== null, f.stateNode.isHidden = m, !m || f.alternate !== null && f.alternate.memoizedState !== null || (Qu = He())), u & 4 && em(t);
        break;
      case 22:
        if (K = s !== null && s.memoizedState !== null, t.mode & 1 ? (ft = ($ = ft) || K, en(r, t), ft = $) : en(r, t), pn(t), u & 8192) {
          if ($ = t.memoizedState !== null, (t.stateNode.isHidden = $) && !K && (t.mode & 1) !== 0) for (ie = t, K = t.child; K !== null; ) {
            for (Y = ie = K; ie !== null; ) {
              switch (H = ie, re = H.child, H.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Fi(4, H, H.return);
                  break;
                case 1:
                  bo(H, H.return);
                  var ae = H.stateNode;
                  if (typeof ae.componentWillUnmount == "function") {
                    u = H, s = H.return;
                    try {
                      r = u, ae.props = r.memoizedProps, ae.state = r.memoizedState, ae.componentWillUnmount();
                    } catch (ce) {
                      ze(u, s, ce);
                    }
                  }
                  break;
                case 5:
                  bo(H, H.return);
                  break;
                case 22:
                  if (H.memoizedState !== null) {
                    om(Y);
                    continue;
                  }
              }
              re !== null ? (re.return = H, ie = re) : om(Y);
            }
            K = K.sibling;
          }
          e: for (K = null, Y = t; ; ) {
            if (Y.tag === 5) {
              if (K === null) {
                K = Y;
                try {
                  f = Y.stateNode, $ ? (m = f.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none") : (P = Y.stateNode, N = Y.memoizedProps.style, w = N != null && N.hasOwnProperty("display") ? N.display : null, P.style.display = ws("display", w));
                } catch (ce) {
                  ze(t, t.return, ce);
                }
              }
            } else if (Y.tag === 6) {
              if (K === null) try {
                Y.stateNode.nodeValue = $ ? "" : Y.memoizedProps;
              } catch (ce) {
                ze(t, t.return, ce);
              }
            } else if ((Y.tag !== 22 && Y.tag !== 23 || Y.memoizedState === null || Y === t) && Y.child !== null) {
              Y.child.return = Y, Y = Y.child;
              continue;
            }
            if (Y === t) break e;
            for (; Y.sibling === null; ) {
              if (Y.return === null || Y.return === t) break e;
              K === Y && (K = null), Y = Y.return;
            }
            K === Y && (K = null), Y.sibling.return = Y.return, Y = Y.sibling;
          }
        }
        break;
      case 19:
        en(r, t), pn(t), u & 4 && em(t);
        break;
      case 21:
        break;
      default:
        en(
          r,
          t
        ), pn(t);
    }
  }
  function pn(t) {
    var r = t.flags;
    if (r & 2) {
      try {
        e: {
          for (var s = t.return; s !== null; ) {
            if (Zp(s)) {
              var u = s;
              break e;
            }
            s = s.return;
          }
          throw Error(o(160));
        }
        switch (u.tag) {
          case 5:
            var f = u.stateNode;
            u.flags & 32 && (kn(f, ""), u.flags &= -33);
            var m = qp(t);
            Yu(t, m, f);
            break;
          case 3:
          case 4:
            var w = u.stateNode.containerInfo, P = qp(t);
            Ku(t, P, w);
            break;
          default:
            throw Error(o(161));
        }
      } catch (N) {
        ze(t, t.return, N);
      }
      t.flags &= -3;
    }
    r & 4096 && (t.flags &= -4097);
  }
  function r1(t, r, s) {
    ie = t, nm(t);
  }
  function nm(t, r, s) {
    for (var u = (t.mode & 1) !== 0; ie !== null; ) {
      var f = ie, m = f.child;
      if (f.tag === 22 && u) {
        var w = f.memoizedState !== null || ca;
        if (!w) {
          var P = f.alternate, N = P !== null && P.memoizedState !== null || ft;
          P = ca;
          var $ = ft;
          if (ca = w, (ft = N) && !$) for (ie = f; ie !== null; ) w = ie, N = w.child, w.tag === 22 && w.memoizedState !== null ? im(f) : N !== null ? (N.return = w, ie = N) : im(f);
          for (; m !== null; ) ie = m, nm(m), m = m.sibling;
          ie = f, ca = P, ft = $;
        }
        rm(t);
      } else (f.subtreeFlags & 8772) !== 0 && m !== null ? (m.return = f, ie = m) : rm(t);
    }
  }
  function rm(t) {
    for (; ie !== null; ) {
      var r = ie;
      if ((r.flags & 8772) !== 0) {
        var s = r.alternate;
        try {
          if ((r.flags & 8772) !== 0) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              ft || da(5, r);
              break;
            case 1:
              var u = r.stateNode;
              if (r.flags & 4 && !ft) if (s === null) u.componentDidMount();
              else {
                var f = r.elementType === r.type ? s.memoizedProps : qt(r.type, s.memoizedProps);
                u.componentDidUpdate(f, s.memoizedState, u.__reactInternalSnapshotBeforeUpdate);
              }
              var m = r.updateQueue;
              m !== null && op(r, m, u);
              break;
            case 3:
              var w = r.updateQueue;
              if (w !== null) {
                if (s = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    s = r.child.stateNode;
                    break;
                  case 1:
                    s = r.child.stateNode;
                }
                op(r, w, s);
              }
              break;
            case 5:
              var P = r.stateNode;
              if (s === null && r.flags & 4) {
                s = P;
                var N = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    N.autoFocus && s.focus();
                    break;
                  case "img":
                    N.src && (s.src = N.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var $ = r.alternate;
                if ($ !== null) {
                  var K = $.memoizedState;
                  if (K !== null) {
                    var Y = K.dehydrated;
                    Y !== null && gi(Y);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(o(163));
          }
          ft || r.flags & 512 && Hu(r);
        } catch (H) {
          ze(r, r.return, H);
        }
      }
      if (r === t) {
        ie = null;
        break;
      }
      if (s = r.sibling, s !== null) {
        s.return = r.return, ie = s;
        break;
      }
      ie = r.return;
    }
  }
  function om(t) {
    for (; ie !== null; ) {
      var r = ie;
      if (r === t) {
        ie = null;
        break;
      }
      var s = r.sibling;
      if (s !== null) {
        s.return = r.return, ie = s;
        break;
      }
      ie = r.return;
    }
  }
  function im(t) {
    for (; ie !== null; ) {
      var r = ie;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var s = r.return;
            try {
              da(4, r);
            } catch (N) {
              ze(r, s, N);
            }
            break;
          case 1:
            var u = r.stateNode;
            if (typeof u.componentDidMount == "function") {
              var f = r.return;
              try {
                u.componentDidMount();
              } catch (N) {
                ze(r, f, N);
              }
            }
            var m = r.return;
            try {
              Hu(r);
            } catch (N) {
              ze(r, m, N);
            }
            break;
          case 5:
            var w = r.return;
            try {
              Hu(r);
            } catch (N) {
              ze(r, w, N);
            }
        }
      } catch (N) {
        ze(r, r.return, N);
      }
      if (r === t) {
        ie = null;
        break;
      }
      var P = r.sibling;
      if (P !== null) {
        P.return = r.return, ie = P;
        break;
      }
      ie = r.return;
    }
  }
  var o1 = Math.ceil, fa = F.ReactCurrentDispatcher, Gu = F.ReactCurrentOwner, zt = F.ReactCurrentBatchConfig, Te = 0, tt = null, Ye = null, at = 0, At = 0, Eo = tr(0), Qe = 0, Vi = null, Ir = 0, ha = 0, Xu = 0, $i = null, bt = null, Qu = 0, ko = 1 / 0, jn = null, pa = !1, Zu = null, ar = null, ma = !1, lr = null, ga = 0, zi = 0, qu = null, ya = -1, va = 0;
  function gt() {
    return (Te & 6) !== 0 ? He() : ya !== -1 ? ya : ya = He();
  }
  function ur(t) {
    return (t.mode & 1) === 0 ? 1 : (Te & 2) !== 0 && at !== 0 ? at & -at : zS.transition !== null ? (va === 0 && (va = qf()), va) : (t = Ne, t !== 0 || (t = window.event, t = t === void 0 ? 16 : ah(t.type)), t);
  }
  function tn(t, r, s, u) {
    if (50 < zi) throw zi = 0, qu = null, Error(o(185));
    di(t, s, u), ((Te & 2) === 0 || t !== tt) && (t === tt && ((Te & 2) === 0 && (ha |= s), Qe === 4 && cr(t, at)), Et(t, u), s === 1 && Te === 0 && (r.mode & 1) === 0 && (ko = He() + 500, Ks && rr()));
  }
  function Et(t, r) {
    var s = t.callbackNode;
    zw(t, r);
    var u = Ts(t, t === tt ? at : 0);
    if (u === 0) s !== null && Xf(s), t.callbackNode = null, t.callbackPriority = 0;
    else if (r = u & -u, t.callbackPriority !== r) {
      if (s != null && Xf(s), r === 1) t.tag === 0 ? $S(am.bind(null, t)) : Kh(am.bind(null, t)), IS(function() {
        (Te & 6) === 0 && rr();
      }), s = null;
      else {
        switch (Jf(u)) {
          case 1:
            s = Al;
            break;
          case 4:
            s = Qf;
            break;
          case 16:
            s = bs;
            break;
          case 536870912:
            s = Zf;
            break;
          default:
            s = bs;
        }
        s = mm(s, sm.bind(null, t));
      }
      t.callbackPriority = r, t.callbackNode = s;
    }
  }
  function sm(t, r) {
    if (ya = -1, va = 0, (Te & 6) !== 0) throw Error(o(327));
    var s = t.callbackNode;
    if (Po() && t.callbackNode !== s) return null;
    var u = Ts(t, t === tt ? at : 0);
    if (u === 0) return null;
    if ((u & 30) !== 0 || (u & t.expiredLanes) !== 0 || r) r = xa(t, u);
    else {
      r = u;
      var f = Te;
      Te |= 2;
      var m = um();
      (tt !== t || at !== r) && (jn = null, ko = He() + 500, Fr(t, r));
      do
        try {
          a1();
          break;
        } catch (P) {
          lm(t, P);
        }
      while (!0);
      gu(), fa.current = m, Te = f, Ye !== null ? r = 0 : (tt = null, at = 0, r = Qe);
    }
    if (r !== 0) {
      if (r === 2 && (f = Ml(t), f !== 0 && (u = f, r = Ju(t, f))), r === 1) throw s = Vi, Fr(t, 0), cr(t, u), Et(t, He()), s;
      if (r === 6) cr(t, u);
      else {
        if (f = t.current.alternate, (u & 30) === 0 && !i1(f) && (r = xa(t, u), r === 2 && (m = Ml(t), m !== 0 && (u = m, r = Ju(t, m))), r === 1)) throw s = Vi, Fr(t, 0), cr(t, u), Et(t, He()), s;
        switch (t.finishedWork = f, t.finishedLanes = u, r) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            Vr(t, bt, jn);
            break;
          case 3:
            if (cr(t, u), (u & 130023424) === u && (r = Qu + 500 - He(), 10 < r)) {
              if (Ts(t, 0) !== 0) break;
              if (f = t.suspendedLanes, (f & u) !== u) {
                gt(), t.pingedLanes |= t.suspendedLanes & f;
                break;
              }
              t.timeoutHandle = iu(Vr.bind(null, t, bt, jn), r);
              break;
            }
            Vr(t, bt, jn);
            break;
          case 4:
            if (cr(t, u), (u & 4194240) === u) break;
            for (r = t.eventTimes, f = -1; 0 < u; ) {
              var w = 31 - Xt(u);
              m = 1 << w, w = r[w], w > f && (f = w), u &= ~m;
            }
            if (u = f, u = He() - u, u = (120 > u ? 120 : 480 > u ? 480 : 1080 > u ? 1080 : 1920 > u ? 1920 : 3e3 > u ? 3e3 : 4320 > u ? 4320 : 1960 * o1(u / 1960)) - u, 10 < u) {
              t.timeoutHandle = iu(Vr.bind(null, t, bt, jn), u);
              break;
            }
            Vr(t, bt, jn);
            break;
          case 5:
            Vr(t, bt, jn);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return Et(t, He()), t.callbackNode === s ? sm.bind(null, t) : null;
  }
  function Ju(t, r) {
    var s = $i;
    return t.current.memoizedState.isDehydrated && (Fr(t, r).flags |= 256), t = xa(t, r), t !== 2 && (r = bt, bt = s, r !== null && ec(r)), t;
  }
  function ec(t) {
    bt === null ? bt = t : bt.push.apply(bt, t);
  }
  function i1(t) {
    for (var r = t; ; ) {
      if (r.flags & 16384) {
        var s = r.updateQueue;
        if (s !== null && (s = s.stores, s !== null)) for (var u = 0; u < s.length; u++) {
          var f = s[u], m = f.getSnapshot;
          f = f.value;
          try {
            if (!Qt(m(), f)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (s = r.child, r.subtreeFlags & 16384 && s !== null) s.return = r, r = s;
      else {
        if (r === t) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === t) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function cr(t, r) {
    for (r &= ~Xu, r &= ~ha, t.suspendedLanes |= r, t.pingedLanes &= ~r, t = t.expirationTimes; 0 < r; ) {
      var s = 31 - Xt(r), u = 1 << s;
      t[s] = -1, r &= ~u;
    }
  }
  function am(t) {
    if ((Te & 6) !== 0) throw Error(o(327));
    Po();
    var r = Ts(t, 0);
    if ((r & 1) === 0) return Et(t, He()), null;
    var s = xa(t, r);
    if (t.tag !== 0 && s === 2) {
      var u = Ml(t);
      u !== 0 && (r = u, s = Ju(t, u));
    }
    if (s === 1) throw s = Vi, Fr(t, 0), cr(t, r), Et(t, He()), s;
    if (s === 6) throw Error(o(345));
    return t.finishedWork = t.current.alternate, t.finishedLanes = r, Vr(t, bt, jn), Et(t, He()), null;
  }
  function tc(t, r) {
    var s = Te;
    Te |= 1;
    try {
      return t(r);
    } finally {
      Te = s, Te === 0 && (ko = He() + 500, Ks && rr());
    }
  }
  function _r(t) {
    lr !== null && lr.tag === 0 && (Te & 6) === 0 && Po();
    var r = Te;
    Te |= 1;
    var s = zt.transition, u = Ne;
    try {
      if (zt.transition = null, Ne = 1, t) return t();
    } finally {
      Ne = u, zt.transition = s, Te = r, (Te & 6) === 0 && rr();
    }
  }
  function nc() {
    At = Eo.current, Oe(Eo);
  }
  function Fr(t, r) {
    t.finishedWork = null, t.finishedLanes = 0;
    var s = t.timeoutHandle;
    if (s !== -1 && (t.timeoutHandle = -1, OS(s)), Ye !== null) for (s = Ye.return; s !== null; ) {
      var u = s;
      switch (du(u), u.tag) {
        case 1:
          u = u.type.childContextTypes, u != null && Ws();
          break;
        case 3:
          So(), Oe(wt), Oe(ut), Eu();
          break;
        case 5:
          Cu(u);
          break;
        case 4:
          So();
          break;
        case 13:
          Oe(Fe);
          break;
        case 19:
          Oe(Fe);
          break;
        case 10:
          yu(u.type._context);
          break;
        case 22:
        case 23:
          nc();
      }
      s = s.return;
    }
    if (tt = t, Ye = t = dr(t.current, null), at = At = r, Qe = 0, Vi = null, Xu = ha = Ir = 0, bt = $i = null, Lr !== null) {
      for (r = 0; r < Lr.length; r++) if (s = Lr[r], u = s.interleaved, u !== null) {
        s.interleaved = null;
        var f = u.next, m = s.pending;
        if (m !== null) {
          var w = m.next;
          m.next = f, u.next = w;
        }
        s.pending = u;
      }
      Lr = null;
    }
    return t;
  }
  function lm(t, r) {
    do {
      var s = Ye;
      try {
        if (gu(), na.current = sa, ra) {
          for (var u = Ve.memoizedState; u !== null; ) {
            var f = u.queue;
            f !== null && (f.pending = null), u = u.next;
          }
          ra = !1;
        }
        if (Or = 0, et = Xe = Ve = null, Li = !1, ji = 0, Gu.current = null, s === null || s.return === null) {
          Qe = 1, Vi = r, Ye = null;
          break;
        }
        e: {
          var m = t, w = s.return, P = s, N = r;
          if (r = at, P.flags |= 32768, N !== null && typeof N == "object" && typeof N.then == "function") {
            var $ = N, K = P, Y = K.tag;
            if ((K.mode & 1) === 0 && (Y === 0 || Y === 11 || Y === 15)) {
              var H = K.alternate;
              H ? (K.updateQueue = H.updateQueue, K.memoizedState = H.memoizedState, K.lanes = H.lanes) : (K.updateQueue = null, K.memoizedState = null);
            }
            var re = Lp(w);
            if (re !== null) {
              re.flags &= -257, jp(re, w, P, m, r), re.mode & 1 && Mp(m, $, r), r = re, N = $;
              var ae = r.updateQueue;
              if (ae === null) {
                var ce = /* @__PURE__ */ new Set();
                ce.add(N), r.updateQueue = ce;
              } else ae.add(N);
              break e;
            } else {
              if ((r & 1) === 0) {
                Mp(m, $, r), rc();
                break e;
              }
              N = Error(o(426));
            }
          } else if (Ie && P.mode & 1) {
            var Ke = Lp(w);
            if (Ke !== null) {
              (Ke.flags & 65536) === 0 && (Ke.flags |= 256), jp(Ke, w, P, m, r), pu(Co(N, P));
              break e;
            }
          }
          m = N = Co(N, P), Qe !== 4 && (Qe = 2), $i === null ? $i = [m] : $i.push(m), m = w;
          do {
            switch (m.tag) {
              case 3:
                m.flags |= 65536, r &= -r, m.lanes |= r;
                var I = Dp(m, N, r);
                rp(m, I);
                break e;
              case 1:
                P = N;
                var M = m.type, _ = m.stateNode;
                if ((m.flags & 128) === 0 && (typeof M.getDerivedStateFromError == "function" || _ !== null && typeof _.componentDidCatch == "function" && (ar === null || !ar.has(_)))) {
                  m.flags |= 65536, r &= -r, m.lanes |= r;
                  var Z = Ap(m, P, r);
                  rp(m, Z);
                  break e;
                }
            }
            m = m.return;
          } while (m !== null);
        }
        dm(s);
      } catch (de) {
        r = de, Ye === s && s !== null && (Ye = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function um() {
    var t = fa.current;
    return fa.current = sa, t === null ? sa : t;
  }
  function rc() {
    (Qe === 0 || Qe === 3 || Qe === 2) && (Qe = 4), tt === null || (Ir & 268435455) === 0 && (ha & 268435455) === 0 || cr(tt, at);
  }
  function xa(t, r) {
    var s = Te;
    Te |= 2;
    var u = um();
    (tt !== t || at !== r) && (jn = null, Fr(t, r));
    do
      try {
        s1();
        break;
      } catch (f) {
        lm(t, f);
      }
    while (!0);
    if (gu(), Te = s, fa.current = u, Ye !== null) throw Error(o(261));
    return tt = null, at = 0, Qe;
  }
  function s1() {
    for (; Ye !== null; ) cm(Ye);
  }
  function a1() {
    for (; Ye !== null && !Mw(); ) cm(Ye);
  }
  function cm(t) {
    var r = pm(t.alternate, t, At);
    t.memoizedProps = t.pendingProps, r === null ? dm(t) : Ye = r, Gu.current = null;
  }
  function dm(t) {
    var r = t;
    do {
      var s = r.alternate;
      if (t = r.return, (r.flags & 32768) === 0) {
        if (s = JS(s, r, At), s !== null) {
          Ye = s;
          return;
        }
      } else {
        if (s = e1(s, r), s !== null) {
          s.flags &= 32767, Ye = s;
          return;
        }
        if (t !== null) t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null;
        else {
          Qe = 6, Ye = null;
          return;
        }
      }
      if (r = r.sibling, r !== null) {
        Ye = r;
        return;
      }
      Ye = r = t;
    } while (r !== null);
    Qe === 0 && (Qe = 5);
  }
  function Vr(t, r, s) {
    var u = Ne, f = zt.transition;
    try {
      zt.transition = null, Ne = 1, l1(t, r, s, u);
    } finally {
      zt.transition = f, Ne = u;
    }
    return null;
  }
  function l1(t, r, s, u) {
    do
      Po();
    while (lr !== null);
    if ((Te & 6) !== 0) throw Error(o(327));
    s = t.finishedWork;
    var f = t.finishedLanes;
    if (s === null) return null;
    if (t.finishedWork = null, t.finishedLanes = 0, s === t.current) throw Error(o(177));
    t.callbackNode = null, t.callbackPriority = 0;
    var m = s.lanes | s.childLanes;
    if (Bw(t, m), t === tt && (Ye = tt = null, at = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || ma || (ma = !0, mm(bs, function() {
      return Po(), null;
    })), m = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || m) {
      m = zt.transition, zt.transition = null;
      var w = Ne;
      Ne = 1;
      var P = Te;
      Te |= 4, Gu.current = null, n1(t, s), tm(s, t), RS(ru), Ds = !!nu, ru = nu = null, t.current = s, r1(s), Lw(), Te = P, Ne = w, zt.transition = m;
    } else t.current = s;
    if (ma && (ma = !1, lr = t, ga = f), m = t.pendingLanes, m === 0 && (ar = null), Iw(s.stateNode), Et(t, He()), r !== null) for (u = t.onRecoverableError, s = 0; s < r.length; s++) f = r[s], u(f.value, { componentStack: f.stack, digest: f.digest });
    if (pa) throw pa = !1, t = Zu, Zu = null, t;
    return (ga & 1) !== 0 && t.tag !== 0 && Po(), m = t.pendingLanes, (m & 1) !== 0 ? t === qu ? zi++ : (zi = 0, qu = t) : zi = 0, rr(), null;
  }
  function Po() {
    if (lr !== null) {
      var t = Jf(ga), r = zt.transition, s = Ne;
      try {
        if (zt.transition = null, Ne = 16 > t ? 16 : t, lr === null) var u = !1;
        else {
          if (t = lr, lr = null, ga = 0, (Te & 6) !== 0) throw Error(o(331));
          var f = Te;
          for (Te |= 4, ie = t.current; ie !== null; ) {
            var m = ie, w = m.child;
            if ((ie.flags & 16) !== 0) {
              var P = m.deletions;
              if (P !== null) {
                for (var N = 0; N < P.length; N++) {
                  var $ = P[N];
                  for (ie = $; ie !== null; ) {
                    var K = ie;
                    switch (K.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Fi(8, K, m);
                    }
                    var Y = K.child;
                    if (Y !== null) Y.return = K, ie = Y;
                    else for (; ie !== null; ) {
                      K = ie;
                      var H = K.sibling, re = K.return;
                      if (Qp(K), K === $) {
                        ie = null;
                        break;
                      }
                      if (H !== null) {
                        H.return = re, ie = H;
                        break;
                      }
                      ie = re;
                    }
                  }
                }
                var ae = m.alternate;
                if (ae !== null) {
                  var ce = ae.child;
                  if (ce !== null) {
                    ae.child = null;
                    do {
                      var Ke = ce.sibling;
                      ce.sibling = null, ce = Ke;
                    } while (ce !== null);
                  }
                }
                ie = m;
              }
            }
            if ((m.subtreeFlags & 2064) !== 0 && w !== null) w.return = m, ie = w;
            else e: for (; ie !== null; ) {
              if (m = ie, (m.flags & 2048) !== 0) switch (m.tag) {
                case 0:
                case 11:
                case 15:
                  Fi(9, m, m.return);
              }
              var I = m.sibling;
              if (I !== null) {
                I.return = m.return, ie = I;
                break e;
              }
              ie = m.return;
            }
          }
          var M = t.current;
          for (ie = M; ie !== null; ) {
            w = ie;
            var _ = w.child;
            if ((w.subtreeFlags & 2064) !== 0 && _ !== null) _.return = w, ie = _;
            else e: for (w = M; ie !== null; ) {
              if (P = ie, (P.flags & 2048) !== 0) try {
                switch (P.tag) {
                  case 0:
                  case 11:
                  case 15:
                    da(9, P);
                }
              } catch (de) {
                ze(P, P.return, de);
              }
              if (P === w) {
                ie = null;
                break e;
              }
              var Z = P.sibling;
              if (Z !== null) {
                Z.return = P.return, ie = Z;
                break e;
              }
              ie = P.return;
            }
          }
          if (Te = f, rr(), cn && typeof cn.onPostCommitFiberRoot == "function") try {
            cn.onPostCommitFiberRoot(Es, t);
          } catch {
          }
          u = !0;
        }
        return u;
      } finally {
        Ne = s, zt.transition = r;
      }
    }
    return !1;
  }
  function fm(t, r, s) {
    r = Co(s, r), r = Dp(t, r, 1), t = ir(t, r, 1), r = gt(), t !== null && (di(t, 1, r), Et(t, r));
  }
  function ze(t, r, s) {
    if (t.tag === 3) fm(t, t, s);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        fm(r, t, s);
        break;
      } else if (r.tag === 1) {
        var u = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (ar === null || !ar.has(u))) {
          t = Co(s, t), t = Ap(r, t, 1), r = ir(r, t, 1), t = gt(), r !== null && (di(r, 1, t), Et(r, t));
          break;
        }
      }
      r = r.return;
    }
  }
  function u1(t, r, s) {
    var u = t.pingCache;
    u !== null && u.delete(r), r = gt(), t.pingedLanes |= t.suspendedLanes & s, tt === t && (at & s) === s && (Qe === 4 || Qe === 3 && (at & 130023424) === at && 500 > He() - Qu ? Fr(t, 0) : Xu |= s), Et(t, r);
  }
  function hm(t, r) {
    r === 0 && ((t.mode & 1) === 0 ? r = 1 : (r = Ps, Ps <<= 1, (Ps & 130023424) === 0 && (Ps = 4194304)));
    var s = gt();
    t = An(t, r), t !== null && (di(t, r, s), Et(t, s));
  }
  function c1(t) {
    var r = t.memoizedState, s = 0;
    r !== null && (s = r.retryLane), hm(t, s);
  }
  function d1(t, r) {
    var s = 0;
    switch (t.tag) {
      case 13:
        var u = t.stateNode, f = t.memoizedState;
        f !== null && (s = f.retryLane);
        break;
      case 19:
        u = t.stateNode;
        break;
      default:
        throw Error(o(314));
    }
    u !== null && u.delete(r), hm(t, s);
  }
  var pm;
  pm = function(t, r, s) {
    if (t !== null) if (t.memoizedProps !== r.pendingProps || wt.current) Ct = !0;
    else {
      if ((t.lanes & s) === 0 && (r.flags & 128) === 0) return Ct = !1, qS(t, r, s);
      Ct = (t.flags & 131072) !== 0;
    }
    else Ct = !1, Ie && (r.flags & 1048576) !== 0 && Yh(r, Gs, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var u = r.type;
        ua(t, r), t = r.pendingProps;
        var f = po(r, ut.current);
        wo(r, s), f = Tu(null, r, u, t, f, s);
        var m = Ru();
        return r.flags |= 1, typeof f == "object" && f !== null && typeof f.render == "function" && f.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, St(u) ? (m = !0, Hs(r)) : m = !1, r.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, wu(r), f.updater = aa, r.stateNode = f, f._reactInternals = r, ju(r, u, t, s), r = Fu(null, r, u, !0, m, s)) : (r.tag = 0, Ie && m && cu(r), mt(null, r, f, s), r = r.child), r;
      case 16:
        u = r.elementType;
        e: {
          switch (ua(t, r), t = r.pendingProps, f = u._init, u = f(u._payload), r.type = u, f = r.tag = h1(u), t = qt(u, t), f) {
            case 0:
              r = _u(null, r, u, t, s);
              break e;
            case 1:
              r = $p(null, r, u, t, s);
              break e;
            case 11:
              r = Op(null, r, u, t, s);
              break e;
            case 14:
              r = Ip(null, r, u, qt(u.type, t), s);
              break e;
          }
          throw Error(o(
            306,
            u,
            ""
          ));
        }
        return r;
      case 0:
        return u = r.type, f = r.pendingProps, f = r.elementType === u ? f : qt(u, f), _u(t, r, u, f, s);
      case 1:
        return u = r.type, f = r.pendingProps, f = r.elementType === u ? f : qt(u, f), $p(t, r, u, f, s);
      case 3:
        e: {
          if (zp(r), t === null) throw Error(o(387));
          u = r.pendingProps, m = r.memoizedState, f = m.element, np(t, r), ea(r, u, null, s);
          var w = r.memoizedState;
          if (u = w.element, m.isDehydrated) if (m = { element: u, isDehydrated: !1, cache: w.cache, pendingSuspenseBoundaries: w.pendingSuspenseBoundaries, transitions: w.transitions }, r.updateQueue.baseState = m, r.memoizedState = m, r.flags & 256) {
            f = Co(Error(o(423)), r), r = Bp(t, r, u, s, f);
            break e;
          } else if (u !== f) {
            f = Co(Error(o(424)), r), r = Bp(t, r, u, s, f);
            break e;
          } else for (Dt = er(r.stateNode.containerInfo.firstChild), Nt = r, Ie = !0, Zt = null, s = ep(r, null, u, s), r.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (yo(), u === f) {
              r = Ln(t, r, s);
              break e;
            }
            mt(t, r, u, s);
          }
          r = r.child;
        }
        return r;
      case 5:
        return ip(r), t === null && hu(r), u = r.type, f = r.pendingProps, m = t !== null ? t.memoizedProps : null, w = f.children, ou(u, f) ? w = null : m !== null && ou(u, m) && (r.flags |= 32), Vp(t, r), mt(t, r, w, s), r.child;
      case 6:
        return t === null && hu(r), null;
      case 13:
        return Up(t, r, s);
      case 4:
        return Su(r, r.stateNode.containerInfo), u = r.pendingProps, t === null ? r.child = vo(r, null, u, s) : mt(t, r, u, s), r.child;
      case 11:
        return u = r.type, f = r.pendingProps, f = r.elementType === u ? f : qt(u, f), Op(t, r, u, f, s);
      case 7:
        return mt(t, r, r.pendingProps, s), r.child;
      case 8:
        return mt(t, r, r.pendingProps.children, s), r.child;
      case 12:
        return mt(t, r, r.pendingProps.children, s), r.child;
      case 10:
        e: {
          if (u = r.type._context, f = r.pendingProps, m = r.memoizedProps, w = f.value, Ae(Zs, u._currentValue), u._currentValue = w, m !== null) if (Qt(m.value, w)) {
            if (m.children === f.children && !wt.current) {
              r = Ln(t, r, s);
              break e;
            }
          } else for (m = r.child, m !== null && (m.return = r); m !== null; ) {
            var P = m.dependencies;
            if (P !== null) {
              w = m.child;
              for (var N = P.firstContext; N !== null; ) {
                if (N.context === u) {
                  if (m.tag === 1) {
                    N = Mn(-1, s & -s), N.tag = 2;
                    var $ = m.updateQueue;
                    if ($ !== null) {
                      $ = $.shared;
                      var K = $.pending;
                      K === null ? N.next = N : (N.next = K.next, K.next = N), $.pending = N;
                    }
                  }
                  m.lanes |= s, N = m.alternate, N !== null && (N.lanes |= s), vu(
                    m.return,
                    s,
                    r
                  ), P.lanes |= s;
                  break;
                }
                N = N.next;
              }
            } else if (m.tag === 10) w = m.type === r.type ? null : m.child;
            else if (m.tag === 18) {
              if (w = m.return, w === null) throw Error(o(341));
              w.lanes |= s, P = w.alternate, P !== null && (P.lanes |= s), vu(w, s, r), w = m.sibling;
            } else w = m.child;
            if (w !== null) w.return = m;
            else for (w = m; w !== null; ) {
              if (w === r) {
                w = null;
                break;
              }
              if (m = w.sibling, m !== null) {
                m.return = w.return, w = m;
                break;
              }
              w = w.return;
            }
            m = w;
          }
          mt(t, r, f.children, s), r = r.child;
        }
        return r;
      case 9:
        return f = r.type, u = r.pendingProps.children, wo(r, s), f = Vt(f), u = u(f), r.flags |= 1, mt(t, r, u, s), r.child;
      case 14:
        return u = r.type, f = qt(u, r.pendingProps), f = qt(u.type, f), Ip(t, r, u, f, s);
      case 15:
        return _p(t, r, r.type, r.pendingProps, s);
      case 17:
        return u = r.type, f = r.pendingProps, f = r.elementType === u ? f : qt(u, f), ua(t, r), r.tag = 1, St(u) ? (t = !0, Hs(r)) : t = !1, wo(r, s), Rp(r, u, f), ju(r, u, f, s), Fu(null, r, u, !0, t, s);
      case 19:
        return Hp(t, r, s);
      case 22:
        return Fp(t, r, s);
    }
    throw Error(o(156, r.tag));
  };
  function mm(t, r) {
    return Gf(t, r);
  }
  function f1(t, r, s, u) {
    this.tag = t, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Bt(t, r, s, u) {
    return new f1(t, r, s, u);
  }
  function oc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function h1(t) {
    if (typeof t == "function") return oc(t) ? 1 : 0;
    if (t != null) {
      if (t = t.$$typeof, t === be) return 11;
      if (t === Ee) return 14;
    }
    return 2;
  }
  function dr(t, r) {
    var s = t.alternate;
    return s === null ? (s = Bt(t.tag, r, t.key, t.mode), s.elementType = t.elementType, s.type = t.type, s.stateNode = t.stateNode, s.alternate = t, t.alternate = s) : (s.pendingProps = r, s.type = t.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = t.flags & 14680064, s.childLanes = t.childLanes, s.lanes = t.lanes, s.child = t.child, s.memoizedProps = t.memoizedProps, s.memoizedState = t.memoizedState, s.updateQueue = t.updateQueue, r = t.dependencies, s.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, s.sibling = t.sibling, s.index = t.index, s.ref = t.ref, s;
  }
  function wa(t, r, s, u, f, m) {
    var w = 2;
    if (u = t, typeof t == "function") oc(t) && (w = 1);
    else if (typeof t == "string") w = 5;
    else e: switch (t) {
      case V:
        return $r(s.children, f, m, r);
      case z:
        w = 8, f |= 8;
        break;
      case q:
        return t = Bt(12, s, r, f | 2), t.elementType = q, t.lanes = m, t;
      case we:
        return t = Bt(13, s, r, f), t.elementType = we, t.lanes = m, t;
      case xe:
        return t = Bt(19, s, r, f), t.elementType = xe, t.lanes = m, t;
      case te:
        return Sa(s, f, m, r);
      default:
        if (typeof t == "object" && t !== null) switch (t.$$typeof) {
          case ne:
            w = 10;
            break e;
          case se:
            w = 9;
            break e;
          case be:
            w = 11;
            break e;
          case Ee:
            w = 14;
            break e;
          case ge:
            w = 16, u = null;
            break e;
        }
        throw Error(o(130, t == null ? t : typeof t, ""));
    }
    return r = Bt(w, s, r, f), r.elementType = t, r.type = u, r.lanes = m, r;
  }
  function $r(t, r, s, u) {
    return t = Bt(7, t, u, r), t.lanes = s, t;
  }
  function Sa(t, r, s, u) {
    return t = Bt(22, t, u, r), t.elementType = te, t.lanes = s, t.stateNode = { isHidden: !1 }, t;
  }
  function ic(t, r, s) {
    return t = Bt(6, t, null, r), t.lanes = s, t;
  }
  function sc(t, r, s) {
    return r = Bt(4, t.children !== null ? t.children : [], t.key, r), r.lanes = s, r.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, r;
  }
  function p1(t, r, s, u, f) {
    this.tag = r, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ll(0), this.expirationTimes = Ll(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ll(0), this.identifierPrefix = u, this.onRecoverableError = f, this.mutableSourceEagerHydrationData = null;
  }
  function ac(t, r, s, u, f, m, w, P, N) {
    return t = new p1(t, r, s, P, N), r === 1 ? (r = 1, m === !0 && (r |= 8)) : r = 0, m = Bt(3, null, null, r), t.current = m, m.stateNode = t, m.memoizedState = { element: u, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, wu(m), t;
  }
  function m1(t, r, s) {
    var u = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: B, key: u == null ? null : "" + u, children: t, containerInfo: r, implementation: s };
  }
  function gm(t) {
    if (!t) return nr;
    t = t._reactInternals;
    e: {
      if (Rr(t) !== t || t.tag !== 1) throw Error(o(170));
      var r = t;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (St(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(o(171));
    }
    if (t.tag === 1) {
      var s = t.type;
      if (St(s)) return Wh(t, s, r);
    }
    return r;
  }
  function ym(t, r, s, u, f, m, w, P, N) {
    return t = ac(s, u, !0, t, f, m, w, P, N), t.context = gm(null), s = t.current, u = gt(), f = ur(s), m = Mn(u, f), m.callback = r ?? null, ir(s, m, f), t.current.lanes = f, di(t, f, u), Et(t, u), t;
  }
  function Ca(t, r, s, u) {
    var f = r.current, m = gt(), w = ur(f);
    return s = gm(s), r.context === null ? r.context = s : r.pendingContext = s, r = Mn(m, w), r.payload = { element: t }, u = u === void 0 ? null : u, u !== null && (r.callback = u), t = ir(f, r, w), t !== null && (tn(t, f, w, m), Js(t, f, w)), w;
  }
  function ba(t) {
    if (t = t.current, !t.child) return null;
    switch (t.child.tag) {
      case 5:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function vm(t, r) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var s = t.retryLane;
      t.retryLane = s !== 0 && s < r ? s : r;
    }
  }
  function lc(t, r) {
    vm(t, r), (t = t.alternate) && vm(t, r);
  }
  function g1() {
    return null;
  }
  var xm = typeof reportError == "function" ? reportError : function(t) {
    console.error(t);
  };
  function uc(t) {
    this._internalRoot = t;
  }
  Ea.prototype.render = uc.prototype.render = function(t) {
    var r = this._internalRoot;
    if (r === null) throw Error(o(409));
    Ca(t, r, null, null);
  }, Ea.prototype.unmount = uc.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var r = t.containerInfo;
      _r(function() {
        Ca(null, t, null, null);
      }), r[Tn] = null;
    }
  };
  function Ea(t) {
    this._internalRoot = t;
  }
  Ea.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var r = nh();
      t = { blockedOn: null, target: t, priority: r };
      for (var s = 0; s < Zn.length && r !== 0 && r < Zn[s].priority; s++) ;
      Zn.splice(s, 0, t), s === 0 && ih(t);
    }
  };
  function cc(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function ka(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 && (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "));
  }
  function wm() {
  }
  function y1(t, r, s, u, f) {
    if (f) {
      if (typeof u == "function") {
        var m = u;
        u = function() {
          var $ = ba(w);
          m.call($);
        };
      }
      var w = ym(r, u, t, 0, null, !1, !1, "", wm);
      return t._reactRootContainer = w, t[Tn] = w.current, ki(t.nodeType === 8 ? t.parentNode : t), _r(), w;
    }
    for (; f = t.lastChild; ) t.removeChild(f);
    if (typeof u == "function") {
      var P = u;
      u = function() {
        var $ = ba(N);
        P.call($);
      };
    }
    var N = ac(t, 0, !1, null, null, !1, !1, "", wm);
    return t._reactRootContainer = N, t[Tn] = N.current, ki(t.nodeType === 8 ? t.parentNode : t), _r(function() {
      Ca(r, N, s, u);
    }), N;
  }
  function Pa(t, r, s, u, f) {
    var m = s._reactRootContainer;
    if (m) {
      var w = m;
      if (typeof f == "function") {
        var P = f;
        f = function() {
          var N = ba(w);
          P.call(N);
        };
      }
      Ca(r, w, t, f);
    } else w = y1(s, r, t, f, u);
    return ba(w);
  }
  eh = function(t) {
    switch (t.tag) {
      case 3:
        var r = t.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var s = ci(r.pendingLanes);
          s !== 0 && (jl(r, s | 1), Et(r, He()), (Te & 6) === 0 && (ko = He() + 500, rr()));
        }
        break;
      case 13:
        _r(function() {
          var u = An(t, 1);
          if (u !== null) {
            var f = gt();
            tn(u, t, 1, f);
          }
        }), lc(t, 1);
    }
  }, Ol = function(t) {
    if (t.tag === 13) {
      var r = An(t, 134217728);
      if (r !== null) {
        var s = gt();
        tn(r, t, 134217728, s);
      }
      lc(t, 134217728);
    }
  }, th = function(t) {
    if (t.tag === 13) {
      var r = ur(t), s = An(t, r);
      if (s !== null) {
        var u = gt();
        tn(s, t, r, u);
      }
      lc(t, r);
    }
  }, nh = function() {
    return Ne;
  }, rh = function(t, r) {
    var s = Ne;
    try {
      return Ne = t, r();
    } finally {
      Ne = s;
    }
  }, Q = function(t, r, s) {
    switch (r) {
      case "input":
        if (ni(t, s), r = s.name, s.type === "radio" && r != null) {
          for (s = t; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < s.length; r++) {
            var u = s[r];
            if (u !== t && u.form === t.form) {
              var f = Us(u);
              if (!f) throw Error(o(90));
              Je(u), ni(u, f);
            }
          }
        }
        break;
      case "textarea":
        vs(t, s);
        break;
      case "select":
        r = s.value, r != null && Un(t, !!s.multiple, r, !1);
    }
  }, It = tc, Kn = _r;
  var v1 = { usingClientEntryPoint: !1, Events: [Ri, fo, Us, pt, xt, tc] }, Bi = { findFiberByHostInstance: Nr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, x1 = { bundleType: Bi.bundleType, version: Bi.version, rendererPackageName: Bi.rendererPackageName, rendererConfig: Bi.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: F.ReactCurrentDispatcher, findHostInstanceByFiber: function(t) {
    return t = Kf(t), t === null ? null : t.stateNode;
  }, findFiberByHostInstance: Bi.findFiberByHostInstance || g1, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ta = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ta.isDisabled && Ta.supportsFiber) try {
      Es = Ta.inject(x1), cn = Ta;
    } catch {
    }
  }
  return kt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = v1, kt.createPortal = function(t, r) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!cc(r)) throw Error(o(200));
    return m1(t, r, null, s);
  }, kt.createRoot = function(t, r) {
    if (!cc(t)) throw Error(o(299));
    var s = !1, u = "", f = xm;
    return r != null && (r.unstable_strictMode === !0 && (s = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (f = r.onRecoverableError)), r = ac(t, 1, !1, null, null, s, !1, u, f), t[Tn] = r.current, ki(t.nodeType === 8 ? t.parentNode : t), new uc(r);
  }, kt.findDOMNode = function(t) {
    if (t == null) return null;
    if (t.nodeType === 1) return t;
    var r = t._reactInternals;
    if (r === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = Kf(r), t = t === null ? null : t.stateNode, t;
  }, kt.flushSync = function(t) {
    return _r(t);
  }, kt.hydrate = function(t, r, s) {
    if (!ka(r)) throw Error(o(200));
    return Pa(null, t, r, !0, s);
  }, kt.hydrateRoot = function(t, r, s) {
    if (!cc(t)) throw Error(o(405));
    var u = s != null && s.hydratedSources || null, f = !1, m = "", w = xm;
    if (s != null && (s.unstable_strictMode === !0 && (f = !0), s.identifierPrefix !== void 0 && (m = s.identifierPrefix), s.onRecoverableError !== void 0 && (w = s.onRecoverableError)), r = ym(r, null, t, 1, s ?? null, f, !1, m, w), t[Tn] = r.current, ki(t), u) for (t = 0; t < u.length; t++) s = u[t], f = s._getVersion, f = f(s._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [s, f] : r.mutableSourceEagerHydrationData.push(
      s,
      f
    );
    return new Ea(r);
  }, kt.render = function(t, r, s) {
    if (!ka(r)) throw Error(o(200));
    return Pa(null, t, r, !1, s);
  }, kt.unmountComponentAtNode = function(t) {
    if (!ka(t)) throw Error(o(40));
    return t._reactRootContainer ? (_r(function() {
      Pa(null, null, t, !1, function() {
        t._reactRootContainer = null, t[Tn] = null;
      });
    }), !0) : !1;
  }, kt.unstable_batchedUpdates = tc, kt.unstable_renderSubtreeIntoContainer = function(t, r, s, u) {
    if (!ka(s)) throw Error(o(200));
    if (t == null || t._reactInternals === void 0) throw Error(o(38));
    return Pa(t, r, s, !1, u);
  }, kt.version = "18.3.1-next-f1338f8080-20240426", kt;
}
var Rm;
function Hy() {
  if (Rm) return hc.exports;
  Rm = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return e(), hc.exports = T1(), hc.exports;
}
var Nm;
function R1() {
  if (Nm) return Ra;
  Nm = 1;
  var e = Hy();
  return Ra.createRoot = e.createRoot, Ra.hydrateRoot = e.hydrateRoot, Ra;
}
var N1 = R1();
const D1 = /* @__PURE__ */ Ld(N1);
/**
 * react-router v7.10.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function A1(e = {}) {
  let { initialEntries: n = ["/"], initialIndex: o, v5Compat: i = !1 } = e, a;
  a = n.map(
    (S, E) => g(
      S,
      typeof S == "string" ? null : S.state,
      E === 0 ? "default" : void 0
    )
  );
  let l = h(
    o ?? a.length - 1
  ), c = "POP", d = null;
  function h(S) {
    return Math.min(Math.max(S, 0), a.length - 1);
  }
  function p() {
    return a[l];
  }
  function g(S, E = null, b) {
    let k = L1(
      a ? p().pathname : "/",
      S,
      E,
      b
    );
    return Kt(
      k.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        S
      )}`
    ), k;
  }
  function v(S) {
    return typeof S == "string" ? S : qa(S);
  }
  return {
    get index() {
      return l;
    },
    get action() {
      return c;
    },
    get location() {
      return p();
    },
    createHref: v,
    createURL(S) {
      return new URL(v(S), "http://localhost");
    },
    encodeLocation(S) {
      let E = typeof S == "string" ? qr(S) : S;
      return {
        pathname: E.pathname || "",
        search: E.search || "",
        hash: E.hash || ""
      };
    },
    push(S, E) {
      c = "PUSH";
      let b = g(S, E);
      l += 1, a.splice(l, a.length, b), i && d && d({ action: c, location: b, delta: 1 });
    },
    replace(S, E) {
      c = "REPLACE";
      let b = g(S, E);
      a[l] = b, i && d && d({ action: c, location: b, delta: 0 });
    },
    go(S) {
      c = "POP";
      let E = h(l + S), b = a[E];
      l = E, d && d({ action: c, location: b, delta: S });
    },
    listen(S) {
      return d = S, () => {
        d = null;
      };
    }
  };
}
function Ue(e, n) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(n);
}
function Kt(e, n) {
  if (!e) {
    typeof console < "u" && console.warn(n);
    try {
      throw new Error(n);
    } catch {
    }
  }
}
function M1() {
  return Math.random().toString(36).substring(2, 10);
}
function L1(e, n, o = null, i) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof n == "string" ? qr(n) : n,
    state: o,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: n && n.key || i || M1()
  };
}
function qa({
  pathname: e = "/",
  search: n = "",
  hash: o = ""
}) {
  return n && n !== "?" && (e += n.charAt(0) === "?" ? n : "?" + n), o && o !== "#" && (e += o.charAt(0) === "#" ? o : "#" + o), e;
}
function qr(e) {
  let n = {};
  if (e) {
    let o = e.indexOf("#");
    o >= 0 && (n.hash = e.substring(o), e = e.substring(0, o));
    let i = e.indexOf("?");
    i >= 0 && (n.search = e.substring(i), e = e.substring(0, i)), e && (n.pathname = e);
  }
  return n;
}
function Ky(e, n, o = "/") {
  return j1(e, n, o, !1);
}
function j1(e, n, o, i) {
  let a = typeof n == "string" ? qr(n) : n, l = _n(a.pathname || "/", o);
  if (l == null)
    return null;
  let c = Yy(e);
  O1(c);
  let d = null;
  for (let h = 0; d == null && h < c.length; ++h) {
    let p = K1(l);
    d = W1(
      c[h],
      p,
      i
    );
  }
  return d;
}
function Yy(e, n = [], o = [], i = "", a = !1) {
  let l = (c, d, h = a, p) => {
    let g = {
      relativePath: p === void 0 ? c.path || "" : p,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: d,
      route: c
    };
    if (g.relativePath.startsWith("/")) {
      if (!g.relativePath.startsWith(i) && h)
        return;
      Ue(
        g.relativePath.startsWith(i),
        `Absolute route path "${g.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), g.relativePath = g.relativePath.slice(i.length);
    }
    let v = In([i, g.relativePath]), x = o.concat(g);
    c.children && c.children.length > 0 && (Ue(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), Yy(
      c.children,
      n,
      x,
      v,
      h
    )), !(c.path == null && !c.index) && n.push({
      path: v,
      score: B1(v, c.index),
      routesMeta: x
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      l(c, d);
    else
      for (let h of Gy(c.path))
        l(c, d, !0, h);
  }), n;
}
function Gy(e) {
  let n = e.split("/");
  if (n.length === 0) return [];
  let [o, ...i] = n, a = o.endsWith("?"), l = o.replace(/\?$/, "");
  if (i.length === 0)
    return a ? [l, ""] : [l];
  let c = Gy(i.join("/")), d = [];
  return d.push(
    ...c.map(
      (h) => h === "" ? l : [l, h].join("/")
    )
  ), a && d.push(...c), d.map(
    (h) => e.startsWith("/") && h === "" ? "/" : h
  );
}
function O1(e) {
  e.sort(
    (n, o) => n.score !== o.score ? o.score - n.score : U1(
      n.routesMeta.map((i) => i.childrenIndex),
      o.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var I1 = /^:[\w-]+$/, _1 = 3, F1 = 2, V1 = 1, $1 = 10, z1 = -2, Dm = (e) => e === "*";
function B1(e, n) {
  let o = e.split("/"), i = o.length;
  return o.some(Dm) && (i += z1), n && (i += F1), o.filter((a) => !Dm(a)).reduce(
    (a, l) => a + (I1.test(l) ? _1 : l === "" ? V1 : $1),
    i
  );
}
function U1(e, n) {
  return e.length === n.length && e.slice(0, -1).every((i, a) => i === n[a]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - n[n.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function W1(e, n, o = !1) {
  let { routesMeta: i } = e, a = {}, l = "/", c = [];
  for (let d = 0; d < i.length; ++d) {
    let h = i[d], p = d === i.length - 1, g = l === "/" ? n : n.slice(l.length) || "/", v = Ja(
      { path: h.relativePath, caseSensitive: h.caseSensitive, end: p },
      g
    ), x = h.route;
    if (!v && p && o && !i[i.length - 1].route.index && (v = Ja(
      {
        path: h.relativePath,
        caseSensitive: h.caseSensitive,
        end: !1
      },
      g
    )), !v)
      return null;
    Object.assign(a, v.params), c.push({
      // TODO: Can this as be avoided?
      params: a,
      pathname: In([l, v.pathname]),
      pathnameBase: Z1(
        In([l, v.pathnameBase])
      ),
      route: x
    }), v.pathnameBase !== "/" && (l = In([l, v.pathnameBase]));
  }
  return c;
}
function Ja(e, n) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [o, i] = H1(
    e.path,
    e.caseSensitive,
    e.end
  ), a = n.match(o);
  if (!a) return null;
  let l = a[0], c = l.replace(/(.)\/+$/, "$1"), d = a.slice(1);
  return {
    params: i.reduce(
      (p, { paramName: g, isOptional: v }, x) => {
        if (g === "*") {
          let E = d[x] || "";
          c = l.slice(0, l.length - E.length).replace(/(.)\/+$/, "$1");
        }
        const S = d[x];
        return v && !S ? p[g] = void 0 : p[g] = (S || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: l,
    pathnameBase: c,
    pattern: e
  };
}
function H1(e, n = !1, o = !0) {
  Kt(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let i = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (c, d, h) => (i.push({ paramName: d, isOptional: h != null }), h ? "/?([^\\/]+)?" : "/([^\\/]+)")
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (i.push({ paramName: "*" }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : o ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, n ? void 0 : "i"), i];
}
function K1(e) {
  try {
    return e.split("/").map((n) => decodeURIComponent(n).replace(/\//g, "%2F")).join("/");
  } catch (n) {
    return Kt(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${n}).`
    ), e;
  }
}
function _n(e, n) {
  if (n === "/") return e;
  if (!e.toLowerCase().startsWith(n.toLowerCase()))
    return null;
  let o = n.endsWith("/") ? n.length - 1 : n.length, i = e.charAt(o);
  return i && i !== "/" ? null : e.slice(o) || "/";
}
var Y1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, G1 = (e) => Y1.test(e);
function X1(e, n = "/") {
  let {
    pathname: o,
    search: i = "",
    hash: a = ""
  } = typeof e == "string" ? qr(e) : e, l;
  if (o)
    if (G1(o))
      l = o;
    else {
      if (o.includes("//")) {
        let c = o;
        o = o.replace(/\/\/+/g, "/"), Kt(
          !1,
          `Pathnames cannot have embedded double slashes - normalizing ${c} -> ${o}`
        );
      }
      o.startsWith("/") ? l = Am(o.substring(1), "/") : l = Am(o, n);
    }
  else
    l = n;
  return {
    pathname: l,
    search: q1(i),
    hash: J1(a)
  };
}
function Am(e, n) {
  let o = n.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? o.length > 1 && o.pop() : a !== "." && o.push(a);
  }), o.length > 1 ? o.join("/") : "/";
}
function gc(e, n, o, i) {
  return `Cannot include a '${e}' character in a manually specified \`to.${n}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Q1(e) {
  return e.filter(
    (n, o) => o === 0 || n.route.path && n.route.path.length > 0
  );
}
function Xy(e) {
  let n = Q1(e);
  return n.map(
    (o, i) => i === n.length - 1 ? o.pathname : o.pathnameBase
  );
}
function Qy(e, n, o, i = !1) {
  let a;
  typeof e == "string" ? a = qr(e) : (a = { ...e }, Ue(
    !a.pathname || !a.pathname.includes("?"),
    gc("?", "pathname", "search", a)
  ), Ue(
    !a.pathname || !a.pathname.includes("#"),
    gc("#", "pathname", "hash", a)
  ), Ue(
    !a.search || !a.search.includes("#"),
    gc("#", "search", "hash", a)
  ));
  let l = e === "" || a.pathname === "", c = l ? "/" : a.pathname, d;
  if (c == null)
    d = o;
  else {
    let v = n.length - 1;
    if (!i && c.startsWith("..")) {
      let x = c.split("/");
      for (; x[0] === ".."; )
        x.shift(), v -= 1;
      a.pathname = x.join("/");
    }
    d = v >= 0 ? n[v] : "/";
  }
  let h = X1(a, d), p = c && c !== "/" && c.endsWith("/"), g = (l || c === ".") && o.endsWith("/");
  return !h.pathname.endsWith("/") && (p || g) && (h.pathname += "/"), h;
}
var In = (e) => e.join("/").replace(/\/\/+/g, "/"), Z1 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), q1 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, J1 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function eC(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function tC(e) {
  return e.map((n) => n.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Zy = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  Zy
);
var nC = [
  "GET",
  ...Zy
];
new Set(nC);
var Ko = y.createContext(null);
Ko.displayName = "DataRouter";
var pl = y.createContext(null);
pl.displayName = "DataRouterState";
y.createContext(!1);
var qy = y.createContext({
  isTransitioning: !1
});
qy.displayName = "ViewTransition";
var rC = y.createContext(
  /* @__PURE__ */ new Map()
);
rC.displayName = "Fetchers";
var oC = y.createContext(null);
oC.displayName = "Await";
var an = y.createContext(
  null
);
an.displayName = "Navigation";
var ss = y.createContext(
  null
);
ss.displayName = "Location";
var bn = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
bn.displayName = "Route";
var Id = y.createContext(null);
Id.displayName = "RouteError";
function iC(e, { relative: n } = {}) {
  Ue(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: o, navigator: i } = y.useContext(an), { hash: a, pathname: l, search: c } = ls(e, { relative: n }), d = l;
  return o !== "/" && (d = l === "/" ? o : In([o, l])), i.createHref({ pathname: d, search: c, hash: a });
}
function as() {
  return y.useContext(ss) != null;
}
function Jr() {
  return Ue(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(ss).location;
}
var Jy = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function ev(e) {
  y.useContext(an).static || y.useLayoutEffect(e);
}
function sC() {
  let { isDataRoute: e } = y.useContext(bn);
  return e ? wC() : aC();
}
function aC() {
  Ue(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = y.useContext(Ko), { basename: n, navigator: o } = y.useContext(an), { matches: i } = y.useContext(bn), { pathname: a } = Jr(), l = JSON.stringify(Xy(i)), c = y.useRef(!1);
  return ev(() => {
    c.current = !0;
  }), y.useCallback(
    (h, p = {}) => {
      if (Kt(c.current, Jy), !c.current) return;
      if (typeof h == "number") {
        o.go(h);
        return;
      }
      let g = Qy(
        h,
        JSON.parse(l),
        a,
        p.relative === "path"
      );
      e == null && n !== "/" && (g.pathname = g.pathname === "/" ? n : In([n, g.pathname])), (p.replace ? o.replace : o.push)(
        g,
        p.state,
        p
      );
    },
    [
      n,
      o,
      l,
      a,
      e
    ]
  );
}
y.createContext(null);
function lC() {
  let { matches: e } = y.useContext(bn), n = e[e.length - 1];
  return n ? n.params : {};
}
function ls(e, { relative: n } = {}) {
  let { matches: o } = y.useContext(bn), { pathname: i } = Jr(), a = JSON.stringify(Xy(o));
  return y.useMemo(
    () => Qy(
      e,
      JSON.parse(a),
      i,
      n === "path"
    ),
    [e, a, i, n]
  );
}
function uC(e, n) {
  return tv(e, n);
}
function tv(e, n, o, i, a) {
  Ue(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = y.useContext(an), { matches: c } = y.useContext(bn), d = c[c.length - 1], h = d ? d.params : {}, p = d ? d.pathname : "/", g = d ? d.pathnameBase : "/", v = d && d.route;
  {
    let T = v && v.path || "";
    nv(
      p,
      !v || T.endsWith("*") || T.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${T}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${T}"> to <Route path="${T === "/" ? "*" : `${T}/*`}">.`
    );
  }
  let x = Jr(), S;
  if (n) {
    let T = typeof n == "string" ? qr(n) : n;
    Ue(
      g === "/" || T.pathname?.startsWith(g),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${T.pathname}" was given in the \`location\` prop.`
    ), S = T;
  } else
    S = x;
  let E = S.pathname || "/", b = E;
  if (g !== "/") {
    let T = g.replace(/^\//, "").split("/");
    b = "/" + E.replace(/^\//, "").split("/").slice(T.length).join("/");
  }
  let k = Ky(e, { pathname: b });
  Kt(
    v || k != null,
    `No routes matched location "${S.pathname}${S.search}${S.hash}" `
  ), Kt(
    k == null || k[k.length - 1].route.element !== void 0 || k[k.length - 1].route.Component !== void 0 || k[k.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  );
  let R = pC(
    k && k.map(
      (T) => Object.assign({}, T, {
        params: Object.assign({}, h, T.params),
        pathname: In([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            T.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : T.pathname
        ]),
        pathnameBase: T.pathnameBase === "/" ? g : In([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            T.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : T.pathnameBase
        ])
      })
    ),
    c,
    o,
    i,
    a
  );
  return n && R ? /* @__PURE__ */ y.createElement(
    ss.Provider,
    {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          ...S
        },
        navigationType: "POP"
        /* Pop */
      }
    },
    R
  ) : R;
}
function cC() {
  let e = xC(), n = eC(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), o = e instanceof Error ? e.stack : null, i = "rgba(200,200,200, 0.5)", a = { padding: "0.5rem", backgroundColor: i }, l = { padding: "2px 4px", backgroundColor: i }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: l }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: l }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, n), o ? /* @__PURE__ */ y.createElement("pre", { style: a }, o) : null, c);
}
var dC = /* @__PURE__ */ y.createElement(cC, null), fC = class extends y.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, n) {
    return n.location !== e.location || n.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : n.error,
      location: n.location,
      revalidation: e.revalidation || n.revalidation
    };
  }
  componentDidCatch(e, n) {
    this.props.onError ? this.props.onError(e, n) : console.error(
      "React Router caught the following error during render",
      e
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ y.createElement(bn.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Id.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function hC({ routeContext: e, match: n, children: o }) {
  let i = y.useContext(Ko);
  return i && i.static && i.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = n.route.id), /* @__PURE__ */ y.createElement(bn.Provider, { value: e }, o);
}
function pC(e, n = [], o = null, i = null, a = null) {
  if (e == null) {
    if (!o)
      return null;
    if (o.errors)
      e = o.matches;
    else if (n.length === 0 && !o.initialized && o.matches.length > 0)
      e = o.matches;
    else
      return null;
  }
  let l = e, c = o?.errors;
  if (c != null) {
    let g = l.findIndex(
      (v) => v.route.id && c?.[v.route.id] !== void 0
    );
    Ue(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        c
      ).join(",")}`
    ), l = l.slice(
      0,
      Math.min(l.length, g + 1)
    );
  }
  let d = !1, h = -1;
  if (o)
    for (let g = 0; g < l.length; g++) {
      let v = l[g];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (h = g), v.route.id) {
        let { loaderData: x, errors: S } = o, E = v.route.loader && !x.hasOwnProperty(v.route.id) && (!S || S[v.route.id] === void 0);
        if (v.route.lazy || E) {
          d = !0, h >= 0 ? l = l.slice(0, h + 1) : l = [l[0]];
          break;
        }
      }
    }
  let p = o && i ? (g, v) => {
    i(g, {
      location: o.location,
      params: o.matches?.[0]?.params ?? {},
      unstable_pattern: tC(o.matches),
      errorInfo: v
    });
  } : void 0;
  return l.reduceRight(
    (g, v, x) => {
      let S, E = !1, b = null, k = null;
      o && (S = c && v.route.id ? c[v.route.id] : void 0, b = v.route.errorElement || dC, d && (h < 0 && x === 0 ? (nv(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), E = !0, k = null) : h === x && (E = !0, k = v.route.hydrateFallbackElement || null)));
      let R = n.concat(l.slice(0, x + 1)), T = () => {
        let A;
        return S ? A = b : E ? A = k : v.route.Component ? A = /* @__PURE__ */ y.createElement(v.route.Component, null) : v.route.element ? A = v.route.element : A = g, /* @__PURE__ */ y.createElement(
          hC,
          {
            match: v,
            routeContext: {
              outlet: g,
              matches: R,
              isDataRoute: o != null
            },
            children: A
          }
        );
      };
      return o && (v.route.ErrorBoundary || v.route.errorElement || x === 0) ? /* @__PURE__ */ y.createElement(
        fC,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: b,
          error: S,
          children: T(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: p
        }
      ) : T();
    },
    null
  );
}
function _d(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function mC(e) {
  let n = y.useContext(Ko);
  return Ue(n, _d(e)), n;
}
function gC(e) {
  let n = y.useContext(pl);
  return Ue(n, _d(e)), n;
}
function yC(e) {
  let n = y.useContext(bn);
  return Ue(n, _d(e)), n;
}
function Fd(e) {
  let n = yC(e), o = n.matches[n.matches.length - 1];
  return Ue(
    o.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), o.route.id;
}
function vC() {
  return Fd(
    "useRouteId"
    /* UseRouteId */
  );
}
function xC() {
  let e = y.useContext(Id), n = gC(
    "useRouteError"
    /* UseRouteError */
  ), o = Fd(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : n.errors?.[o];
}
function wC() {
  let { router: e } = mC(
    "useNavigate"
    /* UseNavigateStable */
  ), n = Fd(
    "useNavigate"
    /* UseNavigateStable */
  ), o = y.useRef(!1);
  return ev(() => {
    o.current = !0;
  }), y.useCallback(
    async (a, l = {}) => {
      Kt(o.current, Jy), o.current && (typeof a == "number" ? await e.navigate(a) : await e.navigate(a, { fromRouteId: n, ...l }));
    },
    [e, n]
  );
}
var Mm = {};
function nv(e, n, o) {
  !n && !Mm[e] && (Mm[e] = !0, Kt(!1, o));
}
y.memo(SC);
function SC({
  routes: e,
  future: n,
  state: o,
  unstable_onError: i
}) {
  return tv(e, void 0, o, i, n);
}
function CC({
  basename: e,
  children: n,
  initialEntries: o,
  initialIndex: i,
  unstable_useTransitions: a
}) {
  let l = y.useRef();
  l.current == null && (l.current = A1({
    initialEntries: o,
    initialIndex: i,
    v5Compat: !0
  }));
  let c = l.current, [d, h] = y.useState({
    action: c.action,
    location: c.location
  }), p = y.useCallback(
    (g) => {
      a === !1 ? h(g) : y.startTransition(() => h(g));
    },
    [a]
  );
  return y.useLayoutEffect(() => c.listen(p), [c, p]), /* @__PURE__ */ y.createElement(
    bC,
    {
      basename: e,
      children: n,
      location: d.location,
      navigationType: d.action,
      navigator: c,
      unstable_useTransitions: a === !0
    }
  );
}
function rv(e) {
  Ue(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function bC({
  basename: e = "/",
  children: n = null,
  location: o,
  navigationType: i = "POP",
  navigator: a,
  static: l = !1,
  unstable_useTransitions: c
}) {
  Ue(
    !as(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"), h = y.useMemo(
    () => ({
      basename: d,
      navigator: a,
      static: l,
      unstable_useTransitions: c,
      future: {}
    }),
    [d, a, l, c]
  );
  typeof o == "string" && (o = qr(o));
  let {
    pathname: p = "/",
    search: g = "",
    hash: v = "",
    state: x = null,
    key: S = "default"
  } = o, E = y.useMemo(() => {
    let b = _n(p, d);
    return b == null ? null : {
      location: {
        pathname: b,
        search: g,
        hash: v,
        state: x,
        key: S
      },
      navigationType: i
    };
  }, [d, p, g, v, x, S, i]);
  return Kt(
    E != null,
    `<Router basename="${d}"> is not able to match the URL "${p}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), E == null ? null : /* @__PURE__ */ y.createElement(an.Provider, { value: h }, /* @__PURE__ */ y.createElement(ss.Provider, { children: n, value: E }));
}
function EC({
  children: e,
  location: n
}) {
  return uC(ed(e), n);
}
function ed(e, n = []) {
  let o = [];
  return y.Children.forEach(e, (i, a) => {
    if (!y.isValidElement(i))
      return;
    let l = [...n, a];
    if (i.type === y.Fragment) {
      o.push.apply(
        o,
        ed(i.props.children, l)
      );
      return;
    }
    Ue(
      i.type === rv,
      `[${typeof i.type == "string" ? i.type : i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    ), Ue(
      !i.props.index || !i.props.children,
      "An index route cannot have child routes."
    );
    let c = {
      id: i.props.id || l.join("-"),
      caseSensitive: i.props.caseSensitive,
      element: i.props.element,
      Component: i.props.Component,
      index: i.props.index,
      path: i.props.path,
      middleware: i.props.middleware,
      loader: i.props.loader,
      action: i.props.action,
      hydrateFallbackElement: i.props.hydrateFallbackElement,
      HydrateFallback: i.props.HydrateFallback,
      errorElement: i.props.errorElement,
      ErrorBoundary: i.props.ErrorBoundary,
      hasErrorBoundary: i.props.hasErrorBoundary === !0 || i.props.ErrorBoundary != null || i.props.errorElement != null,
      shouldRevalidate: i.props.shouldRevalidate,
      handle: i.props.handle,
      lazy: i.props.lazy
    };
    i.props.children && (c.children = ed(
      i.props.children,
      l
    )), o.push(c);
  }), o;
}
var Ba = "get", Ua = "application/x-www-form-urlencoded";
function ml(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function kC(e) {
  return ml(e) && e.tagName.toLowerCase() === "button";
}
function PC(e) {
  return ml(e) && e.tagName.toLowerCase() === "form";
}
function TC(e) {
  return ml(e) && e.tagName.toLowerCase() === "input";
}
function RC(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function NC(e, n) {
  return e.button === 0 && // Ignore everything but left clicks
  (!n || n === "_self") && // Let browser handle "target=_blank" etc.
  !RC(e);
}
var Na = null;
function DC() {
  if (Na === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Na = !1;
    } catch {
      Na = !0;
    }
  return Na;
}
var AC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function yc(e) {
  return e != null && !AC.has(e) ? (Kt(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ua}"`
  ), null) : e;
}
function MC(e, n) {
  let o, i, a, l, c;
  if (PC(e)) {
    let d = e.getAttribute("action");
    i = d ? _n(d, n) : null, o = e.getAttribute("method") || Ba, a = yc(e.getAttribute("enctype")) || Ua, l = new FormData(e);
  } else if (kC(e) || TC(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let h = e.getAttribute("formaction") || d.getAttribute("action");
    if (i = h ? _n(h, n) : null, o = e.getAttribute("formmethod") || d.getAttribute("method") || Ba, a = yc(e.getAttribute("formenctype")) || yc(d.getAttribute("enctype")) || Ua, l = new FormData(d, e), !DC()) {
      let { name: p, type: g, value: v } = e;
      if (g === "image") {
        let x = p ? `${p}.` : "";
        l.append(`${x}x`, "0"), l.append(`${x}y`, "0");
      } else p && l.append(p, v);
    }
  } else {
    if (ml(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    o = Ba, i = null, a = Ua, c = e;
  }
  return l && a === "text/plain" && (c = l, l = void 0), { action: i, method: o.toLowerCase(), encType: a, formData: l, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Vd(e, n) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(n);
}
function LC(e, n, o) {
  let i = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return i.pathname === "/" ? i.pathname = `_root.${o}` : n && _n(i.pathname, n) === "/" ? i.pathname = `${n.replace(/\/$/, "")}/_root.${o}` : i.pathname = `${i.pathname.replace(/\/$/, "")}.${o}`, i;
}
async function jC(e, n) {
  if (e.id in n)
    return n[e.id];
  try {
    let o = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return n[e.id] = o, o;
  } catch (o) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(o), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function OC(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function IC(e, n, o) {
  let i = await Promise.all(
    e.map(async (a) => {
      let l = n.routes[a.route.id];
      if (l) {
        let c = await jC(l, o);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return $C(
    i.flat(1).filter(OC).filter((a) => a.rel === "stylesheet" || a.rel === "preload").map(
      (a) => a.rel === "stylesheet" ? { ...a, rel: "prefetch", as: "style" } : { ...a, rel: "prefetch" }
    )
  );
}
function Lm(e, n, o, i, a, l) {
  let c = (h, p) => o[p] ? h.route.id !== o[p].route.id : !0, d = (h, p) => (
    // param change, /users/123 -> /users/456
    o[p].pathname !== h.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    o[p].route.path?.endsWith("*") && o[p].params["*"] !== h.params["*"]
  );
  return l === "assets" ? n.filter(
    (h, p) => c(h, p) || d(h, p)
  ) : l === "data" ? n.filter((h, p) => {
    let g = i.routes[h.route.id];
    if (!g || !g.hasLoader)
      return !1;
    if (c(h, p) || d(h, p))
      return !0;
    if (h.route.shouldRevalidate) {
      let v = h.route.shouldRevalidate({
        currentUrl: new URL(
          a.pathname + a.search + a.hash,
          window.origin
        ),
        currentParams: o[0]?.params || {},
        nextUrl: new URL(e, window.origin),
        nextParams: h.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function _C(e, n, { includeHydrateFallback: o } = {}) {
  return FC(
    e.map((i) => {
      let a = n.routes[i.route.id];
      if (!a) return [];
      let l = [a.module];
      return a.clientActionModule && (l = l.concat(a.clientActionModule)), a.clientLoaderModule && (l = l.concat(a.clientLoaderModule)), o && a.hydrateFallbackModule && (l = l.concat(a.hydrateFallbackModule)), a.imports && (l = l.concat(a.imports)), l;
    }).flat(1)
  );
}
function FC(e) {
  return [...new Set(e)];
}
function VC(e) {
  let n = {}, o = Object.keys(e).sort();
  for (let i of o)
    n[i] = e[i];
  return n;
}
function $C(e, n) {
  let o = /* @__PURE__ */ new Set();
  return new Set(n), e.reduce((i, a) => {
    let l = JSON.stringify(VC(a));
    return o.has(l) || (o.add(l), i.push({ key: l, link: a })), i;
  }, []);
}
function ov() {
  let e = y.useContext(Ko);
  return Vd(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function zC() {
  let e = y.useContext(pl);
  return Vd(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var $d = y.createContext(void 0);
$d.displayName = "FrameworkContext";
function iv() {
  let e = y.useContext($d);
  return Vd(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function BC(e, n) {
  let o = y.useContext($d), [i, a] = y.useState(!1), [l, c] = y.useState(!1), { onFocus: d, onBlur: h, onMouseEnter: p, onMouseLeave: g, onTouchStart: v } = n, x = y.useRef(null);
  y.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let b = (R) => {
        R.forEach((T) => {
          c(T.isIntersecting);
        });
      }, k = new IntersectionObserver(b, { threshold: 0.5 });
      return x.current && k.observe(x.current), () => {
        k.disconnect();
      };
    }
  }, [e]), y.useEffect(() => {
    if (i) {
      let b = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(b);
      };
    }
  }, [i]);
  let S = () => {
    a(!0);
  }, E = () => {
    a(!1), c(!1);
  };
  return o ? e !== "intent" ? [l, x, {}] : [
    l,
    x,
    {
      onFocus: Wi(d, S),
      onBlur: Wi(h, E),
      onMouseEnter: Wi(p, S),
      onMouseLeave: Wi(g, E),
      onTouchStart: Wi(v, S)
    }
  ] : [!1, x, {}];
}
function Wi(e, n) {
  return (o) => {
    e && e(o), o.defaultPrevented || n(o);
  };
}
function UC({ page: e, ...n }) {
  let { router: o } = ov(), i = y.useMemo(
    () => Ky(o.routes, e, o.basename),
    [o.routes, e, o.basename]
  );
  return i ? /* @__PURE__ */ y.createElement(HC, { page: e, matches: i, ...n }) : null;
}
function WC(e) {
  let { manifest: n, routeModules: o } = iv(), [i, a] = y.useState([]);
  return y.useEffect(() => {
    let l = !1;
    return IC(e, n, o).then(
      (c) => {
        l || a(c);
      }
    ), () => {
      l = !0;
    };
  }, [e, n, o]), i;
}
function HC({
  page: e,
  matches: n,
  ...o
}) {
  let i = Jr(), { manifest: a, routeModules: l } = iv(), { basename: c } = ov(), { loaderData: d, matches: h } = zC(), p = y.useMemo(
    () => Lm(
      e,
      n,
      h,
      a,
      i,
      "data"
    ),
    [e, n, h, a, i]
  ), g = y.useMemo(
    () => Lm(
      e,
      n,
      h,
      a,
      i,
      "assets"
    ),
    [e, n, h, a, i]
  ), v = y.useMemo(() => {
    if (e === i.pathname + i.search + i.hash)
      return [];
    let E = /* @__PURE__ */ new Set(), b = !1;
    if (n.forEach((R) => {
      let T = a.routes[R.route.id];
      !T || !T.hasLoader || (!p.some((A) => A.route.id === R.route.id) && R.route.id in d && l[R.route.id]?.shouldRevalidate || T.hasClientLoader ? b = !0 : E.add(R.route.id));
    }), E.size === 0)
      return [];
    let k = LC(e, c, "data");
    return b && E.size > 0 && k.searchParams.set(
      "_routes",
      n.filter((R) => E.has(R.route.id)).map((R) => R.route.id).join(",")
    ), [k.pathname + k.search];
  }, [
    c,
    d,
    i,
    a,
    p,
    n,
    e,
    l
  ]), x = y.useMemo(
    () => _C(g, a),
    [g, a]
  ), S = WC(g);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, v.map((E) => /* @__PURE__ */ y.createElement("link", { key: E, rel: "prefetch", as: "fetch", href: E, ...o })), x.map((E) => /* @__PURE__ */ y.createElement("link", { key: E, rel: "modulepreload", href: E, ...o })), S.map(({ key: E, link: b }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ y.createElement("link", { key: E, nonce: o.nonce, ...b })
  )));
}
function KC(...e) {
  return (n) => {
    e.forEach((o) => {
      typeof o == "function" ? o(n) : o != null && (o.current = n);
    });
  };
}
var sv = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  sv && (window.__reactRouterVersion = // @ts-expect-error
  "7.10.1");
} catch {
}
var av = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, lv = y.forwardRef(
  function({
    onClick: n,
    discover: o = "render",
    prefetch: i = "none",
    relative: a,
    reloadDocument: l,
    replace: c,
    state: d,
    target: h,
    to: p,
    preventScrollReset: g,
    viewTransition: v,
    ...x
  }, S) {
    let { basename: E, unstable_useTransitions: b } = y.useContext(an), k = typeof p == "string" && av.test(p), R, T = !1;
    if (typeof p == "string" && k && (R = p, sv))
      try {
        let ne = new URL(window.location.href), se = p.startsWith("//") ? new URL(ne.protocol + p) : new URL(p), be = _n(se.pathname, E);
        se.origin === ne.origin && be != null ? p = be + se.search + se.hash : T = !0;
      } catch {
        Kt(
          !1,
          `<Link to="${p}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let A = iC(p, { relative: a }), [F, O, B] = BC(
      i,
      x
    ), V = QC(p, {
      replace: c,
      state: d,
      target: h,
      preventScrollReset: g,
      relative: a,
      viewTransition: v,
      unstable_useTransitions: b
    });
    function z(ne) {
      n && n(ne), ne.defaultPrevented || V(ne);
    }
    let q = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...x,
          ...B,
          href: R || A,
          onClick: T || l ? n : z,
          ref: KC(S, O),
          target: h,
          "data-discover": !k && o === "render" ? "true" : void 0
        }
      )
    );
    return F && !k ? /* @__PURE__ */ y.createElement(y.Fragment, null, q, /* @__PURE__ */ y.createElement(UC, { page: A })) : q;
  }
);
lv.displayName = "Link";
var YC = y.forwardRef(
  function({
    "aria-current": n = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: a = !1,
    style: l,
    to: c,
    viewTransition: d,
    children: h,
    ...p
  }, g) {
    let v = ls(c, { relative: p.relative }), x = Jr(), S = y.useContext(pl), { navigator: E, basename: b } = y.useContext(an), k = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    tb(v) && d === !0, R = E.encodeLocation ? E.encodeLocation(v).pathname : v.pathname, T = x.pathname, A = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    o || (T = T.toLowerCase(), A = A ? A.toLowerCase() : null, R = R.toLowerCase()), A && b && (A = _n(A, b) || A);
    const F = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let O = T === R || !a && T.startsWith(R) && T.charAt(F) === "/", B = A != null && (A === R || !a && A.startsWith(R) && A.charAt(R.length) === "/"), V = {
      isActive: O,
      isPending: B,
      isTransitioning: k
    }, z = O ? n : void 0, q;
    typeof i == "function" ? q = i(V) : q = [
      i,
      O ? "active" : null,
      B ? "pending" : null,
      k ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let ne = typeof l == "function" ? l(V) : l;
    return /* @__PURE__ */ y.createElement(
      lv,
      {
        ...p,
        "aria-current": z,
        className: q,
        ref: g,
        style: ne,
        to: c,
        viewTransition: d
      },
      typeof h == "function" ? h(V) : h
    );
  }
);
YC.displayName = "NavLink";
var GC = y.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: n,
    navigate: o,
    reloadDocument: i,
    replace: a,
    state: l,
    method: c = Ba,
    action: d,
    onSubmit: h,
    relative: p,
    preventScrollReset: g,
    viewTransition: v,
    ...x
  }, S) => {
    let { unstable_useTransitions: E } = y.useContext(an), b = JC(), k = eb(d, { relative: p }), R = c.toLowerCase() === "get" ? "get" : "post", T = typeof d == "string" && av.test(d), A = (F) => {
      if (h && h(F), F.defaultPrevented) return;
      F.preventDefault();
      let O = F.nativeEvent.submitter, B = O?.getAttribute("formmethod") || c, V = () => b(O || F.currentTarget, {
        fetcherKey: n,
        method: B,
        navigate: o,
        replace: a,
        state: l,
        relative: p,
        preventScrollReset: g,
        viewTransition: v
      });
      E && o !== !1 ? y.startTransition(() => V()) : V();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: S,
        method: R,
        action: k,
        onSubmit: i ? h : A,
        ...x,
        "data-discover": !T && e === "render" ? "true" : void 0
      }
    );
  }
);
GC.displayName = "Form";
function XC(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function uv(e) {
  let n = y.useContext(Ko);
  return Ue(n, XC(e)), n;
}
function QC(e, {
  target: n,
  replace: o,
  state: i,
  preventScrollReset: a,
  relative: l,
  viewTransition: c,
  unstable_useTransitions: d
} = {}) {
  let h = sC(), p = Jr(), g = ls(e, { relative: l });
  return y.useCallback(
    (v) => {
      if (NC(v, n)) {
        v.preventDefault();
        let x = o !== void 0 ? o : qa(p) === qa(g), S = () => h(e, {
          replace: x,
          state: i,
          preventScrollReset: a,
          relative: l,
          viewTransition: c
        });
        d ? y.startTransition(() => S()) : S();
      }
    },
    [
      p,
      h,
      g,
      o,
      i,
      n,
      e,
      a,
      l,
      c,
      d
    ]
  );
}
var ZC = 0, qC = () => `__${String(++ZC)}__`;
function JC() {
  let { router: e } = uv(
    "useSubmit"
    /* UseSubmit */
  ), { basename: n } = y.useContext(an), o = vC(), i = e.fetch, a = e.navigate;
  return y.useCallback(
    async (l, c = {}) => {
      let { action: d, method: h, encType: p, formData: g, body: v } = MC(
        l,
        n
      );
      if (c.navigate === !1) {
        let x = c.fetcherKey || qC();
        await i(x, o, c.action || d, {
          preventScrollReset: c.preventScrollReset,
          formData: g,
          body: v,
          formMethod: c.method || h,
          formEncType: c.encType || p,
          flushSync: c.flushSync
        });
      } else
        await a(c.action || d, {
          preventScrollReset: c.preventScrollReset,
          formData: g,
          body: v,
          formMethod: c.method || h,
          formEncType: c.encType || p,
          replace: c.replace,
          state: c.state,
          fromRouteId: o,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition
        });
    },
    [i, a, n, o]
  );
}
function eb(e, { relative: n } = {}) {
  let { basename: o } = y.useContext(an), i = y.useContext(bn);
  Ue(i, "useFormAction must be used inside a RouteContext");
  let [a] = i.matches.slice(-1), l = { ...ls(e || ".", { relative: n }) }, c = Jr();
  if (e == null) {
    l.search = c.search;
    let d = new URLSearchParams(l.search), h = d.getAll("index");
    if (h.some((g) => g === "")) {
      d.delete("index"), h.filter((v) => v).forEach((v) => d.append("index", v));
      let g = d.toString();
      l.search = g ? `?${g}` : "";
    }
  }
  return (!e || e === ".") && a.route.index && (l.search = l.search ? l.search.replace(/^\?/, "?index&") : "?index"), o !== "/" && (l.pathname = l.pathname === "/" ? o : In([o, l.pathname])), qa(l);
}
function tb(e, { relative: n } = {}) {
  let o = y.useContext(qy);
  Ue(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = uv(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), a = ls(e, { relative: n });
  if (!o.isTransitioning)
    return !1;
  let l = _n(o.currentLocation.pathname, i) || o.currentLocation.pathname, c = _n(o.nextLocation.pathname, i) || o.nextLocation.pathname;
  return Ja(a.pathname, c) != null || Ja(a.pathname, l) != null;
}
var zd = Hy();
const nb = /* @__PURE__ */ Ld(zd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rb = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ob = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (n, o, i) => i ? i.toUpperCase() : o.toLowerCase()
), jm = (e) => {
  const n = ob(e);
  return n.charAt(0).toUpperCase() + n.slice(1);
}, cv = (...e) => e.filter((n, o, i) => !!n && n.trim() !== "" && i.indexOf(n) === o).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ib = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sb = y.forwardRef(
  ({
    color: e = "currentColor",
    size: n = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: i,
    className: a = "",
    children: l,
    iconNode: c,
    ...d
  }, h) => y.createElement(
    "svg",
    {
      ref: h,
      ...ib,
      width: n,
      height: n,
      stroke: e,
      strokeWidth: i ? Number(o) * 24 / Number(n) : o,
      className: cv("lucide", a),
      ...d
    },
    [
      ...c.map(([p, g]) => y.createElement(p, g)),
      ...Array.isArray(l) ? l : [l]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rt = (e, n) => {
  const o = y.forwardRef(
    ({ className: i, ...a }, l) => y.createElement(sb, {
      ref: l,
      iconNode: n,
      className: cv(
        `lucide-${rb(jm(e))}`,
        `lucide-${e}`,
        i
      ),
      ...a
    })
  );
  return o.displayName = jm(e), o;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ab = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], dv = rt("briefcase", ab);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lb = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], ub = rt("calendar", lb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cb = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], td = rt("check", cb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const db = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], fb = rt("chevron-down", db);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hb = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], fv = rt("chevron-left", hb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pb = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], hv = rt("chevron-right", pb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mb = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], gb = rt("chevrons-up-down", mb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yb = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], vb = rt("circle-check", yb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xb = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
], Wa = rt("credit-card", xb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wb = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
], Om = rt("dollar-sign", wb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sb = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], Cb = rt("globe", Sb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bb = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Eb = rt("loader-circle", bb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kb = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], Bd = rt("map-pin", kb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pb = [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
], Tb = rt("phone", Pb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rb = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], Nb = rt("search", Rb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Db = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], Ab = rt("user", Db);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mb = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
], Lb = rt("users", Mb);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jb = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
], Ob = rt("video", jb), Ud = y.createContext({});
function Wd(e) {
  const n = y.useRef(null);
  return n.current === null && (n.current = e()), n.current;
}
const Hd = typeof window < "u", pv = Hd ? y.useLayoutEffect : y.useEffect, gl = /* @__PURE__ */ y.createContext(null);
function Kd(e, n) {
  e.indexOf(n) === -1 && e.push(n);
}
function Yd(e, n) {
  const o = e.indexOf(n);
  o > -1 && e.splice(o, 1);
}
const Fn = (e, n, o) => o > n ? n : o < e ? e : o;
let Gd = () => {
};
const Vn = {}, mv = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function gv(e) {
  return typeof e == "object" && e !== null;
}
const yv = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function Xd(e) {
  let n;
  return () => (n === void 0 && (n = e()), n);
}
const Ht = /* @__NO_SIDE_EFFECTS__ */ (e) => e, Ib = (e, n) => (o) => n(e(o)), us = (...e) => e.reduce(Ib), Ji = /* @__NO_SIDE_EFFECTS__ */ (e, n, o) => {
  const i = n - e;
  return i === 0 ? 1 : (o - e) / i;
};
class Qd {
  constructor() {
    this.subscriptions = [];
  }
  add(n) {
    return Kd(this.subscriptions, n), () => Yd(this.subscriptions, n);
  }
  notify(n, o, i) {
    const a = this.subscriptions.length;
    if (a)
      if (a === 1)
        this.subscriptions[0](n, o, i);
      else
        for (let l = 0; l < a; l++) {
          const c = this.subscriptions[l];
          c && c(n, o, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const yn = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, Wt = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function vv(e, n) {
  return n ? e * (1e3 / n) : 0;
}
const xv = (e, n, o) => (((1 - 3 * o + 3 * n) * e + (3 * o - 6 * n)) * e + 3 * n) * e, _b = 1e-7, Fb = 12;
function Vb(e, n, o, i, a) {
  let l, c, d = 0;
  do
    c = n + (o - n) / 2, l = xv(c, i, a) - e, l > 0 ? o = c : n = c;
  while (Math.abs(l) > _b && ++d < Fb);
  return c;
}
function cs(e, n, o, i) {
  if (e === n && o === i)
    return Ht;
  const a = (l) => Vb(l, 0, 1, e, o);
  return (l) => l === 0 || l === 1 ? l : xv(a(l), n, i);
}
const wv = (e) => (n) => n <= 0.5 ? e(2 * n) / 2 : (2 - e(2 * (1 - n))) / 2, Sv = (e) => (n) => 1 - e(1 - n), Cv = /* @__PURE__ */ cs(0.33, 1.53, 0.69, 0.99), Zd = /* @__PURE__ */ Sv(Cv), bv = /* @__PURE__ */ wv(Zd), Ev = (e) => (e *= 2) < 1 ? 0.5 * Zd(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), qd = (e) => 1 - Math.sin(Math.acos(e)), kv = Sv(qd), Pv = wv(qd), $b = /* @__PURE__ */ cs(0.42, 0, 1, 1), zb = /* @__PURE__ */ cs(0, 0, 0.58, 1), Tv = /* @__PURE__ */ cs(0.42, 0, 0.58, 1), Bb = (e) => Array.isArray(e) && typeof e[0] != "number", Rv = (e) => Array.isArray(e) && typeof e[0] == "number", Ub = {
  linear: Ht,
  easeIn: $b,
  easeInOut: Tv,
  easeOut: zb,
  circIn: qd,
  circInOut: Pv,
  circOut: kv,
  backIn: Zd,
  backInOut: bv,
  backOut: Cv,
  anticipate: Ev
}, Wb = (e) => typeof e == "string", Im = (e) => {
  if (Rv(e)) {
    Gd(e.length === 4);
    const [n, o, i, a] = e;
    return cs(n, o, i, a);
  } else if (Wb(e))
    return Ub[e];
  return e;
}, Da = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Hb(e, n) {
  let o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = !1, l = !1;
  const c = /* @__PURE__ */ new WeakSet();
  let d = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function h(g) {
    c.has(g) && (p.schedule(g), e()), g(d);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (g, v = !1, x = !1) => {
      const E = x && a ? o : i;
      return v && c.add(g), E.has(g) || E.add(g), g;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (g) => {
      i.delete(g), c.delete(g);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (g) => {
      if (d = g, a) {
        l = !0;
        return;
      }
      a = !0, [o, i] = [i, o], o.forEach(h), o.clear(), a = !1, l && (l = !1, p.process(g));
    }
  };
  return p;
}
const Kb = 40;
function Nv(e, n) {
  let o = !1, i = !0;
  const a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, l = () => o = !0, c = Da.reduce((A, F) => (A[F] = Hb(l), A), {}), { setup: d, read: h, resolveKeyframes: p, preUpdate: g, update: v, preRender: x, render: S, postRender: E } = c, b = () => {
    const A = Vn.useManualTiming ? a.timestamp : performance.now();
    o = !1, Vn.useManualTiming || (a.delta = i ? 1e3 / 60 : Math.max(Math.min(A - a.timestamp, Kb), 1)), a.timestamp = A, a.isProcessing = !0, d.process(a), h.process(a), p.process(a), g.process(a), v.process(a), x.process(a), S.process(a), E.process(a), a.isProcessing = !1, o && n && (i = !1, e(b));
  }, k = () => {
    o = !0, i = !0, a.isProcessing || e(b);
  };
  return { schedule: Da.reduce((A, F) => {
    const O = c[F];
    return A[F] = (B, V = !1, z = !1) => (o || k(), O.schedule(B, V, z)), A;
  }, {}), cancel: (A) => {
    for (let F = 0; F < Da.length; F++)
      c[Da[F]].cancel(A);
  }, state: a, steps: c };
}
const { schedule: _e, cancel: gr, state: lt, steps: vc } = /* @__PURE__ */ Nv(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ht, !0);
let Ha;
function Yb() {
  Ha = void 0;
}
const Pt = {
  now: () => (Ha === void 0 && Pt.set(lt.isProcessing || Vn.useManualTiming ? lt.timestamp : performance.now()), Ha),
  set: (e) => {
    Ha = e, queueMicrotask(Yb);
  }
}, Dv = (e) => (n) => typeof n == "string" && n.startsWith(e), Av = /* @__PURE__ */ Dv("--"), Gb = /* @__PURE__ */ Dv("var(--"), Jd = (e) => Gb(e) ? Xb.test(e.split("/*")[0].trim()) : !1, Xb = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Yo = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, es = {
  ...Yo,
  transform: (e) => Fn(0, 1, e)
}, Aa = {
  ...Yo,
  default: 1
}, Xi = (e) => Math.round(e * 1e5) / 1e5, ef = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Qb(e) {
  return e == null;
}
const Zb = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, tf = (e, n) => (o) => !!(typeof o == "string" && Zb.test(o) && o.startsWith(e) || n && !Qb(o) && Object.prototype.hasOwnProperty.call(o, n)), Mv = (e, n, o) => (i) => {
  if (typeof i != "string")
    return i;
  const [a, l, c, d] = i.match(ef);
  return {
    [e]: parseFloat(a),
    [n]: parseFloat(l),
    [o]: parseFloat(c),
    alpha: d !== void 0 ? parseFloat(d) : 1
  };
}, qb = (e) => Fn(0, 255, e), xc = {
  ...Yo,
  transform: (e) => Math.round(qb(e))
}, Wr = {
  test: /* @__PURE__ */ tf("rgb", "red"),
  parse: /* @__PURE__ */ Mv("red", "green", "blue"),
  transform: ({ red: e, green: n, blue: o, alpha: i = 1 }) => "rgba(" + xc.transform(e) + ", " + xc.transform(n) + ", " + xc.transform(o) + ", " + Xi(es.transform(i)) + ")"
};
function Jb(e) {
  let n = "", o = "", i = "", a = "";
  return e.length > 5 ? (n = e.substring(1, 3), o = e.substring(3, 5), i = e.substring(5, 7), a = e.substring(7, 9)) : (n = e.substring(1, 2), o = e.substring(2, 3), i = e.substring(3, 4), a = e.substring(4, 5), n += n, o += o, i += i, a += a), {
    red: parseInt(n, 16),
    green: parseInt(o, 16),
    blue: parseInt(i, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
const nd = {
  test: /* @__PURE__ */ tf("#"),
  parse: Jb,
  transform: Wr.transform
}, ds = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (n) => typeof n == "string" && n.endsWith(e) && n.split(" ").length === 1,
  parse: parseFloat,
  transform: (n) => `${n}${e}`
}), pr = /* @__PURE__ */ ds("deg"), vn = /* @__PURE__ */ ds("%"), Se = /* @__PURE__ */ ds("px"), eE = /* @__PURE__ */ ds("vh"), tE = /* @__PURE__ */ ds("vw"), _m = {
  ...vn,
  parse: (e) => vn.parse(e) / 100,
  transform: (e) => vn.transform(e * 100)
}, Lo = {
  test: /* @__PURE__ */ tf("hsl", "hue"),
  parse: /* @__PURE__ */ Mv("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: n, lightness: o, alpha: i = 1 }) => "hsla(" + Math.round(e) + ", " + vn.transform(Xi(n)) + ", " + vn.transform(Xi(o)) + ", " + Xi(es.transform(i)) + ")"
}, Ge = {
  test: (e) => Wr.test(e) || nd.test(e) || Lo.test(e),
  parse: (e) => Wr.test(e) ? Wr.parse(e) : Lo.test(e) ? Lo.parse(e) : nd.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? Wr.transform(e) : Lo.transform(e),
  getAnimatableNone: (e) => {
    const n = Ge.parse(e);
    return n.alpha = 0, Ge.transform(n);
  }
}, nE = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function rE(e) {
  return isNaN(e) && typeof e == "string" && (e.match(ef)?.length || 0) + (e.match(nE)?.length || 0) > 0;
}
const Lv = "number", jv = "color", oE = "var", iE = "var(", Fm = "${}", sE = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ts(e) {
  const n = e.toString(), o = [], i = {
    color: [],
    number: [],
    var: []
  }, a = [];
  let l = 0;
  const d = n.replace(sE, (h) => (Ge.test(h) ? (i.color.push(l), a.push(jv), o.push(Ge.parse(h))) : h.startsWith(iE) ? (i.var.push(l), a.push(oE), o.push(h)) : (i.number.push(l), a.push(Lv), o.push(parseFloat(h))), ++l, Fm)).split(Fm);
  return { values: o, split: d, indexes: i, types: a };
}
function Ov(e) {
  return ts(e).values;
}
function Iv(e) {
  const { split: n, types: o } = ts(e), i = n.length;
  return (a) => {
    let l = "";
    for (let c = 0; c < i; c++)
      if (l += n[c], a[c] !== void 0) {
        const d = o[c];
        d === Lv ? l += Xi(a[c]) : d === jv ? l += Ge.transform(a[c]) : l += a[c];
      }
    return l;
  };
}
const aE = (e) => typeof e == "number" ? 0 : Ge.test(e) ? Ge.getAnimatableNone(e) : e;
function lE(e) {
  const n = Ov(e);
  return Iv(e)(n.map(aE));
}
const yr = {
  test: rE,
  parse: Ov,
  createTransformer: Iv,
  getAnimatableNone: lE
};
function wc(e, n, o) {
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? e + (n - e) * 6 * o : o < 1 / 2 ? n : o < 2 / 3 ? e + (n - e) * (2 / 3 - o) * 6 : e;
}
function uE({ hue: e, saturation: n, lightness: o, alpha: i }) {
  e /= 360, n /= 100, o /= 100;
  let a = 0, l = 0, c = 0;
  if (!n)
    a = l = c = o;
  else {
    const d = o < 0.5 ? o * (1 + n) : o + n - o * n, h = 2 * o - d;
    a = wc(h, d, e + 1 / 3), l = wc(h, d, e), c = wc(h, d, e - 1 / 3);
  }
  return {
    red: Math.round(a * 255),
    green: Math.round(l * 255),
    blue: Math.round(c * 255),
    alpha: i
  };
}
function el(e, n) {
  return (o) => o > 0 ? n : e;
}
const $e = (e, n, o) => e + (n - e) * o, Sc = (e, n, o) => {
  const i = e * e, a = o * (n * n - i) + i;
  return a < 0 ? 0 : Math.sqrt(a);
}, cE = [nd, Wr, Lo], dE = (e) => cE.find((n) => n.test(e));
function Vm(e) {
  const n = dE(e);
  if (!n)
    return !1;
  let o = n.parse(e);
  return n === Lo && (o = uE(o)), o;
}
const $m = (e, n) => {
  const o = Vm(e), i = Vm(n);
  if (!o || !i)
    return el(e, n);
  const a = { ...o };
  return (l) => (a.red = Sc(o.red, i.red, l), a.green = Sc(o.green, i.green, l), a.blue = Sc(o.blue, i.blue, l), a.alpha = $e(o.alpha, i.alpha, l), Wr.transform(a));
}, rd = /* @__PURE__ */ new Set(["none", "hidden"]);
function fE(e, n) {
  return rd.has(e) ? (o) => o <= 0 ? e : n : (o) => o >= 1 ? n : e;
}
function hE(e, n) {
  return (o) => $e(e, n, o);
}
function nf(e) {
  return typeof e == "number" ? hE : typeof e == "string" ? Jd(e) ? el : Ge.test(e) ? $m : gE : Array.isArray(e) ? _v : typeof e == "object" ? Ge.test(e) ? $m : pE : el;
}
function _v(e, n) {
  const o = [...e], i = o.length, a = e.map((l, c) => nf(l)(l, n[c]));
  return (l) => {
    for (let c = 0; c < i; c++)
      o[c] = a[c](l);
    return o;
  };
}
function pE(e, n) {
  const o = { ...e, ...n }, i = {};
  for (const a in o)
    e[a] !== void 0 && n[a] !== void 0 && (i[a] = nf(e[a])(e[a], n[a]));
  return (a) => {
    for (const l in i)
      o[l] = i[l](a);
    return o;
  };
}
function mE(e, n) {
  const o = [], i = { color: 0, var: 0, number: 0 };
  for (let a = 0; a < n.values.length; a++) {
    const l = n.types[a], c = e.indexes[l][i[l]], d = e.values[c] ?? 0;
    o[a] = d, i[l]++;
  }
  return o;
}
const gE = (e, n) => {
  const o = yr.createTransformer(n), i = ts(e), a = ts(n);
  return i.indexes.var.length === a.indexes.var.length && i.indexes.color.length === a.indexes.color.length && i.indexes.number.length >= a.indexes.number.length ? rd.has(e) && !a.values.length || rd.has(n) && !i.values.length ? fE(e, n) : us(_v(mE(i, a), a.values), o) : el(e, n);
};
function Fv(e, n, o) {
  return typeof e == "number" && typeof n == "number" && typeof o == "number" ? $e(e, n, o) : nf(e)(e, n);
}
const yE = (e) => {
  const n = ({ timestamp: o }) => e(o);
  return {
    start: (o = !0) => _e.update(n, o),
    stop: () => gr(n),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => lt.isProcessing ? lt.timestamp : Pt.now()
  };
}, Vv = (e, n, o = 10) => {
  let i = "";
  const a = Math.max(Math.round(n / o), 2);
  for (let l = 0; l < a; l++)
    i += Math.round(e(l / (a - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, tl = 2e4;
function rf(e) {
  let n = 0;
  const o = 50;
  let i = e.next(n);
  for (; !i.done && n < tl; )
    n += o, i = e.next(n);
  return n >= tl ? 1 / 0 : n;
}
function vE(e, n = 100, o) {
  const i = o({ ...e, keyframes: [0, n] }), a = Math.min(rf(i), tl);
  return {
    type: "keyframes",
    ease: (l) => i.next(a * l).value / n,
    duration: /* @__PURE__ */ Wt(a)
  };
}
const xE = 5;
function $v(e, n, o) {
  const i = Math.max(n - xE, 0);
  return vv(o - e(i), n - i);
}
const Be = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, Cc = 1e-3;
function wE({ duration: e = Be.duration, bounce: n = Be.bounce, velocity: o = Be.velocity, mass: i = Be.mass }) {
  let a, l, c = 1 - n;
  c = Fn(Be.minDamping, Be.maxDamping, c), e = Fn(Be.minDuration, Be.maxDuration, /* @__PURE__ */ Wt(e)), c < 1 ? (a = (p) => {
    const g = p * c, v = g * e, x = g - o, S = od(p, c), E = Math.exp(-v);
    return Cc - x / S * E;
  }, l = (p) => {
    const v = p * c * e, x = v * o + o, S = Math.pow(c, 2) * Math.pow(p, 2) * e, E = Math.exp(-v), b = od(Math.pow(p, 2), c);
    return (-a(p) + Cc > 0 ? -1 : 1) * ((x - S) * E) / b;
  }) : (a = (p) => {
    const g = Math.exp(-p * e), v = (p - o) * e + 1;
    return -Cc + g * v;
  }, l = (p) => {
    const g = Math.exp(-p * e), v = (o - p) * (e * e);
    return g * v;
  });
  const d = 5 / e, h = CE(a, l, d);
  if (e = /* @__PURE__ */ yn(e), isNaN(h))
    return {
      stiffness: Be.stiffness,
      damping: Be.damping,
      duration: e
    };
  {
    const p = Math.pow(h, 2) * i;
    return {
      stiffness: p,
      damping: c * 2 * Math.sqrt(i * p),
      duration: e
    };
  }
}
const SE = 12;
function CE(e, n, o) {
  let i = o;
  for (let a = 1; a < SE; a++)
    i = i - e(i) / n(i);
  return i;
}
function od(e, n) {
  return e * Math.sqrt(1 - n * n);
}
const bE = ["duration", "bounce"], EE = ["stiffness", "damping", "mass"];
function zm(e, n) {
  return n.some((o) => e[o] !== void 0);
}
function kE(e) {
  let n = {
    velocity: Be.velocity,
    stiffness: Be.stiffness,
    damping: Be.damping,
    mass: Be.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!zm(e, EE) && zm(e, bE))
    if (e.visualDuration) {
      const o = e.visualDuration, i = 2 * Math.PI / (o * 1.2), a = i * i, l = 2 * Fn(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(a);
      n = {
        ...n,
        mass: Be.mass,
        stiffness: a,
        damping: l
      };
    } else {
      const o = wE(e);
      n = {
        ...n,
        ...o,
        mass: Be.mass
      }, n.isResolvedFromDuration = !0;
    }
  return n;
}
function nl(e = Be.visualDuration, n = Be.bounce) {
  const o = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: n
  } : e;
  let { restSpeed: i, restDelta: a } = o;
  const l = o.keyframes[0], c = o.keyframes[o.keyframes.length - 1], d = { done: !1, value: l }, { stiffness: h, damping: p, mass: g, duration: v, velocity: x, isResolvedFromDuration: S } = kE({
    ...o,
    velocity: -/* @__PURE__ */ Wt(o.velocity || 0)
  }), E = x || 0, b = p / (2 * Math.sqrt(h * g)), k = c - l, R = /* @__PURE__ */ Wt(Math.sqrt(h / g)), T = Math.abs(k) < 5;
  i || (i = T ? Be.restSpeed.granular : Be.restSpeed.default), a || (a = T ? Be.restDelta.granular : Be.restDelta.default);
  let A;
  if (b < 1) {
    const O = od(R, b);
    A = (B) => {
      const V = Math.exp(-b * R * B);
      return c - V * ((E + b * R * k) / O * Math.sin(O * B) + k * Math.cos(O * B));
    };
  } else if (b === 1)
    A = (O) => c - Math.exp(-R * O) * (k + (E + R * k) * O);
  else {
    const O = R * Math.sqrt(b * b - 1);
    A = (B) => {
      const V = Math.exp(-b * R * B), z = Math.min(O * B, 300);
      return c - V * ((E + b * R * k) * Math.sinh(z) + O * k * Math.cosh(z)) / O;
    };
  }
  const F = {
    calculatedDuration: S && v || null,
    next: (O) => {
      const B = A(O);
      if (S)
        d.done = O >= v;
      else {
        let V = O === 0 ? E : 0;
        b < 1 && (V = O === 0 ? /* @__PURE__ */ yn(E) : $v(A, O, B));
        const z = Math.abs(V) <= i, q = Math.abs(c - B) <= a;
        d.done = z && q;
      }
      return d.value = d.done ? c : B, d;
    },
    toString: () => {
      const O = Math.min(rf(F), tl), B = Vv((V) => F.next(O * V).value, O, 30);
      return O + "ms " + B;
    },
    toTransition: () => {
    }
  };
  return F;
}
nl.applyToOptions = (e) => {
  const n = vE(e, 100, nl);
  return e.ease = n.ease, e.duration = /* @__PURE__ */ yn(n.duration), e.type = "keyframes", e;
};
function id({ keyframes: e, velocity: n = 0, power: o = 0.8, timeConstant: i = 325, bounceDamping: a = 10, bounceStiffness: l = 500, modifyTarget: c, min: d, max: h, restDelta: p = 0.5, restSpeed: g }) {
  const v = e[0], x = {
    done: !1,
    value: v
  }, S = (z) => d !== void 0 && z < d || h !== void 0 && z > h, E = (z) => d === void 0 ? h : h === void 0 || Math.abs(d - z) < Math.abs(h - z) ? d : h;
  let b = o * n;
  const k = v + b, R = c === void 0 ? k : c(k);
  R !== k && (b = R - v);
  const T = (z) => -b * Math.exp(-z / i), A = (z) => R + T(z), F = (z) => {
    const q = T(z), ne = A(z);
    x.done = Math.abs(q) <= p, x.value = x.done ? R : ne;
  };
  let O, B;
  const V = (z) => {
    S(x.value) && (O = z, B = nl({
      keyframes: [x.value, E(x.value)],
      velocity: $v(A, z, x.value),
      // TODO: This should be passing * 1000
      damping: a,
      stiffness: l,
      restDelta: p,
      restSpeed: g
    }));
  };
  return V(0), {
    calculatedDuration: null,
    next: (z) => {
      let q = !1;
      return !B && O === void 0 && (q = !0, F(z), V(z)), O !== void 0 && z >= O ? B.next(z - O) : (!q && F(z), x);
    }
  };
}
function PE(e, n, o) {
  const i = [], a = o || Vn.mix || Fv, l = e.length - 1;
  for (let c = 0; c < l; c++) {
    let d = a(e[c], e[c + 1]);
    if (n) {
      const h = Array.isArray(n) ? n[c] || Ht : n;
      d = us(h, d);
    }
    i.push(d);
  }
  return i;
}
function TE(e, n, { clamp: o = !0, ease: i, mixer: a } = {}) {
  const l = e.length;
  if (Gd(l === n.length), l === 1)
    return () => n[0];
  if (l === 2 && n[0] === n[1])
    return () => n[1];
  const c = e[0] === e[1];
  e[0] > e[l - 1] && (e = [...e].reverse(), n = [...n].reverse());
  const d = PE(n, i, a), h = d.length, p = (g) => {
    if (c && g < e[0])
      return n[0];
    let v = 0;
    if (h > 1)
      for (; v < e.length - 2 && !(g < e[v + 1]); v++)
        ;
    const x = /* @__PURE__ */ Ji(e[v], e[v + 1], g);
    return d[v](x);
  };
  return o ? (g) => p(Fn(e[0], e[l - 1], g)) : p;
}
function RE(e, n) {
  const o = e[e.length - 1];
  for (let i = 1; i <= n; i++) {
    const a = /* @__PURE__ */ Ji(0, n, i);
    e.push($e(o, 1, a));
  }
}
function NE(e) {
  const n = [0];
  return RE(n, e.length - 1), n;
}
function DE(e, n) {
  return e.map((o) => o * n);
}
function AE(e, n) {
  return e.map(() => n || Tv).splice(0, e.length - 1);
}
function Qi({ duration: e = 300, keyframes: n, times: o, ease: i = "easeInOut" }) {
  const a = Bb(i) ? i.map(Im) : Im(i), l = {
    done: !1,
    value: n[0]
  }, c = DE(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    o && o.length === n.length ? o : NE(n),
    e
  ), d = TE(c, n, {
    ease: Array.isArray(a) ? a : AE(n, a)
  });
  return {
    calculatedDuration: e,
    next: (h) => (l.value = d(h), l.done = h >= e, l)
  };
}
const ME = (e) => e !== null;
function of(e, { repeat: n, repeatType: o = "loop" }, i, a = 1) {
  const l = e.filter(ME), d = a < 0 || n && o !== "loop" && n % 2 === 1 ? 0 : l.length - 1;
  return !d || i === void 0 ? l[d] : i;
}
const LE = {
  decay: id,
  inertia: id,
  tween: Qi,
  keyframes: Qi,
  spring: nl
};
function zv(e) {
  typeof e.type == "string" && (e.type = LE[e.type]);
}
class sf {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((n) => {
      this.resolve = n;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(n, o) {
    return this.finished.then(n, o);
  }
}
const jE = (e) => e / 100;
class af extends sf {
  constructor(n) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: o } = this.options;
      o && o.updatedAt !== Pt.now() && this.tick(Pt.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = n, this.initAnimation(), this.play(), n.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: n } = this;
    zv(n);
    const { type: o = Qi, repeat: i = 0, repeatDelay: a = 0, repeatType: l, velocity: c = 0 } = n;
    let { keyframes: d } = n;
    const h = o || Qi;
    h !== Qi && typeof d[0] != "number" && (this.mixKeyframes = us(jE, Fv(d[0], d[1])), d = [0, 100]);
    const p = h({ ...n, keyframes: d });
    l === "mirror" && (this.mirroredGenerator = h({
      ...n,
      keyframes: [...d].reverse(),
      velocity: -c
    })), p.calculatedDuration === null && (p.calculatedDuration = rf(p));
    const { calculatedDuration: g } = p;
    this.calculatedDuration = g, this.resolvedDuration = g + a, this.totalDuration = this.resolvedDuration * (i + 1) - a, this.generator = p;
  }
  updateTime(n) {
    const o = Math.round(n - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = o;
  }
  tick(n, o = !1) {
    const { generator: i, totalDuration: a, mixKeyframes: l, mirroredGenerator: c, resolvedDuration: d, calculatedDuration: h } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: p = 0, keyframes: g, repeat: v, repeatType: x, repeatDelay: S, type: E, onUpdate: b, finalKeyframe: k } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, n) : this.speed < 0 && (this.startTime = Math.min(n - a / this.speed, this.startTime)), o ? this.currentTime = n : this.updateTime(n);
    const R = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), T = this.playbackSpeed >= 0 ? R < 0 : R > a;
    this.currentTime = Math.max(R, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = a);
    let A = this.currentTime, F = i;
    if (v) {
      const z = Math.min(this.currentTime, a) / d;
      let q = Math.floor(z), ne = z % 1;
      !ne && z >= 1 && (ne = 1), ne === 1 && q--, q = Math.min(q, v + 1), !!(q % 2) && (x === "reverse" ? (ne = 1 - ne, S && (ne -= S / d)) : x === "mirror" && (F = c)), A = Fn(0, 1, ne) * d;
    }
    const O = T ? { done: !1, value: g[0] } : F.next(A);
    l && (O.value = l(O.value));
    let { done: B } = O;
    !T && h !== null && (B = this.playbackSpeed >= 0 ? this.currentTime >= a : this.currentTime <= 0);
    const V = this.holdTime === null && (this.state === "finished" || this.state === "running" && B);
    return V && E !== id && (O.value = of(g, this.options, k, this.speed)), b && b(O.value), V && this.finish(), O;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(n, o) {
    return this.finished.then(n, o);
  }
  get duration() {
    return /* @__PURE__ */ Wt(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: n = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Wt(n);
  }
  get time() {
    return /* @__PURE__ */ Wt(this.currentTime);
  }
  set time(n) {
    n = /* @__PURE__ */ yn(n), this.currentTime = n, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = n : this.driver && (this.startTime = this.driver.now() - n / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(n) {
    this.updateTime(Pt.now());
    const o = this.playbackSpeed !== n;
    this.playbackSpeed = n, o && (this.time = /* @__PURE__ */ Wt(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: n = yE, startTime: o } = this.options;
    this.driver || (this.driver = n((a) => this.tick(a))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = o ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Pt.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(n) {
    return this.startTime = 0, this.tick(n, !0);
  }
  attachTimeline(n) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), n.observe(this);
  }
}
function OE(e) {
  for (let n = 1; n < e.length; n++)
    e[n] ?? (e[n] = e[n - 1]);
}
const Hr = (e) => e * 180 / Math.PI, sd = (e) => {
  const n = Hr(Math.atan2(e[1], e[0]));
  return ad(n);
}, IE = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: sd,
  rotateZ: sd,
  skewX: (e) => Hr(Math.atan(e[1])),
  skewY: (e) => Hr(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, ad = (e) => (e = e % 360, e < 0 && (e += 360), e), Bm = sd, Um = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), Wm = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), _E = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Um,
  scaleY: Wm,
  scale: (e) => (Um(e) + Wm(e)) / 2,
  rotateX: (e) => ad(Hr(Math.atan2(e[6], e[5]))),
  rotateY: (e) => ad(Hr(Math.atan2(-e[2], e[0]))),
  rotateZ: Bm,
  rotate: Bm,
  skewX: (e) => Hr(Math.atan(e[4])),
  skewY: (e) => Hr(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function ld(e) {
  return e.includes("scale") ? 1 : 0;
}
function ud(e, n) {
  if (!e || e === "none")
    return ld(n);
  const o = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, a;
  if (o)
    i = _E, a = o;
  else {
    const d = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = IE, a = d;
  }
  if (!a)
    return ld(n);
  const l = i[n], c = a[1].split(",").map(VE);
  return typeof l == "function" ? l(c) : c[l];
}
const FE = (e, n) => {
  const { transform: o = "none" } = getComputedStyle(e);
  return ud(o, n);
};
function VE(e) {
  return parseFloat(e.trim());
}
const Go = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Xo = new Set(Go), Hm = (e) => e === Yo || e === Se, $E = /* @__PURE__ */ new Set(["x", "y", "z"]), zE = Go.filter((e) => !$E.has(e));
function BE(e) {
  const n = [];
  return zE.forEach((o) => {
    const i = e.getValue(o);
    i !== void 0 && (n.push([o, i.get()]), i.set(o.startsWith("scale") ? 1 : 0));
  }), n;
}
const Kr = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: n = "0", paddingRight: o = "0" }) => e.max - e.min - parseFloat(n) - parseFloat(o),
  height: ({ y: e }, { paddingTop: n = "0", paddingBottom: o = "0" }) => e.max - e.min - parseFloat(n) - parseFloat(o),
  top: (e, { top: n }) => parseFloat(n),
  left: (e, { left: n }) => parseFloat(n),
  bottom: ({ y: e }, { top: n }) => parseFloat(n) + (e.max - e.min),
  right: ({ x: e }, { left: n }) => parseFloat(n) + (e.max - e.min),
  // Transform
  x: (e, { transform: n }) => ud(n, "x"),
  y: (e, { transform: n }) => ud(n, "y")
};
Kr.translateX = Kr.x;
Kr.translateY = Kr.y;
const Yr = /* @__PURE__ */ new Set();
let cd = !1, dd = !1, fd = !1;
function Bv() {
  if (dd) {
    const e = Array.from(Yr).filter((i) => i.needsMeasurement), n = new Set(e.map((i) => i.element)), o = /* @__PURE__ */ new Map();
    n.forEach((i) => {
      const a = BE(i);
      a.length && (o.set(i, a), i.render());
    }), e.forEach((i) => i.measureInitialState()), n.forEach((i) => {
      i.render();
      const a = o.get(i);
      a && a.forEach(([l, c]) => {
        i.getValue(l)?.set(c);
      });
    }), e.forEach((i) => i.measureEndState()), e.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  dd = !1, cd = !1, Yr.forEach((e) => e.complete(fd)), Yr.clear();
}
function Uv() {
  Yr.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (dd = !0);
  });
}
function UE() {
  fd = !0, Uv(), Bv(), fd = !1;
}
class lf {
  constructor(n, o, i, a, l, c = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...n], this.onComplete = o, this.name = i, this.motionValue = a, this.element = l, this.isAsync = c;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Yr.add(this), cd || (cd = !0, _e.read(Uv), _e.resolveKeyframes(Bv))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: n, name: o, element: i, motionValue: a } = this;
    if (n[0] === null) {
      const l = a?.get(), c = n[n.length - 1];
      if (l !== void 0)
        n[0] = l;
      else if (i && o) {
        const d = i.readValue(o, c);
        d != null && (n[0] = d);
      }
      n[0] === void 0 && (n[0] = c), a && l === void 0 && a.set(n[0]);
    }
    OE(n);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(n = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, n), Yr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Yr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const WE = (e) => e.startsWith("--");
function HE(e, n, o) {
  WE(n) ? e.style.setProperty(n, o) : e.style[n] = o;
}
const KE = /* @__PURE__ */ Xd(() => window.ScrollTimeline !== void 0), YE = {};
function GE(e, n) {
  const o = /* @__PURE__ */ Xd(e);
  return () => YE[n] ?? o();
}
const Wv = /* @__PURE__ */ GE(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Gi = ([e, n, o, i]) => `cubic-bezier(${e}, ${n}, ${o}, ${i})`, Km = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Gi([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Gi([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Gi([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Gi([0.33, 1.53, 0.69, 0.99])
};
function Hv(e, n) {
  if (e)
    return typeof e == "function" ? Wv() ? Vv(e, n) : "ease-out" : Rv(e) ? Gi(e) : Array.isArray(e) ? e.map((o) => Hv(o, n) || Km.easeOut) : Km[e];
}
function XE(e, n, o, { delay: i = 0, duration: a = 300, repeat: l = 0, repeatType: c = "loop", ease: d = "easeOut", times: h } = {}, p = void 0) {
  const g = {
    [n]: o
  };
  h && (g.offset = h);
  const v = Hv(d, a);
  Array.isArray(v) && (g.easing = v);
  const x = {
    delay: i,
    duration: a,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: l + 1,
    direction: c === "reverse" ? "alternate" : "normal"
  };
  return p && (x.pseudoElement = p), e.animate(g, x);
}
function Kv(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function QE({ type: e, ...n }) {
  return Kv(e) && Wv() ? e.applyToOptions(n) : (n.duration ?? (n.duration = 300), n.ease ?? (n.ease = "easeOut"), n);
}
class ZE extends sf {
  constructor(n) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !n)
      return;
    const { element: o, name: i, keyframes: a, pseudoElement: l, allowFlatten: c = !1, finalKeyframe: d, onComplete: h } = n;
    this.isPseudoElement = !!l, this.allowFlatten = c, this.options = n, Gd(typeof n.type != "string");
    const p = QE(n);
    this.animation = XE(o, i, a, p, l), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !l) {
        const g = of(a, this.options, d, this.speed);
        this.updateMotionValue ? this.updateMotionValue(g) : HE(o, i, g), this.animation.cancel();
      }
      h?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: n } = this;
    n === "idle" || n === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const n = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ Wt(Number(n));
  }
  get iterationDuration() {
    const { delay: n = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Wt(n);
  }
  get time() {
    return /* @__PURE__ */ Wt(Number(this.animation.currentTime) || 0);
  }
  set time(n) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ yn(n);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(n) {
    n < 0 && (this.finishedTime = null), this.animation.playbackRate = n;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(n) {
    this.animation.startTime = n;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: n, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, n && KE() ? (this.animation.timeline = n, Ht) : o(this);
  }
}
const Yv = {
  anticipate: Ev,
  backInOut: bv,
  circInOut: Pv
};
function qE(e) {
  return e in Yv;
}
function JE(e) {
  typeof e.ease == "string" && qE(e.ease) && (e.ease = Yv[e.ease]);
}
const Ym = 10;
class ek extends ZE {
  constructor(n) {
    JE(n), zv(n), super(n), n.startTime && (this.startTime = n.startTime), this.options = n;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(n) {
    const { motionValue: o, onUpdate: i, onComplete: a, element: l, ...c } = this.options;
    if (!o)
      return;
    if (n !== void 0) {
      o.set(n);
      return;
    }
    const d = new af({
      ...c,
      autoplay: !1
    }), h = /* @__PURE__ */ yn(this.finishedTime ?? this.time);
    o.setWithVelocity(d.sample(h - Ym).value, d.sample(h).value, Ym), d.stop();
  }
}
const Gm = (e, n) => n === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(yr.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function tk(e) {
  const n = e[0];
  if (e.length === 1)
    return !0;
  for (let o = 0; o < e.length; o++)
    if (e[o] !== n)
      return !0;
}
function nk(e, n, o, i) {
  const a = e[0];
  if (a === null)
    return !1;
  if (n === "display" || n === "visibility")
    return !0;
  const l = e[e.length - 1], c = Gm(a, n), d = Gm(l, n);
  return !c || !d ? !1 : tk(e) || (o === "spring" || Kv(o)) && i;
}
function hd(e) {
  e.duration = 0, e.type = "keyframes";
}
const rk = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), ok = /* @__PURE__ */ Xd(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function ik(e) {
  const { motionValue: n, name: o, repeatDelay: i, repeatType: a, damping: l, type: c } = e;
  if (!(n?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: h, transformTemplate: p } = n.owner.getProps();
  return ok() && o && rk.has(o) && (o !== "transform" || !p) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !h && !i && a !== "mirror" && l !== 0 && c !== "inertia";
}
const sk = 40;
class ak extends sf {
  constructor({ autoplay: n = !0, delay: o = 0, type: i = "keyframes", repeat: a = 0, repeatDelay: l = 0, repeatType: c = "loop", keyframes: d, name: h, motionValue: p, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Pt.now();
    const x = {
      autoplay: n,
      delay: o,
      type: i,
      repeat: a,
      repeatDelay: l,
      repeatType: c,
      name: h,
      motionValue: p,
      element: g,
      ...v
    }, S = g?.KeyframeResolver || lf;
    this.keyframeResolver = new S(d, (E, b, k) => this.onKeyframesResolved(E, b, x, !k), h, p, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(n, o, i, a) {
    this.keyframeResolver = void 0;
    const { name: l, type: c, velocity: d, delay: h, isHandoff: p, onUpdate: g } = i;
    this.resolvedAt = Pt.now(), nk(n, l, c, d) || ((Vn.instantAnimations || !h) && g?.(of(n, i, o)), n[0] = n[n.length - 1], hd(i), i.repeat = 0);
    const x = {
      startTime: a ? this.resolvedAt ? this.resolvedAt - this.createdAt > sk ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: o,
      ...i,
      keyframes: n
    }, S = !p && ik(x) ? new ek({
      ...x,
      element: x.motionValue.owner.current
    }) : new af(x);
    S.finished.then(() => this.notifyFinished()).catch(Ht), this.pendingTimeline && (this.stopTimeline = S.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = S;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(n, o) {
    return this.finished.finally(n).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), UE()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(n) {
    this.animation.time = n;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(n) {
    this.animation.speed = n;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(n) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(n) : this.pendingTimeline = n, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
const lk = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function uk(e) {
  const n = lk.exec(e);
  if (!n)
    return [,];
  const [, o, i, a] = n;
  return [`--${o ?? i}`, a];
}
function Gv(e, n, o = 1) {
  const [i, a] = uk(e);
  if (!i)
    return;
  const l = window.getComputedStyle(n).getPropertyValue(i);
  if (l) {
    const c = l.trim();
    return mv(c) ? parseFloat(c) : c;
  }
  return Jd(a) ? Gv(a, n, o + 1) : a;
}
function uf(e, n) {
  return e?.[n] ?? e?.default ?? e;
}
const Xv = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Go
]), ck = {
  test: (e) => e === "auto",
  parse: (e) => e
}, Qv = (e) => (n) => n.test(e), Zv = [Yo, Se, vn, pr, tE, eE, ck], Xm = (e) => Zv.find(Qv(e));
function dk(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || yv(e) : !0;
}
const fk = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function hk(e) {
  const [n, o] = e.slice(0, -1).split("(");
  if (n === "drop-shadow")
    return e;
  const [i] = o.match(ef) || [];
  if (!i)
    return e;
  const a = o.replace(i, "");
  let l = fk.has(n) ? 1 : 0;
  return i !== o && (l *= 100), n + "(" + l + a + ")";
}
const pk = /\b([a-z-]*)\(.*?\)/gu, pd = {
  ...yr,
  getAnimatableNone: (e) => {
    const n = e.match(pk);
    return n ? n.map(hk).join(" ") : e;
  }
}, Qm = {
  ...Yo,
  transform: Math.round
}, mk = {
  rotate: pr,
  rotateX: pr,
  rotateY: pr,
  rotateZ: pr,
  scale: Aa,
  scaleX: Aa,
  scaleY: Aa,
  scaleZ: Aa,
  skew: pr,
  skewX: pr,
  skewY: pr,
  distance: Se,
  translateX: Se,
  translateY: Se,
  translateZ: Se,
  x: Se,
  y: Se,
  z: Se,
  perspective: Se,
  transformPerspective: Se,
  opacity: es,
  originX: _m,
  originY: _m,
  originZ: Se
}, cf = {
  // Border props
  borderWidth: Se,
  borderTopWidth: Se,
  borderRightWidth: Se,
  borderBottomWidth: Se,
  borderLeftWidth: Se,
  borderRadius: Se,
  radius: Se,
  borderTopLeftRadius: Se,
  borderTopRightRadius: Se,
  borderBottomRightRadius: Se,
  borderBottomLeftRadius: Se,
  // Positioning props
  width: Se,
  maxWidth: Se,
  height: Se,
  maxHeight: Se,
  top: Se,
  right: Se,
  bottom: Se,
  left: Se,
  // Spacing props
  padding: Se,
  paddingTop: Se,
  paddingRight: Se,
  paddingBottom: Se,
  paddingLeft: Se,
  margin: Se,
  marginTop: Se,
  marginRight: Se,
  marginBottom: Se,
  marginLeft: Se,
  // Misc
  backgroundPositionX: Se,
  backgroundPositionY: Se,
  ...mk,
  zIndex: Qm,
  // SVG
  fillOpacity: es,
  strokeOpacity: es,
  numOctaves: Qm
}, gk = {
  ...cf,
  // Color props
  color: Ge,
  backgroundColor: Ge,
  outlineColor: Ge,
  fill: Ge,
  stroke: Ge,
  // Border props
  borderColor: Ge,
  borderTopColor: Ge,
  borderRightColor: Ge,
  borderBottomColor: Ge,
  borderLeftColor: Ge,
  filter: pd,
  WebkitFilter: pd
}, qv = (e) => gk[e];
function Jv(e, n) {
  let o = qv(e);
  return o !== pd && (o = yr), o.getAnimatableNone ? o.getAnimatableNone(n) : void 0;
}
const yk = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function vk(e, n, o) {
  let i = 0, a;
  for (; i < e.length && !a; ) {
    const l = e[i];
    typeof l == "string" && !yk.has(l) && ts(l).values.length && (a = e[i]), i++;
  }
  if (a && o)
    for (const l of n)
      e[l] = Jv(o, a);
}
class xk extends lf {
  constructor(n, o, i, a, l) {
    super(n, o, i, a, l, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: n, element: o, name: i } = this;
    if (!o || !o.current)
      return;
    super.readKeyframes();
    for (let h = 0; h < n.length; h++) {
      let p = n[h];
      if (typeof p == "string" && (p = p.trim(), Jd(p))) {
        const g = Gv(p, o.current);
        g !== void 0 && (n[h] = g), h === n.length - 1 && (this.finalKeyframe = p);
      }
    }
    if (this.resolveNoneKeyframes(), !Xv.has(i) || n.length !== 2)
      return;
    const [a, l] = n, c = Xm(a), d = Xm(l);
    if (c !== d)
      if (Hm(c) && Hm(d))
        for (let h = 0; h < n.length; h++) {
          const p = n[h];
          typeof p == "string" && (n[h] = parseFloat(p));
        }
      else Kr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: n, name: o } = this, i = [];
    for (let a = 0; a < n.length; a++)
      (n[a] === null || dk(n[a])) && i.push(a);
    i.length && vk(n, i, o);
  }
  measureInitialState() {
    const { element: n, unresolvedKeyframes: o, name: i } = this;
    if (!n || !n.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Kr[i](n.measureViewportBox(), window.getComputedStyle(n.current)), o[0] = this.measuredOrigin;
    const a = o[o.length - 1];
    a !== void 0 && n.getValue(i, a).jump(a, !1);
  }
  measureEndState() {
    const { element: n, name: o, unresolvedKeyframes: i } = this;
    if (!n || !n.current)
      return;
    const a = n.getValue(o);
    a && a.jump(this.measuredOrigin, !1);
    const l = i.length - 1, c = i[l];
    i[l] = Kr[o](n.measureViewportBox(), window.getComputedStyle(n.current)), c !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = c), this.removedTransforms?.length && this.removedTransforms.forEach(([d, h]) => {
      n.getValue(d).set(h);
    }), this.resolveNoneKeyframes();
  }
}
function wk(e, n, o) {
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let i = document;
    const a = o?.[e] ?? i.querySelectorAll(e);
    return a ? Array.from(a) : [];
  }
  return Array.from(e);
}
const e0 = (e, n) => n && typeof e == "number" ? n.transform(e) : e;
function t0(e) {
  return gv(e) && "offsetHeight" in e;
}
const Zm = 30, Sk = (e) => !isNaN(parseFloat(e));
class Ck {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(n, o = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const a = Pt.now();
      if (this.updatedAt !== a && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const l of this.dependents)
          l.dirty();
    }, this.hasAnimated = !1, this.setCurrent(n), this.owner = o.owner;
  }
  setCurrent(n) {
    this.current = n, this.updatedAt = Pt.now(), this.canTrackVelocity === null && n !== void 0 && (this.canTrackVelocity = Sk(this.current));
  }
  setPrevFrameValue(n = this.current) {
    this.prevFrameValue = n, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(n) {
    return this.on("change", n);
  }
  on(n, o) {
    this.events[n] || (this.events[n] = new Qd());
    const i = this.events[n].add(o);
    return n === "change" ? () => {
      i(), _e.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const n in this.events)
      this.events[n].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(n, o) {
    this.passiveEffect = n, this.stopPassiveEffect = o;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(n) {
    this.passiveEffect ? this.passiveEffect(n, this.updateAndNotify) : this.updateAndNotify(n);
  }
  setWithVelocity(n, o, i) {
    this.set(o), this.prev = void 0, this.prevFrameValue = n, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(n, o = !0) {
    this.updateAndNotify(n), this.prev = n, this.prevUpdatedAt = this.prevFrameValue = void 0, o && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(n) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(n);
  }
  removeDependent(n) {
    this.dependents && this.dependents.delete(n);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const n = Pt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || n - this.updatedAt > Zm)
      return 0;
    const o = Math.min(this.updatedAt - this.prevUpdatedAt, Zm);
    return vv(parseFloat(this.current) - parseFloat(this.prevFrameValue), o);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(n) {
    return this.stop(), new Promise((o) => {
      this.hasAnimated = !0, this.animation = n(o), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function zo(e, n) {
  return new Ck(e, n);
}
const { schedule: df } = /* @__PURE__ */ Nv(queueMicrotask, !1), rn = {
  x: !1,
  y: !1
};
function n0() {
  return rn.x || rn.y;
}
function bk(e) {
  return e === "x" || e === "y" ? rn[e] ? null : (rn[e] = !0, () => {
    rn[e] = !1;
  }) : rn.x || rn.y ? null : (rn.x = rn.y = !0, () => {
    rn.x = rn.y = !1;
  });
}
function r0(e, n) {
  const o = wk(e), i = new AbortController(), a = {
    passive: !0,
    ...n,
    signal: i.signal
  };
  return [o, a, () => i.abort()];
}
function qm(e) {
  return !(e.pointerType === "touch" || n0());
}
function Ek(e, n, o = {}) {
  const [i, a, l] = r0(e, o), c = (d) => {
    if (!qm(d))
      return;
    const { target: h } = d, p = n(h, d);
    if (typeof p != "function" || !h)
      return;
    const g = (v) => {
      qm(v) && (p(v), h.removeEventListener("pointerleave", g));
    };
    h.addEventListener("pointerleave", g, a);
  };
  return i.forEach((d) => {
    d.addEventListener("pointerenter", c, a);
  }), l;
}
const o0 = (e, n) => n ? e === n ? !0 : o0(e, n.parentElement) : !1, ff = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, kk = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Pk(e) {
  return kk.has(e.tagName) || e.tabIndex !== -1;
}
const Ka = /* @__PURE__ */ new WeakSet();
function Jm(e) {
  return (n) => {
    n.key === "Enter" && e(n);
  };
}
function bc(e, n) {
  e.dispatchEvent(new PointerEvent("pointer" + n, { isPrimary: !0, bubbles: !0 }));
}
const Tk = (e, n) => {
  const o = e.currentTarget;
  if (!o)
    return;
  const i = Jm(() => {
    if (Ka.has(o))
      return;
    bc(o, "down");
    const a = Jm(() => {
      bc(o, "up");
    }), l = () => bc(o, "cancel");
    o.addEventListener("keyup", a, n), o.addEventListener("blur", l, n);
  });
  o.addEventListener("keydown", i, n), o.addEventListener("blur", () => o.removeEventListener("keydown", i), n);
};
function eg(e) {
  return ff(e) && !n0();
}
function Rk(e, n, o = {}) {
  const [i, a, l] = r0(e, o), c = (d) => {
    const h = d.currentTarget;
    if (!eg(d))
      return;
    Ka.add(h);
    const p = n(h, d), g = (S, E) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", x), Ka.has(h) && Ka.delete(h), eg(S) && typeof p == "function" && p(S, { success: E });
    }, v = (S) => {
      g(S, h === window || h === document || o.useGlobalTarget || o0(h, S.target));
    }, x = (S) => {
      g(S, !1);
    };
    window.addEventListener("pointerup", v, a), window.addEventListener("pointercancel", x, a);
  };
  return i.forEach((d) => {
    (o.useGlobalTarget ? window : d).addEventListener("pointerdown", c, a), t0(d) && (d.addEventListener("focus", (p) => Tk(p, a)), !Pk(d) && !d.hasAttribute("tabindex") && (d.tabIndex = 0));
  }), l;
}
function i0(e) {
  return gv(e) && "ownerSVGElement" in e;
}
function Nk(e) {
  return i0(e) && e.tagName === "svg";
}
const ht = (e) => !!(e && e.getVelocity), Dk = [...Zv, Ge, yr], Ak = (e) => Dk.find(Qv(e)), hf = y.createContext({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
});
function tg(e, n) {
  if (typeof e == "function")
    return e(n);
  e != null && (e.current = n);
}
function Mk(...e) {
  return (n) => {
    let o = !1;
    const i = e.map((a) => {
      const l = tg(a, n);
      return !o && typeof l == "function" && (o = !0), l;
    });
    if (o)
      return () => {
        for (let a = 0; a < i.length; a++) {
          const l = i[a];
          typeof l == "function" ? l() : tg(e[a], null);
        }
      };
  };
}
function Lk(...e) {
  return y.useCallback(Mk(...e), e);
}
class jk extends y.Component {
  getSnapshotBeforeUpdate(n) {
    const o = this.props.childRef.current;
    if (o && n.isPresent && !this.props.isPresent) {
      const i = o.offsetParent, a = t0(i) && i.offsetWidth || 0, l = this.props.sizeRef.current;
      l.height = o.offsetHeight || 0, l.width = o.offsetWidth || 0, l.top = o.offsetTop, l.left = o.offsetLeft, l.right = a - l.width - l.left;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function Ok({ children: e, isPresent: n, anchorX: o, root: i }) {
  const a = y.useId(), l = y.useRef(null), c = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: d } = y.useContext(hf), h = Lk(l, e?.ref);
  return y.useInsertionEffect(() => {
    const { width: p, height: g, top: v, left: x, right: S } = c.current;
    if (n || !l.current || !p || !g)
      return;
    const E = o === "left" ? `left: ${x}` : `right: ${S}`;
    l.current.dataset.motionPopId = a;
    const b = document.createElement("style");
    d && (b.nonce = d);
    const k = i ?? document.head;
    return k.appendChild(b), b.sheet && b.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${p}px !important;
            height: ${g}px !important;
            ${E}px !important;
            top: ${v}px !important;
          }
        `), () => {
      k.contains(b) && k.removeChild(b);
    };
  }, [n]), C.jsx(jk, { isPresent: n, childRef: l, sizeRef: c, children: y.cloneElement(e, { ref: h }) });
}
const Ik = ({ children: e, initial: n, isPresent: o, onExitComplete: i, custom: a, presenceAffectsLayout: l, mode: c, anchorX: d, root: h }) => {
  const p = Wd(_k), g = y.useId();
  let v = !0, x = y.useMemo(() => (v = !1, {
    id: g,
    initial: n,
    isPresent: o,
    custom: a,
    onExitComplete: (S) => {
      p.set(S, !0);
      for (const E of p.values())
        if (!E)
          return;
      i && i();
    },
    register: (S) => (p.set(S, !1), () => p.delete(S))
  }), [o, p, i]);
  return l && v && (x = { ...x }), y.useMemo(() => {
    p.forEach((S, E) => p.set(E, !1));
  }, [o]), y.useEffect(() => {
    !o && !p.size && i && i();
  }, [o]), c === "popLayout" && (e = C.jsx(Ok, { isPresent: o, anchorX: d, root: h, children: e })), C.jsx(gl.Provider, { value: x, children: e });
};
function _k() {
  return /* @__PURE__ */ new Map();
}
function s0(e = !0) {
  const n = y.useContext(gl);
  if (n === null)
    return [!0, null];
  const { isPresent: o, onExitComplete: i, register: a } = n, l = y.useId();
  y.useEffect(() => {
    if (e)
      return a(l);
  }, [e]);
  const c = y.useCallback(() => e && i && i(l), [l, i, e]);
  return !o && i ? [!1, c] : [!0];
}
const Ma = (e) => e.key || "";
function ng(e) {
  const n = [];
  return y.Children.forEach(e, (o) => {
    y.isValidElement(o) && n.push(o);
  }), n;
}
const Fk = ({ children: e, custom: n, initial: o = !0, onExitComplete: i, presenceAffectsLayout: a = !0, mode: l = "sync", propagate: c = !1, anchorX: d = "left", root: h }) => {
  const [p, g] = s0(c), v = y.useMemo(() => ng(e), [e]), x = c && !p ? [] : v.map(Ma), S = y.useRef(!0), E = y.useRef(v), b = Wd(() => /* @__PURE__ */ new Map()), [k, R] = y.useState(v), [T, A] = y.useState(v);
  pv(() => {
    S.current = !1, E.current = v;
    for (let B = 0; B < T.length; B++) {
      const V = Ma(T[B]);
      x.includes(V) ? b.delete(V) : b.get(V) !== !0 && b.set(V, !1);
    }
  }, [T, x.length, x.join("-")]);
  const F = [];
  if (v !== k) {
    let B = [...v];
    for (let V = 0; V < T.length; V++) {
      const z = T[V], q = Ma(z);
      x.includes(q) || (B.splice(V, 0, z), F.push(z));
    }
    return l === "wait" && F.length && (B = F), A(ng(B)), R(v), null;
  }
  const { forceRender: O } = y.useContext(Ud);
  return C.jsx(C.Fragment, { children: T.map((B) => {
    const V = Ma(B), z = c && !p ? !1 : v === T || x.includes(V), q = () => {
      if (b.has(V))
        b.set(V, !0);
      else
        return;
      let ne = !0;
      b.forEach((se) => {
        se || (ne = !1);
      }), ne && (O?.(), A(E.current), c && g?.(), i && i());
    };
    return C.jsx(Ik, { isPresent: z, initial: !S.current || o ? void 0 : !1, custom: n, presenceAffectsLayout: a, mode: l, root: h, onExitComplete: z ? void 0 : q, anchorX: d, children: B }, V);
  }) });
}, a0 = y.createContext({ strict: !1 }), rg = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, Bo = {};
for (const e in rg)
  Bo[e] = {
    isEnabled: (n) => rg[e].some((o) => !!n[o])
  };
function Vk(e) {
  for (const n in e)
    Bo[n] = {
      ...Bo[n],
      ...e[n]
    };
}
const $k = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function rl(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || $k.has(e);
}
let l0 = (e) => !rl(e);
function zk(e) {
  typeof e == "function" && (l0 = (n) => n.startsWith("on") ? !rl(n) : e(n));
}
try {
  zk(require("@emotion/is-prop-valid").default);
} catch {
}
function Bk(e, n, o) {
  const i = {};
  for (const a in e)
    a === "values" && typeof e.values == "object" || (l0(a) || o === !0 && rl(a) || !n && !rl(a) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && a.startsWith("onDrag")) && (i[a] = e[a]);
  return i;
}
const yl = /* @__PURE__ */ y.createContext({});
function vl(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function ns(e) {
  return typeof e == "string" || Array.isArray(e);
}
const pf = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], mf = ["initial", ...pf];
function xl(e) {
  return vl(e.animate) || mf.some((n) => ns(e[n]));
}
function u0(e) {
  return !!(xl(e) || e.variants);
}
function Uk(e, n) {
  if (xl(e)) {
    const { initial: o, animate: i } = e;
    return {
      initial: o === !1 || ns(o) ? o : void 0,
      animate: ns(i) ? i : void 0
    };
  }
  return e.inherit !== !1 ? n : {};
}
function Wk(e) {
  const { initial: n, animate: o } = Uk(e, y.useContext(yl));
  return y.useMemo(() => ({ initial: n, animate: o }), [og(n), og(o)]);
}
function og(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function ig(e, n) {
  return n.max === n.min ? 0 : e / (n.max - n.min) * 100;
}
const Hi = {
  correct: (e, n) => {
    if (!n.target)
      return e;
    if (typeof e == "string")
      if (Se.test(e))
        e = parseFloat(e);
      else
        return e;
    const o = ig(e, n.target.x), i = ig(e, n.target.y);
    return `${o}% ${i}%`;
  }
}, Hk = {
  correct: (e, { treeScale: n, projectionDelta: o }) => {
    const i = e, a = yr.parse(e);
    if (a.length > 5)
      return i;
    const l = yr.createTransformer(e), c = typeof a[0] != "number" ? 1 : 0, d = o.x.scale * n.x, h = o.y.scale * n.y;
    a[0 + c] /= d, a[1 + c] /= h;
    const p = $e(d, h, 0.5);
    return typeof a[2 + c] == "number" && (a[2 + c] /= p), typeof a[3 + c] == "number" && (a[3 + c] /= p), l(a);
  }
}, md = {
  borderRadius: {
    ...Hi,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Hi,
  borderTopRightRadius: Hi,
  borderBottomLeftRadius: Hi,
  borderBottomRightRadius: Hi,
  boxShadow: Hk
};
function c0(e, { layout: n, layoutId: o }) {
  return Xo.has(e) || e.startsWith("origin") || (n || o !== void 0) && (!!md[e] || e === "opacity");
}
const Kk = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Yk = Go.length;
function Gk(e, n, o) {
  let i = "", a = !0;
  for (let l = 0; l < Yk; l++) {
    const c = Go[l], d = e[c];
    if (d === void 0)
      continue;
    let h = !0;
    if (typeof d == "number" ? h = d === (c.startsWith("scale") ? 1 : 0) : h = parseFloat(d) === 0, !h || o) {
      const p = e0(d, cf[c]);
      if (!h) {
        a = !1;
        const g = Kk[c] || c;
        i += `${g}(${p}) `;
      }
      o && (n[c] = p);
    }
  }
  return i = i.trim(), o ? i = o(n, a ? "" : i) : a && (i = "none"), i;
}
function gf(e, n, o) {
  const { style: i, vars: a, transformOrigin: l } = e;
  let c = !1, d = !1;
  for (const h in n) {
    const p = n[h];
    if (Xo.has(h)) {
      c = !0;
      continue;
    } else if (Av(h)) {
      a[h] = p;
      continue;
    } else {
      const g = e0(p, cf[h]);
      h.startsWith("origin") ? (d = !0, l[h] = g) : i[h] = g;
    }
  }
  if (n.transform || (c || o ? i.transform = Gk(n, e.transform, o) : i.transform && (i.transform = "none")), d) {
    const { originX: h = "50%", originY: p = "50%", originZ: g = 0 } = l;
    i.transformOrigin = `${h} ${p} ${g}`;
  }
}
const yf = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function d0(e, n, o) {
  for (const i in n)
    !ht(n[i]) && !c0(i, o) && (e[i] = n[i]);
}
function Xk({ transformTemplate: e }, n) {
  return y.useMemo(() => {
    const o = yf();
    return gf(o, n, e), Object.assign({}, o.vars, o.style);
  }, [n]);
}
function Qk(e, n) {
  const o = e.style || {}, i = {};
  return d0(i, o, e), Object.assign(i, Xk(e, n)), i;
}
function Zk(e, n) {
  const o = {}, i = Qk(e, n);
  return e.drag && e.dragListener !== !1 && (o.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (o.tabIndex = 0), o.style = i, o;
}
const qk = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Jk = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function eP(e, n, o = 1, i = 0, a = !0) {
  e.pathLength = 1;
  const l = a ? qk : Jk;
  e[l.offset] = Se.transform(-i);
  const c = Se.transform(n), d = Se.transform(o);
  e[l.array] = `${c} ${d}`;
}
function f0(e, {
  attrX: n,
  attrY: o,
  attrScale: i,
  pathLength: a,
  pathSpacing: l = 1,
  pathOffset: c = 0,
  // This is object creation, which we try to avoid per-frame.
  ...d
}, h, p, g) {
  if (gf(e, d, p), h) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: v, style: x } = e;
  v.transform && (x.transform = v.transform, delete v.transform), (x.transform || v.transformOrigin) && (x.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), x.transform && (x.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox), n !== void 0 && (v.x = n), o !== void 0 && (v.y = o), i !== void 0 && (v.scale = i), a !== void 0 && eP(v, a, l, c, !1);
}
const h0 = () => ({
  ...yf(),
  attrs: {}
}), p0 = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function tP(e, n, o, i) {
  const a = y.useMemo(() => {
    const l = h0();
    return f0(l, n, p0(i), e.transformTemplate, e.style), {
      ...l.attrs,
      style: { ...l.style }
    };
  }, [n]);
  if (e.style) {
    const l = {};
    d0(l, e.style, e), a.style = { ...l, ...a.style };
  }
  return a;
}
const nP = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function vf(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(nP.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
function rP(e, n, o, { latestValues: i }, a, l = !1) {
  const d = (vf(e) ? tP : Zk)(n, i, a, e), h = Bk(n, typeof e == "string", l), p = e !== y.Fragment ? { ...h, ...d, ref: o } : {}, { children: g } = n, v = y.useMemo(() => ht(g) ? g.get() : g, [g]);
  return y.createElement(e, {
    ...p,
    children: v
  });
}
function sg(e) {
  const n = [{}, {}];
  return e?.values.forEach((o, i) => {
    n[0][i] = o.get(), n[1][i] = o.getVelocity();
  }), n;
}
function xf(e, n, o, i) {
  if (typeof n == "function") {
    const [a, l] = sg(i);
    n = n(o !== void 0 ? o : e.custom, a, l);
  }
  if (typeof n == "string" && (n = e.variants && e.variants[n]), typeof n == "function") {
    const [a, l] = sg(i);
    n = n(o !== void 0 ? o : e.custom, a, l);
  }
  return n;
}
function Ya(e) {
  return ht(e) ? e.get() : e;
}
function oP({ scrapeMotionValuesFromProps: e, createRenderState: n }, o, i, a) {
  return {
    latestValues: iP(o, i, a, e),
    renderState: n()
  };
}
function iP(e, n, o, i) {
  const a = {}, l = i(e, {});
  for (const x in l)
    a[x] = Ya(l[x]);
  let { initial: c, animate: d } = e;
  const h = xl(e), p = u0(e);
  n && p && !h && e.inherit !== !1 && (c === void 0 && (c = n.initial), d === void 0 && (d = n.animate));
  let g = o ? o.initial === !1 : !1;
  g = g || c === !1;
  const v = g ? d : c;
  if (v && typeof v != "boolean" && !vl(v)) {
    const x = Array.isArray(v) ? v : [v];
    for (let S = 0; S < x.length; S++) {
      const E = xf(e, x[S]);
      if (E) {
        const { transitionEnd: b, transition: k, ...R } = E;
        for (const T in R) {
          let A = R[T];
          if (Array.isArray(A)) {
            const F = g ? A.length - 1 : 0;
            A = A[F];
          }
          A !== null && (a[T] = A);
        }
        for (const T in b)
          a[T] = b[T];
      }
    }
  }
  return a;
}
const m0 = (e) => (n, o) => {
  const i = y.useContext(yl), a = y.useContext(gl), l = () => oP(e, n, i, a);
  return o ? l() : Wd(l);
};
function wf(e, n, o) {
  const { style: i } = e, a = {};
  for (const l in i)
    (ht(i[l]) || n.style && ht(n.style[l]) || c0(l, e) || o?.getValue(l)?.liveStyle !== void 0) && (a[l] = i[l]);
  return a;
}
const sP = /* @__PURE__ */ m0({
  scrapeMotionValuesFromProps: wf,
  createRenderState: yf
});
function g0(e, n, o) {
  const i = wf(e, n, o);
  for (const a in e)
    if (ht(e[a]) || ht(n[a])) {
      const l = Go.indexOf(a) !== -1 ? "attr" + a.charAt(0).toUpperCase() + a.substring(1) : a;
      i[l] = e[a];
    }
  return i;
}
const aP = /* @__PURE__ */ m0({
  scrapeMotionValuesFromProps: g0,
  createRenderState: h0
}), lP = Symbol.for("motionComponentSymbol");
function jo(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function uP(e, n, o) {
  return y.useCallback(
    (i) => {
      i && e.onMount && e.onMount(i), n && (i ? n.mount(i) : n.unmount()), o && (typeof o == "function" ? o(i) : jo(o) && (o.current = i));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [n]
  );
}
const Sf = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), cP = "framerAppearId", y0 = "data-" + Sf(cP), v0 = y.createContext({});
function dP(e, n, o, i, a) {
  const { visualElement: l } = y.useContext(yl), c = y.useContext(a0), d = y.useContext(gl), h = y.useContext(hf).reducedMotion, p = y.useRef(null);
  i = i || c.renderer, !p.current && i && (p.current = i(e, {
    visualState: n,
    parent: l,
    props: o,
    presenceContext: d,
    blockInitialAnimation: d ? d.initial === !1 : !1,
    reducedMotionConfig: h
  }));
  const g = p.current, v = y.useContext(v0);
  g && !g.projection && a && (g.type === "html" || g.type === "svg") && fP(p.current, o, a, v);
  const x = y.useRef(!1);
  y.useInsertionEffect(() => {
    g && x.current && g.update(o, d);
  });
  const S = o[y0], E = y.useRef(!!S && !window.MotionHandoffIsComplete?.(S) && window.MotionHasOptimisedAnimation?.(S));
  return pv(() => {
    g && (x.current = !0, window.MotionIsMounted = !0, g.updateFeatures(), g.scheduleRenderMicrotask(), E.current && g.animationState && g.animationState.animateChanges());
  }), y.useEffect(() => {
    g && (!E.current && g.animationState && g.animationState.animateChanges(), E.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(S);
    }), E.current = !1), g.enteringChildren = void 0);
  }), g;
}
function fP(e, n, o, i) {
  const { layoutId: a, layout: l, drag: c, dragConstraints: d, layoutScroll: h, layoutRoot: p, layoutCrossfade: g } = n;
  e.projection = new o(e.latestValues, n["data-framer-portal-id"] ? void 0 : x0(e.parent)), e.projection.setOptions({
    layoutId: a,
    layout: l,
    alwaysMeasureLayout: !!c || d && jo(d),
    visualElement: e,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof l == "string" ? l : "both",
    initialPromotionConfig: i,
    crossfade: g,
    layoutScroll: h,
    layoutRoot: p
  });
}
function x0(e) {
  if (e)
    return e.options.allowProjection !== !1 ? e.projection : x0(e.parent);
}
function Ec(e, { forwardMotionProps: n = !1 } = {}, o, i) {
  o && Vk(o);
  const a = vf(e) ? aP : sP;
  function l(d, h) {
    let p;
    const g = {
      ...y.useContext(hf),
      ...d,
      layoutId: hP(d)
    }, { isStatic: v } = g, x = Wk(d), S = a(d, v);
    if (!v && Hd) {
      pP();
      const E = mP(g);
      p = E.MeasureLayout, x.visualElement = dP(e, S, g, i, E.ProjectionNode);
    }
    return C.jsxs(yl.Provider, { value: x, children: [p && x.visualElement ? C.jsx(p, { visualElement: x.visualElement, ...g }) : null, rP(e, d, uP(S, x.visualElement, h), S, v, n)] });
  }
  l.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const c = y.forwardRef(l);
  return c[lP] = e, c;
}
function hP({ layoutId: e }) {
  const n = y.useContext(Ud).id;
  return n && e !== void 0 ? n + "-" + e : e;
}
function pP(e, n) {
  y.useContext(a0).strict;
}
function mP(e) {
  const { drag: n, layout: o } = Bo;
  if (!n && !o)
    return {};
  const i = { ...n, ...o };
  return {
    MeasureLayout: n?.isEnabled(e) || o?.isEnabled(e) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function gP(e, n) {
  if (typeof Proxy > "u")
    return Ec;
  const o = /* @__PURE__ */ new Map(), i = (l, c) => Ec(l, c, e, n), a = (l, c) => i(l, c);
  return new Proxy(a, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (l, c) => c === "create" ? i : (o.has(c) || o.set(c, Ec(c, void 0, e, n)), o.get(c))
  });
}
function w0({ top: e, left: n, right: o, bottom: i }) {
  return {
    x: { min: n, max: o },
    y: { min: e, max: i }
  };
}
function yP({ x: e, y: n }) {
  return { top: n.min, right: e.max, bottom: n.max, left: e.min };
}
function vP(e, n) {
  if (!n)
    return e;
  const o = n({ x: e.left, y: e.top }), i = n({ x: e.right, y: e.bottom });
  return {
    top: o.y,
    left: o.x,
    bottom: i.y,
    right: i.x
  };
}
function kc(e) {
  return e === void 0 || e === 1;
}
function gd({ scale: e, scaleX: n, scaleY: o }) {
  return !kc(e) || !kc(n) || !kc(o);
}
function Ur(e) {
  return gd(e) || S0(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function S0(e) {
  return ag(e.x) || ag(e.y);
}
function ag(e) {
  return e && e !== "0%";
}
function ol(e, n, o) {
  const i = e - o, a = n * i;
  return o + a;
}
function lg(e, n, o, i, a) {
  return a !== void 0 && (e = ol(e, a, i)), ol(e, o, i) + n;
}
function yd(e, n = 0, o = 1, i, a) {
  e.min = lg(e.min, n, o, i, a), e.max = lg(e.max, n, o, i, a);
}
function C0(e, { x: n, y: o }) {
  yd(e.x, n.translate, n.scale, n.originPoint), yd(e.y, o.translate, o.scale, o.originPoint);
}
const ug = 0.999999999999, cg = 1.0000000000001;
function xP(e, n, o, i = !1) {
  const a = o.length;
  if (!a)
    return;
  n.x = n.y = 1;
  let l, c;
  for (let d = 0; d < a; d++) {
    l = o[d], c = l.projectionDelta;
    const { visualElement: h } = l.options;
    h && h.props.style && h.props.style.display === "contents" || (i && l.options.layoutScroll && l.scroll && l !== l.root && Io(e, {
      x: -l.scroll.offset.x,
      y: -l.scroll.offset.y
    }), c && (n.x *= c.x.scale, n.y *= c.y.scale, C0(e, c)), i && Ur(l.latestValues) && Io(e, l.latestValues));
  }
  n.x < cg && n.x > ug && (n.x = 1), n.y < cg && n.y > ug && (n.y = 1);
}
function Oo(e, n) {
  e.min = e.min + n, e.max = e.max + n;
}
function dg(e, n, o, i, a = 0.5) {
  const l = $e(e.min, e.max, a);
  yd(e, n, o, l, i);
}
function Io(e, n) {
  dg(e.x, n.x, n.scaleX, n.scale, n.originX), dg(e.y, n.y, n.scaleY, n.scale, n.originY);
}
function b0(e, n) {
  return w0(vP(e.getBoundingClientRect(), n));
}
function wP(e, n, o) {
  const i = b0(e, o), { scroll: a } = n;
  return a && (Oo(i.x, a.offset.x), Oo(i.y, a.offset.y)), i;
}
const fg = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), _o = () => ({
  x: fg(),
  y: fg()
}), hg = () => ({ min: 0, max: 0 }), qe = () => ({
  x: hg(),
  y: hg()
}), vd = { current: null }, E0 = { current: !1 };
function SP() {
  if (E0.current = !0, !!Hd)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), n = () => vd.current = e.matches;
      e.addEventListener("change", n), n();
    } else
      vd.current = !1;
}
const CP = /* @__PURE__ */ new WeakMap();
function bP(e, n, o) {
  for (const i in n) {
    const a = n[i], l = o[i];
    if (ht(a))
      e.addValue(i, a);
    else if (ht(l))
      e.addValue(i, zo(a, { owner: e }));
    else if (l !== a)
      if (e.hasValue(i)) {
        const c = e.getValue(i);
        c.liveStyle === !0 ? c.jump(a) : c.hasAnimated || c.set(a);
      } else {
        const c = e.getStaticValue(i);
        e.addValue(i, zo(c !== void 0 ? c : a, { owner: e }));
      }
  }
  for (const i in o)
    n[i] === void 0 && e.removeValue(i);
  return n;
}
const pg = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class EP {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(n, o, i) {
    return {};
  }
  constructor({ parent: n, props: o, presenceContext: i, reducedMotionConfig: a, blockInitialAnimation: l, visualState: c }, d = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = lf, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const x = Pt.now();
      this.renderScheduledAt < x && (this.renderScheduledAt = x, _e.render(this.render, !1, !0));
    };
    const { latestValues: h, renderState: p } = c;
    this.latestValues = h, this.baseTarget = { ...h }, this.initialValues = o.initial ? { ...h } : {}, this.renderState = p, this.parent = n, this.props = o, this.presenceContext = i, this.depth = n ? n.depth + 1 : 0, this.reducedMotionConfig = a, this.options = d, this.blockInitialAnimation = !!l, this.isControllingVariants = xl(o), this.isVariantNode = u0(o), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(n && n.current);
    const { willChange: g, ...v } = this.scrapeMotionValuesFromProps(o, {}, this);
    for (const x in v) {
      const S = v[x];
      h[x] !== void 0 && ht(S) && S.set(h[x]);
    }
  }
  mount(n) {
    this.current = n, CP.set(n, this), this.projection && !this.projection.instance && this.projection.mount(n), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((o, i) => this.bindToMotionValue(i, o)), E0.current || SP(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : vd.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), gr(this.notifyUpdate), gr(this.render), this.valueSubscriptions.forEach((n) => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const n in this.events)
      this.events[n].clear();
    for (const n in this.features) {
      const o = this.features[n];
      o && (o.unmount(), o.isMounted = !1);
    }
    this.current = null;
  }
  addChild(n) {
    this.children.add(n), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(n);
  }
  removeChild(n) {
    this.children.delete(n), this.enteringChildren && this.enteringChildren.delete(n);
  }
  bindToMotionValue(n, o) {
    this.valueSubscriptions.has(n) && this.valueSubscriptions.get(n)();
    const i = Xo.has(n);
    i && this.onBindTransform && this.onBindTransform();
    const a = o.on("change", (c) => {
      this.latestValues[n] = c, this.props.onUpdate && _e.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let l;
    window.MotionCheckAppearSync && (l = window.MotionCheckAppearSync(this, n, o)), this.valueSubscriptions.set(n, () => {
      a(), l && l(), o.owner && o.stop();
    });
  }
  sortNodePosition(n) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== n.type ? 0 : this.sortInstanceNodePosition(this.current, n.current);
  }
  updateFeatures() {
    let n = "animation";
    for (n in Bo) {
      const o = Bo[n];
      if (!o)
        continue;
      const { isEnabled: i, Feature: a } = o;
      if (!this.features[n] && a && i(this.props) && (this.features[n] = new a(this)), this.features[n]) {
        const l = this.features[n];
        l.isMounted ? l.update() : (l.mount(), l.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : qe();
  }
  getStaticValue(n) {
    return this.latestValues[n];
  }
  setStaticValue(n, o) {
    this.latestValues[n] = o;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(n, o) {
    (n.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = n, this.prevPresenceContext = this.presenceContext, this.presenceContext = o;
    for (let i = 0; i < pg.length; i++) {
      const a = pg[i];
      this.propEventSubscriptions[a] && (this.propEventSubscriptions[a](), delete this.propEventSubscriptions[a]);
      const l = "on" + a, c = n[l];
      c && (this.propEventSubscriptions[a] = this.on(a, c));
    }
    this.prevMotionValues = bP(this, this.scrapeMotionValuesFromProps(n, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(n) {
    return this.props.variants ? this.props.variants[n] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(n) {
    const o = this.getClosestVariantNode();
    if (o)
      return o.variantChildren && o.variantChildren.add(n), () => o.variantChildren.delete(n);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(n, o) {
    const i = this.values.get(n);
    o !== i && (i && this.removeValue(n), this.bindToMotionValue(n, o), this.values.set(n, o), this.latestValues[n] = o.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(n) {
    this.values.delete(n);
    const o = this.valueSubscriptions.get(n);
    o && (o(), this.valueSubscriptions.delete(n)), delete this.latestValues[n], this.removeValueFromRenderState(n, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(n) {
    return this.values.has(n);
  }
  getValue(n, o) {
    if (this.props.values && this.props.values[n])
      return this.props.values[n];
    let i = this.values.get(n);
    return i === void 0 && o !== void 0 && (i = zo(o === null ? void 0 : o, { owner: this }), this.addValue(n, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(n, o) {
    let i = this.latestValues[n] !== void 0 || !this.current ? this.latestValues[n] : this.getBaseTargetFromProps(this.props, n) ?? this.readValueFromInstance(this.current, n, this.options);
    return i != null && (typeof i == "string" && (mv(i) || yv(i)) ? i = parseFloat(i) : !Ak(i) && yr.test(o) && (i = Jv(n, o)), this.setBaseTarget(n, ht(i) ? i.get() : i)), ht(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(n, o) {
    this.baseTarget[n] = o;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(n) {
    const { initial: o } = this.props;
    let i;
    if (typeof o == "string" || typeof o == "object") {
      const l = xf(this.props, o, this.presenceContext?.custom);
      l && (i = l[n]);
    }
    if (o && i !== void 0)
      return i;
    const a = this.getBaseTargetFromProps(this.props, n);
    return a !== void 0 && !ht(a) ? a : this.initialValues[n] !== void 0 && i === void 0 ? void 0 : this.baseTarget[n];
  }
  on(n, o) {
    return this.events[n] || (this.events[n] = new Qd()), this.events[n].add(o);
  }
  notify(n, ...o) {
    this.events[n] && this.events[n].notify(...o);
  }
  scheduleRenderMicrotask() {
    df.render(this.render);
  }
}
class k0 extends EP {
  constructor() {
    super(...arguments), this.KeyframeResolver = xk;
  }
  sortInstanceNodePosition(n, o) {
    return n.compareDocumentPosition(o) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(n, o) {
    return n.style ? n.style[o] : void 0;
  }
  removeValueFromRenderState(n, { vars: o, style: i }) {
    delete o[n], delete i[n];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: n } = this.props;
    ht(n) && (this.childSubscription = n.on("change", (o) => {
      this.current && (this.current.textContent = `${o}`);
    }));
  }
}
function P0(e, { style: n, vars: o }, i, a) {
  const l = e.style;
  let c;
  for (c in n)
    l[c] = n[c];
  a?.applyProjectionStyles(l, i);
  for (c in o)
    l.setProperty(c, o[c]);
}
function kP(e) {
  return window.getComputedStyle(e);
}
class PP extends k0 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = P0;
  }
  readValueFromInstance(n, o) {
    if (Xo.has(o))
      return this.projection?.isProjecting ? ld(o) : FE(n, o);
    {
      const i = kP(n), a = (Av(o) ? i.getPropertyValue(o) : i[o]) || 0;
      return typeof a == "string" ? a.trim() : a;
    }
  }
  measureInstanceViewportBox(n, { transformPagePoint: o }) {
    return b0(n, o);
  }
  build(n, o, i) {
    gf(n, o, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(n, o, i) {
    return wf(n, o, i);
  }
}
const T0 = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function TP(e, n, o, i) {
  P0(e, n, void 0, i);
  for (const a in n.attrs)
    e.setAttribute(T0.has(a) ? a : Sf(a), n.attrs[a]);
}
class RP extends k0 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = qe;
  }
  getBaseTargetFromProps(n, o) {
    return n[o];
  }
  readValueFromInstance(n, o) {
    if (Xo.has(o)) {
      const i = qv(o);
      return i && i.default || 0;
    }
    return o = T0.has(o) ? o : Sf(o), n.getAttribute(o);
  }
  scrapeMotionValuesFromProps(n, o, i) {
    return g0(n, o, i);
  }
  build(n, o, i) {
    f0(n, o, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(n, o, i, a) {
    TP(n, o, i, a);
  }
  mount(n) {
    this.isSVGTag = p0(n.tagName), super.mount(n);
  }
}
const NP = (e, n) => vf(e) ? new RP(n) : new PP(n, {
  allowProjection: e !== y.Fragment
});
function Fo(e, n, o) {
  const i = e.getProps();
  return xf(i, n, o !== void 0 ? o : i.custom, e);
}
const xd = (e) => Array.isArray(e);
function DP(e, n, o) {
  e.hasValue(n) ? e.getValue(n).set(o) : e.addValue(n, zo(o));
}
function AP(e) {
  return xd(e) ? e[e.length - 1] || 0 : e;
}
function MP(e, n) {
  const o = Fo(e, n);
  let { transitionEnd: i = {}, transition: a = {}, ...l } = o || {};
  l = { ...l, ...i };
  for (const c in l) {
    const d = AP(l[c]);
    DP(e, c, d);
  }
}
function LP(e) {
  return !!(ht(e) && e.add);
}
function wd(e, n) {
  const o = e.getValue("willChange");
  if (LP(o))
    return o.add(n);
  if (!o && Vn.WillChange) {
    const i = new Vn.WillChange("auto");
    e.addValue("willChange", i), i.add(n);
  }
}
function R0(e) {
  return e.props[y0];
}
const jP = (e) => e !== null;
function OP(e, { repeat: n, repeatType: o = "loop" }, i) {
  const a = e.filter(jP), l = n && o !== "loop" && n % 2 === 1 ? 0 : a.length - 1;
  return a[l];
}
const IP = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, _P = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), FP = {
  type: "keyframes",
  duration: 0.8
}, VP = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, $P = (e, { keyframes: n }) => n.length > 2 ? FP : Xo.has(e) ? e.startsWith("scale") ? _P(n[1]) : IP : VP;
function zP({ when: e, delay: n, delayChildren: o, staggerChildren: i, staggerDirection: a, repeat: l, repeatType: c, repeatDelay: d, from: h, elapsed: p, ...g }) {
  return !!Object.keys(g).length;
}
const Cf = (e, n, o, i = {}, a, l) => (c) => {
  const d = uf(i, e) || {}, h = d.delay || i.delay || 0;
  let { elapsed: p = 0 } = i;
  p = p - /* @__PURE__ */ yn(h);
  const g = {
    keyframes: Array.isArray(o) ? o : [null, o],
    ease: "easeOut",
    velocity: n.getVelocity(),
    ...d,
    delay: -p,
    onUpdate: (x) => {
      n.set(x), d.onUpdate && d.onUpdate(x);
    },
    onComplete: () => {
      c(), d.onComplete && d.onComplete();
    },
    name: e,
    motionValue: n,
    element: l ? void 0 : a
  };
  zP(d) || Object.assign(g, $P(e, g)), g.duration && (g.duration = /* @__PURE__ */ yn(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ yn(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (hd(g), g.delay === 0 && (v = !0)), (Vn.instantAnimations || Vn.skipAnimations) && (v = !0, hd(g), g.delay = 0), g.allowFlatten = !d.type && !d.ease, v && !l && n.get() !== void 0) {
    const x = OP(g.keyframes, d);
    if (x !== void 0) {
      _e.update(() => {
        g.onUpdate(x), g.onComplete();
      });
      return;
    }
  }
  return d.isSync ? new af(g) : new ak(g);
};
function BP({ protectedKeys: e, needsAnimating: n }, o) {
  const i = e.hasOwnProperty(o) && n[o] !== !0;
  return n[o] = !1, i;
}
function N0(e, n, { delay: o = 0, transitionOverride: i, type: a } = {}) {
  let { transition: l = e.getDefaultTransition(), transitionEnd: c, ...d } = n;
  i && (l = i);
  const h = [], p = a && e.animationState && e.animationState.getState()[a];
  for (const g in d) {
    const v = e.getValue(g, e.latestValues[g] ?? null), x = d[g];
    if (x === void 0 || p && BP(p, g))
      continue;
    const S = {
      delay: o,
      ...uf(l || {}, g)
    }, E = v.get();
    if (E !== void 0 && !v.isAnimating && !Array.isArray(x) && x === E && !S.velocity)
      continue;
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const R = R0(e);
      if (R) {
        const T = window.MotionHandoffAnimation(R, g, _e);
        T !== null && (S.startTime = T, b = !0);
      }
    }
    wd(e, g), v.start(Cf(g, v, x, e.shouldReduceMotion && Xv.has(g) ? { type: !1 } : S, e, b));
    const k = v.animation;
    k && h.push(k);
  }
  return c && Promise.all(h).then(() => {
    _e.update(() => {
      c && MP(e, c);
    });
  }), h;
}
function D0(e, n, o, i = 0, a = 1) {
  const l = Array.from(e).sort((p, g) => p.sortNodePosition(g)).indexOf(n), c = e.size, d = (c - 1) * i;
  return typeof o == "function" ? o(l, c) : a === 1 ? l * i : d - l * i;
}
function Sd(e, n, o = {}) {
  const i = Fo(e, n, o.type === "exit" ? e.presenceContext?.custom : void 0);
  let { transition: a = e.getDefaultTransition() || {} } = i || {};
  o.transitionOverride && (a = o.transitionOverride);
  const l = i ? () => Promise.all(N0(e, i, o)) : () => Promise.resolve(), c = e.variantChildren && e.variantChildren.size ? (h = 0) => {
    const { delayChildren: p = 0, staggerChildren: g, staggerDirection: v } = a;
    return UP(e, n, h, p, g, v, o);
  } : () => Promise.resolve(), { when: d } = a;
  if (d) {
    const [h, p] = d === "beforeChildren" ? [l, c] : [c, l];
    return h().then(() => p());
  } else
    return Promise.all([l(), c(o.delay)]);
}
function UP(e, n, o = 0, i = 0, a = 0, l = 1, c) {
  const d = [];
  for (const h of e.variantChildren)
    h.notify("AnimationStart", n), d.push(Sd(h, n, {
      ...c,
      delay: o + (typeof i == "function" ? 0 : i) + D0(e.variantChildren, h, i, a, l)
    }).then(() => h.notify("AnimationComplete", n)));
  return Promise.all(d);
}
function WP(e, n, o = {}) {
  e.notify("AnimationStart", n);
  let i;
  if (Array.isArray(n)) {
    const a = n.map((l) => Sd(e, l, o));
    i = Promise.all(a);
  } else if (typeof n == "string")
    i = Sd(e, n, o);
  else {
    const a = typeof n == "function" ? Fo(e, n, o.custom) : n;
    i = Promise.all(N0(e, a, o));
  }
  return i.then(() => {
    e.notify("AnimationComplete", n);
  });
}
function A0(e, n) {
  if (!Array.isArray(n))
    return !1;
  const o = n.length;
  if (o !== e.length)
    return !1;
  for (let i = 0; i < o; i++)
    if (n[i] !== e[i])
      return !1;
  return !0;
}
const HP = mf.length;
function M0(e) {
  if (!e)
    return;
  if (!e.isControllingVariants) {
    const o = e.parent ? M0(e.parent) || {} : {};
    return e.props.initial !== void 0 && (o.initial = e.props.initial), o;
  }
  const n = {};
  for (let o = 0; o < HP; o++) {
    const i = mf[o], a = e.props[i];
    (ns(a) || a === !1) && (n[i] = a);
  }
  return n;
}
const KP = [...pf].reverse(), YP = pf.length;
function GP(e) {
  return (n) => Promise.all(n.map(({ animation: o, options: i }) => WP(e, o, i)));
}
function XP(e) {
  let n = GP(e), o = mg(), i = !0;
  const a = (h) => (p, g) => {
    const v = Fo(e, g, h === "exit" ? e.presenceContext?.custom : void 0);
    if (v) {
      const { transition: x, transitionEnd: S, ...E } = v;
      p = { ...p, ...E, ...S };
    }
    return p;
  };
  function l(h) {
    n = h(e);
  }
  function c(h) {
    const { props: p } = e, g = M0(e.parent) || {}, v = [], x = /* @__PURE__ */ new Set();
    let S = {}, E = 1 / 0;
    for (let k = 0; k < YP; k++) {
      const R = KP[k], T = o[R], A = p[R] !== void 0 ? p[R] : g[R], F = ns(A), O = R === h ? T.isActive : null;
      O === !1 && (E = k);
      let B = A === g[R] && A !== p[R] && F;
      if (B && i && e.manuallyAnimateOnMount && (B = !1), T.protectedKeys = { ...S }, // If it isn't active and hasn't *just* been set as inactive
      !T.isActive && O === null || // If we didn't and don't have any defined prop for this animation type
      !A && !T.prevProp || // Or if the prop doesn't define an animation
      vl(A) || typeof A == "boolean")
        continue;
      const V = QP(T.prevProp, A);
      let z = V || // If we're making this variant active, we want to always make it active
      R === h && T.isActive && !B && F || // If we removed a higher-priority variant (i is in reverse order)
      k > E && F, q = !1;
      const ne = Array.isArray(A) ? A : [A];
      let se = ne.reduce(a(R), {});
      O === !1 && (se = {});
      const { prevResolvedValues: be = {} } = T, we = {
        ...be,
        ...se
      }, xe = (te) => {
        z = !0, x.has(te) && (q = !0, x.delete(te)), T.needsAnimating[te] = !0;
        const j = e.getValue(te);
        j && (j.liveStyle = !1);
      };
      for (const te in we) {
        const j = se[te], J = be[te];
        if (S.hasOwnProperty(te))
          continue;
        let G = !1;
        xd(j) && xd(J) ? G = !A0(j, J) : G = j !== J, G ? j != null ? xe(te) : x.add(te) : j !== void 0 && x.has(te) ? xe(te) : T.protectedKeys[te] = !0;
      }
      T.prevProp = A, T.prevResolvedValues = se, T.isActive && (S = { ...S, ...se }), i && e.blockInitialAnimation && (z = !1);
      const Ee = B && V;
      z && (!Ee || q) && v.push(...ne.map((te) => {
        const j = { type: R };
        if (typeof te == "string" && i && !Ee && e.manuallyAnimateOnMount && e.parent) {
          const { parent: J } = e, G = Fo(J, te);
          if (J.enteringChildren && G) {
            const { delayChildren: L } = G.transition || {};
            j.delay = D0(J.enteringChildren, e, L);
          }
        }
        return {
          animation: te,
          options: j
        };
      }));
    }
    if (x.size) {
      const k = {};
      if (typeof p.initial != "boolean") {
        const R = Fo(e, Array.isArray(p.initial) ? p.initial[0] : p.initial);
        R && R.transition && (k.transition = R.transition);
      }
      x.forEach((R) => {
        const T = e.getBaseTarget(R), A = e.getValue(R);
        A && (A.liveStyle = !0), k[R] = T ?? null;
      }), v.push({ animation: k });
    }
    let b = !!v.length;
    return i && (p.initial === !1 || p.initial === p.animate) && !e.manuallyAnimateOnMount && (b = !1), i = !1, b ? n(v) : Promise.resolve();
  }
  function d(h, p) {
    if (o[h].isActive === p)
      return Promise.resolve();
    e.variantChildren?.forEach((v) => v.animationState?.setActive(h, p)), o[h].isActive = p;
    const g = c(h);
    for (const v in o)
      o[v].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: c,
    setActive: d,
    setAnimateFunction: l,
    getState: () => o,
    reset: () => {
      o = mg();
    }
  };
}
function QP(e, n) {
  return typeof n == "string" ? n !== e : Array.isArray(n) ? !A0(n, e) : !1;
}
function zr(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function mg() {
  return {
    animate: zr(!0),
    whileInView: zr(),
    whileHover: zr(),
    whileTap: zr(),
    whileDrag: zr(),
    whileFocus: zr(),
    exit: zr()
  };
}
class Cr {
  constructor(n) {
    this.isMounted = !1, this.node = n;
  }
  update() {
  }
}
class ZP extends Cr {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(n) {
    super(n), n.animationState || (n.animationState = XP(n));
  }
  updateAnimationControlsSubscription() {
    const { animate: n } = this.node.getProps();
    vl(n) && (this.unmountControls = n.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: n } = this.node.getProps(), { animate: o } = this.node.prevProps || {};
    n !== o && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let qP = 0;
class JP extends Cr {
  constructor() {
    super(...arguments), this.id = qP++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: n, onExitComplete: o } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || n === i)
      return;
    const a = this.node.animationState.setActive("exit", !n);
    o && !n && a.then(() => {
      o(this.id);
    });
  }
  mount() {
    const { register: n, onExitComplete: o } = this.node.presenceContext || {};
    o && o(this.id), n && (this.unmount = n(this.id));
  }
  unmount() {
  }
}
const eT = {
  animation: {
    Feature: ZP
  },
  exit: {
    Feature: JP
  }
};
function rs(e, n, o, i = { passive: !0 }) {
  return e.addEventListener(n, o, i), () => e.removeEventListener(n, o);
}
function fs(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  };
}
const tT = (e) => (n) => ff(n) && e(n, fs(n));
function Zi(e, n, o, i) {
  return rs(e, n, tT(o), i);
}
const L0 = 1e-4, nT = 1 - L0, rT = 1 + L0, j0 = 0.01, oT = 0 - j0, iT = 0 + j0;
function vt(e) {
  return e.max - e.min;
}
function sT(e, n, o) {
  return Math.abs(e - n) <= o;
}
function gg(e, n, o, i = 0.5) {
  e.origin = i, e.originPoint = $e(n.min, n.max, e.origin), e.scale = vt(o) / vt(n), e.translate = $e(o.min, o.max, e.origin) - e.originPoint, (e.scale >= nT && e.scale <= rT || isNaN(e.scale)) && (e.scale = 1), (e.translate >= oT && e.translate <= iT || isNaN(e.translate)) && (e.translate = 0);
}
function qi(e, n, o, i) {
  gg(e.x, n.x, o.x, i ? i.originX : void 0), gg(e.y, n.y, o.y, i ? i.originY : void 0);
}
function yg(e, n, o) {
  e.min = o.min + n.min, e.max = e.min + vt(n);
}
function aT(e, n, o) {
  yg(e.x, n.x, o.x), yg(e.y, n.y, o.y);
}
function vg(e, n, o) {
  e.min = n.min - o.min, e.max = e.min + vt(n);
}
function il(e, n, o) {
  vg(e.x, n.x, o.x), vg(e.y, n.y, o.y);
}
function Ut(e) {
  return [e("x"), e("y")];
}
const O0 = ({ current: e }) => e ? e.ownerDocument.defaultView : null, xg = (e, n) => Math.abs(e - n);
function lT(e, n) {
  const o = xg(e.x, n.x), i = xg(e.y, n.y);
  return Math.sqrt(o ** 2 + i ** 2);
}
class I0 {
  constructor(n, o, { transformPagePoint: i, contextWindow: a = window, dragSnapToOrigin: l = !1, distanceThreshold: c = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const x = Tc(this.lastMoveEventInfo, this.history), S = this.startEvent !== null, E = lT(x.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!S && !E)
        return;
      const { point: b } = x, { timestamp: k } = lt;
      this.history.push({ ...b, timestamp: k });
      const { onStart: R, onMove: T } = this.handlers;
      S || (R && R(this.lastMoveEvent, x), this.startEvent = this.lastMoveEvent), T && T(this.lastMoveEvent, x);
    }, this.handlePointerMove = (x, S) => {
      this.lastMoveEvent = x, this.lastMoveEventInfo = Pc(S, this.transformPagePoint), _e.update(this.updatePoint, !0);
    }, this.handlePointerUp = (x, S) => {
      this.end();
      const { onEnd: E, onSessionEnd: b, resumeAnimation: k } = this.handlers;
      if (this.dragSnapToOrigin && k && k(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const R = Tc(x.type === "pointercancel" ? this.lastMoveEventInfo : Pc(S, this.transformPagePoint), this.history);
      this.startEvent && E && E(x, R), b && b(x, R);
    }, !ff(n))
      return;
    this.dragSnapToOrigin = l, this.handlers = o, this.transformPagePoint = i, this.distanceThreshold = c, this.contextWindow = a || window;
    const d = fs(n), h = Pc(d, this.transformPagePoint), { point: p } = h, { timestamp: g } = lt;
    this.history = [{ ...p, timestamp: g }];
    const { onSessionStart: v } = o;
    v && v(n, Tc(h, this.history)), this.removeListeners = us(Zi(this.contextWindow, "pointermove", this.handlePointerMove), Zi(this.contextWindow, "pointerup", this.handlePointerUp), Zi(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(n) {
    this.handlers = n;
  }
  end() {
    this.removeListeners && this.removeListeners(), gr(this.updatePoint);
  }
}
function Pc(e, n) {
  return n ? { point: n(e.point) } : e;
}
function wg(e, n) {
  return { x: e.x - n.x, y: e.y - n.y };
}
function Tc({ point: e }, n) {
  return {
    point: e,
    delta: wg(e, _0(n)),
    offset: wg(e, uT(n)),
    velocity: cT(n, 0.1)
  };
}
function uT(e) {
  return e[0];
}
function _0(e) {
  return e[e.length - 1];
}
function cT(e, n) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let o = e.length - 1, i = null;
  const a = _0(e);
  for (; o >= 0 && (i = e[o], !(a.timestamp - i.timestamp > /* @__PURE__ */ yn(n))); )
    o--;
  if (!i)
    return { x: 0, y: 0 };
  const l = /* @__PURE__ */ Wt(a.timestamp - i.timestamp);
  if (l === 0)
    return { x: 0, y: 0 };
  const c = {
    x: (a.x - i.x) / l,
    y: (a.y - i.y) / l
  };
  return c.x === 1 / 0 && (c.x = 0), c.y === 1 / 0 && (c.y = 0), c;
}
function dT(e, { min: n, max: o }, i) {
  return n !== void 0 && e < n ? e = i ? $e(n, e, i.min) : Math.max(e, n) : o !== void 0 && e > o && (e = i ? $e(o, e, i.max) : Math.min(e, o)), e;
}
function Sg(e, n, o) {
  return {
    min: n !== void 0 ? e.min + n : void 0,
    max: o !== void 0 ? e.max + o - (e.max - e.min) : void 0
  };
}
function fT(e, { top: n, left: o, bottom: i, right: a }) {
  return {
    x: Sg(e.x, o, a),
    y: Sg(e.y, n, i)
  };
}
function Cg(e, n) {
  let o = n.min - e.min, i = n.max - e.max;
  return n.max - n.min < e.max - e.min && ([o, i] = [i, o]), { min: o, max: i };
}
function hT(e, n) {
  return {
    x: Cg(e.x, n.x),
    y: Cg(e.y, n.y)
  };
}
function pT(e, n) {
  let o = 0.5;
  const i = vt(e), a = vt(n);
  return a > i ? o = /* @__PURE__ */ Ji(n.min, n.max - i, e.min) : i > a && (o = /* @__PURE__ */ Ji(e.min, e.max - a, n.min)), Fn(0, 1, o);
}
function mT(e, n) {
  const o = {};
  return n.min !== void 0 && (o.min = n.min - e.min), n.max !== void 0 && (o.max = n.max - e.min), o;
}
const Cd = 0.35;
function gT(e = Cd) {
  return e === !1 ? e = 0 : e === !0 && (e = Cd), {
    x: bg(e, "left", "right"),
    y: bg(e, "top", "bottom")
  };
}
function bg(e, n, o) {
  return {
    min: Eg(e, n),
    max: Eg(e, o)
  };
}
function Eg(e, n) {
  return typeof e == "number" ? e : e[n] || 0;
}
const yT = /* @__PURE__ */ new WeakMap();
class vT {
  constructor(n) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = qe(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = n;
  }
  start(n, { snapToCursor: o = !1, distanceThreshold: i } = {}) {
    const { presenceContext: a } = this.visualElement;
    if (a && a.isPresent === !1)
      return;
    const l = (v) => {
      const { dragSnapToOrigin: x } = this.getProps();
      x ? this.pauseAnimation() : this.stopAnimation(), o && this.snapToCursor(fs(v).point);
    }, c = (v, x) => {
      const { drag: S, dragPropagation: E, onDragStart: b } = this.getProps();
      if (S && !E && (this.openDragLock && this.openDragLock(), this.openDragLock = bk(S), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = x, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Ut((R) => {
        let T = this.getAxisMotionValue(R).get() || 0;
        if (vn.test(T)) {
          const { projection: A } = this.visualElement;
          if (A && A.layout) {
            const F = A.layout.layoutBox[R];
            F && (T = vt(F) * (parseFloat(T) / 100));
          }
        }
        this.originPoint[R] = T;
      }), b && _e.postRender(() => b(v, x)), wd(this.visualElement, "transform");
      const { animationState: k } = this.visualElement;
      k && k.setActive("whileDrag", !0);
    }, d = (v, x) => {
      this.latestPointerEvent = v, this.latestPanInfo = x;
      const { dragPropagation: S, dragDirectionLock: E, onDirectionLock: b, onDrag: k } = this.getProps();
      if (!S && !this.openDragLock)
        return;
      const { offset: R } = x;
      if (E && this.currentDirection === null) {
        this.currentDirection = xT(R), this.currentDirection !== null && b && b(this.currentDirection);
        return;
      }
      this.updateAxis("x", x.point, R), this.updateAxis("y", x.point, R), this.visualElement.render(), k && k(v, x);
    }, h = (v, x) => {
      this.latestPointerEvent = v, this.latestPanInfo = x, this.stop(v, x), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, p = () => Ut((v) => this.getAnimationState(v) === "paused" && this.getAxisMotionValue(v).animation?.play()), { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new I0(n, {
      onSessionStart: l,
      onStart: c,
      onMove: d,
      onSessionEnd: h,
      resumeAnimation: p
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: i,
      contextWindow: O0(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(n, o) {
    const i = n || this.latestPointerEvent, a = o || this.latestPanInfo, l = this.isDragging;
    if (this.cancel(), !l || !a || !i)
      return;
    const { velocity: c } = a;
    this.startAnimation(c);
    const { onDragEnd: d } = this.getProps();
    d && _e.postRender(() => d(i, a));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: n, animationState: o } = this.visualElement;
    n && (n.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), o && o.setActive("whileDrag", !1);
  }
  updateAxis(n, o, i) {
    const { drag: a } = this.getProps();
    if (!i || !La(n, a, this.currentDirection))
      return;
    const l = this.getAxisMotionValue(n);
    let c = this.originPoint[n] + i[n];
    this.constraints && this.constraints[n] && (c = dT(c, this.constraints[n], this.elastic[n])), l.set(c);
  }
  resolveConstraints() {
    const { dragConstraints: n, dragElastic: o } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, a = this.constraints;
    n && jo(n) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : n && i ? this.constraints = fT(i.layoutBox, n) : this.constraints = !1, this.elastic = gT(o), a !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && Ut((l) => {
      this.constraints !== !1 && this.getAxisMotionValue(l) && (this.constraints[l] = mT(i.layoutBox[l], this.constraints[l]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: n, onMeasureDragConstraints: o } = this.getProps();
    if (!n || !jo(n))
      return !1;
    const i = n.current, { projection: a } = this.visualElement;
    if (!a || !a.layout)
      return !1;
    const l = wP(i, a.root, this.visualElement.getTransformPagePoint());
    let c = hT(a.layout.layoutBox, l);
    if (o) {
      const d = o(yP(c));
      this.hasMutatedConstraints = !!d, d && (c = w0(d));
    }
    return c;
  }
  startAnimation(n) {
    const { drag: o, dragMomentum: i, dragElastic: a, dragTransition: l, dragSnapToOrigin: c, onDragTransitionEnd: d } = this.getProps(), h = this.constraints || {}, p = Ut((g) => {
      if (!La(g, o, this.currentDirection))
        return;
      let v = h && h[g] || {};
      c && (v = { min: 0, max: 0 });
      const x = a ? 200 : 1e6, S = a ? 40 : 1e7, E = {
        type: "inertia",
        velocity: i ? n[g] : 0,
        bounceStiffness: x,
        bounceDamping: S,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...l,
        ...v
      };
      return this.startAxisValueAnimation(g, E);
    });
    return Promise.all(p).then(d);
  }
  startAxisValueAnimation(n, o) {
    const i = this.getAxisMotionValue(n);
    return wd(this.visualElement, n), i.start(Cf(n, i, 0, o, this.visualElement, !1));
  }
  stopAnimation() {
    Ut((n) => this.getAxisMotionValue(n).stop());
  }
  pauseAnimation() {
    Ut((n) => this.getAxisMotionValue(n).animation?.pause());
  }
  getAnimationState(n) {
    return this.getAxisMotionValue(n).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(n) {
    const o = `_drag${n.toUpperCase()}`, i = this.visualElement.getProps(), a = i[o];
    return a || this.visualElement.getValue(n, (i.initial ? i.initial[n] : void 0) || 0);
  }
  snapToCursor(n) {
    Ut((o) => {
      const { drag: i } = this.getProps();
      if (!La(o, i, this.currentDirection))
        return;
      const { projection: a } = this.visualElement, l = this.getAxisMotionValue(o);
      if (a && a.layout) {
        const { min: c, max: d } = a.layout.layoutBox[o];
        l.set(n[o] - $e(c, d, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: n, dragConstraints: o } = this.getProps(), { projection: i } = this.visualElement;
    if (!jo(o) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const a = { x: 0, y: 0 };
    Ut((c) => {
      const d = this.getAxisMotionValue(c);
      if (d && this.constraints !== !1) {
        const h = d.get();
        a[c] = pT({ min: h, max: h }, this.constraints[c]);
      }
    });
    const { transformTemplate: l } = this.visualElement.getProps();
    this.visualElement.current.style.transform = l ? l({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), Ut((c) => {
      if (!La(c, n, null))
        return;
      const d = this.getAxisMotionValue(c), { min: h, max: p } = this.constraints[c];
      d.set($e(h, p, a[c]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    yT.set(this.visualElement, this);
    const n = this.visualElement.current, o = Zi(n, "pointerdown", (h) => {
      const { drag: p, dragListener: g = !0 } = this.getProps();
      p && g && this.start(h);
    }), i = () => {
      const { dragConstraints: h } = this.getProps();
      jo(h) && h.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: a } = this.visualElement, l = a.addEventListener("measure", i);
    a && !a.layout && (a.root && a.root.updateScroll(), a.updateLayout()), _e.read(i);
    const c = rs(window, "resize", () => this.scalePositionWithinConstraints()), d = a.addEventListener("didUpdate", (({ delta: h, hasLayoutChanged: p }) => {
      this.isDragging && p && (Ut((g) => {
        const v = this.getAxisMotionValue(g);
        v && (this.originPoint[g] += h[g].translate, v.set(v.get() + h[g].translate));
      }), this.visualElement.render());
    }));
    return () => {
      c(), o(), l(), d && d();
    };
  }
  getProps() {
    const n = this.visualElement.getProps(), { drag: o = !1, dragDirectionLock: i = !1, dragPropagation: a = !1, dragConstraints: l = !1, dragElastic: c = Cd, dragMomentum: d = !0 } = n;
    return {
      ...n,
      drag: o,
      dragDirectionLock: i,
      dragPropagation: a,
      dragConstraints: l,
      dragElastic: c,
      dragMomentum: d
    };
  }
}
function La(e, n, o) {
  return (n === !0 || n === e) && (o === null || o === e);
}
function xT(e, n = 10) {
  let o = null;
  return Math.abs(e.y) > n ? o = "y" : Math.abs(e.x) > n && (o = "x"), o;
}
class wT extends Cr {
  constructor(n) {
    super(n), this.removeGroupControls = Ht, this.removeListeners = Ht, this.controls = new vT(n);
  }
  mount() {
    const { dragControls: n } = this.node.getProps();
    n && (this.removeGroupControls = n.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Ht;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const kg = (e) => (n, o) => {
  e && _e.postRender(() => e(n, o));
};
class ST extends Cr {
  constructor() {
    super(...arguments), this.removePointerDownListener = Ht;
  }
  onPointerDown(n) {
    this.session = new I0(n, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: O0(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: n, onPanStart: o, onPan: i, onPanEnd: a } = this.node.getProps();
    return {
      onSessionStart: kg(n),
      onStart: kg(o),
      onMove: i,
      onEnd: (l, c) => {
        delete this.session, a && _e.postRender(() => a(l, c));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Zi(this.node.current, "pointerdown", (n) => this.onPointerDown(n));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const Ga = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
let Rc = !1;
class CT extends y.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: n, layoutGroup: o, switchLayoutGroup: i, layoutId: a } = this.props, { projection: l } = n;
    l && (o.group && o.group.add(l), i && i.register && a && i.register(l), Rc && l.root.didUpdate(), l.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), l.setOptions({
      ...l.options,
      onExitComplete: () => this.safeToRemove()
    })), Ga.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(n) {
    const { layoutDependency: o, visualElement: i, drag: a, isPresent: l } = this.props, { projection: c } = i;
    return c && (c.isPresent = l, Rc = !0, a || n.layoutDependency !== o || o === void 0 || n.isPresent !== l ? c.willUpdate() : this.safeToRemove(), n.isPresent !== l && (l ? c.promote() : c.relegate() || _e.postRender(() => {
      const d = c.getStack();
      (!d || !d.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: n } = this.props.visualElement;
    n && (n.root.didUpdate(), df.postRender(() => {
      !n.currentAnimation && n.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: n, layoutGroup: o, switchLayoutGroup: i } = this.props, { projection: a } = n;
    Rc = !0, a && (a.scheduleCheckAfterUnmount(), o && o.group && o.group.remove(a), i && i.deregister && i.deregister(a));
  }
  safeToRemove() {
    const { safeToRemove: n } = this.props;
    n && n();
  }
  render() {
    return null;
  }
}
function F0(e) {
  const [n, o] = s0(), i = y.useContext(Ud);
  return C.jsx(CT, { ...e, layoutGroup: i, switchLayoutGroup: y.useContext(v0), isPresent: n, safeToRemove: o });
}
function bT(e, n, o) {
  const i = ht(e) ? e : zo(e);
  return i.start(Cf("", i, n, o)), i.animation;
}
const ET = (e, n) => e.depth - n.depth;
class kT {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(n) {
    Kd(this.children, n), this.isDirty = !0;
  }
  remove(n) {
    Yd(this.children, n), this.isDirty = !0;
  }
  forEach(n) {
    this.isDirty && this.children.sort(ET), this.isDirty = !1, this.children.forEach(n);
  }
}
function PT(e, n) {
  const o = Pt.now(), i = ({ timestamp: a }) => {
    const l = a - o;
    l >= n && (gr(i), e(l - n));
  };
  return _e.setup(i, !0), () => gr(i);
}
const V0 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], TT = V0.length, Pg = (e) => typeof e == "string" ? parseFloat(e) : e, Tg = (e) => typeof e == "number" || Se.test(e);
function RT(e, n, o, i, a, l) {
  a ? (e.opacity = $e(0, o.opacity ?? 1, NT(i)), e.opacityExit = $e(n.opacity ?? 1, 0, DT(i))) : l && (e.opacity = $e(n.opacity ?? 1, o.opacity ?? 1, i));
  for (let c = 0; c < TT; c++) {
    const d = `border${V0[c]}Radius`;
    let h = Rg(n, d), p = Rg(o, d);
    if (h === void 0 && p === void 0)
      continue;
    h || (h = 0), p || (p = 0), h === 0 || p === 0 || Tg(h) === Tg(p) ? (e[d] = Math.max($e(Pg(h), Pg(p), i), 0), (vn.test(p) || vn.test(h)) && (e[d] += "%")) : e[d] = p;
  }
  (n.rotate || o.rotate) && (e.rotate = $e(n.rotate || 0, o.rotate || 0, i));
}
function Rg(e, n) {
  return e[n] !== void 0 ? e[n] : e.borderRadius;
}
const NT = /* @__PURE__ */ $0(0, 0.5, kv), DT = /* @__PURE__ */ $0(0.5, 0.95, Ht);
function $0(e, n, o) {
  return (i) => i < e ? 0 : i > n ? 1 : o(/* @__PURE__ */ Ji(e, n, i));
}
function Ng(e, n) {
  e.min = n.min, e.max = n.max;
}
function nn(e, n) {
  Ng(e.x, n.x), Ng(e.y, n.y);
}
function Dg(e, n) {
  e.translate = n.translate, e.scale = n.scale, e.originPoint = n.originPoint, e.origin = n.origin;
}
function Ag(e, n, o, i, a) {
  return e -= n, e = ol(e, 1 / o, i), a !== void 0 && (e = ol(e, 1 / a, i)), e;
}
function AT(e, n = 0, o = 1, i = 0.5, a, l = e, c = e) {
  if (vn.test(n) && (n = parseFloat(n), n = $e(c.min, c.max, n / 100) - c.min), typeof n != "number")
    return;
  let d = $e(l.min, l.max, i);
  e === l && (d -= n), e.min = Ag(e.min, n, o, d, a), e.max = Ag(e.max, n, o, d, a);
}
function Mg(e, n, [o, i, a], l, c) {
  AT(e, n[o], n[i], n[a], n.scale, l, c);
}
const MT = ["x", "scaleX", "originX"], LT = ["y", "scaleY", "originY"];
function Lg(e, n, o, i) {
  Mg(e.x, n, MT, o ? o.x : void 0, i ? i.x : void 0), Mg(e.y, n, LT, o ? o.y : void 0, i ? i.y : void 0);
}
function jg(e) {
  return e.translate === 0 && e.scale === 1;
}
function z0(e) {
  return jg(e.x) && jg(e.y);
}
function Og(e, n) {
  return e.min === n.min && e.max === n.max;
}
function jT(e, n) {
  return Og(e.x, n.x) && Og(e.y, n.y);
}
function Ig(e, n) {
  return Math.round(e.min) === Math.round(n.min) && Math.round(e.max) === Math.round(n.max);
}
function B0(e, n) {
  return Ig(e.x, n.x) && Ig(e.y, n.y);
}
function _g(e) {
  return vt(e.x) / vt(e.y);
}
function Fg(e, n) {
  return e.translate === n.translate && e.scale === n.scale && e.originPoint === n.originPoint;
}
class OT {
  constructor() {
    this.members = [];
  }
  add(n) {
    Kd(this.members, n), n.scheduleRender();
  }
  remove(n) {
    if (Yd(this.members, n), n === this.prevLead && (this.prevLead = void 0), n === this.lead) {
      const o = this.members[this.members.length - 1];
      o && this.promote(o);
    }
  }
  relegate(n) {
    const o = this.members.findIndex((a) => n === a);
    if (o === 0)
      return !1;
    let i;
    for (let a = o; a >= 0; a--) {
      const l = this.members[a];
      if (l.isPresent !== !1) {
        i = l;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(n, o) {
    const i = this.lead;
    if (n !== i && (this.prevLead = i, this.lead = n, n.show(), i)) {
      i.instance && i.scheduleRender(), n.scheduleRender(), n.resumeFrom = i, o && (n.resumeFrom.preserveOpacity = !0), i.snapshot && (n.snapshot = i.snapshot, n.snapshot.latestValues = i.animationValues || i.latestValues), n.root && n.root.isUpdating && (n.isLayoutDirty = !0);
      const { crossfade: a } = n.options;
      a === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((n) => {
      const { options: o, resumingFrom: i } = n;
      o.onExitComplete && o.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((n) => {
      n.instance && n.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function IT(e, n, o) {
  let i = "";
  const a = e.x.translate / n.x, l = e.y.translate / n.y, c = o?.z || 0;
  if ((a || l || c) && (i = `translate3d(${a}px, ${l}px, ${c}px) `), (n.x !== 1 || n.y !== 1) && (i += `scale(${1 / n.x}, ${1 / n.y}) `), o) {
    const { transformPerspective: p, rotate: g, rotateX: v, rotateY: x, skewX: S, skewY: E } = o;
    p && (i = `perspective(${p}px) ${i}`), g && (i += `rotate(${g}deg) `), v && (i += `rotateX(${v}deg) `), x && (i += `rotateY(${x}deg) `), S && (i += `skewX(${S}deg) `), E && (i += `skewY(${E}deg) `);
  }
  const d = e.x.scale * n.x, h = e.y.scale * n.y;
  return (d !== 1 || h !== 1) && (i += `scale(${d}, ${h})`), i || "none";
}
const Nc = ["", "X", "Y", "Z"], _T = 1e3;
let FT = 0;
function Dc(e, n, o, i) {
  const { latestValues: a } = n;
  a[e] && (o[e] = a[e], n.setStaticValue(e, 0), i && (i[e] = 0));
}
function U0(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e)
    return;
  const { visualElement: n } = e.options;
  if (!n)
    return;
  const o = R0(n);
  if (window.MotionHasOptimisedAnimation(o, "transform")) {
    const { layout: a, layoutId: l } = e.options;
    window.MotionCancelOptimisedAnimation(o, "transform", _e, !(a || l));
  }
  const { parent: i } = e;
  i && !i.hasCheckedOptimisedAppear && U0(i);
}
function W0({ attachResizeListener: e, defaultParent: n, measureScroll: o, checkIsScrollRoot: i, resetTransform: a }) {
  return class {
    constructor(c = {}, d = n?.()) {
      this.id = FT++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(zT), this.nodes.forEach(HT), this.nodes.forEach(KT), this.nodes.forEach(BT);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = c, this.root = d ? d.root || d : this, this.path = d ? [...d.path, d] : [], this.parent = d, this.depth = d ? d.depth + 1 : 0;
      for (let h = 0; h < this.path.length; h++)
        this.path[h].shouldResetTransform = !0;
      this.root === this && (this.nodes = new kT());
    }
    addEventListener(c, d) {
      return this.eventHandlers.has(c) || this.eventHandlers.set(c, new Qd()), this.eventHandlers.get(c).add(d);
    }
    notifyListeners(c, ...d) {
      const h = this.eventHandlers.get(c);
      h && h.notify(...d);
    }
    hasListeners(c) {
      return this.eventHandlers.has(c);
    }
    /**
     * Lifecycles
     */
    mount(c) {
      if (this.instance)
        return;
      this.isSVG = i0(c) && !Nk(c), this.instance = c;
      const { layoutId: d, layout: h, visualElement: p } = this.options;
      if (p && !p.current && p.mount(c), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (h || d) && (this.isLayoutDirty = !0), e) {
        let g, v = 0;
        const x = () => this.root.updateBlockedByResize = !1;
        _e.read(() => {
          v = window.innerWidth;
        }), e(c, () => {
          const S = window.innerWidth;
          S !== v && (v = S, this.root.updateBlockedByResize = !0, g && g(), g = PT(x, 250), Ga.hasAnimatedSinceResize && (Ga.hasAnimatedSinceResize = !1, this.nodes.forEach(zg)));
        });
      }
      d && this.root.registerSharedNode(d, this), this.options.animate !== !1 && p && (d || h) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: x, layout: S }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const E = this.options.transition || p.getDefaultTransition() || ZT, { onLayoutAnimationStart: b, onLayoutAnimationComplete: k } = p.getProps(), R = !this.targetLayout || !B0(this.targetLayout, S), T = !v && x;
        if (this.options.layoutRoot || this.resumeFrom || T || v && (R || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const A = {
            ...uf(E, "layout"),
            onPlay: b,
            onComplete: k
          };
          (p.shouldReduceMotion || this.options.layoutRoot) && (A.delay = 0, A.type = !1), this.startAnimation(A), this.setAnimationOrigin(g, T);
        } else
          v || zg(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = S;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const c = this.getStack();
      c && c.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), gr(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(YT), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: c } = this.options;
      return c && c.getProps().transformTemplate;
    }
    willUpdate(c = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && U0(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        v.shouldResetTransform = !0, v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: d, layout: h } = this.options;
      if (d === void 0 && !h)
        return;
      const p = this.getTransformTemplate();
      this.prevTransformTemplateValue = p ? p(this.latestValues, "") : void 0, this.updateSnapshot(), c && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Vg);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach($g);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(WT), this.nodes.forEach(VT), this.nodes.forEach($T)) : this.nodes.forEach($g), this.clearAllSnapshots();
      const d = Pt.now();
      lt.delta = Fn(0, 1e3 / 60, d - lt.timestamp), lt.timestamp = d, lt.isProcessing = !0, vc.update.process(lt), vc.preRender.process(lt), vc.render.process(lt), lt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, df.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(UT), this.sharedNodes.forEach(GT);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, _e.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      _e.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !vt(this.snapshot.measuredBox.x) && !vt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let h = 0; h < this.path.length; h++)
          this.path[h].updateScroll();
      const c = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = qe(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: d } = this.options;
      d && d.notify("LayoutMeasure", this.layout.layoutBox, c ? c.layoutBox : void 0);
    }
    updateScroll(c = "measure") {
      let d = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === c && (d = !1), d && this.instance) {
        const h = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: c,
          isRoot: h,
          offset: o(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : h
        };
      }
    }
    resetTransform() {
      if (!a)
        return;
      const c = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, d = this.projectionDelta && !z0(this.projectionDelta), h = this.getTransformTemplate(), p = h ? h(this.latestValues, "") : void 0, g = p !== this.prevTransformTemplateValue;
      c && this.instance && (d || Ur(this.latestValues) || g) && (a(this.instance, p), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(c = !0) {
      const d = this.measurePageBox();
      let h = this.removeElementScroll(d);
      return c && (h = this.removeTransform(h)), qT(h), {
        animationId: this.root.animationId,
        measuredBox: d,
        layoutBox: h,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: c } = this.options;
      if (!c)
        return qe();
      const d = c.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(JT))) {
        const { scroll: p } = this.root;
        p && (Oo(d.x, p.offset.x), Oo(d.y, p.offset.y));
      }
      return d;
    }
    removeElementScroll(c) {
      const d = qe();
      if (nn(d, c), this.scroll?.wasRoot)
        return d;
      for (let h = 0; h < this.path.length; h++) {
        const p = this.path[h], { scroll: g, options: v } = p;
        p !== this.root && g && v.layoutScroll && (g.wasRoot && nn(d, c), Oo(d.x, g.offset.x), Oo(d.y, g.offset.y));
      }
      return d;
    }
    applyTransform(c, d = !1) {
      const h = qe();
      nn(h, c);
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        !d && g.options.layoutScroll && g.scroll && g !== g.root && Io(h, {
          x: -g.scroll.offset.x,
          y: -g.scroll.offset.y
        }), Ur(g.latestValues) && Io(h, g.latestValues);
      }
      return Ur(this.latestValues) && Io(h, this.latestValues), h;
    }
    removeTransform(c) {
      const d = qe();
      nn(d, c);
      for (let h = 0; h < this.path.length; h++) {
        const p = this.path[h];
        if (!p.instance || !Ur(p.latestValues))
          continue;
        gd(p.latestValues) && p.updateSnapshot();
        const g = qe(), v = p.measurePageBox();
        nn(g, v), Lg(d, p.latestValues, p.snapshot ? p.snapshot.layoutBox : void 0, g);
      }
      return Ur(this.latestValues) && Lg(d, this.latestValues), d;
    }
    setTargetDelta(c) {
      this.targetDelta = c, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(c) {
      this.options = {
        ...this.options,
        ...c,
        crossfade: c.crossfade !== void 0 ? c.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== lt.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(c = !1) {
      const d = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = d.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = d.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = d.isSharedProjectionDirty);
      const h = !!this.resumingFrom || this !== d;
      if (!(c || h && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: v } = this.options;
      if (!this.layout || !(g || v))
        return;
      this.resolvedRelativeTargetAt = lt.timestamp;
      const x = this.getClosestProjectingParent();
      x && this.linkedParentVersion !== x.layoutVersion && !x.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (x && x.layout ? this.createRelativeTarget(x, this.layout.layoutBox, x.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = qe(), this.targetWithTransforms = qe()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), aT(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : nn(this.target, this.layout.layoutBox), C0(this.target, this.targetDelta)) : nn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, x && !!x.resumingFrom == !!this.resumingFrom && !x.options.layoutScroll && x.target && this.animationProgress !== 1 ? this.createRelativeTarget(x, this.target, x.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || gd(this.parent.latestValues) || S0(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(c, d, h) {
      this.relativeParent = c, this.linkedParentVersion = c.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = qe(), this.relativeTargetOrigin = qe(), il(this.relativeTargetOrigin, d, h), nn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const c = this.getLead(), d = !!this.resumingFrom || this !== c;
      let h = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (h = !1), d && (this.isSharedProjectionDirty || this.isTransformDirty) && (h = !1), this.resolvedRelativeTargetAt === lt.timestamp && (h = !1), h)
        return;
      const { layout: p, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(p || g))
        return;
      nn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, x = this.treeScale.y;
      xP(this.layoutCorrected, this.treeScale, this.path, d), c.layout && !c.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (c.target = c.layout.layoutBox, c.targetWithTransforms = qe());
      const { target: S } = c;
      if (!S) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Dg(this.prevProjectionDelta.x, this.projectionDelta.x), Dg(this.prevProjectionDelta.y, this.projectionDelta.y)), qi(this.projectionDelta, this.layoutCorrected, S, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== x || !Fg(this.projectionDelta.x, this.prevProjectionDelta.x) || !Fg(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", S));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(c = !0) {
      if (this.options.visualElement?.scheduleRender(), c) {
        const d = this.getStack();
        d && d.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = _o(), this.projectionDelta = _o(), this.projectionDeltaWithTransform = _o();
    }
    setAnimationOrigin(c, d = !1) {
      const h = this.snapshot, p = h ? h.latestValues : {}, g = { ...this.latestValues }, v = _o();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !d;
      const x = qe(), S = h ? h.source : void 0, E = this.layout ? this.layout.source : void 0, b = S !== E, k = this.getStack(), R = !k || k.members.length <= 1, T = !!(b && !R && this.options.crossfade === !0 && !this.path.some(QT));
      this.animationProgress = 0;
      let A;
      this.mixTargetDelta = (F) => {
        const O = F / 1e3;
        Bg(v.x, c.x, O), Bg(v.y, c.y, O), this.setTargetDelta(v), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (il(x, this.layout.layoutBox, this.relativeParent.layout.layoutBox), XT(this.relativeTarget, this.relativeTargetOrigin, x, O), A && jT(this.relativeTarget, A) && (this.isProjectionDirty = !1), A || (A = qe()), nn(A, this.relativeTarget)), b && (this.animationValues = g, RT(g, p, this.latestValues, O, T, R)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = O;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(c) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (gr(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = _e.update(() => {
        Ga.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = zo(0)), this.currentAnimation = bT(this.motionValue, [0, 1e3], {
          ...c,
          velocity: 0,
          isSync: !0,
          onUpdate: (d) => {
            this.mixTargetDelta(d), c.onUpdate && c.onUpdate(d);
          },
          onStop: () => {
          },
          onComplete: () => {
            c.onComplete && c.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const c = this.getStack();
      c && c.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(_T), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const c = this.getLead();
      let { targetWithTransforms: d, target: h, layout: p, latestValues: g } = c;
      if (!(!d || !h || !p)) {
        if (this !== c && this.layout && p && H0(this.options.animationType, this.layout.layoutBox, p.layoutBox)) {
          h = this.target || qe();
          const v = vt(this.layout.layoutBox.x);
          h.x.min = c.target.x.min, h.x.max = h.x.min + v;
          const x = vt(this.layout.layoutBox.y);
          h.y.min = c.target.y.min, h.y.max = h.y.min + x;
        }
        nn(d, h), Io(d, g), qi(this.projectionDeltaWithTransform, this.layoutCorrected, d, g);
      }
    }
    registerSharedNode(c, d) {
      this.sharedNodes.has(c) || this.sharedNodes.set(c, new OT()), this.sharedNodes.get(c).add(d);
      const p = d.options.initialPromotionConfig;
      d.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity: p && p.shouldPreserveFollowOpacity ? p.shouldPreserveFollowOpacity(d) : void 0
      });
    }
    isLead() {
      const c = this.getStack();
      return c ? c.lead === this : !0;
    }
    getLead() {
      const { layoutId: c } = this.options;
      return c ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: c } = this.options;
      return c ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: c } = this.options;
      if (c)
        return this.root.sharedNodes.get(c);
    }
    promote({ needsReset: c, transition: d, preserveFollowOpacity: h } = {}) {
      const p = this.getStack();
      p && p.promote(this, h), c && (this.projectionDelta = void 0, this.needsReset = !0), d && this.setOptions({ transition: d });
    }
    relegate() {
      const c = this.getStack();
      return c ? c.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: c } = this.options;
      if (!c)
        return;
      let d = !1;
      const { latestValues: h } = c;
      if ((h.z || h.rotate || h.rotateX || h.rotateY || h.rotateZ || h.skewX || h.skewY) && (d = !0), !d)
        return;
      const p = {};
      h.z && Dc("z", c, p, this.animationValues);
      for (let g = 0; g < Nc.length; g++)
        Dc(`rotate${Nc[g]}`, c, p, this.animationValues), Dc(`skew${Nc[g]}`, c, p, this.animationValues);
      c.render();
      for (const g in p)
        c.setStaticValue(g, p[g]), this.animationValues && (this.animationValues[g] = p[g]);
      c.scheduleRender();
    }
    applyProjectionStyles(c, d) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        c.visibility = "hidden";
        return;
      }
      const h = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, c.visibility = "", c.opacity = "", c.pointerEvents = Ya(d?.pointerEvents) || "", c.transform = h ? h(this.latestValues, "") : "none";
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        this.options.layoutId && (c.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, c.pointerEvents = Ya(d?.pointerEvents) || ""), this.hasProjected && !Ur(this.latestValues) && (c.transform = h ? h({}, "") : "none", this.hasProjected = !1);
        return;
      }
      c.visibility = "";
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let v = IT(this.projectionDeltaWithTransform, this.treeScale, g);
      h && (v = h(g, v)), c.transform = v;
      const { x, y: S } = this.projectionDelta;
      c.transformOrigin = `${x.origin * 100}% ${S.origin * 100}% 0`, p.animationValues ? c.opacity = p === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : c.opacity = p === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const E in md) {
        if (g[E] === void 0)
          continue;
        const { correct: b, applyTo: k, isCSSVariable: R } = md[E], T = v === "none" ? g[E] : b(g[E], p);
        if (k) {
          const A = k.length;
          for (let F = 0; F < A; F++)
            c[k[F]] = T;
        } else
          R ? this.options.visualElement.renderState.vars[E] = T : c[E] = T;
      }
      this.options.layoutId && (c.pointerEvents = p === this ? Ya(d?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((c) => c.currentAnimation?.stop()), this.root.nodes.forEach(Vg), this.root.sharedNodes.clear();
    }
  };
}
function VT(e) {
  e.updateLayout();
}
function $T(e) {
  const n = e.resumeFrom?.snapshot || e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: o, measuredBox: i } = e.layout, { animationType: a } = e.options, l = n.source !== e.layout.source;
    a === "size" ? Ut((g) => {
      const v = l ? n.measuredBox[g] : n.layoutBox[g], x = vt(v);
      v.min = o[g].min, v.max = v.min + x;
    }) : H0(a, n.layoutBox, o) && Ut((g) => {
      const v = l ? n.measuredBox[g] : n.layoutBox[g], x = vt(o[g]);
      v.max = v.min + x, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[g].max = e.relativeTarget[g].min + x);
    });
    const c = _o();
    qi(c, o, n.layoutBox);
    const d = _o();
    l ? qi(d, e.applyTransform(i, !0), n.measuredBox) : qi(d, o, n.layoutBox);
    const h = !z0(c);
    let p = !1;
    if (!e.resumeFrom) {
      const g = e.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: x } = g;
        if (v && x) {
          const S = qe();
          il(S, n.layoutBox, v.layoutBox);
          const E = qe();
          il(E, o, x.layoutBox), B0(S, E) || (p = !0), g.options.layoutRoot && (e.relativeTarget = E, e.relativeTargetOrigin = S, e.relativeParent = g);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: o,
      snapshot: n,
      delta: d,
      layoutDelta: c,
      hasLayoutChanged: h,
      hasRelativeLayoutChanged: p
    });
  } else if (e.isLead()) {
    const { onExitComplete: o } = e.options;
    o && o();
  }
  e.options.transition = void 0;
}
function zT(e) {
  e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function BT(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function UT(e) {
  e.clearSnapshot();
}
function Vg(e) {
  e.clearMeasurements();
}
function $g(e) {
  e.isLayoutDirty = !1;
}
function WT(e) {
  const { visualElement: n } = e.options;
  n && n.getProps().onBeforeLayoutMeasure && n.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function zg(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function HT(e) {
  e.resolveTargetDelta();
}
function KT(e) {
  e.calcProjection();
}
function YT(e) {
  e.resetSkewAndRotation();
}
function GT(e) {
  e.removeLeadSnapshot();
}
function Bg(e, n, o) {
  e.translate = $e(n.translate, 0, o), e.scale = $e(n.scale, 1, o), e.origin = n.origin, e.originPoint = n.originPoint;
}
function Ug(e, n, o, i) {
  e.min = $e(n.min, o.min, i), e.max = $e(n.max, o.max, i);
}
function XT(e, n, o, i) {
  Ug(e.x, n.x, o.x, i), Ug(e.y, n.y, o.y, i);
}
function QT(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const ZT = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Wg = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), Hg = Wg("applewebkit/") && !Wg("chrome/") ? Math.round : Ht;
function Kg(e) {
  e.min = Hg(e.min), e.max = Hg(e.max);
}
function qT(e) {
  Kg(e.x), Kg(e.y);
}
function H0(e, n, o) {
  return e === "position" || e === "preserve-aspect" && !sT(_g(n), _g(o), 0.2);
}
function JT(e) {
  return e !== e.root && e.scroll?.wasRoot;
}
const eR = W0({
  attachResizeListener: (e, n) => rs(e, "resize", n),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Ac = {
  current: void 0
}, K0 = W0({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!Ac.current) {
      const e = new eR({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), Ac.current = e;
    }
    return Ac.current;
  },
  resetTransform: (e, n) => {
    e.style.transform = n !== void 0 ? n : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), tR = {
  pan: {
    Feature: ST
  },
  drag: {
    Feature: wT,
    ProjectionNode: K0,
    MeasureLayout: F0
  }
};
function Yg(e, n, o) {
  const { props: i } = e;
  e.animationState && i.whileHover && e.animationState.setActive("whileHover", o === "Start");
  const a = "onHover" + o, l = i[a];
  l && _e.postRender(() => l(n, fs(n)));
}
class nR extends Cr {
  mount() {
    const { current: n } = this.node;
    n && (this.unmount = Ek(n, (o, i) => (Yg(this.node, i, "Start"), (a) => Yg(this.node, a, "End"))));
  }
  unmount() {
  }
}
class rR extends Cr {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let n = !1;
    try {
      n = this.node.current.matches(":focus-visible");
    } catch {
      n = !0;
    }
    !n || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = us(rs(this.node.current, "focus", () => this.onFocus()), rs(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Gg(e, n, o) {
  const { props: i } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled)
    return;
  e.animationState && i.whileTap && e.animationState.setActive("whileTap", o === "Start");
  const a = "onTap" + (o === "End" ? "" : o), l = i[a];
  l && _e.postRender(() => l(n, fs(n)));
}
class oR extends Cr {
  mount() {
    const { current: n } = this.node;
    n && (this.unmount = Rk(n, (o, i) => (Gg(this.node, i, "Start"), (a, { success: l }) => Gg(this.node, a, l ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const bd = /* @__PURE__ */ new WeakMap(), Mc = /* @__PURE__ */ new WeakMap(), iR = (e) => {
  const n = bd.get(e.target);
  n && n(e);
}, sR = (e) => {
  e.forEach(iR);
};
function aR({ root: e, ...n }) {
  const o = e || document;
  Mc.has(o) || Mc.set(o, {});
  const i = Mc.get(o), a = JSON.stringify(n);
  return i[a] || (i[a] = new IntersectionObserver(sR, { root: e, ...n })), i[a];
}
function lR(e, n, o) {
  const i = aR(n);
  return bd.set(e, o), i.observe(e), () => {
    bd.delete(e), i.unobserve(e);
  };
}
const uR = {
  some: 0,
  all: 1
};
class cR extends Cr {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: n = {} } = this.node.getProps(), { root: o, margin: i, amount: a = "some", once: l } = n, c = {
      root: o ? o.current : void 0,
      rootMargin: i,
      threshold: typeof a == "number" ? a : uR[a]
    }, d = (h) => {
      const { isIntersecting: p } = h;
      if (this.isInView === p || (this.isInView = p, l && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), x = p ? g : v;
      x && x(h);
    };
    return lR(this.node.current, c, d);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: n, prevProps: o } = this.node;
    ["amount", "margin", "root"].some(dR(n, o)) && this.startObserver();
  }
  unmount() {
  }
}
function dR({ viewport: e = {} }, { viewport: n = {} } = {}) {
  return (o) => e[o] !== n[o];
}
const fR = {
  inView: {
    Feature: cR
  },
  tap: {
    Feature: oR
  },
  focus: {
    Feature: rR
  },
  hover: {
    Feature: nR
  }
}, hR = {
  layout: {
    ProjectionNode: K0,
    MeasureLayout: F0
  }
}, pR = {
  ...eT,
  ...fR,
  ...tR,
  ...hR
}, Lc = /* @__PURE__ */ gP(pR, NP), mR = (e, n = []) => e ? n.some(
  (o) => o.getDate() === e.getDate() && o.getMonth() === e.getMonth() && o.getFullYear() === e.getFullYear()
) : !1;
function gR({
  selectedDate: e,
  onSelectDate: n,
  selectedTime: o,
  onSelectTime: i,
  timezone: a,
  unavailableDates: l = [],
  timeSlots: c = [],
  isLoadingSlots: d = !1
}) {
  const [h, p] = y.useState(/* @__PURE__ */ new Date()), [g, v] = y.useState(0), S = ((T) => {
    const A = T.getFullYear(), F = T.getMonth(), O = new Date(A, F, 1), V = new Date(A, F + 1, 0).getDate(), z = (O.getDay() + 6) % 7, q = [];
    for (let ne = 0; ne < z; ne++)
      q.push(null);
    for (let ne = 1; ne <= V; ne++)
      q.push(new Date(A, F, ne));
    return q;
  })(h), E = (T) => {
    v(T);
    const A = new Date(h);
    A.setMonth(h.getMonth() + T), p(A);
  }, b = (T, A) => !T || !A ? !1 : T.getDate() === A.getDate() && T.getMonth() === A.getMonth() && T.getFullYear() === A.getFullYear(), k = (T) => {
    if (!T) return !1;
    const A = /* @__PURE__ */ new Date();
    return A.setHours(0, 0, 0, 0), T < A;
  }, R = {
    enter: (T) => ({
      x: T > 0 ? 20 : -20,
      opacity: 0
    }),
    center: { x: 0, opacity: 1 },
    exit: (T) => ({
      x: T < 0 ? 20 : -20,
      opacity: 0
    })
  };
  return /* @__PURE__ */ C.jsxs("div", { className: "w-full max-w-3xl mx-auto bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 font-sans", children: [
    /* @__PURE__ */ C.jsxs("div", { className: "flex flex-col lg:flex-row gap-4 lg:gap-6", children: [
      /* @__PURE__ */ C.jsxs("div", { className: "w-full lg:w-80 flex-shrink-0", children: [
        /* @__PURE__ */ C.jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Select a Date & Time" }),
        /* @__PURE__ */ C.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ C.jsxs("div", { className: "flex items-center justify-center gap-3 mb-1", children: [
            /* @__PURE__ */ C.jsx(
              "button",
              {
                onClick: () => E(-1),
                className: "p-1.5 hover:bg-blue-50 text-blue-600 rounded-full transition-colors",
                children: /* @__PURE__ */ C.jsx(fv, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ C.jsx(Fk, { mode: "wait", custom: g, children: /* @__PURE__ */ C.jsx(
              Lc.h3,
              {
                custom: g,
                variants: R,
                initial: "enter",
                animate: "center",
                exit: "exit",
                className: "text-sm font-medium text-gray-700 min-w-[120px] text-center",
                children: h.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric"
                })
              },
              h.toISOString()
            ) }),
            /* @__PURE__ */ C.jsx(
              "button",
              {
                onClick: () => E(1),
                className: "p-1.5 hover:bg-blue-50 text-blue-600 rounded-full transition-colors",
                children: /* @__PURE__ */ C.jsx(hv, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ C.jsx("div", { className: "grid grid-cols-7 gap-0.5 text-center mb-1", children: [
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT",
            "SUN"
          ].map((T) => /* @__PURE__ */ C.jsx(
            "div",
            {
              className: "text-[9px] font-medium text-gray-500 py-0.5",
              children: T
            },
            T
          )) }),
          /* @__PURE__ */ C.jsx("div", { className: "grid grid-cols-7 gap-0.5", children: S.map((T, A) => {
            const F = b(
              T,
              e
            ), O = k(T), B = mR(T, l), V = !T || O || B;
            return /* @__PURE__ */ C.jsx(
              "div",
              {
                className: "aspect-square flex items-center justify-center relative",
                children: T && /* @__PURE__ */ C.jsx(
                  "button",
                  {
                    onClick: () => !V && n(T),
                    disabled: V,
                    className: `
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                          ${F ? "bg-blue-600 text-white shadow-md" : "text-blue-600 hover:bg-blue-50 bg-blue-50/30"}
                          ${V ? "text-gray-400 bg-transparent hover:bg-transparent cursor-default" : "cursor-pointer"}
                        `,
                    children: T.getDate()
                  }
                )
              },
              A
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ C.jsx("div", { className: "flex-1 min-w-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6", children: e ? /* @__PURE__ */ C.jsxs(
        Lc.div,
        {
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          className: "h-full w-full",
          children: [
            /* @__PURE__ */ C.jsx("h3", { className: "text-gray-600 font-medium mb-4 text-sm", children: e.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric"
            }) }),
            /* @__PURE__ */ C.jsx("div", { className: "space-y-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar", children: d ? /* @__PURE__ */ C.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ C.jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" }) }) : c.length === 0 ? /* @__PURE__ */ C.jsx("div", { className: "text-center text-gray-500 py-6 text-sm", children: "No available slots for this date." }) : c.map((T, A) => {
              const F = o === T;
              return /* @__PURE__ */ C.jsx(
                Lc.button,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: A * 0.03 },
                  onClick: () => i(T),
                  className: `
                          w-full py-2 px-3 rounded-md border text-sm font-bold transition-all
                          ${F ? "bg-gray-600 text-white border-gray-600" : "bg-white text-blue-600 border-blue-200 hover:border-blue-600 hover:ring-1 hover:ring-blue-600"}
                        `,
                  children: T
                },
                T
              );
            }) })
          ]
        }
      ) : /* @__PURE__ */ C.jsx("div", { className: "h-full flex items-center justify-center text-gray-400 text-xs italic text-center px-4", children: "Select a date to view available times" }) })
    ] }),
    /* @__PURE__ */ C.jsx("style", { children: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      ` })
  ] });
}
class yR extends Error {
}
yR.prototype.name = "InvalidTokenError";
function vR() {
  return localStorage.getItem("auth_token");
}
const sl = "http://localhost:5289", xR = async () => {
  try {
    const e = `${sl}/api/settings/currency`, n = await fetch(e, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!n.ok)
      throw new Error(
        `Failed to fetch default currency: ${n.statusText}`
      );
    return (await n.text()).replace(/['"]+/g, "");
  } catch (e) {
    return console.error("Error fetching default currency:", e), "USD";
  }
}, wR = async () => {
  const e = vR();
  if (!e)
    throw new Error("Not authenticated. Please log in again.");
  const n = `${sl}/api/settings/payment`, o = await fetch(n, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${e}`
    }
  });
  if (!o.ok)
    throw new Error(`Failed to fetch payment settings: ${o.statusText}`);
  return await o.json();
}, SR = async (e) => {
  const n = e ? `${sl}/api/settings/meeting-locations?companyId=${e}` : `${sl}/api/settings/meeting-locations`, o = await fetch(n, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!o.ok)
    throw new Error(
      `Failed to fetch meeting location settings: ${o.statusText}`
    );
  return await o.json();
}, CR = "http://localhost:5289", bR = async (e, n, o = 1, i = 10) => {
  try {
    n || (n = await xR());
    const a = `${CR}/api/services?companyId=${e}&currency=${n}&page=${o}&pageSize=${i}`, l = await fetch(a, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!l.ok)
      throw new Error(`Failed to fetch services: ${l.statusText}`);
    return await l.json();
  } catch (a) {
    throw console.error("Error fetching services:", a), a;
  }
}, ER = "http://localhost:5289", kR = async (e) => {
  try {
    const n = `${ER}/api/staff/by-service/${e}`, o = await fetch(n, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!o.ok)
      throw new Error(`Failed to fetch staff: ${o.statusText}`);
    return await o.json();
  } catch (n) {
    throw console.error("Error fetching staff by service:", n), n;
  }
}, PR = [
  // Major Currencies
  { code: "USD", name: "US Dollar", symbol: "$", country: "United States" },
  { code: "EUR", name: "Euro", symbol: "€", country: "European Union" },
  { code: "GBP", name: "British Pound", symbol: "£", country: "United Kingdom" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", country: "Japan" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", country: "China" },
  // Americas
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", country: "Canada" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", country: "Mexico" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", country: "Brazil" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", country: "Argentina" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", country: "Chile" },
  { code: "COP", name: "Colombian Peso", symbol: "$", country: "Colombia" },
  // Europe
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", country: "Switzerland" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", country: "Sweden" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", country: "Norway" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", country: "Denmark" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", country: "Poland" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", country: "Czech Republic" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", country: "Hungary" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", country: "Romania" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", country: "Bulgaria" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", country: "Croatia" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", country: "Russia" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", country: "Turkey" },
  // Asia-Pacific
  { code: "INR", name: "Indian Rupee", symbol: "₹", country: "India" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", country: "Australia" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", country: "New Zealand" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", country: "Singapore" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", country: "Hong Kong" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", country: "South Korea" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$", country: "Taiwan" },
  { code: "THB", name: "Thai Baht", symbol: "฿", country: "Thailand" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", country: "Malaysia" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", country: "Indonesia" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", country: "Philippines" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", country: "Vietnam" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", country: "Pakistan" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", country: "Bangladesh" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", country: "Sri Lanka" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "Rs", country: "Nepal" },
  // Middle East & Africa
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", country: "United Arab Emirates" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", country: "Saudi Arabia" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼", country: "Qatar" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", country: "Kuwait" },
  { code: "BHD", name: "Bahraini Dinar", symbol: "د.ب", country: "Bahrain" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼", country: "Oman" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", country: "Israel" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", country: "Egypt" },
  { code: "ZAR", name: "South African Rand", symbol: "R", country: "South Africa" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", country: "Nigeria" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", country: "Kenya" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", country: "Ghana" },
  // Others
  { code: "ISK", name: "Icelandic Krona", symbol: "kr", country: "Iceland" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", country: "Ukraine" }
];
function TR(e) {
  return PR.find((n) => n.code === e);
}
function Xg(e) {
  return TR(e)?.symbol || "$";
}
const RR = "http://localhost:5289";
async function NR(e) {
  console.log("Creating appointment with data:", JSON.stringify(e, null, 2));
  const n = await fetch(`${RR}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(e)
  });
  if (!n.ok) {
    const o = await n.json().catch(() => ({}));
    console.error("Appointment creation failed:", n.status, o);
    let i = o.message || o.title;
    throw o.errors && (i = Object.entries(o.errors).map(([a, l]) => `${a}: ${l.join(", ")}`).join("; ")), new Error(
      i || `Failed to create appointment: ${n.status}`
    );
  }
  return n.json();
}
function DR(e, n) {
  const o = OR(n);
  return "formatToParts" in o ? MR(o, e) : LR(o, e);
}
const AR = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function MR(e, n) {
  try {
    const o = e.formatToParts(n), i = [];
    for (let a = 0; a < o.length; a++) {
      const l = AR[o[a].type];
      l !== void 0 && (i[l] = parseInt(o[a].value, 10));
    }
    return i;
  } catch (o) {
    if (o instanceof RangeError)
      return [NaN];
    throw o;
  }
}
function LR(e, n) {
  const o = e.format(n), i = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(o);
  return [
    parseInt(i[3], 10),
    parseInt(i[1], 10),
    parseInt(i[2], 10),
    parseInt(i[4], 10),
    parseInt(i[5], 10),
    parseInt(i[6], 10)
  ];
}
const jc = {}, Qg = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), jR = Qg === "06/25/2014, 00:00:00" || Qg === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function OR(e) {
  return jc[e] || (jc[e] = jR ? new Intl.DateTimeFormat("en-US", {
    hourCycle: "h23",
    timeZone: e,
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: e,
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })), jc[e];
}
function bf(e, n, o, i, a, l, c) {
  const d = /* @__PURE__ */ new Date(0);
  return d.setUTCFullYear(e, n, o), d.setUTCHours(i, a, l, c), d;
}
const Zg = 36e5, IR = 6e4, Oc = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function Y0(e, n, o) {
  if (!e)
    return 0;
  let i = Oc.timezoneZ.exec(e);
  if (i)
    return 0;
  let a, l;
  if (i = Oc.timezoneHH.exec(e), i)
    return a = parseInt(i[1], 10), qg(a) ? -(a * Zg) : NaN;
  if (i = Oc.timezoneHHMM.exec(e), i) {
    a = parseInt(i[2], 10);
    const c = parseInt(i[3], 10);
    return qg(a, c) ? (l = Math.abs(a) * Zg + c * IR, i[1] === "+" ? -l : l) : NaN;
  }
  if (VR(e)) {
    n = new Date(n || Date.now());
    const c = _R(n), d = Ed(c, e);
    return -FR(n, d, e);
  }
  return NaN;
}
function _R(e) {
  return bf(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function Ed(e, n) {
  const o = DR(e, n), i = bf(o[0], o[1] - 1, o[2], o[3] % 24, o[4], o[5], 0).getTime();
  let a = e.getTime();
  const l = a % 1e3;
  return a -= l >= 0 ? l : 1e3 + l, i - a;
}
function FR(e, n, o) {
  let a = e.getTime() - n;
  const l = Ed(new Date(a), o);
  if (n === l)
    return n;
  a -= l - n;
  const c = Ed(new Date(a), o);
  return l === c ? l : Math.max(l, c);
}
function qg(e, n) {
  return -23 <= e && e <= 23 && (n == null || 0 <= n && n <= 59);
}
const Jg = {};
function VR(e) {
  if (Jg[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Jg[e] = !0, !0;
  } catch {
    return !1;
  }
}
function ey(e) {
  const n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +e - +n;
}
const G0 = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Ic = 36e5, ty = 6e4, $R = 2, yt = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: G0
};
function ny(e, n = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const o = n.additionalDigits == null ? $R : Number(n.additionalDigits);
  if (o !== 2 && o !== 1 && o !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const i = zR(e), { year: a, restDateString: l } = BR(i.date, o), c = UR(l, a);
  if (c === null || isNaN(c.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (c) {
    const d = c.getTime();
    let h = 0, p;
    if (i.time && (h = WR(i.time), h === null || isNaN(h)))
      return /* @__PURE__ */ new Date(NaN);
    if (i.timeZone || n.timeZone) {
      if (p = Y0(i.timeZone || n.timeZone, new Date(d + h)), isNaN(p))
        return /* @__PURE__ */ new Date(NaN);
    } else
      p = ey(new Date(d + h)), p = ey(new Date(d + h + p));
    return new Date(d + h + p);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function zR(e) {
  const n = {};
  let o = yt.dateTimePattern.exec(e), i;
  if (o ? (n.date = o[1], i = o[3]) : (o = yt.datePattern.exec(e), o ? (n.date = o[1], i = o[2]) : (n.date = null, i = e)), i) {
    const a = yt.timeZone.exec(i);
    a ? (n.time = i.replace(a[1], ""), n.timeZone = a[1].trim()) : n.time = i;
  }
  return n;
}
function BR(e, n) {
  if (e) {
    const o = yt.YYY[n], i = yt.YYYYY[n];
    let a = yt.YYYY.exec(e) || i.exec(e);
    if (a) {
      const l = a[1];
      return {
        year: parseInt(l, 10),
        restDateString: e.slice(l.length)
      };
    }
    if (a = yt.YY.exec(e) || o.exec(e), a) {
      const l = a[1];
      return {
        year: parseInt(l, 10) * 100,
        restDateString: e.slice(l.length)
      };
    }
  }
  return {
    year: null
  };
}
function UR(e, n) {
  if (n === null)
    return null;
  let o, i, a;
  if (!e || !e.length)
    return o = /* @__PURE__ */ new Date(0), o.setUTCFullYear(n), o;
  let l = yt.MM.exec(e);
  if (l)
    return o = /* @__PURE__ */ new Date(0), i = parseInt(l[1], 10) - 1, oy(n, i) ? (o.setUTCFullYear(n, i), o) : /* @__PURE__ */ new Date(NaN);
  if (l = yt.DDD.exec(e), l) {
    o = /* @__PURE__ */ new Date(0);
    const c = parseInt(l[1], 10);
    return YR(n, c) ? (o.setUTCFullYear(n, 0, c), o) : /* @__PURE__ */ new Date(NaN);
  }
  if (l = yt.MMDD.exec(e), l) {
    o = /* @__PURE__ */ new Date(0), i = parseInt(l[1], 10) - 1;
    const c = parseInt(l[2], 10);
    return oy(n, i, c) ? (o.setUTCFullYear(n, i, c), o) : /* @__PURE__ */ new Date(NaN);
  }
  if (l = yt.Www.exec(e), l)
    return a = parseInt(l[1], 10) - 1, iy(a) ? ry(n, a) : /* @__PURE__ */ new Date(NaN);
  if (l = yt.WwwD.exec(e), l) {
    a = parseInt(l[1], 10) - 1;
    const c = parseInt(l[2], 10) - 1;
    return iy(a, c) ? ry(n, a, c) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function WR(e) {
  let n, o, i = yt.HH.exec(e);
  if (i)
    return n = parseFloat(i[1].replace(",", ".")), _c(n) ? n % 24 * Ic : NaN;
  if (i = yt.HHMM.exec(e), i)
    return n = parseInt(i[1], 10), o = parseFloat(i[2].replace(",", ".")), _c(n, o) ? n % 24 * Ic + o * ty : NaN;
  if (i = yt.HHMMSS.exec(e), i) {
    n = parseInt(i[1], 10), o = parseInt(i[2], 10);
    const a = parseFloat(i[3].replace(",", "."));
    return _c(n, o, a) ? n % 24 * Ic + o * ty + a * 1e3 : NaN;
  }
  return null;
}
function ry(e, n, o) {
  n = n || 0, o = o || 0;
  const i = /* @__PURE__ */ new Date(0);
  i.setUTCFullYear(e, 0, 4);
  const a = i.getUTCDay() || 7, l = n * 7 + o + 1 - a;
  return i.setUTCDate(i.getUTCDate() + l), i;
}
const HR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], KR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function X0(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function oy(e, n, o) {
  if (n < 0 || n > 11)
    return !1;
  if (o != null) {
    if (o < 1)
      return !1;
    const i = X0(e);
    if (i && o > KR[n] || !i && o > HR[n])
      return !1;
  }
  return !0;
}
function YR(e, n) {
  if (n < 1)
    return !1;
  const o = X0(e);
  return !(o && n > 366 || !o && n > 365);
}
function iy(e, n) {
  return !(e < 0 || e > 52 || n != null && (n < 0 || n > 6));
}
function _c(e, n, o) {
  return !(e < 0 || e >= 25 || n != null && (n < 0 || n >= 60) || o != null && (o < 0 || o >= 60));
}
function GR(e, n, o) {
  if (typeof e == "string" && !e.match(G0))
    return ny(e, { ...o, timeZone: n });
  e = ny(e, o);
  const i = bf(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()).getTime(), a = Y0(n, new Date(i));
  return new Date(i + a);
}
function XR(e, n, o) {
  return e ? new Date(e).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: n,
    ...o
  }) : "";
}
function QR(e, n, o) {
  return e ? new Date(e).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !0,
    timeZone: n,
    ...o
  }) : "";
}
function ZR(e, n, o) {
  let i = 0, a = 0;
  const l = n.match(/(\d+):(\d+)\s*(am|pm)?/i);
  if (!l) throw new Error("Invalid time format");
  i = parseInt(l[1], 10), a = parseInt(l[2], 10);
  const c = l[3]?.toLowerCase();
  c === "pm" && i < 12 && (i += 12), c === "am" && i === 12 && (i = 0);
  const d = `${e} ${i.toString().padStart(2, "0")}:${a.toString().padStart(2, "0")}:00`;
  return GR(d, o).toISOString();
}
function Q0(e) {
  try {
    const n = /* @__PURE__ */ new Date(), o = new Date(n.toLocaleString("en-US", { timeZone: "UTC" })), a = (new Date(n.toLocaleString("en-US", { timeZone: e })).getTime() - o.getTime()) / 6e4, l = a >= 0 ? "+" : "-", c = Math.floor(Math.abs(a) / 60), d = Math.abs(a) % 60;
    return `UTC${l}${c}:${String(d).padStart(2, "0")}`;
  } catch {
    return "UTC+0:00";
  }
}
function qR(e) {
  const n = e.toLowerCase(), o = [];
  return n.includes("asia/kolkata") && o.push("india", "ist"), n.includes("europe/london") && o.push("uk", "england", "great britain", "gmt", "bst"), (n.includes("america/new_york") || n.includes("america/chicago") || n.includes("america/denver") || n.includes("america/los_angeles") || n.includes("america/phoenix")) && o.push("usa", "united states", "america"), n.includes("asia/tokyo") && o.push("japan", "jst"), n.includes("australia") && o.push("australia"), n.includes("europe/paris") && o.push("france", "cet", "cest"), n.includes("europe/berlin") && o.push("germany", "cet", "cest"), n.includes("asia/dubai") && o.push("uae", "united arab emirates"), o.join(" ");
}
const Fc = Intl.supportedValuesOf("timeZone").map((e) => ({
  value: e,
  label: e.replace(/_/g, " "),
  // Simple formatting
  offset: Q0(e),
  keywords: qR(e)
})), Ef = "http://localhost:5289", JR = async (e, n, o) => {
  const i = `${Ef}/api/availability/slots?staffId=${e}&serviceId=${n}&date=${o}`, a = await fetch(i);
  if (!a.ok)
    throw new Error("Failed to fetch available slots");
  return a.json();
}, eN = async (e, n) => {
  const o = `${Ef}/api/availability/service/${e}/slots?date=${n}`, i = await fetch(o);
  if (!i.ok)
    throw new Error("Failed to fetch available slots");
  return i.json();
}, tN = async (e) => {
  const n = `${Ef}/api/timeoff/staff/${e}`, o = await fetch(n, {
    headers: {
      // We might need auth headers here if the endpoint is protected,
      // but for public booking flow it usually needs to be open or use a specific token.
      // Checking TimeOffController, it has [Authorize], which might be an issue for public booking.
      // For now, assuming we might need to handle this or the requirement implies public access.
      // If strictly protected, we can't fetch it without login.
      // However, usually "get slots" (which checks timeoffs internally) is public.
      // The user verified fetching "unavailability(timeoffs) data", implying a direct fetch.
      // Let's assume for now we might need a token OR the controller should allow anonymous for this specific read if intended for public.
      // Re-reading controller: [Authorize] is on the class.
      // If this is for public booking, it will fail 401.
      // But `GetAvailableSlots` in `AvailabilityController` calculates availability internally and presumably is public (it doesn't have [Authorize] on the method, but check class).
      // AvailabilityController has no [Authorize] on class, so `GetAvailableSlots` is public.
      // BUT `TimeOffController` IS [Authorize].
      // The user asked to "fetch staff members availability and unavailability(timeoffs) data from api".
      // If I can't call TimeOff directly without auth, I might rely on `GetAvailableSlots` which returns valid slots.
      // However, to show "unavailable dates" on the calendar (entire days disabled), I might need to know about time-offs or check availability for each day.
      // Checking availability for every day in a month is expensive.
      // Usually, we fetch "Days with availability" or "TimeOffs".
      // If TimeOff endpoint is protected, I should probably use a specialized public endpoint or `GetAvailableSlots` logic.
      // Let's implement the service. If it fails 401, I'll have to ask or modify backend.
      // For now, I'll add the auth header helper just in case, but for public booking we usually don't have one.
      // Wait, `BookingForm` is public. User is a "Customer".
      // If the goal is public booking, we shouldn't need a token.
      // Maybe I should only rely on `fetchAvailableSlots`?
      // But the user specificially asked to "fetch... unavailability(timeoffs) data".
      // Maybe I should allow the fetch but handle 401 gracefully, or maybe the user is logged in as admin?
      // No, `BookingForm` is for customers.
      // Let's assume the user might have removed [Authorize] or intends to allow it.
      // Or maybe I should use the `GetAvailableSlots` to determine day availability?
      // Actually, getting timeoffs is good to disable dates.
      // I will write the fetch. If it needs auth, we'll see.
      "Content-Type": "application/json"
    }
  });
  if (!o.ok)
    throw new Error("Failed to fetch time offs");
  return o.json();
}, Z0 = "http://localhost:5289";
async function nN(e) {
  const n = await fetch(`${Z0}/api/companies/public/${e}`);
  if (!n.ok) throw new Error("Failed to load company profile");
  return n.json();
}
async function rN(e) {
  const n = await fetch(`${Z0}/api/companies/public/slug/${e}`);
  if (!n.ok) throw new Error("Failed to load company profile");
  return n.json();
}
function q0(e) {
  var n, o, i = "";
  if (typeof e == "string" || typeof e == "number") i += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (n = 0; n < a; n++) e[n] && (o = q0(e[n])) && (i && (i += " "), i += o);
  } else for (o in e) e[o] && (i && (i += " "), i += o);
  return i;
}
function J0() {
  for (var e, n, o = 0, i = "", a = arguments.length; o < a; o++) (e = arguments[o]) && (n = q0(e)) && (i && (i += " "), i += n);
  return i;
}
const oN = (e, n) => {
  const o = new Array(e.length + n.length);
  for (let i = 0; i < e.length; i++)
    o[i] = e[i];
  for (let i = 0; i < n.length; i++)
    o[e.length + i] = n[i];
  return o;
}, iN = (e, n) => ({
  classGroupId: e,
  validator: n
}), ex = (e = /* @__PURE__ */ new Map(), n = null, o) => ({
  nextPart: e,
  validators: n,
  classGroupId: o
}), al = "-", sy = [], sN = "arbitrary..", aN = (e) => {
  const n = uN(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (c) => {
      if (c.startsWith("[") && c.endsWith("]"))
        return lN(c);
      const d = c.split(al), h = d[0] === "" && d.length > 1 ? 1 : 0;
      return tx(d, h, n);
    },
    getConflictingClassGroupIds: (c, d) => {
      if (d) {
        const h = i[c], p = o[c];
        return h ? p ? oN(p, h) : h : p || sy;
      }
      return o[c] || sy;
    }
  };
}, tx = (e, n, o) => {
  if (e.length - n === 0)
    return o.classGroupId;
  const a = e[n], l = o.nextPart.get(a);
  if (l) {
    const p = tx(e, n + 1, l);
    if (p) return p;
  }
  const c = o.validators;
  if (c === null)
    return;
  const d = n === 0 ? e.join(al) : e.slice(n).join(al), h = c.length;
  for (let p = 0; p < h; p++) {
    const g = c[p];
    if (g.validator(d))
      return g.classGroupId;
  }
}, lN = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const n = e.slice(1, -1), o = n.indexOf(":"), i = n.slice(0, o);
  return i ? sN + i : void 0;
})(), uN = (e) => {
  const {
    theme: n,
    classGroups: o
  } = e;
  return cN(o, n);
}, cN = (e, n) => {
  const o = ex();
  for (const i in e) {
    const a = e[i];
    kf(a, o, i, n);
  }
  return o;
}, kf = (e, n, o, i) => {
  const a = e.length;
  for (let l = 0; l < a; l++) {
    const c = e[l];
    dN(c, n, o, i);
  }
}, dN = (e, n, o, i) => {
  if (typeof e == "string") {
    fN(e, n, o);
    return;
  }
  if (typeof e == "function") {
    hN(e, n, o, i);
    return;
  }
  pN(e, n, o, i);
}, fN = (e, n, o) => {
  const i = e === "" ? n : nx(n, e);
  i.classGroupId = o;
}, hN = (e, n, o, i) => {
  if (mN(e)) {
    kf(e(i), n, o, i);
    return;
  }
  n.validators === null && (n.validators = []), n.validators.push(iN(o, e));
}, pN = (e, n, o, i) => {
  const a = Object.entries(e), l = a.length;
  for (let c = 0; c < l; c++) {
    const [d, h] = a[c];
    kf(h, nx(n, d), o, i);
  }
}, nx = (e, n) => {
  let o = e;
  const i = n.split(al), a = i.length;
  for (let l = 0; l < a; l++) {
    const c = i[l];
    let d = o.nextPart.get(c);
    d || (d = ex(), o.nextPart.set(c, d)), o = d;
  }
  return o;
}, mN = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, gN = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let n = 0, o = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null);
  const a = (l, c) => {
    o[l] = c, n++, n > e && (n = 0, i = o, o = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(l) {
      let c = o[l];
      if (c !== void 0)
        return c;
      if ((c = i[l]) !== void 0)
        return a(l, c), c;
    },
    set(l, c) {
      l in o ? o[l] = c : a(l, c);
    }
  };
}, kd = "!", ay = ":", yN = [], ly = (e, n, o, i, a) => ({
  modifiers: e,
  hasImportantModifier: n,
  baseClassName: o,
  maybePostfixModifierPosition: i,
  isExternal: a
}), vN = (e) => {
  const {
    prefix: n,
    experimentalParseClassName: o
  } = e;
  let i = (a) => {
    const l = [];
    let c = 0, d = 0, h = 0, p;
    const g = a.length;
    for (let b = 0; b < g; b++) {
      const k = a[b];
      if (c === 0 && d === 0) {
        if (k === ay) {
          l.push(a.slice(h, b)), h = b + 1;
          continue;
        }
        if (k === "/") {
          p = b;
          continue;
        }
      }
      k === "[" ? c++ : k === "]" ? c-- : k === "(" ? d++ : k === ")" && d--;
    }
    const v = l.length === 0 ? a : a.slice(h);
    let x = v, S = !1;
    v.endsWith(kd) ? (x = v.slice(0, -1), S = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      v.startsWith(kd) && (x = v.slice(1), S = !0)
    );
    const E = p && p > h ? p - h : void 0;
    return ly(l, S, x, E);
  };
  if (n) {
    const a = n + ay, l = i;
    i = (c) => c.startsWith(a) ? l(c.slice(a.length)) : ly(yN, !1, c, void 0, !0);
  }
  if (o) {
    const a = i;
    i = (l) => o({
      className: l,
      parseClassName: a
    });
  }
  return i;
}, xN = (e) => {
  const n = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((o, i) => {
    n.set(o, 1e6 + i);
  }), (o) => {
    const i = [];
    let a = [];
    for (let l = 0; l < o.length; l++) {
      const c = o[l], d = c[0] === "[", h = n.has(c);
      d || h ? (a.length > 0 && (a.sort(), i.push(...a), a = []), i.push(c)) : a.push(c);
    }
    return a.length > 0 && (a.sort(), i.push(...a)), i;
  };
}, wN = (e) => ({
  cache: gN(e.cacheSize),
  parseClassName: vN(e),
  sortModifiers: xN(e),
  ...aN(e)
}), SN = /\s+/, CN = (e, n) => {
  const {
    parseClassName: o,
    getClassGroupId: i,
    getConflictingClassGroupIds: a,
    sortModifiers: l
  } = n, c = [], d = e.trim().split(SN);
  let h = "";
  for (let p = d.length - 1; p >= 0; p -= 1) {
    const g = d[p], {
      isExternal: v,
      modifiers: x,
      hasImportantModifier: S,
      baseClassName: E,
      maybePostfixModifierPosition: b
    } = o(g);
    if (v) {
      h = g + (h.length > 0 ? " " + h : h);
      continue;
    }
    let k = !!b, R = i(k ? E.substring(0, b) : E);
    if (!R) {
      if (!k) {
        h = g + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (R = i(E), !R) {
        h = g + (h.length > 0 ? " " + h : h);
        continue;
      }
      k = !1;
    }
    const T = x.length === 0 ? "" : x.length === 1 ? x[0] : l(x).join(":"), A = S ? T + kd : T, F = A + R;
    if (c.indexOf(F) > -1)
      continue;
    c.push(F);
    const O = a(R, k);
    for (let B = 0; B < O.length; ++B) {
      const V = O[B];
      c.push(A + V);
    }
    h = g + (h.length > 0 ? " " + h : h);
  }
  return h;
}, bN = (...e) => {
  let n = 0, o, i, a = "";
  for (; n < e.length; )
    (o = e[n++]) && (i = rx(o)) && (a && (a += " "), a += i);
  return a;
}, rx = (e) => {
  if (typeof e == "string")
    return e;
  let n, o = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (n = rx(e[i])) && (o && (o += " "), o += n);
  return o;
}, EN = (e, ...n) => {
  let o, i, a, l;
  const c = (h) => {
    const p = n.reduce((g, v) => v(g), e());
    return o = wN(p), i = o.cache.get, a = o.cache.set, l = d, d(h);
  }, d = (h) => {
    const p = i(h);
    if (p)
      return p;
    const g = CN(h, o);
    return a(h, g), g;
  };
  return l = c, (...h) => l(bN(...h));
}, kN = [], Ze = (e) => {
  const n = (o) => o[e] || kN;
  return n.isThemeGetter = !0, n;
}, ox = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ix = /^\((?:(\w[\w-]*):)?(.+)\)$/i, PN = /^\d+\/\d+$/, TN = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, RN = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, NN = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, DN = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, AN = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, To = (e) => PN.test(e), ke = (e) => !!e && !Number.isNaN(Number(e)), hr = (e) => !!e && Number.isInteger(Number(e)), Vc = (e) => e.endsWith("%") && ke(e.slice(0, -1)), On = (e) => TN.test(e), MN = () => !0, LN = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  RN.test(e) && !NN.test(e)
), sx = () => !1, jN = (e) => DN.test(e), ON = (e) => AN.test(e), IN = (e) => !le(e) && !ue(e), _N = (e) => Qo(e, ux, sx), le = (e) => ox.test(e), Br = (e) => Qo(e, cx, LN), $c = (e) => Qo(e, BN, ke), uy = (e) => Qo(e, ax, sx), FN = (e) => Qo(e, lx, ON), ja = (e) => Qo(e, dx, jN), ue = (e) => ix.test(e), Ki = (e) => Zo(e, cx), VN = (e) => Zo(e, UN), cy = (e) => Zo(e, ax), $N = (e) => Zo(e, ux), zN = (e) => Zo(e, lx), Oa = (e) => Zo(e, dx, !0), Qo = (e, n, o) => {
  const i = ox.exec(e);
  return i ? i[1] ? n(i[1]) : o(i[2]) : !1;
}, Zo = (e, n, o = !1) => {
  const i = ix.exec(e);
  return i ? i[1] ? n(i[1]) : o : !1;
}, ax = (e) => e === "position" || e === "percentage", lx = (e) => e === "image" || e === "url", ux = (e) => e === "length" || e === "size" || e === "bg-size", cx = (e) => e === "length", BN = (e) => e === "number", UN = (e) => e === "family-name", dx = (e) => e === "shadow", WN = () => {
  const e = Ze("color"), n = Ze("font"), o = Ze("text"), i = Ze("font-weight"), a = Ze("tracking"), l = Ze("leading"), c = Ze("breakpoint"), d = Ze("container"), h = Ze("spacing"), p = Ze("radius"), g = Ze("shadow"), v = Ze("inset-shadow"), x = Ze("text-shadow"), S = Ze("drop-shadow"), E = Ze("blur"), b = Ze("perspective"), k = Ze("aspect"), R = Ze("ease"), T = Ze("animate"), A = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], F = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], O = () => [...F(), ue, le], B = () => ["auto", "hidden", "clip", "visible", "scroll"], V = () => ["auto", "contain", "none"], z = () => [ue, le, h], q = () => [To, "full", "auto", ...z()], ne = () => [hr, "none", "subgrid", ue, le], se = () => ["auto", {
    span: ["full", hr, ue, le]
  }, hr, ue, le], be = () => [hr, "auto", ue, le], we = () => ["auto", "min", "max", "fr", ue, le], xe = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Ee = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], ge = () => ["auto", ...z()], te = () => [To, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...z()], j = () => [e, ue, le], J = () => [...F(), cy, uy, {
    position: [ue, le]
  }], G = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], L = () => ["auto", "cover", "contain", $N, _N, {
    size: [ue, le]
  }], D = () => [Vc, Ki, Br], U = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    p,
    ue,
    le
  ], X = () => ["", ke, Ki, Br], W = () => ["solid", "dashed", "dotted", "double"], oe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ee = () => [ke, Vc, cy, uy], he = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    E,
    ue,
    le
  ], ye = () => ["none", ke, ue, le], De = () => ["none", ke, ue, le], ve = () => [ke, ue, le], Je = () => [To, "full", ...z()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [On],
      breakpoint: [On],
      color: [MN],
      container: [On],
      "drop-shadow": [On],
      ease: ["in", "out", "in-out"],
      font: [IN],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [On],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [On],
      shadow: [On],
      spacing: ["px", ke],
      text: [On],
      "text-shadow": [On],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", To, le, ue, k]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ke, le, ue, d]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": A()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": A()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: O()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: B()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": B()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": B()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: V()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": V()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": V()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: q()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": q()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": q()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: q()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: q()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: q()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: q()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: q()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: q()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [hr, "auto", ue, le]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [To, "full", "auto", d, ...z()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [ke, To, "auto", "initial", "none", le]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ke, ue, le]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ke, ue, le]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [hr, "first", "last", "none", ue, le]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": ne()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: se()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": be()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": be()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": ne()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: se()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": be()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": be()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": we()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": we()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: z()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": z()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": z()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...xe(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Ee(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Ee()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...xe()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Ee(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Ee(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": xe()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Ee(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Ee()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: z()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: z()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: z()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: z()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: z()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: z()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: z()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: z()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: z()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: ge()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: ge()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: ge()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: ge()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: ge()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: ge()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: ge()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: ge()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: ge()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": z()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": z()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: te()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [d, "screen", ...te()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          d,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...te()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          d,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [c]
          },
          ...te()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...te()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...te()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...te()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", o, Ki, Br]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [i, ue, $c]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Vc, le]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [VN, le, n]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [a, ue, le]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ke, "none", ue, $c]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          l,
          ...z()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ue, le]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", ue, le]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: j()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: j()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...W(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ke, "from-font", "auto", ue, Br]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: j()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ke, "auto", ue, le]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: z()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ue, le]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", ue, le]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: J()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: G()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: L()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, hr, ue, le],
          radial: ["", ue, le],
          conic: [hr, ue, le]
        }, zN, FN]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: j()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: D()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: D()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: D()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: j()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: j()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: j()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: U()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": U()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": U()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": U()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": U()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": U()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": U()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": U()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": U()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": U()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": U()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": U()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": U()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": U()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": U()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: X()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": X()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": X()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": X()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": X()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": X()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": X()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": X()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": X()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": X()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": X()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...W(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...W(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: j()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": j()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": j()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": j()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": j()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": j()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": j()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": j()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": j()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: j()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...W(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ke, ue, le]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ke, Ki, Br]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: j()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          g,
          Oa,
          ja
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: j()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", v, Oa, ja]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": j()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: X()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: j()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ke, Br]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": j()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": X()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": j()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", x, Oa, ja]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": j()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ke, ue, le]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...oe(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": oe()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [ke]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": ee()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": ee()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": j()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": j()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": ee()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": ee()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": j()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": j()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": ee()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": ee()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": j()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": j()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": ee()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": ee()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": j()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": j()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": ee()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": ee()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": j()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": j()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": ee()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": ee()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": j()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": j()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": ee()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": ee()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": j()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": j()
      }],
      "mask-image-radial": [{
        "mask-radial": [ue, le]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": ee()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": ee()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": j()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": j()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": F()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ke]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": ee()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": ee()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": j()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": j()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: J()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: G()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: L()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", ue, le]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ue,
          le
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: he()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ke, ue, le]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ke, ue, le]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          S,
          Oa,
          ja
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": j()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ke, ue, le]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ke, ue, le]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ke, ue, le]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ke, ue, le]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ke, ue, le]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ue,
          le
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": he()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ke, ue, le]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ke, ue, le]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ke, ue, le]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ke, ue, le]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ke, ue, le]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ke, ue, le]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ke, ue, le]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ke, ue, le]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": z()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": z()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": z()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ue, le]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [ke, "initial", ue, le]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", R, ue, le]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ke, ue, le]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", T, ue, le]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [b, ue, le]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": O()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ye()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ye()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ye()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ye()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: De()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": De()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": De()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": De()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ve()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ve()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ve()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ue, le, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: O()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Je()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Je()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Je()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Je()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: j()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: j()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ue, le]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": z()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": z()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": z()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": z()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": z()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": z()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": z()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": z()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": z()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": z()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": z()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": z()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": z()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": z()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": z()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": z()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": z()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": z()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", ue, le]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...j()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ke, Ki, Br, $c]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...j()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, HN = /* @__PURE__ */ EN(WN);
function $n(...e) {
  return HN(J0(e));
}
function dy(e, n) {
  if (typeof e == "function")
    return e(n);
  e != null && (e.current = n);
}
function Sn(...e) {
  return (n) => {
    let o = !1;
    const i = e.map((a) => {
      const l = dy(a, n);
      return !o && typeof l == "function" && (o = !0), l;
    });
    if (o)
      return () => {
        for (let a = 0; a < i.length; a++) {
          const l = i[a];
          typeof l == "function" ? l() : dy(e[a], null);
        }
      };
  };
}
function ln(...e) {
  return y.useCallback(Sn(...e), e);
}
var KN = Symbol.for("react.lazy"), ll = Od[" use ".trim().toString()];
function YN(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function fx(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === KN && "_payload" in e && YN(e._payload);
}
// @__NO_SIDE_EFFECTS__
function GN(e) {
  const n = /* @__PURE__ */ QN(e), o = y.forwardRef((i, a) => {
    let { children: l, ...c } = i;
    fx(l) && typeof ll == "function" && (l = ll(l._payload));
    const d = y.Children.toArray(l), h = d.find(qN);
    if (h) {
      const p = h.props.children, g = d.map((v) => v === h ? y.Children.count(p) > 1 ? y.Children.only(null) : y.isValidElement(p) ? p.props.children : null : v);
      return /* @__PURE__ */ C.jsx(n, { ...c, ref: a, children: y.isValidElement(p) ? y.cloneElement(p, void 0, g) : null });
    }
    return /* @__PURE__ */ C.jsx(n, { ...c, ref: a, children: l });
  });
  return o.displayName = `${e}.Slot`, o;
}
var XN = /* @__PURE__ */ GN("Slot");
// @__NO_SIDE_EFFECTS__
function QN(e) {
  const n = y.forwardRef((o, i) => {
    let { children: a, ...l } = o;
    if (fx(a) && typeof ll == "function" && (a = ll(a._payload)), y.isValidElement(a)) {
      const c = eD(a), d = JN(l, a.props);
      return a.type !== y.Fragment && (d.ref = i ? Sn(i, c) : c), y.cloneElement(a, d);
    }
    return y.Children.count(a) > 1 ? y.Children.only(null) : null;
  });
  return n.displayName = `${e}.SlotClone`, n;
}
var ZN = Symbol("radix.slottable");
function qN(e) {
  return y.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ZN;
}
function JN(e, n) {
  const o = { ...n };
  for (const i in n) {
    const a = e[i], l = n[i];
    /^on[A-Z]/.test(i) ? a && l ? o[i] = (...d) => {
      const h = l(...d);
      return a(...d), h;
    } : a && (o[i] = a) : i === "style" ? o[i] = { ...a, ...l } : i === "className" && (o[i] = [a, l].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function eD(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning;
  return o ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
const fy = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, hy = J0, tD = (e, n) => (o) => {
  var i;
  if (n?.variants == null) return hy(e, o?.class, o?.className);
  const { variants: a, defaultVariants: l } = n, c = Object.keys(a).map((p) => {
    const g = o?.[p], v = l?.[p];
    if (g === null) return null;
    const x = fy(g) || fy(v);
    return a[p][x];
  }), d = o && Object.entries(o).reduce((p, g) => {
    let [v, x] = g;
    return x === void 0 || (p[v] = x), p;
  }, {}), h = n == null || (i = n.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((p, g) => {
    let { class: v, className: x, ...S } = g;
    return Object.entries(S).every((E) => {
      let [b, k] = E;
      return Array.isArray(k) ? k.includes({
        ...l,
        ...d
      }[b]) : {
        ...l,
        ...d
      }[b] === k;
    }) ? [
      ...p,
      v,
      x
    ] : p;
  }, []);
  return hy(e, c, h, o?.class, o?.className);
}, nD = tD(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), hx = y.forwardRef(({ className: e, variant: n, size: o, asChild: i = !1, ...a }, l) => {
  const c = i ? XN : "button";
  return /* @__PURE__ */ C.jsx(
    c,
    {
      className: $n(nD({ variant: n, size: o, className: e })),
      ref: l,
      ...a
    }
  );
});
hx.displayName = "Button";
var py = 1, rD = 0.9, oD = 0.8, iD = 0.17, zc = 0.1, Bc = 0.999, sD = 0.9999, aD = 0.99, lD = /[\\\/_+.#"@\[\(\{&]/, uD = /[\\\/_+.#"@\[\(\{&]/g, cD = /[\s-]/, px = /[\s-]/g;
function Pd(e, n, o, i, a, l, c) {
  if (l === n.length) return a === e.length ? py : aD;
  var d = `${a},${l}`;
  if (c[d] !== void 0) return c[d];
  for (var h = i.charAt(l), p = o.indexOf(h, a), g = 0, v, x, S, E; p >= 0; ) v = Pd(e, n, o, i, p + 1, l + 1, c), v > g && (p === a ? v *= py : lD.test(e.charAt(p - 1)) ? (v *= oD, S = e.slice(a, p - 1).match(uD), S && a > 0 && (v *= Math.pow(Bc, S.length))) : cD.test(e.charAt(p - 1)) ? (v *= rD, E = e.slice(a, p - 1).match(px), E && a > 0 && (v *= Math.pow(Bc, E.length))) : (v *= iD, a > 0 && (v *= Math.pow(Bc, p - a))), e.charAt(p) !== n.charAt(l) && (v *= sD)), (v < zc && o.charAt(p - 1) === i.charAt(l + 1) || i.charAt(l + 1) === i.charAt(l) && o.charAt(p - 1) !== i.charAt(l)) && (x = Pd(e, n, o, i, p + 1, l + 2, c), x * zc > v && (v = x * zc)), v > g && (g = v), p = o.indexOf(h, p + 1);
  return c[d] = g, g;
}
function my(e) {
  return e.toLowerCase().replace(px, " ");
}
function dD(e, n, o) {
  return e = o && o.length > 0 ? `${e + " " + o.join(" ")}` : e, Pd(e, n, my(e), my(n), 0, 0, {});
}
function Lt(e, n, { checkForDefaultPrevented: o = !0 } = {}) {
  return function(a) {
    if (e?.(a), o === !1 || !a.defaultPrevented)
      return n?.(a);
  };
}
function fD(e, n) {
  const o = y.createContext(n), i = (l) => {
    const { children: c, ...d } = l, h = y.useMemo(() => d, Object.values(d));
    return /* @__PURE__ */ C.jsx(o.Provider, { value: h, children: c });
  };
  i.displayName = e + "Provider";
  function a(l) {
    const c = y.useContext(o);
    if (c) return c;
    if (n !== void 0) return n;
    throw new Error(`\`${l}\` must be used within \`${e}\``);
  }
  return [i, a];
}
function Pf(e, n = []) {
  let o = [];
  function i(l, c) {
    const d = y.createContext(c), h = o.length;
    o = [...o, c];
    const p = (v) => {
      const { scope: x, children: S, ...E } = v, b = x?.[e]?.[h] || d, k = y.useMemo(() => E, Object.values(E));
      return /* @__PURE__ */ C.jsx(b.Provider, { value: k, children: S });
    };
    p.displayName = l + "Provider";
    function g(v, x) {
      const S = x?.[e]?.[h] || d, E = y.useContext(S);
      if (E) return E;
      if (c !== void 0) return c;
      throw new Error(`\`${v}\` must be used within \`${l}\``);
    }
    return [p, g];
  }
  const a = () => {
    const l = o.map((c) => y.createContext(c));
    return function(d) {
      const h = d?.[e] || l;
      return y.useMemo(
        () => ({ [`__scope${e}`]: { ...d, [e]: h } }),
        [d, h]
      );
    };
  };
  return a.scopeName = e, [i, hD(a, ...n)];
}
function hD(...e) {
  const n = e[0];
  if (e.length === 1) return n;
  const o = () => {
    const i = e.map((a) => ({
      useScope: a(),
      scopeName: a.scopeName
    }));
    return function(l) {
      const c = i.reduce((d, { useScope: h, scopeName: p }) => {
        const v = h(l)[`__scope${p}`];
        return { ...d, ...v };
      }, {});
      return y.useMemo(() => ({ [`__scope${n.scopeName}`]: c }), [c]);
    };
  };
  return o.scopeName = n.scopeName, o;
}
var vr = globalThis?.document ? y.useLayoutEffect : () => {
}, pD = Od[" useId ".trim().toString()] || (() => {
}), mD = 0;
function xn(e) {
  const [n, o] = y.useState(pD());
  return vr(() => {
    o((i) => i ?? String(mD++));
  }, [e]), e || (n ? `radix-${n}` : "");
}
var gD = Od[" useInsertionEffect ".trim().toString()] || vr;
function mx({
  prop: e,
  defaultProp: n,
  onChange: o = () => {
  },
  caller: i
}) {
  const [a, l, c] = yD({
    defaultProp: n,
    onChange: o
  }), d = e !== void 0, h = d ? e : a;
  {
    const g = y.useRef(e !== void 0);
    y.useEffect(() => {
      const v = g.current;
      v !== d && console.warn(
        `${i} is changing from ${v ? "controlled" : "uncontrolled"} to ${d ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), g.current = d;
    }, [d, i]);
  }
  const p = y.useCallback(
    (g) => {
      if (d) {
        const v = vD(g) ? g(e) : g;
        v !== e && c.current?.(v);
      } else
        l(g);
    },
    [d, e, l, c]
  );
  return [h, p];
}
function yD({
  defaultProp: e,
  onChange: n
}) {
  const [o, i] = y.useState(e), a = y.useRef(o), l = y.useRef(n);
  return gD(() => {
    l.current = n;
  }, [n]), y.useEffect(() => {
    a.current !== o && (l.current?.(o), a.current = o);
  }, [o, a]), [o, i, l];
}
function vD(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function xD(e) {
  const n = /* @__PURE__ */ wD(e), o = y.forwardRef((i, a) => {
    const { children: l, ...c } = i, d = y.Children.toArray(l), h = d.find(CD);
    if (h) {
      const p = h.props.children, g = d.map((v) => v === h ? y.Children.count(p) > 1 ? y.Children.only(null) : y.isValidElement(p) ? p.props.children : null : v);
      return /* @__PURE__ */ C.jsx(n, { ...c, ref: a, children: y.isValidElement(p) ? y.cloneElement(p, void 0, g) : null });
    }
    return /* @__PURE__ */ C.jsx(n, { ...c, ref: a, children: l });
  });
  return o.displayName = `${e}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function wD(e) {
  const n = y.forwardRef((o, i) => {
    const { children: a, ...l } = o;
    if (y.isValidElement(a)) {
      const c = ED(a), d = bD(l, a.props);
      return a.type !== y.Fragment && (d.ref = i ? Sn(i, c) : c), y.cloneElement(a, d);
    }
    return y.Children.count(a) > 1 ? y.Children.only(null) : null;
  });
  return n.displayName = `${e}.SlotClone`, n;
}
var SD = Symbol("radix.slottable");
function CD(e) {
  return y.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === SD;
}
function bD(e, n) {
  const o = { ...n };
  for (const i in n) {
    const a = e[i], l = n[i];
    /^on[A-Z]/.test(i) ? a && l ? o[i] = (...d) => {
      const h = l(...d);
      return a(...d), h;
    } : a && (o[i] = a) : i === "style" ? o[i] = { ...a, ...l } : i === "className" && (o[i] = [a, l].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function ED(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning;
  return o ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var kD = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], We = kD.reduce((e, n) => {
  const o = /* @__PURE__ */ xD(`Primitive.${n}`), i = y.forwardRef((a, l) => {
    const { asChild: c, ...d } = a, h = c ? o : n;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ C.jsx(h, { ...d, ref: l });
  });
  return i.displayName = `Primitive.${n}`, { ...e, [n]: i };
}, {});
function PD(e, n) {
  e && zd.flushSync(() => e.dispatchEvent(n));
}
function Uo(e) {
  const n = y.useRef(e);
  return y.useEffect(() => {
    n.current = e;
  }), y.useMemo(() => (...o) => n.current?.(...o), []);
}
function TD(e, n = globalThis?.document) {
  const o = Uo(e);
  y.useEffect(() => {
    const i = (a) => {
      a.key === "Escape" && o(a);
    };
    return n.addEventListener("keydown", i, { capture: !0 }), () => n.removeEventListener("keydown", i, { capture: !0 });
  }, [o, n]);
}
var RD = "DismissableLayer", Td = "dismissableLayer.update", ND = "dismissableLayer.pointerDownOutside", DD = "dismissableLayer.focusOutside", gy, gx = y.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Tf = y.forwardRef(
  (e, n) => {
    const {
      disableOutsidePointerEvents: o = !1,
      onEscapeKeyDown: i,
      onPointerDownOutside: a,
      onFocusOutside: l,
      onInteractOutside: c,
      onDismiss: d,
      ...h
    } = e, p = y.useContext(gx), [g, v] = y.useState(null), x = g?.ownerDocument ?? globalThis?.document, [, S] = y.useState({}), E = ln(n, (V) => v(V)), b = Array.from(p.layers), [k] = [...p.layersWithOutsidePointerEventsDisabled].slice(-1), R = b.indexOf(k), T = g ? b.indexOf(g) : -1, A = p.layersWithOutsidePointerEventsDisabled.size > 0, F = T >= R, O = LD((V) => {
      const z = V.target, q = [...p.branches].some((ne) => ne.contains(z));
      !F || q || (a?.(V), c?.(V), V.defaultPrevented || d?.());
    }, x), B = jD((V) => {
      const z = V.target;
      [...p.branches].some((ne) => ne.contains(z)) || (l?.(V), c?.(V), V.defaultPrevented || d?.());
    }, x);
    return TD((V) => {
      T === p.layers.size - 1 && (i?.(V), !V.defaultPrevented && d && (V.preventDefault(), d()));
    }, x), y.useEffect(() => {
      if (g)
        return o && (p.layersWithOutsidePointerEventsDisabled.size === 0 && (gy = x.body.style.pointerEvents, x.body.style.pointerEvents = "none"), p.layersWithOutsidePointerEventsDisabled.add(g)), p.layers.add(g), yy(), () => {
          o && p.layersWithOutsidePointerEventsDisabled.size === 1 && (x.body.style.pointerEvents = gy);
        };
    }, [g, x, o, p]), y.useEffect(() => () => {
      g && (p.layers.delete(g), p.layersWithOutsidePointerEventsDisabled.delete(g), yy());
    }, [g, p]), y.useEffect(() => {
      const V = () => S({});
      return document.addEventListener(Td, V), () => document.removeEventListener(Td, V);
    }, []), /* @__PURE__ */ C.jsx(
      We.div,
      {
        ...h,
        ref: E,
        style: {
          pointerEvents: A ? F ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Lt(e.onFocusCapture, B.onFocusCapture),
        onBlurCapture: Lt(e.onBlurCapture, B.onBlurCapture),
        onPointerDownCapture: Lt(
          e.onPointerDownCapture,
          O.onPointerDownCapture
        )
      }
    );
  }
);
Tf.displayName = RD;
var AD = "DismissableLayerBranch", MD = y.forwardRef((e, n) => {
  const o = y.useContext(gx), i = y.useRef(null), a = ln(n, i);
  return y.useEffect(() => {
    const l = i.current;
    if (l)
      return o.branches.add(l), () => {
        o.branches.delete(l);
      };
  }, [o.branches]), /* @__PURE__ */ C.jsx(We.div, { ...e, ref: a });
});
MD.displayName = AD;
function LD(e, n = globalThis?.document) {
  const o = Uo(e), i = y.useRef(!1), a = y.useRef(() => {
  });
  return y.useEffect(() => {
    const l = (d) => {
      if (d.target && !i.current) {
        let h = function() {
          yx(
            ND,
            o,
            p,
            { discrete: !0 }
          );
        };
        const p = { originalEvent: d };
        d.pointerType === "touch" ? (n.removeEventListener("click", a.current), a.current = h, n.addEventListener("click", a.current, { once: !0 })) : h();
      } else
        n.removeEventListener("click", a.current);
      i.current = !1;
    }, c = window.setTimeout(() => {
      n.addEventListener("pointerdown", l);
    }, 0);
    return () => {
      window.clearTimeout(c), n.removeEventListener("pointerdown", l), n.removeEventListener("click", a.current);
    };
  }, [n, o]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => i.current = !0
  };
}
function jD(e, n = globalThis?.document) {
  const o = Uo(e), i = y.useRef(!1);
  return y.useEffect(() => {
    const a = (l) => {
      l.target && !i.current && yx(DD, o, { originalEvent: l }, {
        discrete: !1
      });
    };
    return n.addEventListener("focusin", a), () => n.removeEventListener("focusin", a);
  }, [n, o]), {
    onFocusCapture: () => i.current = !0,
    onBlurCapture: () => i.current = !1
  };
}
function yy() {
  const e = new CustomEvent(Td);
  document.dispatchEvent(e);
}
function yx(e, n, o, { discrete: i }) {
  const a = o.originalEvent.target, l = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: o });
  n && a.addEventListener(e, n, { once: !0 }), i ? PD(a, l) : a.dispatchEvent(l);
}
var Uc = "focusScope.autoFocusOnMount", Wc = "focusScope.autoFocusOnUnmount", vy = { bubbles: !1, cancelable: !0 }, OD = "FocusScope", Rf = y.forwardRef((e, n) => {
  const {
    loop: o = !1,
    trapped: i = !1,
    onMountAutoFocus: a,
    onUnmountAutoFocus: l,
    ...c
  } = e, [d, h] = y.useState(null), p = Uo(a), g = Uo(l), v = y.useRef(null), x = ln(n, (b) => h(b)), S = y.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  y.useEffect(() => {
    if (i) {
      let b = function(A) {
        if (S.paused || !d) return;
        const F = A.target;
        d.contains(F) ? v.current = F : mr(v.current, { select: !0 });
      }, k = function(A) {
        if (S.paused || !d) return;
        const F = A.relatedTarget;
        F !== null && (d.contains(F) || mr(v.current, { select: !0 }));
      }, R = function(A) {
        if (document.activeElement === document.body)
          for (const O of A)
            O.removedNodes.length > 0 && mr(d);
      };
      document.addEventListener("focusin", b), document.addEventListener("focusout", k);
      const T = new MutationObserver(R);
      return d && T.observe(d, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", b), document.removeEventListener("focusout", k), T.disconnect();
      };
    }
  }, [i, d, S.paused]), y.useEffect(() => {
    if (d) {
      wy.add(S);
      const b = document.activeElement;
      if (!d.contains(b)) {
        const R = new CustomEvent(Uc, vy);
        d.addEventListener(Uc, p), d.dispatchEvent(R), R.defaultPrevented || (ID(zD(vx(d)), { select: !0 }), document.activeElement === b && mr(d));
      }
      return () => {
        d.removeEventListener(Uc, p), setTimeout(() => {
          const R = new CustomEvent(Wc, vy);
          d.addEventListener(Wc, g), d.dispatchEvent(R), R.defaultPrevented || mr(b ?? document.body, { select: !0 }), d.removeEventListener(Wc, g), wy.remove(S);
        }, 0);
      };
    }
  }, [d, p, g, S]);
  const E = y.useCallback(
    (b) => {
      if (!o && !i || S.paused) return;
      const k = b.key === "Tab" && !b.altKey && !b.ctrlKey && !b.metaKey, R = document.activeElement;
      if (k && R) {
        const T = b.currentTarget, [A, F] = _D(T);
        A && F ? !b.shiftKey && R === F ? (b.preventDefault(), o && mr(A, { select: !0 })) : b.shiftKey && R === A && (b.preventDefault(), o && mr(F, { select: !0 })) : R === T && b.preventDefault();
      }
    },
    [o, i, S.paused]
  );
  return /* @__PURE__ */ C.jsx(We.div, { tabIndex: -1, ...c, ref: x, onKeyDown: E });
});
Rf.displayName = OD;
function ID(e, { select: n = !1 } = {}) {
  const o = document.activeElement;
  for (const i of e)
    if (mr(i, { select: n }), document.activeElement !== o) return;
}
function _D(e) {
  const n = vx(e), o = xy(n, e), i = xy(n.reverse(), e);
  return [o, i];
}
function vx(e) {
  const n = [], o = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (i) => {
      const a = i.tagName === "INPUT" && i.type === "hidden";
      return i.disabled || i.hidden || a ? NodeFilter.FILTER_SKIP : i.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; o.nextNode(); ) n.push(o.currentNode);
  return n;
}
function xy(e, n) {
  for (const o of e)
    if (!FD(o, { upTo: n })) return o;
}
function FD(e, { upTo: n }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (n !== void 0 && e === n) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function VD(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function mr(e, { select: n = !1 } = {}) {
  if (e && e.focus) {
    const o = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== o && VD(e) && n && e.select();
  }
}
var wy = $D();
function $D() {
  let e = [];
  return {
    add(n) {
      const o = e[0];
      n !== o && o?.pause(), e = Sy(e, n), e.unshift(n);
    },
    remove(n) {
      e = Sy(e, n), e[0]?.resume();
    }
  };
}
function Sy(e, n) {
  const o = [...e], i = o.indexOf(n);
  return i !== -1 && o.splice(i, 1), o;
}
function zD(e) {
  return e.filter((n) => n.tagName !== "A");
}
var BD = "Portal", Nf = y.forwardRef((e, n) => {
  const { container: o, ...i } = e, [a, l] = y.useState(!1);
  vr(() => l(!0), []);
  const c = o || a && globalThis?.document?.body;
  return c ? nb.createPortal(/* @__PURE__ */ C.jsx(We.div, { ...i, ref: n }), c) : null;
});
Nf.displayName = BD;
function UD(e, n) {
  return y.useReducer((o, i) => n[o][i] ?? o, e);
}
var qo = (e) => {
  const { present: n, children: o } = e, i = WD(n), a = typeof o == "function" ? o({ present: i.isPresent }) : y.Children.only(o), l = ln(i.ref, HD(a));
  return typeof o == "function" || i.isPresent ? y.cloneElement(a, { ref: l }) : null;
};
qo.displayName = "Presence";
function WD(e) {
  const [n, o] = y.useState(), i = y.useRef(null), a = y.useRef(e), l = y.useRef("none"), c = e ? "mounted" : "unmounted", [d, h] = UD(c, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return y.useEffect(() => {
    const p = Ia(i.current);
    l.current = d === "mounted" ? p : "none";
  }, [d]), vr(() => {
    const p = i.current, g = a.current;
    if (g !== e) {
      const x = l.current, S = Ia(p);
      e ? h("MOUNT") : S === "none" || p?.display === "none" ? h("UNMOUNT") : h(g && x !== S ? "ANIMATION_OUT" : "UNMOUNT"), a.current = e;
    }
  }, [e, h]), vr(() => {
    if (n) {
      let p;
      const g = n.ownerDocument.defaultView ?? window, v = (S) => {
        const b = Ia(i.current).includes(CSS.escape(S.animationName));
        if (S.target === n && b && (h("ANIMATION_END"), !a.current)) {
          const k = n.style.animationFillMode;
          n.style.animationFillMode = "forwards", p = g.setTimeout(() => {
            n.style.animationFillMode === "forwards" && (n.style.animationFillMode = k);
          });
        }
      }, x = (S) => {
        S.target === n && (l.current = Ia(i.current));
      };
      return n.addEventListener("animationstart", x), n.addEventListener("animationcancel", v), n.addEventListener("animationend", v), () => {
        g.clearTimeout(p), n.removeEventListener("animationstart", x), n.removeEventListener("animationcancel", v), n.removeEventListener("animationend", v);
      };
    } else
      h("ANIMATION_END");
  }, [n, h]), {
    isPresent: ["mounted", "unmountSuspended"].includes(d),
    ref: y.useCallback((p) => {
      i.current = p ? getComputedStyle(p) : null, o(p);
    }, [])
  };
}
function Ia(e) {
  return e?.animationName || "none";
}
function HD(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning;
  return o ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var Hc = 0;
function xx() {
  y.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Cy()), document.body.insertAdjacentElement("beforeend", e[1] ?? Cy()), Hc++, () => {
      Hc === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((n) => n.remove()), Hc--;
    };
  }, []);
}
function Cy() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var mn = function() {
  return mn = Object.assign || function(n) {
    for (var o, i = 1, a = arguments.length; i < a; i++) {
      o = arguments[i];
      for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (n[l] = o[l]);
    }
    return n;
  }, mn.apply(this, arguments);
};
function wx(e, n) {
  var o = {};
  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && n.indexOf(i) < 0 && (o[i] = e[i]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, i = Object.getOwnPropertySymbols(e); a < i.length; a++)
      n.indexOf(i[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[a]) && (o[i[a]] = e[i[a]]);
  return o;
}
function KD(e, n, o) {
  if (o || arguments.length === 2) for (var i = 0, a = n.length, l; i < a; i++)
    (l || !(i in n)) && (l || (l = Array.prototype.slice.call(n, 0, i)), l[i] = n[i]);
  return e.concat(l || Array.prototype.slice.call(n));
}
var Xa = "right-scroll-bar-position", Qa = "width-before-scroll-bar", YD = "with-scroll-bars-hidden", GD = "--removed-body-scroll-bar-size";
function Kc(e, n) {
  return typeof e == "function" ? e(n) : e && (e.current = n), e;
}
function XD(e, n) {
  var o = y.useState(function() {
    return {
      // value
      value: e,
      // last callback
      callback: n,
      // "memoized" public interface
      facade: {
        get current() {
          return o.value;
        },
        set current(i) {
          var a = o.value;
          a !== i && (o.value = i, o.callback(i, a));
        }
      }
    };
  })[0];
  return o.callback = n, o.facade;
}
var QD = typeof window < "u" ? y.useLayoutEffect : y.useEffect, by = /* @__PURE__ */ new WeakMap();
function ZD(e, n) {
  var o = XD(null, function(i) {
    return e.forEach(function(a) {
      return Kc(a, i);
    });
  });
  return QD(function() {
    var i = by.get(o);
    if (i) {
      var a = new Set(i), l = new Set(e), c = o.current;
      a.forEach(function(d) {
        l.has(d) || Kc(d, null);
      }), l.forEach(function(d) {
        a.has(d) || Kc(d, c);
      });
    }
    by.set(o, e);
  }, [e]), o;
}
function qD(e) {
  return e;
}
function JD(e, n) {
  n === void 0 && (n = qD);
  var o = [], i = !1, a = {
    read: function() {
      if (i)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return o.length ? o[o.length - 1] : e;
    },
    useMedium: function(l) {
      var c = n(l, i);
      return o.push(c), function() {
        o = o.filter(function(d) {
          return d !== c;
        });
      };
    },
    assignSyncMedium: function(l) {
      for (i = !0; o.length; ) {
        var c = o;
        o = [], c.forEach(l);
      }
      o = {
        push: function(d) {
          return l(d);
        },
        filter: function() {
          return o;
        }
      };
    },
    assignMedium: function(l) {
      i = !0;
      var c = [];
      if (o.length) {
        var d = o;
        o = [], d.forEach(l), c = o;
      }
      var h = function() {
        var g = c;
        c = [], g.forEach(l);
      }, p = function() {
        return Promise.resolve().then(h);
      };
      p(), o = {
        push: function(g) {
          c.push(g), p();
        },
        filter: function(g) {
          return c = c.filter(g), o;
        }
      };
    }
  };
  return a;
}
function eA(e) {
  e === void 0 && (e = {});
  var n = JD(null);
  return n.options = mn({ async: !0, ssr: !1 }, e), n;
}
var Sx = function(e) {
  var n = e.sideCar, o = wx(e, ["sideCar"]);
  if (!n)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var i = n.read();
  if (!i)
    throw new Error("Sidecar medium not found");
  return y.createElement(i, mn({}, o));
};
Sx.isSideCarExport = !0;
function tA(e, n) {
  return e.useMedium(n), Sx;
}
var Cx = eA(), Yc = function() {
}, wl = y.forwardRef(function(e, n) {
  var o = y.useRef(null), i = y.useState({
    onScrollCapture: Yc,
    onWheelCapture: Yc,
    onTouchMoveCapture: Yc
  }), a = i[0], l = i[1], c = e.forwardProps, d = e.children, h = e.className, p = e.removeScrollBar, g = e.enabled, v = e.shards, x = e.sideCar, S = e.noRelative, E = e.noIsolation, b = e.inert, k = e.allowPinchZoom, R = e.as, T = R === void 0 ? "div" : R, A = e.gapMode, F = wx(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), O = x, B = ZD([o, n]), V = mn(mn({}, F), a);
  return y.createElement(
    y.Fragment,
    null,
    g && y.createElement(O, { sideCar: Cx, removeScrollBar: p, shards: v, noRelative: S, noIsolation: E, inert: b, setCallbacks: l, allowPinchZoom: !!k, lockRef: o, gapMode: A }),
    c ? y.cloneElement(y.Children.only(d), mn(mn({}, V), { ref: B })) : y.createElement(T, mn({}, V, { className: h, ref: B }), d)
  );
});
wl.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
wl.classNames = {
  fullWidth: Qa,
  zeroRight: Xa
};
var nA = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function rA() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var n = nA();
  return n && e.setAttribute("nonce", n), e;
}
function oA(e, n) {
  e.styleSheet ? e.styleSheet.cssText = n : e.appendChild(document.createTextNode(n));
}
function iA(e) {
  var n = document.head || document.getElementsByTagName("head")[0];
  n.appendChild(e);
}
var sA = function() {
  var e = 0, n = null;
  return {
    add: function(o) {
      e == 0 && (n = rA()) && (oA(n, o), iA(n)), e++;
    },
    remove: function() {
      e--, !e && n && (n.parentNode && n.parentNode.removeChild(n), n = null);
    }
  };
}, aA = function() {
  var e = sA();
  return function(n, o) {
    y.useEffect(function() {
      return e.add(n), function() {
        e.remove();
      };
    }, [n && o]);
  };
}, bx = function() {
  var e = aA(), n = function(o) {
    var i = o.styles, a = o.dynamic;
    return e(i, a), null;
  };
  return n;
}, lA = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Gc = function(e) {
  return parseInt(e || "", 10) || 0;
}, uA = function(e) {
  var n = window.getComputedStyle(document.body), o = n[e === "padding" ? "paddingLeft" : "marginLeft"], i = n[e === "padding" ? "paddingTop" : "marginTop"], a = n[e === "padding" ? "paddingRight" : "marginRight"];
  return [Gc(o), Gc(i), Gc(a)];
}, cA = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return lA;
  var n = uA(e), o = document.documentElement.clientWidth, i = window.innerWidth;
  return {
    left: n[0],
    top: n[1],
    right: n[2],
    gap: Math.max(0, i - o + n[2] - n[0])
  };
}, dA = bx(), Vo = "data-scroll-locked", fA = function(e, n, o, i) {
  var a = e.left, l = e.top, c = e.right, d = e.gap;
  return o === void 0 && (o = "margin"), `
  .`.concat(YD, ` {
   overflow: hidden `).concat(i, `;
   padding-right: `).concat(d, "px ").concat(i, `;
  }
  body[`).concat(Vo, `] {
    overflow: hidden `).concat(i, `;
    overscroll-behavior: contain;
    `).concat([
    n && "position: relative ".concat(i, ";"),
    o === "margin" && `
    padding-left: `.concat(a, `px;
    padding-top: `).concat(l, `px;
    padding-right: `).concat(c, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(d, "px ").concat(i, `;
    `),
    o === "padding" && "padding-right: ".concat(d, "px ").concat(i, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Xa, ` {
    right: `).concat(d, "px ").concat(i, `;
  }
  
  .`).concat(Qa, ` {
    margin-right: `).concat(d, "px ").concat(i, `;
  }
  
  .`).concat(Xa, " .").concat(Xa, ` {
    right: 0 `).concat(i, `;
  }
  
  .`).concat(Qa, " .").concat(Qa, ` {
    margin-right: 0 `).concat(i, `;
  }
  
  body[`).concat(Vo, `] {
    `).concat(GD, ": ").concat(d, `px;
  }
`);
}, Ey = function() {
  var e = parseInt(document.body.getAttribute(Vo) || "0", 10);
  return isFinite(e) ? e : 0;
}, hA = function() {
  y.useEffect(function() {
    return document.body.setAttribute(Vo, (Ey() + 1).toString()), function() {
      var e = Ey() - 1;
      e <= 0 ? document.body.removeAttribute(Vo) : document.body.setAttribute(Vo, e.toString());
    };
  }, []);
}, pA = function(e) {
  var n = e.noRelative, o = e.noImportant, i = e.gapMode, a = i === void 0 ? "margin" : i;
  hA();
  var l = y.useMemo(function() {
    return cA(a);
  }, [a]);
  return y.createElement(dA, { styles: fA(l, !n, a, o ? "" : "!important") });
}, Rd = !1;
if (typeof window < "u")
  try {
    var _a = Object.defineProperty({}, "passive", {
      get: function() {
        return Rd = !0, !0;
      }
    });
    window.addEventListener("test", _a, _a), window.removeEventListener("test", _a, _a);
  } catch {
    Rd = !1;
  }
var Ro = Rd ? { passive: !1 } : !1, mA = function(e) {
  return e.tagName === "TEXTAREA";
}, Ex = function(e, n) {
  if (!(e instanceof Element))
    return !1;
  var o = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    o[n] !== "hidden" && // contains scroll inside self
    !(o.overflowY === o.overflowX && !mA(e) && o[n] === "visible")
  );
}, gA = function(e) {
  return Ex(e, "overflowY");
}, yA = function(e) {
  return Ex(e, "overflowX");
}, ky = function(e, n) {
  var o = n.ownerDocument, i = n;
  do {
    typeof ShadowRoot < "u" && i instanceof ShadowRoot && (i = i.host);
    var a = kx(e, i);
    if (a) {
      var l = Px(e, i), c = l[1], d = l[2];
      if (c > d)
        return !0;
    }
    i = i.parentNode;
  } while (i && i !== o.body);
  return !1;
}, vA = function(e) {
  var n = e.scrollTop, o = e.scrollHeight, i = e.clientHeight;
  return [
    n,
    o,
    i
  ];
}, xA = function(e) {
  var n = e.scrollLeft, o = e.scrollWidth, i = e.clientWidth;
  return [
    n,
    o,
    i
  ];
}, kx = function(e, n) {
  return e === "v" ? gA(n) : yA(n);
}, Px = function(e, n) {
  return e === "v" ? vA(n) : xA(n);
}, wA = function(e, n) {
  return e === "h" && n === "rtl" ? -1 : 1;
}, SA = function(e, n, o, i, a) {
  var l = wA(e, window.getComputedStyle(n).direction), c = l * i, d = o.target, h = n.contains(d), p = !1, g = c > 0, v = 0, x = 0;
  do {
    if (!d)
      break;
    var S = Px(e, d), E = S[0], b = S[1], k = S[2], R = b - k - l * E;
    (E || R) && kx(e, d) && (v += R, x += E);
    var T = d.parentNode;
    d = T && T.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? T.host : T;
  } while (
    // portaled content
    !h && d !== document.body || // self content
    h && (n.contains(d) || n === d)
  );
  return (g && Math.abs(v) < 1 || !g && Math.abs(x) < 1) && (p = !0), p;
}, Fa = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Py = function(e) {
  return [e.deltaX, e.deltaY];
}, Ty = function(e) {
  return e && "current" in e ? e.current : e;
}, CA = function(e, n) {
  return e[0] === n[0] && e[1] === n[1];
}, bA = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, EA = 0, No = [];
function kA(e) {
  var n = y.useRef([]), o = y.useRef([0, 0]), i = y.useRef(), a = y.useState(EA++)[0], l = y.useState(bx)[0], c = y.useRef(e);
  y.useEffect(function() {
    c.current = e;
  }, [e]), y.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(a));
      var b = KD([e.lockRef.current], (e.shards || []).map(Ty), !0).filter(Boolean);
      return b.forEach(function(k) {
        return k.classList.add("allow-interactivity-".concat(a));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(a)), b.forEach(function(k) {
          return k.classList.remove("allow-interactivity-".concat(a));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var d = y.useCallback(function(b, k) {
    if ("touches" in b && b.touches.length === 2 || b.type === "wheel" && b.ctrlKey)
      return !c.current.allowPinchZoom;
    var R = Fa(b), T = o.current, A = "deltaX" in b ? b.deltaX : T[0] - R[0], F = "deltaY" in b ? b.deltaY : T[1] - R[1], O, B = b.target, V = Math.abs(A) > Math.abs(F) ? "h" : "v";
    if ("touches" in b && V === "h" && B.type === "range")
      return !1;
    var z = window.getSelection(), q = z && z.anchorNode, ne = q ? q === B || q.contains(B) : !1;
    if (ne)
      return !1;
    var se = ky(V, B);
    if (!se)
      return !0;
    if (se ? O = V : (O = V === "v" ? "h" : "v", se = ky(V, B)), !se)
      return !1;
    if (!i.current && "changedTouches" in b && (A || F) && (i.current = O), !O)
      return !0;
    var be = i.current || O;
    return SA(be, k, b, be === "h" ? A : F);
  }, []), h = y.useCallback(function(b) {
    var k = b;
    if (!(!No.length || No[No.length - 1] !== l)) {
      var R = "deltaY" in k ? Py(k) : Fa(k), T = n.current.filter(function(O) {
        return O.name === k.type && (O.target === k.target || k.target === O.shadowParent) && CA(O.delta, R);
      })[0];
      if (T && T.should) {
        k.cancelable && k.preventDefault();
        return;
      }
      if (!T) {
        var A = (c.current.shards || []).map(Ty).filter(Boolean).filter(function(O) {
          return O.contains(k.target);
        }), F = A.length > 0 ? d(k, A[0]) : !c.current.noIsolation;
        F && k.cancelable && k.preventDefault();
      }
    }
  }, []), p = y.useCallback(function(b, k, R, T) {
    var A = { name: b, delta: k, target: R, should: T, shadowParent: PA(R) };
    n.current.push(A), setTimeout(function() {
      n.current = n.current.filter(function(F) {
        return F !== A;
      });
    }, 1);
  }, []), g = y.useCallback(function(b) {
    o.current = Fa(b), i.current = void 0;
  }, []), v = y.useCallback(function(b) {
    p(b.type, Py(b), b.target, d(b, e.lockRef.current));
  }, []), x = y.useCallback(function(b) {
    p(b.type, Fa(b), b.target, d(b, e.lockRef.current));
  }, []);
  y.useEffect(function() {
    return No.push(l), e.setCallbacks({
      onScrollCapture: v,
      onWheelCapture: v,
      onTouchMoveCapture: x
    }), document.addEventListener("wheel", h, Ro), document.addEventListener("touchmove", h, Ro), document.addEventListener("touchstart", g, Ro), function() {
      No = No.filter(function(b) {
        return b !== l;
      }), document.removeEventListener("wheel", h, Ro), document.removeEventListener("touchmove", h, Ro), document.removeEventListener("touchstart", g, Ro);
    };
  }, []);
  var S = e.removeScrollBar, E = e.inert;
  return y.createElement(
    y.Fragment,
    null,
    E ? y.createElement(l, { styles: bA(a) }) : null,
    S ? y.createElement(pA, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function PA(e) {
  for (var n = null; e !== null; )
    e instanceof ShadowRoot && (n = e.host, e = e.host), e = e.parentNode;
  return n;
}
const TA = tA(Cx, kA);
var Df = y.forwardRef(function(e, n) {
  return y.createElement(wl, mn({}, e, { ref: n, sideCar: TA }));
});
Df.classNames = wl.classNames;
var RA = function(e) {
  if (typeof document > "u")
    return null;
  var n = Array.isArray(e) ? e[0] : e;
  return n.ownerDocument.body;
}, Do = /* @__PURE__ */ new WeakMap(), Va = /* @__PURE__ */ new WeakMap(), $a = {}, Xc = 0, Tx = function(e) {
  return e && (e.host || Tx(e.parentNode));
}, NA = function(e, n) {
  return n.map(function(o) {
    if (e.contains(o))
      return o;
    var i = Tx(o);
    return i && e.contains(i) ? i : (console.error("aria-hidden", o, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(o) {
    return !!o;
  });
}, DA = function(e, n, o, i) {
  var a = NA(n, Array.isArray(e) ? e : [e]);
  $a[o] || ($a[o] = /* @__PURE__ */ new WeakMap());
  var l = $a[o], c = [], d = /* @__PURE__ */ new Set(), h = new Set(a), p = function(v) {
    !v || d.has(v) || (d.add(v), p(v.parentNode));
  };
  a.forEach(p);
  var g = function(v) {
    !v || h.has(v) || Array.prototype.forEach.call(v.children, function(x) {
      if (d.has(x))
        g(x);
      else
        try {
          var S = x.getAttribute(i), E = S !== null && S !== "false", b = (Do.get(x) || 0) + 1, k = (l.get(x) || 0) + 1;
          Do.set(x, b), l.set(x, k), c.push(x), b === 1 && E && Va.set(x, !0), k === 1 && x.setAttribute(o, "true"), E || x.setAttribute(i, "true");
        } catch (R) {
          console.error("aria-hidden: cannot operate on ", x, R);
        }
    });
  };
  return g(n), d.clear(), Xc++, function() {
    c.forEach(function(v) {
      var x = Do.get(v) - 1, S = l.get(v) - 1;
      Do.set(v, x), l.set(v, S), x || (Va.has(v) || v.removeAttribute(i), Va.delete(v)), S || v.removeAttribute(o);
    }), Xc--, Xc || (Do = /* @__PURE__ */ new WeakMap(), Do = /* @__PURE__ */ new WeakMap(), Va = /* @__PURE__ */ new WeakMap(), $a = {});
  };
}, Rx = function(e, n, o) {
  o === void 0 && (o = "data-aria-hidden");
  var i = Array.from(Array.isArray(e) ? e : [e]), a = RA(e);
  return a ? (i.push.apply(i, Array.from(a.querySelectorAll("[aria-live], script"))), DA(i, a, o, "aria-hidden")) : function() {
    return null;
  };
};
// @__NO_SIDE_EFFECTS__
function AA(e) {
  const n = /* @__PURE__ */ MA(e), o = y.forwardRef((i, a) => {
    const { children: l, ...c } = i, d = y.Children.toArray(l), h = d.find(jA);
    if (h) {
      const p = h.props.children, g = d.map((v) => v === h ? y.Children.count(p) > 1 ? y.Children.only(null) : y.isValidElement(p) ? p.props.children : null : v);
      return /* @__PURE__ */ C.jsx(n, { ...c, ref: a, children: y.isValidElement(p) ? y.cloneElement(p, void 0, g) : null });
    }
    return /* @__PURE__ */ C.jsx(n, { ...c, ref: a, children: l });
  });
  return o.displayName = `${e}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function MA(e) {
  const n = y.forwardRef((o, i) => {
    const { children: a, ...l } = o;
    if (y.isValidElement(a)) {
      const c = IA(a), d = OA(l, a.props);
      return a.type !== y.Fragment && (d.ref = i ? Sn(i, c) : c), y.cloneElement(a, d);
    }
    return y.Children.count(a) > 1 ? y.Children.only(null) : null;
  });
  return n.displayName = `${e}.SlotClone`, n;
}
var LA = Symbol("radix.slottable");
function jA(e) {
  return y.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === LA;
}
function OA(e, n) {
  const o = { ...n };
  for (const i in n) {
    const a = e[i], l = n[i];
    /^on[A-Z]/.test(i) ? a && l ? o[i] = (...d) => {
      const h = l(...d);
      return a(...d), h;
    } : a && (o[i] = a) : i === "style" ? o[i] = { ...a, ...l } : i === "className" && (o[i] = [a, l].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function IA(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning;
  return o ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var Sl = "Dialog", [Nx] = Pf(Sl), [_A, un] = Nx(Sl), Dx = (e) => {
  const {
    __scopeDialog: n,
    children: o,
    open: i,
    defaultOpen: a,
    onOpenChange: l,
    modal: c = !0
  } = e, d = y.useRef(null), h = y.useRef(null), [p, g] = mx({
    prop: i,
    defaultProp: a ?? !1,
    onChange: l,
    caller: Sl
  });
  return /* @__PURE__ */ C.jsx(
    _A,
    {
      scope: n,
      triggerRef: d,
      contentRef: h,
      contentId: xn(),
      titleId: xn(),
      descriptionId: xn(),
      open: p,
      onOpenChange: g,
      onOpenToggle: y.useCallback(() => g((v) => !v), [g]),
      modal: c,
      children: o
    }
  );
};
Dx.displayName = Sl;
var Ax = "DialogTrigger", FA = y.forwardRef(
  (e, n) => {
    const { __scopeDialog: o, ...i } = e, a = un(Ax, o), l = ln(n, a.triggerRef);
    return /* @__PURE__ */ C.jsx(
      We.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a.open,
        "aria-controls": a.contentId,
        "data-state": Lf(a.open),
        ...i,
        ref: l,
        onClick: Lt(e.onClick, a.onOpenToggle)
      }
    );
  }
);
FA.displayName = Ax;
var Af = "DialogPortal", [VA, Mx] = Nx(Af, {
  forceMount: void 0
}), Lx = (e) => {
  const { __scopeDialog: n, forceMount: o, children: i, container: a } = e, l = un(Af, n);
  return /* @__PURE__ */ C.jsx(VA, { scope: n, forceMount: o, children: y.Children.map(i, (c) => /* @__PURE__ */ C.jsx(qo, { present: o || l.open, children: /* @__PURE__ */ C.jsx(Nf, { asChild: !0, container: a, children: c }) })) });
};
Lx.displayName = Af;
var ul = "DialogOverlay", jx = y.forwardRef(
  (e, n) => {
    const o = Mx(ul, e.__scopeDialog), { forceMount: i = o.forceMount, ...a } = e, l = un(ul, e.__scopeDialog);
    return l.modal ? /* @__PURE__ */ C.jsx(qo, { present: i || l.open, children: /* @__PURE__ */ C.jsx(zA, { ...a, ref: n }) }) : null;
  }
);
jx.displayName = ul;
var $A = /* @__PURE__ */ AA("DialogOverlay.RemoveScroll"), zA = y.forwardRef(
  (e, n) => {
    const { __scopeDialog: o, ...i } = e, a = un(ul, o);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ C.jsx(Df, { as: $A, allowPinchZoom: !0, shards: [a.contentRef], children: /* @__PURE__ */ C.jsx(
        We.div,
        {
          "data-state": Lf(a.open),
          ...i,
          ref: n,
          style: { pointerEvents: "auto", ...i.style }
        }
      ) })
    );
  }
), Xr = "DialogContent", Ox = y.forwardRef(
  (e, n) => {
    const o = Mx(Xr, e.__scopeDialog), { forceMount: i = o.forceMount, ...a } = e, l = un(Xr, e.__scopeDialog);
    return /* @__PURE__ */ C.jsx(qo, { present: i || l.open, children: l.modal ? /* @__PURE__ */ C.jsx(BA, { ...a, ref: n }) : /* @__PURE__ */ C.jsx(UA, { ...a, ref: n }) });
  }
);
Ox.displayName = Xr;
var BA = y.forwardRef(
  (e, n) => {
    const o = un(Xr, e.__scopeDialog), i = y.useRef(null), a = ln(n, o.contentRef, i);
    return y.useEffect(() => {
      const l = i.current;
      if (l) return Rx(l);
    }, []), /* @__PURE__ */ C.jsx(
      Ix,
      {
        ...e,
        ref: a,
        trapFocus: o.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Lt(e.onCloseAutoFocus, (l) => {
          l.preventDefault(), o.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Lt(e.onPointerDownOutside, (l) => {
          const c = l.detail.originalEvent, d = c.button === 0 && c.ctrlKey === !0;
          (c.button === 2 || d) && l.preventDefault();
        }),
        onFocusOutside: Lt(
          e.onFocusOutside,
          (l) => l.preventDefault()
        )
      }
    );
  }
), UA = y.forwardRef(
  (e, n) => {
    const o = un(Xr, e.__scopeDialog), i = y.useRef(!1), a = y.useRef(!1);
    return /* @__PURE__ */ C.jsx(
      Ix,
      {
        ...e,
        ref: n,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (l) => {
          e.onCloseAutoFocus?.(l), l.defaultPrevented || (i.current || o.triggerRef.current?.focus(), l.preventDefault()), i.current = !1, a.current = !1;
        },
        onInteractOutside: (l) => {
          e.onInteractOutside?.(l), l.defaultPrevented || (i.current = !0, l.detail.originalEvent.type === "pointerdown" && (a.current = !0));
          const c = l.target;
          o.triggerRef.current?.contains(c) && l.preventDefault(), l.detail.originalEvent.type === "focusin" && a.current && l.preventDefault();
        }
      }
    );
  }
), Ix = y.forwardRef(
  (e, n) => {
    const { __scopeDialog: o, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: l, ...c } = e, d = un(Xr, o), h = y.useRef(null), p = ln(n, h);
    return xx(), /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
      /* @__PURE__ */ C.jsx(
        Rf,
        {
          asChild: !0,
          loop: !0,
          trapped: i,
          onMountAutoFocus: a,
          onUnmountAutoFocus: l,
          children: /* @__PURE__ */ C.jsx(
            Tf,
            {
              role: "dialog",
              id: d.contentId,
              "aria-describedby": d.descriptionId,
              "aria-labelledby": d.titleId,
              "data-state": Lf(d.open),
              ...c,
              ref: p,
              onDismiss: () => d.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
        /* @__PURE__ */ C.jsx(YA, { titleId: d.titleId }),
        /* @__PURE__ */ C.jsx(XA, { contentRef: h, descriptionId: d.descriptionId })
      ] })
    ] });
  }
), Mf = "DialogTitle", WA = y.forwardRef(
  (e, n) => {
    const { __scopeDialog: o, ...i } = e, a = un(Mf, o);
    return /* @__PURE__ */ C.jsx(We.h2, { id: a.titleId, ...i, ref: n });
  }
);
WA.displayName = Mf;
var _x = "DialogDescription", HA = y.forwardRef(
  (e, n) => {
    const { __scopeDialog: o, ...i } = e, a = un(_x, o);
    return /* @__PURE__ */ C.jsx(We.p, { id: a.descriptionId, ...i, ref: n });
  }
);
HA.displayName = _x;
var Fx = "DialogClose", KA = y.forwardRef(
  (e, n) => {
    const { __scopeDialog: o, ...i } = e, a = un(Fx, o);
    return /* @__PURE__ */ C.jsx(
      We.button,
      {
        type: "button",
        ...i,
        ref: n,
        onClick: Lt(e.onClick, () => a.onOpenChange(!1))
      }
    );
  }
);
KA.displayName = Fx;
function Lf(e) {
  return e ? "open" : "closed";
}
var Vx = "DialogTitleWarning", [wL, $x] = fD(Vx, {
  contentName: Xr,
  titleName: Mf,
  docsSlug: "dialog"
}), YA = ({ titleId: e }) => {
  const n = $x(Vx), o = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
  return y.useEffect(() => {
    e && (document.getElementById(e) || console.error(o));
  }, [o, e]), null;
}, GA = "DialogDescriptionWarning", XA = ({ contentRef: e, descriptionId: n }) => {
  const i = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${$x(GA).contentName}}.`;
  return y.useEffect(() => {
    const a = e.current?.getAttribute("aria-describedby");
    n && a && (document.getElementById(n) || console.warn(i));
  }, [i, e, n]), null;
}, QA = Dx, ZA = Lx, qA = jx, JA = Ox, Yi = '[cmdk-group=""]', Qc = '[cmdk-group-items=""]', e2 = '[cmdk-group-heading=""]', zx = '[cmdk-item=""]', Ry = `${zx}:not([aria-disabled="true"])`, Nd = "cmdk-item-select", Ao = "data-value", t2 = (e, n, o) => dD(e, n, o), Bx = y.createContext(void 0), hs = () => y.useContext(Bx), Ux = y.createContext(void 0), jf = () => y.useContext(Ux), Wx = y.createContext(void 0), Hx = y.forwardRef((e, n) => {
  let o = Mo(() => {
    var D, U;
    return { search: "", value: (U = (D = e.value) != null ? D : e.defaultValue) != null ? U : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), i = Mo(() => /* @__PURE__ */ new Set()), a = Mo(() => /* @__PURE__ */ new Map()), l = Mo(() => /* @__PURE__ */ new Map()), c = Mo(() => /* @__PURE__ */ new Set()), d = Kx(e), { label: h, children: p, value: g, onValueChange: v, filter: x, shouldFilter: S, loop: E, disablePointerSelection: b = !1, vimBindings: k = !0, ...R } = e, T = xn(), A = xn(), F = xn(), O = y.useRef(null), B = f2();
  Qr(() => {
    if (g !== void 0) {
      let D = g.trim();
      o.current.value = D, V.emit();
    }
  }, [g]), Qr(() => {
    B(6, we);
  }, []);
  let V = y.useMemo(() => ({ subscribe: (D) => (c.current.add(D), () => c.current.delete(D)), snapshot: () => o.current, setState: (D, U, X) => {
    var W, oe, ee, he;
    if (!Object.is(o.current[D], U)) {
      if (o.current[D] = U, D === "search") be(), ne(), B(1, se);
      else if (D === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let ye = document.getElementById(F);
          ye ? ye.focus() : (W = document.getElementById(T)) == null || W.focus();
        }
        if (B(7, () => {
          var ye;
          o.current.selectedItemId = (ye = xe()) == null ? void 0 : ye.id, V.emit();
        }), X || B(5, we), ((oe = d.current) == null ? void 0 : oe.value) !== void 0) {
          let ye = U ?? "";
          (he = (ee = d.current).onValueChange) == null || he.call(ee, ye);
          return;
        }
      }
      V.emit();
    }
  }, emit: () => {
    c.current.forEach((D) => D());
  } }), []), z = y.useMemo(() => ({ value: (D, U, X) => {
    var W;
    U !== ((W = l.current.get(D)) == null ? void 0 : W.value) && (l.current.set(D, { value: U, keywords: X }), o.current.filtered.items.set(D, q(U, X)), B(2, () => {
      ne(), V.emit();
    }));
  }, item: (D, U) => (i.current.add(D), U && (a.current.has(U) ? a.current.get(U).add(D) : a.current.set(U, /* @__PURE__ */ new Set([D]))), B(3, () => {
    be(), ne(), o.current.value || se(), V.emit();
  }), () => {
    l.current.delete(D), i.current.delete(D), o.current.filtered.items.delete(D);
    let X = xe();
    B(4, () => {
      be(), X?.getAttribute("id") === D && se(), V.emit();
    });
  }), group: (D) => (a.current.has(D) || a.current.set(D, /* @__PURE__ */ new Set()), () => {
    l.current.delete(D), a.current.delete(D);
  }), filter: () => d.current.shouldFilter, label: h || e["aria-label"], getDisablePointerSelection: () => d.current.disablePointerSelection, listId: T, inputId: F, labelId: A, listInnerRef: O }), []);
  function q(D, U) {
    var X, W;
    let oe = (W = (X = d.current) == null ? void 0 : X.filter) != null ? W : t2;
    return D ? oe(D, o.current.search, U) : 0;
  }
  function ne() {
    if (!o.current.search || d.current.shouldFilter === !1) return;
    let D = o.current.filtered.items, U = [];
    o.current.filtered.groups.forEach((W) => {
      let oe = a.current.get(W), ee = 0;
      oe.forEach((he) => {
        let ye = D.get(he);
        ee = Math.max(ye, ee);
      }), U.push([W, ee]);
    });
    let X = O.current;
    Ee().sort((W, oe) => {
      var ee, he;
      let ye = W.getAttribute("id"), De = oe.getAttribute("id");
      return ((ee = D.get(De)) != null ? ee : 0) - ((he = D.get(ye)) != null ? he : 0);
    }).forEach((W) => {
      let oe = W.closest(Qc);
      oe ? oe.appendChild(W.parentElement === oe ? W : W.closest(`${Qc} > *`)) : X.appendChild(W.parentElement === X ? W : W.closest(`${Qc} > *`));
    }), U.sort((W, oe) => oe[1] - W[1]).forEach((W) => {
      var oe;
      let ee = (oe = O.current) == null ? void 0 : oe.querySelector(`${Yi}[${Ao}="${encodeURIComponent(W[0])}"]`);
      ee?.parentElement.appendChild(ee);
    });
  }
  function se() {
    let D = Ee().find((X) => X.getAttribute("aria-disabled") !== "true"), U = D?.getAttribute(Ao);
    V.setState("value", U || void 0);
  }
  function be() {
    var D, U, X, W;
    if (!o.current.search || d.current.shouldFilter === !1) {
      o.current.filtered.count = i.current.size;
      return;
    }
    o.current.filtered.groups = /* @__PURE__ */ new Set();
    let oe = 0;
    for (let ee of i.current) {
      let he = (U = (D = l.current.get(ee)) == null ? void 0 : D.value) != null ? U : "", ye = (W = (X = l.current.get(ee)) == null ? void 0 : X.keywords) != null ? W : [], De = q(he, ye);
      o.current.filtered.items.set(ee, De), De > 0 && oe++;
    }
    for (let [ee, he] of a.current) for (let ye of he) if (o.current.filtered.items.get(ye) > 0) {
      o.current.filtered.groups.add(ee);
      break;
    }
    o.current.filtered.count = oe;
  }
  function we() {
    var D, U, X;
    let W = xe();
    W && (((D = W.parentElement) == null ? void 0 : D.firstChild) === W && ((X = (U = W.closest(Yi)) == null ? void 0 : U.querySelector(e2)) == null || X.scrollIntoView({ block: "nearest" })), W.scrollIntoView({ block: "nearest" }));
  }
  function xe() {
    var D;
    return (D = O.current) == null ? void 0 : D.querySelector(`${zx}[aria-selected="true"]`);
  }
  function Ee() {
    var D;
    return Array.from(((D = O.current) == null ? void 0 : D.querySelectorAll(Ry)) || []);
  }
  function ge(D) {
    let U = Ee()[D];
    U && V.setState("value", U.getAttribute(Ao));
  }
  function te(D) {
    var U;
    let X = xe(), W = Ee(), oe = W.findIndex((he) => he === X), ee = W[oe + D];
    (U = d.current) != null && U.loop && (ee = oe + D < 0 ? W[W.length - 1] : oe + D === W.length ? W[0] : W[oe + D]), ee && V.setState("value", ee.getAttribute(Ao));
  }
  function j(D) {
    let U = xe(), X = U?.closest(Yi), W;
    for (; X && !W; ) X = D > 0 ? c2(X, Yi) : d2(X, Yi), W = X?.querySelector(Ry);
    W ? V.setState("value", W.getAttribute(Ao)) : te(D);
  }
  let J = () => ge(Ee().length - 1), G = (D) => {
    D.preventDefault(), D.metaKey ? J() : D.altKey ? j(1) : te(1);
  }, L = (D) => {
    D.preventDefault(), D.metaKey ? ge(0) : D.altKey ? j(-1) : te(-1);
  };
  return y.createElement(We.div, { ref: n, tabIndex: -1, ...R, "cmdk-root": "", onKeyDown: (D) => {
    var U;
    (U = R.onKeyDown) == null || U.call(R, D);
    let X = D.nativeEvent.isComposing || D.keyCode === 229;
    if (!(D.defaultPrevented || X)) switch (D.key) {
      case "n":
      case "j": {
        k && D.ctrlKey && G(D);
        break;
      }
      case "ArrowDown": {
        G(D);
        break;
      }
      case "p":
      case "k": {
        k && D.ctrlKey && L(D);
        break;
      }
      case "ArrowUp": {
        L(D);
        break;
      }
      case "Home": {
        D.preventDefault(), ge(0);
        break;
      }
      case "End": {
        D.preventDefault(), J();
        break;
      }
      case "Enter": {
        D.preventDefault();
        let W = xe();
        if (W) {
          let oe = new Event(Nd);
          W.dispatchEvent(oe);
        }
      }
    }
  } }, y.createElement("label", { "cmdk-label": "", htmlFor: z.inputId, id: z.labelId, style: p2 }, h), Cl(e, (D) => y.createElement(Ux.Provider, { value: V }, y.createElement(Bx.Provider, { value: z }, D))));
}), n2 = y.forwardRef((e, n) => {
  var o, i;
  let a = xn(), l = y.useRef(null), c = y.useContext(Wx), d = hs(), h = Kx(e), p = (i = (o = h.current) == null ? void 0 : o.forceMount) != null ? i : c?.forceMount;
  Qr(() => {
    if (!p) return d.item(a, c?.id);
  }, [p]);
  let g = Yx(a, l, [e.value, e.children, l], e.keywords), v = jf(), x = xr((B) => B.value && B.value === g.current), S = xr((B) => p || d.filter() === !1 ? !0 : B.search ? B.filtered.items.get(a) > 0 : !0);
  y.useEffect(() => {
    let B = l.current;
    if (!(!B || e.disabled)) return B.addEventListener(Nd, E), () => B.removeEventListener(Nd, E);
  }, [S, e.onSelect, e.disabled]);
  function E() {
    var B, V;
    b(), (V = (B = h.current).onSelect) == null || V.call(B, g.current);
  }
  function b() {
    v.setState("value", g.current, !0);
  }
  if (!S) return null;
  let { disabled: k, value: R, onSelect: T, forceMount: A, keywords: F, ...O } = e;
  return y.createElement(We.div, { ref: Sn(l, n), ...O, id: a, "cmdk-item": "", role: "option", "aria-disabled": !!k, "aria-selected": !!x, "data-disabled": !!k, "data-selected": !!x, onPointerMove: k || d.getDisablePointerSelection() ? void 0 : b, onClick: k ? void 0 : E }, e.children);
}), r2 = y.forwardRef((e, n) => {
  let { heading: o, children: i, forceMount: a, ...l } = e, c = xn(), d = y.useRef(null), h = y.useRef(null), p = xn(), g = hs(), v = xr((S) => a || g.filter() === !1 ? !0 : S.search ? S.filtered.groups.has(c) : !0);
  Qr(() => g.group(c), []), Yx(c, d, [e.value, e.heading, h]);
  let x = y.useMemo(() => ({ id: c, forceMount: a }), [a]);
  return y.createElement(We.div, { ref: Sn(d, n), ...l, "cmdk-group": "", role: "presentation", hidden: v ? void 0 : !0 }, o && y.createElement("div", { ref: h, "cmdk-group-heading": "", "aria-hidden": !0, id: p }, o), Cl(e, (S) => y.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": o ? p : void 0 }, y.createElement(Wx.Provider, { value: x }, S))));
}), o2 = y.forwardRef((e, n) => {
  let { alwaysRender: o, ...i } = e, a = y.useRef(null), l = xr((c) => !c.search);
  return !o && !l ? null : y.createElement(We.div, { ref: Sn(a, n), ...i, "cmdk-separator": "", role: "separator" });
}), i2 = y.forwardRef((e, n) => {
  let { onValueChange: o, ...i } = e, a = e.value != null, l = jf(), c = xr((p) => p.search), d = xr((p) => p.selectedItemId), h = hs();
  return y.useEffect(() => {
    e.value != null && l.setState("search", e.value);
  }, [e.value]), y.createElement(We.input, { ref: n, ...i, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": h.listId, "aria-labelledby": h.labelId, "aria-activedescendant": d, id: h.inputId, type: "text", value: a ? e.value : c, onChange: (p) => {
    a || l.setState("search", p.target.value), o?.(p.target.value);
  } });
}), s2 = y.forwardRef((e, n) => {
  let { children: o, label: i = "Suggestions", ...a } = e, l = y.useRef(null), c = y.useRef(null), d = xr((p) => p.selectedItemId), h = hs();
  return y.useEffect(() => {
    if (c.current && l.current) {
      let p = c.current, g = l.current, v, x = new ResizeObserver(() => {
        v = requestAnimationFrame(() => {
          let S = p.offsetHeight;
          g.style.setProperty("--cmdk-list-height", S.toFixed(1) + "px");
        });
      });
      return x.observe(p), () => {
        cancelAnimationFrame(v), x.unobserve(p);
      };
    }
  }, []), y.createElement(We.div, { ref: Sn(l, n), ...a, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": d, "aria-label": i, id: h.listId }, Cl(e, (p) => y.createElement("div", { ref: Sn(c, h.listInnerRef), "cmdk-list-sizer": "" }, p)));
}), a2 = y.forwardRef((e, n) => {
  let { open: o, onOpenChange: i, overlayClassName: a, contentClassName: l, container: c, ...d } = e;
  return y.createElement(QA, { open: o, onOpenChange: i }, y.createElement(ZA, { container: c }, y.createElement(qA, { "cmdk-overlay": "", className: a }), y.createElement(JA, { "aria-label": e.label, "cmdk-dialog": "", className: l }, y.createElement(Hx, { ref: n, ...d }))));
}), l2 = y.forwardRef((e, n) => xr((o) => o.filtered.count === 0) ? y.createElement(We.div, { ref: n, ...e, "cmdk-empty": "", role: "presentation" }) : null), u2 = y.forwardRef((e, n) => {
  let { progress: o, children: i, label: a = "Loading...", ...l } = e;
  return y.createElement(We.div, { ref: n, ...l, "cmdk-loading": "", role: "progressbar", "aria-valuenow": o, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": a }, Cl(e, (c) => y.createElement("div", { "aria-hidden": !0 }, c)));
}), Jo = Object.assign(Hx, { List: s2, Item: n2, Input: i2, Group: r2, Separator: o2, Dialog: a2, Empty: l2, Loading: u2 });
function c2(e, n) {
  let o = e.nextElementSibling;
  for (; o; ) {
    if (o.matches(n)) return o;
    o = o.nextElementSibling;
  }
}
function d2(e, n) {
  let o = e.previousElementSibling;
  for (; o; ) {
    if (o.matches(n)) return o;
    o = o.previousElementSibling;
  }
}
function Kx(e) {
  let n = y.useRef(e);
  return Qr(() => {
    n.current = e;
  }), n;
}
var Qr = typeof window > "u" ? y.useEffect : y.useLayoutEffect;
function Mo(e) {
  let n = y.useRef();
  return n.current === void 0 && (n.current = e()), n;
}
function xr(e) {
  let n = jf(), o = () => e(n.snapshot());
  return y.useSyncExternalStore(n.subscribe, o, o);
}
function Yx(e, n, o, i = []) {
  let a = y.useRef(), l = hs();
  return Qr(() => {
    var c;
    let d = (() => {
      var p;
      for (let g of o) {
        if (typeof g == "string") return g.trim();
        if (typeof g == "object" && "current" in g) return g.current ? (p = g.current.textContent) == null ? void 0 : p.trim() : a.current;
      }
    })(), h = i.map((p) => p.trim());
    l.value(e, d, h), (c = n.current) == null || c.setAttribute(Ao, d), a.current = d;
  }), a;
}
var f2 = () => {
  let [e, n] = y.useState(), o = Mo(() => /* @__PURE__ */ new Map());
  return Qr(() => {
    o.current.forEach((i) => i()), o.current = /* @__PURE__ */ new Map();
  }, [e]), (i, a) => {
    o.current.set(i, a), n({});
  };
};
function h2(e) {
  let n = e.type;
  return typeof n == "function" ? n(e.props) : "render" in n ? n.render(e.props) : e;
}
function Cl({ asChild: e, children: n }, o) {
  return e && y.isValidElement(n) ? y.cloneElement(h2(n), { ref: n.ref }, o(n.props.children)) : o(n);
}
var p2 = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
function m2({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C.jsx(
    Jo,
    {
      "data-slot": "command",
      className: $n(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        e
      ),
      ...n
    }
  );
}
function g2({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C.jsxs(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ C.jsx(Nb, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ C.jsx(
          Jo.Input,
          {
            "data-slot": "command-input",
            className: $n(
              "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              e
            ),
            ...n
          }
        )
      ]
    }
  );
}
function y2({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C.jsx(
    Jo.List,
    {
      "data-slot": "command-list",
      className: $n(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        e
      ),
      ...n
    }
  );
}
function v2({
  ...e
}) {
  return /* @__PURE__ */ C.jsx(
    Jo.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...e
    }
  );
}
function x2({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C.jsx(
    Jo.Group,
    {
      "data-slot": "command-group",
      className: $n(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        e
      ),
      ...n
    }
  );
}
function w2({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C.jsx(
    Jo.Item,
    {
      "data-slot": "command-item",
      className: $n(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...n
    }
  );
}
const S2 = ["top", "right", "bottom", "left"], wr = Math.min, Mt = Math.max, cl = Math.round, za = Math.floor, wn = (e) => ({
  x: e,
  y: e
}), C2 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, b2 = {
  start: "end",
  end: "start"
};
function Dd(e, n, o) {
  return Mt(e, wr(n, o));
}
function zn(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Bn(e) {
  return e.split("-")[0];
}
function ei(e) {
  return e.split("-")[1];
}
function Of(e) {
  return e === "x" ? "y" : "x";
}
function If(e) {
  return e === "y" ? "height" : "width";
}
const E2 = /* @__PURE__ */ new Set(["top", "bottom"]);
function gn(e) {
  return E2.has(Bn(e)) ? "y" : "x";
}
function _f(e) {
  return Of(gn(e));
}
function k2(e, n, o) {
  o === void 0 && (o = !1);
  const i = ei(e), a = _f(e), l = If(a);
  let c = a === "x" ? i === (o ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return n.reference[l] > n.floating[l] && (c = dl(c)), [c, dl(c)];
}
function P2(e) {
  const n = dl(e);
  return [Ad(e), n, Ad(n)];
}
function Ad(e) {
  return e.replace(/start|end/g, (n) => b2[n]);
}
const Ny = ["left", "right"], Dy = ["right", "left"], T2 = ["top", "bottom"], R2 = ["bottom", "top"];
function N2(e, n, o) {
  switch (e) {
    case "top":
    case "bottom":
      return o ? n ? Dy : Ny : n ? Ny : Dy;
    case "left":
    case "right":
      return n ? T2 : R2;
    default:
      return [];
  }
}
function D2(e, n, o, i) {
  const a = ei(e);
  let l = N2(Bn(e), o === "start", i);
  return a && (l = l.map((c) => c + "-" + a), n && (l = l.concat(l.map(Ad)))), l;
}
function dl(e) {
  return e.replace(/left|right|bottom|top/g, (n) => C2[n]);
}
function A2(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Gx(e) {
  return typeof e != "number" ? A2(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function fl(e) {
  const {
    x: n,
    y: o,
    width: i,
    height: a
  } = e;
  return {
    width: i,
    height: a,
    top: o,
    left: n,
    right: n + i,
    bottom: o + a,
    x: n,
    y: o
  };
}
function Ay(e, n, o) {
  let {
    reference: i,
    floating: a
  } = e;
  const l = gn(n), c = _f(n), d = If(c), h = Bn(n), p = l === "y", g = i.x + i.width / 2 - a.width / 2, v = i.y + i.height / 2 - a.height / 2, x = i[d] / 2 - a[d] / 2;
  let S;
  switch (h) {
    case "top":
      S = {
        x: g,
        y: i.y - a.height
      };
      break;
    case "bottom":
      S = {
        x: g,
        y: i.y + i.height
      };
      break;
    case "right":
      S = {
        x: i.x + i.width,
        y: v
      };
      break;
    case "left":
      S = {
        x: i.x - a.width,
        y: v
      };
      break;
    default:
      S = {
        x: i.x,
        y: i.y
      };
  }
  switch (ei(n)) {
    case "start":
      S[c] -= x * (o && p ? -1 : 1);
      break;
    case "end":
      S[c] += x * (o && p ? -1 : 1);
      break;
  }
  return S;
}
const M2 = async (e, n, o) => {
  const {
    placement: i = "bottom",
    strategy: a = "absolute",
    middleware: l = [],
    platform: c
  } = o, d = l.filter(Boolean), h = await (c.isRTL == null ? void 0 : c.isRTL(n));
  let p = await c.getElementRects({
    reference: e,
    floating: n,
    strategy: a
  }), {
    x: g,
    y: v
  } = Ay(p, i, h), x = i, S = {}, E = 0;
  for (let b = 0; b < d.length; b++) {
    const {
      name: k,
      fn: R
    } = d[b], {
      x: T,
      y: A,
      data: F,
      reset: O
    } = await R({
      x: g,
      y: v,
      initialPlacement: i,
      placement: x,
      strategy: a,
      middlewareData: S,
      rects: p,
      platform: c,
      elements: {
        reference: e,
        floating: n
      }
    });
    g = T ?? g, v = A ?? v, S = {
      ...S,
      [k]: {
        ...S[k],
        ...F
      }
    }, O && E <= 50 && (E++, typeof O == "object" && (O.placement && (x = O.placement), O.rects && (p = O.rects === !0 ? await c.getElementRects({
      reference: e,
      floating: n,
      strategy: a
    }) : O.rects), {
      x: g,
      y: v
    } = Ay(p, x, h)), b = -1);
  }
  return {
    x: g,
    y: v,
    placement: x,
    strategy: a,
    middlewareData: S
  };
};
async function os(e, n) {
  var o;
  n === void 0 && (n = {});
  const {
    x: i,
    y: a,
    platform: l,
    rects: c,
    elements: d,
    strategy: h
  } = e, {
    boundary: p = "clippingAncestors",
    rootBoundary: g = "viewport",
    elementContext: v = "floating",
    altBoundary: x = !1,
    padding: S = 0
  } = zn(n, e), E = Gx(S), k = d[x ? v === "floating" ? "reference" : "floating" : v], R = fl(await l.getClippingRect({
    element: (o = await (l.isElement == null ? void 0 : l.isElement(k))) == null || o ? k : k.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(d.floating)),
    boundary: p,
    rootBoundary: g,
    strategy: h
  })), T = v === "floating" ? {
    x: i,
    y: a,
    width: c.floating.width,
    height: c.floating.height
  } : c.reference, A = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(d.floating)), F = await (l.isElement == null ? void 0 : l.isElement(A)) ? await (l.getScale == null ? void 0 : l.getScale(A)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, O = fl(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: d,
    rect: T,
    offsetParent: A,
    strategy: h
  }) : T);
  return {
    top: (R.top - O.top + E.top) / F.y,
    bottom: (O.bottom - R.bottom + E.bottom) / F.y,
    left: (R.left - O.left + E.left) / F.x,
    right: (O.right - R.right + E.right) / F.x
  };
}
const L2 = (e) => ({
  name: "arrow",
  options: e,
  async fn(n) {
    const {
      x: o,
      y: i,
      placement: a,
      rects: l,
      platform: c,
      elements: d,
      middlewareData: h
    } = n, {
      element: p,
      padding: g = 0
    } = zn(e, n) || {};
    if (p == null)
      return {};
    const v = Gx(g), x = {
      x: o,
      y: i
    }, S = _f(a), E = If(S), b = await c.getDimensions(p), k = S === "y", R = k ? "top" : "left", T = k ? "bottom" : "right", A = k ? "clientHeight" : "clientWidth", F = l.reference[E] + l.reference[S] - x[S] - l.floating[E], O = x[S] - l.reference[S], B = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(p));
    let V = B ? B[A] : 0;
    (!V || !await (c.isElement == null ? void 0 : c.isElement(B))) && (V = d.floating[A] || l.floating[E]);
    const z = F / 2 - O / 2, q = V / 2 - b[E] / 2 - 1, ne = wr(v[R], q), se = wr(v[T], q), be = ne, we = V - b[E] - se, xe = V / 2 - b[E] / 2 + z, Ee = Dd(be, xe, we), ge = !h.arrow && ei(a) != null && xe !== Ee && l.reference[E] / 2 - (xe < be ? ne : se) - b[E] / 2 < 0, te = ge ? xe < be ? xe - be : xe - we : 0;
    return {
      [S]: x[S] + te,
      data: {
        [S]: Ee,
        centerOffset: xe - Ee - te,
        ...ge && {
          alignmentOffset: te
        }
      },
      reset: ge
    };
  }
}), j2 = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(n) {
      var o, i;
      const {
        placement: a,
        middlewareData: l,
        rects: c,
        initialPlacement: d,
        platform: h,
        elements: p
      } = n, {
        mainAxis: g = !0,
        crossAxis: v = !0,
        fallbackPlacements: x,
        fallbackStrategy: S = "bestFit",
        fallbackAxisSideDirection: E = "none",
        flipAlignment: b = !0,
        ...k
      } = zn(e, n);
      if ((o = l.arrow) != null && o.alignmentOffset)
        return {};
      const R = Bn(a), T = gn(d), A = Bn(d) === d, F = await (h.isRTL == null ? void 0 : h.isRTL(p.floating)), O = x || (A || !b ? [dl(d)] : P2(d)), B = E !== "none";
      !x && B && O.push(...D2(d, b, E, F));
      const V = [d, ...O], z = await os(n, k), q = [];
      let ne = ((i = l.flip) == null ? void 0 : i.overflows) || [];
      if (g && q.push(z[R]), v) {
        const xe = k2(a, c, F);
        q.push(z[xe[0]], z[xe[1]]);
      }
      if (ne = [...ne, {
        placement: a,
        overflows: q
      }], !q.every((xe) => xe <= 0)) {
        var se, be;
        const xe = (((se = l.flip) == null ? void 0 : se.index) || 0) + 1, Ee = V[xe];
        if (Ee && (!(v === "alignment" ? T !== gn(Ee) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        ne.every((j) => gn(j.placement) === T ? j.overflows[0] > 0 : !0)))
          return {
            data: {
              index: xe,
              overflows: ne
            },
            reset: {
              placement: Ee
            }
          };
        let ge = (be = ne.filter((te) => te.overflows[0] <= 0).sort((te, j) => te.overflows[1] - j.overflows[1])[0]) == null ? void 0 : be.placement;
        if (!ge)
          switch (S) {
            case "bestFit": {
              var we;
              const te = (we = ne.filter((j) => {
                if (B) {
                  const J = gn(j.placement);
                  return J === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  J === "y";
                }
                return !0;
              }).map((j) => [j.placement, j.overflows.filter((J) => J > 0).reduce((J, G) => J + G, 0)]).sort((j, J) => j[1] - J[1])[0]) == null ? void 0 : we[0];
              te && (ge = te);
              break;
            }
            case "initialPlacement":
              ge = d;
              break;
          }
        if (a !== ge)
          return {
            reset: {
              placement: ge
            }
          };
      }
      return {};
    }
  };
};
function My(e, n) {
  return {
    top: e.top - n.height,
    right: e.right - n.width,
    bottom: e.bottom - n.height,
    left: e.left - n.width
  };
}
function Ly(e) {
  return S2.some((n) => e[n] >= 0);
}
const O2 = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(n) {
      const {
        rects: o
      } = n, {
        strategy: i = "referenceHidden",
        ...a
      } = zn(e, n);
      switch (i) {
        case "referenceHidden": {
          const l = await os(n, {
            ...a,
            elementContext: "reference"
          }), c = My(l, o.reference);
          return {
            data: {
              referenceHiddenOffsets: c,
              referenceHidden: Ly(c)
            }
          };
        }
        case "escaped": {
          const l = await os(n, {
            ...a,
            altBoundary: !0
          }), c = My(l, o.floating);
          return {
            data: {
              escapedOffsets: c,
              escaped: Ly(c)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Xx = /* @__PURE__ */ new Set(["left", "top"]);
async function I2(e, n) {
  const {
    placement: o,
    platform: i,
    elements: a
  } = e, l = await (i.isRTL == null ? void 0 : i.isRTL(a.floating)), c = Bn(o), d = ei(o), h = gn(o) === "y", p = Xx.has(c) ? -1 : 1, g = l && h ? -1 : 1, v = zn(n, e);
  let {
    mainAxis: x,
    crossAxis: S,
    alignmentAxis: E
  } = typeof v == "number" ? {
    mainAxis: v,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: v.mainAxis || 0,
    crossAxis: v.crossAxis || 0,
    alignmentAxis: v.alignmentAxis
  };
  return d && typeof E == "number" && (S = d === "end" ? E * -1 : E), h ? {
    x: S * g,
    y: x * p
  } : {
    x: x * p,
    y: S * g
  };
}
const _2 = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(n) {
      var o, i;
      const {
        x: a,
        y: l,
        placement: c,
        middlewareData: d
      } = n, h = await I2(n, e);
      return c === ((o = d.offset) == null ? void 0 : o.placement) && (i = d.arrow) != null && i.alignmentOffset ? {} : {
        x: a + h.x,
        y: l + h.y,
        data: {
          ...h,
          placement: c
        }
      };
    }
  };
}, F2 = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(n) {
      const {
        x: o,
        y: i,
        placement: a
      } = n, {
        mainAxis: l = !0,
        crossAxis: c = !1,
        limiter: d = {
          fn: (k) => {
            let {
              x: R,
              y: T
            } = k;
            return {
              x: R,
              y: T
            };
          }
        },
        ...h
      } = zn(e, n), p = {
        x: o,
        y: i
      }, g = await os(n, h), v = gn(Bn(a)), x = Of(v);
      let S = p[x], E = p[v];
      if (l) {
        const k = x === "y" ? "top" : "left", R = x === "y" ? "bottom" : "right", T = S + g[k], A = S - g[R];
        S = Dd(T, S, A);
      }
      if (c) {
        const k = v === "y" ? "top" : "left", R = v === "y" ? "bottom" : "right", T = E + g[k], A = E - g[R];
        E = Dd(T, E, A);
      }
      const b = d.fn({
        ...n,
        [x]: S,
        [v]: E
      });
      return {
        ...b,
        data: {
          x: b.x - o,
          y: b.y - i,
          enabled: {
            [x]: l,
            [v]: c
          }
        }
      };
    }
  };
}, V2 = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(n) {
      const {
        x: o,
        y: i,
        placement: a,
        rects: l,
        middlewareData: c
      } = n, {
        offset: d = 0,
        mainAxis: h = !0,
        crossAxis: p = !0
      } = zn(e, n), g = {
        x: o,
        y: i
      }, v = gn(a), x = Of(v);
      let S = g[x], E = g[v];
      const b = zn(d, n), k = typeof b == "number" ? {
        mainAxis: b,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...b
      };
      if (h) {
        const A = x === "y" ? "height" : "width", F = l.reference[x] - l.floating[A] + k.mainAxis, O = l.reference[x] + l.reference[A] - k.mainAxis;
        S < F ? S = F : S > O && (S = O);
      }
      if (p) {
        var R, T;
        const A = x === "y" ? "width" : "height", F = Xx.has(Bn(a)), O = l.reference[v] - l.floating[A] + (F && ((R = c.offset) == null ? void 0 : R[v]) || 0) + (F ? 0 : k.crossAxis), B = l.reference[v] + l.reference[A] + (F ? 0 : ((T = c.offset) == null ? void 0 : T[v]) || 0) - (F ? k.crossAxis : 0);
        E < O ? E = O : E > B && (E = B);
      }
      return {
        [x]: S,
        [v]: E
      };
    }
  };
}, $2 = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(n) {
      var o, i;
      const {
        placement: a,
        rects: l,
        platform: c,
        elements: d
      } = n, {
        apply: h = () => {
        },
        ...p
      } = zn(e, n), g = await os(n, p), v = Bn(a), x = ei(a), S = gn(a) === "y", {
        width: E,
        height: b
      } = l.floating;
      let k, R;
      v === "top" || v === "bottom" ? (k = v, R = x === (await (c.isRTL == null ? void 0 : c.isRTL(d.floating)) ? "start" : "end") ? "left" : "right") : (R = v, k = x === "end" ? "top" : "bottom");
      const T = b - g.top - g.bottom, A = E - g.left - g.right, F = wr(b - g[k], T), O = wr(E - g[R], A), B = !n.middlewareData.shift;
      let V = F, z = O;
      if ((o = n.middlewareData.shift) != null && o.enabled.x && (z = A), (i = n.middlewareData.shift) != null && i.enabled.y && (V = T), B && !x) {
        const ne = Mt(g.left, 0), se = Mt(g.right, 0), be = Mt(g.top, 0), we = Mt(g.bottom, 0);
        S ? z = E - 2 * (ne !== 0 || se !== 0 ? ne + se : Mt(g.left, g.right)) : V = b - 2 * (be !== 0 || we !== 0 ? be + we : Mt(g.top, g.bottom));
      }
      await h({
        ...n,
        availableWidth: z,
        availableHeight: V
      });
      const q = await c.getDimensions(d.floating);
      return E !== q.width || b !== q.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function bl() {
  return typeof window < "u";
}
function ti(e) {
  return Qx(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function jt(e) {
  var n;
  return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function En(e) {
  var n;
  return (n = (Qx(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function Qx(e) {
  return bl() ? e instanceof Node || e instanceof jt(e).Node : !1;
}
function on(e) {
  return bl() ? e instanceof Element || e instanceof jt(e).Element : !1;
}
function Cn(e) {
  return bl() ? e instanceof HTMLElement || e instanceof jt(e).HTMLElement : !1;
}
function jy(e) {
  return !bl() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof jt(e).ShadowRoot;
}
const z2 = /* @__PURE__ */ new Set(["inline", "contents"]);
function ps(e) {
  const {
    overflow: n,
    overflowX: o,
    overflowY: i,
    display: a
  } = sn(e);
  return /auto|scroll|overlay|hidden|clip/.test(n + i + o) && !z2.has(a);
}
const B2 = /* @__PURE__ */ new Set(["table", "td", "th"]);
function U2(e) {
  return B2.has(ti(e));
}
const W2 = [":popover-open", ":modal"];
function El(e) {
  return W2.some((n) => {
    try {
      return e.matches(n);
    } catch {
      return !1;
    }
  });
}
const H2 = ["transform", "translate", "scale", "rotate", "perspective"], K2 = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Y2 = ["paint", "layout", "strict", "content"];
function Ff(e) {
  const n = Vf(), o = on(e) ? sn(e) : e;
  return H2.some((i) => o[i] ? o[i] !== "none" : !1) || (o.containerType ? o.containerType !== "normal" : !1) || !n && (o.backdropFilter ? o.backdropFilter !== "none" : !1) || !n && (o.filter ? o.filter !== "none" : !1) || K2.some((i) => (o.willChange || "").includes(i)) || Y2.some((i) => (o.contain || "").includes(i));
}
function G2(e) {
  let n = Sr(e);
  for (; Cn(n) && !Wo(n); ) {
    if (Ff(n))
      return n;
    if (El(n))
      return null;
    n = Sr(n);
  }
  return null;
}
function Vf() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const X2 = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Wo(e) {
  return X2.has(ti(e));
}
function sn(e) {
  return jt(e).getComputedStyle(e);
}
function kl(e) {
  return on(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Sr(e) {
  if (ti(e) === "html")
    return e;
  const n = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    jy(e) && e.host || // Fallback.
    En(e)
  );
  return jy(n) ? n.host : n;
}
function Zx(e) {
  const n = Sr(e);
  return Wo(n) ? e.ownerDocument ? e.ownerDocument.body : e.body : Cn(n) && ps(n) ? n : Zx(n);
}
function is(e, n, o) {
  var i;
  n === void 0 && (n = []), o === void 0 && (o = !0);
  const a = Zx(e), l = a === ((i = e.ownerDocument) == null ? void 0 : i.body), c = jt(a);
  if (l) {
    const d = Md(c);
    return n.concat(c, c.visualViewport || [], ps(a) ? a : [], d && o ? is(d) : []);
  }
  return n.concat(a, is(a, [], o));
}
function Md(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function qx(e) {
  const n = sn(e);
  let o = parseFloat(n.width) || 0, i = parseFloat(n.height) || 0;
  const a = Cn(e), l = a ? e.offsetWidth : o, c = a ? e.offsetHeight : i, d = cl(o) !== l || cl(i) !== c;
  return d && (o = l, i = c), {
    width: o,
    height: i,
    $: d
  };
}
function $f(e) {
  return on(e) ? e : e.contextElement;
}
function $o(e) {
  const n = $f(e);
  if (!Cn(n))
    return wn(1);
  const o = n.getBoundingClientRect(), {
    width: i,
    height: a,
    $: l
  } = qx(n);
  let c = (l ? cl(o.width) : o.width) / i, d = (l ? cl(o.height) : o.height) / a;
  return (!c || !Number.isFinite(c)) && (c = 1), (!d || !Number.isFinite(d)) && (d = 1), {
    x: c,
    y: d
  };
}
const Q2 = /* @__PURE__ */ wn(0);
function Jx(e) {
  const n = jt(e);
  return !Vf() || !n.visualViewport ? Q2 : {
    x: n.visualViewport.offsetLeft,
    y: n.visualViewport.offsetTop
  };
}
function Z2(e, n, o) {
  return n === void 0 && (n = !1), !o || n && o !== jt(e) ? !1 : n;
}
function Zr(e, n, o, i) {
  n === void 0 && (n = !1), o === void 0 && (o = !1);
  const a = e.getBoundingClientRect(), l = $f(e);
  let c = wn(1);
  n && (i ? on(i) && (c = $o(i)) : c = $o(e));
  const d = Z2(l, o, i) ? Jx(l) : wn(0);
  let h = (a.left + d.x) / c.x, p = (a.top + d.y) / c.y, g = a.width / c.x, v = a.height / c.y;
  if (l) {
    const x = jt(l), S = i && on(i) ? jt(i) : i;
    let E = x, b = Md(E);
    for (; b && i && S !== E; ) {
      const k = $o(b), R = b.getBoundingClientRect(), T = sn(b), A = R.left + (b.clientLeft + parseFloat(T.paddingLeft)) * k.x, F = R.top + (b.clientTop + parseFloat(T.paddingTop)) * k.y;
      h *= k.x, p *= k.y, g *= k.x, v *= k.y, h += A, p += F, E = jt(b), b = Md(E);
    }
  }
  return fl({
    width: g,
    height: v,
    x: h,
    y: p
  });
}
function Pl(e, n) {
  const o = kl(e).scrollLeft;
  return n ? n.left + o : Zr(En(e)).left + o;
}
function ew(e, n) {
  const o = e.getBoundingClientRect(), i = o.left + n.scrollLeft - Pl(e, o), a = o.top + n.scrollTop;
  return {
    x: i,
    y: a
  };
}
function q2(e) {
  let {
    elements: n,
    rect: o,
    offsetParent: i,
    strategy: a
  } = e;
  const l = a === "fixed", c = En(i), d = n ? El(n.floating) : !1;
  if (i === c || d && l)
    return o;
  let h = {
    scrollLeft: 0,
    scrollTop: 0
  }, p = wn(1);
  const g = wn(0), v = Cn(i);
  if ((v || !v && !l) && ((ti(i) !== "body" || ps(c)) && (h = kl(i)), Cn(i))) {
    const S = Zr(i);
    p = $o(i), g.x = S.x + i.clientLeft, g.y = S.y + i.clientTop;
  }
  const x = c && !v && !l ? ew(c, h) : wn(0);
  return {
    width: o.width * p.x,
    height: o.height * p.y,
    x: o.x * p.x - h.scrollLeft * p.x + g.x + x.x,
    y: o.y * p.y - h.scrollTop * p.y + g.y + x.y
  };
}
function J2(e) {
  return Array.from(e.getClientRects());
}
function eM(e) {
  const n = En(e), o = kl(e), i = e.ownerDocument.body, a = Mt(n.scrollWidth, n.clientWidth, i.scrollWidth, i.clientWidth), l = Mt(n.scrollHeight, n.clientHeight, i.scrollHeight, i.clientHeight);
  let c = -o.scrollLeft + Pl(e);
  const d = -o.scrollTop;
  return sn(i).direction === "rtl" && (c += Mt(n.clientWidth, i.clientWidth) - a), {
    width: a,
    height: l,
    x: c,
    y: d
  };
}
const Oy = 25;
function tM(e, n) {
  const o = jt(e), i = En(e), a = o.visualViewport;
  let l = i.clientWidth, c = i.clientHeight, d = 0, h = 0;
  if (a) {
    l = a.width, c = a.height;
    const g = Vf();
    (!g || g && n === "fixed") && (d = a.offsetLeft, h = a.offsetTop);
  }
  const p = Pl(i);
  if (p <= 0) {
    const g = i.ownerDocument, v = g.body, x = getComputedStyle(v), S = g.compatMode === "CSS1Compat" && parseFloat(x.marginLeft) + parseFloat(x.marginRight) || 0, E = Math.abs(i.clientWidth - v.clientWidth - S);
    E <= Oy && (l -= E);
  } else p <= Oy && (l += p);
  return {
    width: l,
    height: c,
    x: d,
    y: h
  };
}
const nM = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function rM(e, n) {
  const o = Zr(e, !0, n === "fixed"), i = o.top + e.clientTop, a = o.left + e.clientLeft, l = Cn(e) ? $o(e) : wn(1), c = e.clientWidth * l.x, d = e.clientHeight * l.y, h = a * l.x, p = i * l.y;
  return {
    width: c,
    height: d,
    x: h,
    y: p
  };
}
function Iy(e, n, o) {
  let i;
  if (n === "viewport")
    i = tM(e, o);
  else if (n === "document")
    i = eM(En(e));
  else if (on(n))
    i = rM(n, o);
  else {
    const a = Jx(e);
    i = {
      x: n.x - a.x,
      y: n.y - a.y,
      width: n.width,
      height: n.height
    };
  }
  return fl(i);
}
function tw(e, n) {
  const o = Sr(e);
  return o === n || !on(o) || Wo(o) ? !1 : sn(o).position === "fixed" || tw(o, n);
}
function oM(e, n) {
  const o = n.get(e);
  if (o)
    return o;
  let i = is(e, [], !1).filter((d) => on(d) && ti(d) !== "body"), a = null;
  const l = sn(e).position === "fixed";
  let c = l ? Sr(e) : e;
  for (; on(c) && !Wo(c); ) {
    const d = sn(c), h = Ff(c);
    !h && d.position === "fixed" && (a = null), (l ? !h && !a : !h && d.position === "static" && !!a && nM.has(a.position) || ps(c) && !h && tw(e, c)) ? i = i.filter((g) => g !== c) : a = d, c = Sr(c);
  }
  return n.set(e, i), i;
}
function iM(e) {
  let {
    element: n,
    boundary: o,
    rootBoundary: i,
    strategy: a
  } = e;
  const c = [...o === "clippingAncestors" ? El(n) ? [] : oM(n, this._c) : [].concat(o), i], d = c[0], h = c.reduce((p, g) => {
    const v = Iy(n, g, a);
    return p.top = Mt(v.top, p.top), p.right = wr(v.right, p.right), p.bottom = wr(v.bottom, p.bottom), p.left = Mt(v.left, p.left), p;
  }, Iy(n, d, a));
  return {
    width: h.right - h.left,
    height: h.bottom - h.top,
    x: h.left,
    y: h.top
  };
}
function sM(e) {
  const {
    width: n,
    height: o
  } = qx(e);
  return {
    width: n,
    height: o
  };
}
function aM(e, n, o) {
  const i = Cn(n), a = En(n), l = o === "fixed", c = Zr(e, !0, l, n);
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const h = wn(0);
  function p() {
    h.x = Pl(a);
  }
  if (i || !i && !l)
    if ((ti(n) !== "body" || ps(a)) && (d = kl(n)), i) {
      const S = Zr(n, !0, l, n);
      h.x = S.x + n.clientLeft, h.y = S.y + n.clientTop;
    } else a && p();
  l && !i && a && p();
  const g = a && !i && !l ? ew(a, d) : wn(0), v = c.left + d.scrollLeft - h.x - g.x, x = c.top + d.scrollTop - h.y - g.y;
  return {
    x: v,
    y: x,
    width: c.width,
    height: c.height
  };
}
function Zc(e) {
  return sn(e).position === "static";
}
function _y(e, n) {
  if (!Cn(e) || sn(e).position === "fixed")
    return null;
  if (n)
    return n(e);
  let o = e.offsetParent;
  return En(e) === o && (o = o.ownerDocument.body), o;
}
function nw(e, n) {
  const o = jt(e);
  if (El(e))
    return o;
  if (!Cn(e)) {
    let a = Sr(e);
    for (; a && !Wo(a); ) {
      if (on(a) && !Zc(a))
        return a;
      a = Sr(a);
    }
    return o;
  }
  let i = _y(e, n);
  for (; i && U2(i) && Zc(i); )
    i = _y(i, n);
  return i && Wo(i) && Zc(i) && !Ff(i) ? o : i || G2(e) || o;
}
const lM = async function(e) {
  const n = this.getOffsetParent || nw, o = this.getDimensions, i = await o(e.floating);
  return {
    reference: aM(e.reference, await n(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function uM(e) {
  return sn(e).direction === "rtl";
}
const cM = {
  convertOffsetParentRelativeRectToViewportRelativeRect: q2,
  getDocumentElement: En,
  getClippingRect: iM,
  getOffsetParent: nw,
  getElementRects: lM,
  getClientRects: J2,
  getDimensions: sM,
  getScale: $o,
  isElement: on,
  isRTL: uM
};
function rw(e, n) {
  return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function dM(e, n) {
  let o = null, i;
  const a = En(e);
  function l() {
    var d;
    clearTimeout(i), (d = o) == null || d.disconnect(), o = null;
  }
  function c(d, h) {
    d === void 0 && (d = !1), h === void 0 && (h = 1), l();
    const p = e.getBoundingClientRect(), {
      left: g,
      top: v,
      width: x,
      height: S
    } = p;
    if (d || n(), !x || !S)
      return;
    const E = za(v), b = za(a.clientWidth - (g + x)), k = za(a.clientHeight - (v + S)), R = za(g), A = {
      rootMargin: -E + "px " + -b + "px " + -k + "px " + -R + "px",
      threshold: Mt(0, wr(1, h)) || 1
    };
    let F = !0;
    function O(B) {
      const V = B[0].intersectionRatio;
      if (V !== h) {
        if (!F)
          return c();
        V ? c(!1, V) : i = setTimeout(() => {
          c(!1, 1e-7);
        }, 1e3);
      }
      V === 1 && !rw(p, e.getBoundingClientRect()) && c(), F = !1;
    }
    try {
      o = new IntersectionObserver(O, {
        ...A,
        // Handle <iframe>s
        root: a.ownerDocument
      });
    } catch {
      o = new IntersectionObserver(O, A);
    }
    o.observe(e);
  }
  return c(!0), l;
}
function fM(e, n, o, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: a = !0,
    ancestorResize: l = !0,
    elementResize: c = typeof ResizeObserver == "function",
    layoutShift: d = typeof IntersectionObserver == "function",
    animationFrame: h = !1
  } = i, p = $f(e), g = a || l ? [...p ? is(p) : [], ...is(n)] : [];
  g.forEach((R) => {
    a && R.addEventListener("scroll", o, {
      passive: !0
    }), l && R.addEventListener("resize", o);
  });
  const v = p && d ? dM(p, o) : null;
  let x = -1, S = null;
  c && (S = new ResizeObserver((R) => {
    let [T] = R;
    T && T.target === p && S && (S.unobserve(n), cancelAnimationFrame(x), x = requestAnimationFrame(() => {
      var A;
      (A = S) == null || A.observe(n);
    })), o();
  }), p && !h && S.observe(p), S.observe(n));
  let E, b = h ? Zr(e) : null;
  h && k();
  function k() {
    const R = Zr(e);
    b && !rw(b, R) && o(), b = R, E = requestAnimationFrame(k);
  }
  return o(), () => {
    var R;
    g.forEach((T) => {
      a && T.removeEventListener("scroll", o), l && T.removeEventListener("resize", o);
    }), v?.(), (R = S) == null || R.disconnect(), S = null, h && cancelAnimationFrame(E);
  };
}
const hM = _2, pM = F2, mM = j2, gM = $2, yM = O2, Fy = L2, vM = V2, xM = (e, n, o) => {
  const i = /* @__PURE__ */ new Map(), a = {
    platform: cM,
    ...o
  }, l = {
    ...a.platform,
    _c: i
  };
  return M2(e, n, {
    ...a,
    platform: l
  });
};
var wM = typeof document < "u", SM = function() {
}, Za = wM ? y.useLayoutEffect : SM;
function hl(e, n) {
  if (e === n)
    return !0;
  if (typeof e != typeof n)
    return !1;
  if (typeof e == "function" && e.toString() === n.toString())
    return !0;
  let o, i, a;
  if (e && n && typeof e == "object") {
    if (Array.isArray(e)) {
      if (o = e.length, o !== n.length) return !1;
      for (i = o; i-- !== 0; )
        if (!hl(e[i], n[i]))
          return !1;
      return !0;
    }
    if (a = Object.keys(e), o = a.length, o !== Object.keys(n).length)
      return !1;
    for (i = o; i-- !== 0; )
      if (!{}.hasOwnProperty.call(n, a[i]))
        return !1;
    for (i = o; i-- !== 0; ) {
      const l = a[i];
      if (!(l === "_owner" && e.$$typeof) && !hl(e[l], n[l]))
        return !1;
    }
    return !0;
  }
  return e !== e && n !== n;
}
function ow(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Vy(e, n) {
  const o = ow(e);
  return Math.round(n * o) / o;
}
function qc(e) {
  const n = y.useRef(e);
  return Za(() => {
    n.current = e;
  }), n;
}
function CM(e) {
  e === void 0 && (e = {});
  const {
    placement: n = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: a,
    elements: {
      reference: l,
      floating: c
    } = {},
    transform: d = !0,
    whileElementsMounted: h,
    open: p
  } = e, [g, v] = y.useState({
    x: 0,
    y: 0,
    strategy: o,
    placement: n,
    middlewareData: {},
    isPositioned: !1
  }), [x, S] = y.useState(i);
  hl(x, i) || S(i);
  const [E, b] = y.useState(null), [k, R] = y.useState(null), T = y.useCallback((j) => {
    j !== B.current && (B.current = j, b(j));
  }, []), A = y.useCallback((j) => {
    j !== V.current && (V.current = j, R(j));
  }, []), F = l || E, O = c || k, B = y.useRef(null), V = y.useRef(null), z = y.useRef(g), q = h != null, ne = qc(h), se = qc(a), be = qc(p), we = y.useCallback(() => {
    if (!B.current || !V.current)
      return;
    const j = {
      placement: n,
      strategy: o,
      middleware: x
    };
    se.current && (j.platform = se.current), xM(B.current, V.current, j).then((J) => {
      const G = {
        ...J,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: be.current !== !1
      };
      xe.current && !hl(z.current, G) && (z.current = G, zd.flushSync(() => {
        v(G);
      }));
    });
  }, [x, n, o, se, be]);
  Za(() => {
    p === !1 && z.current.isPositioned && (z.current.isPositioned = !1, v((j) => ({
      ...j,
      isPositioned: !1
    })));
  }, [p]);
  const xe = y.useRef(!1);
  Za(() => (xe.current = !0, () => {
    xe.current = !1;
  }), []), Za(() => {
    if (F && (B.current = F), O && (V.current = O), F && O) {
      if (ne.current)
        return ne.current(F, O, we);
      we();
    }
  }, [F, O, we, ne, q]);
  const Ee = y.useMemo(() => ({
    reference: B,
    floating: V,
    setReference: T,
    setFloating: A
  }), [T, A]), ge = y.useMemo(() => ({
    reference: F,
    floating: O
  }), [F, O]), te = y.useMemo(() => {
    const j = {
      position: o,
      left: 0,
      top: 0
    };
    if (!ge.floating)
      return j;
    const J = Vy(ge.floating, g.x), G = Vy(ge.floating, g.y);
    return d ? {
      ...j,
      transform: "translate(" + J + "px, " + G + "px)",
      ...ow(ge.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: o,
      left: J,
      top: G
    };
  }, [o, d, ge.floating, g.x, g.y]);
  return y.useMemo(() => ({
    ...g,
    update: we,
    refs: Ee,
    elements: ge,
    floatingStyles: te
  }), [g, we, Ee, ge, te]);
}
const bM = (e) => {
  function n(o) {
    return {}.hasOwnProperty.call(o, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(o) {
      const {
        element: i,
        padding: a
      } = typeof e == "function" ? e(o) : e;
      return i && n(i) ? i.current != null ? Fy({
        element: i.current,
        padding: a
      }).fn(o) : {} : i ? Fy({
        element: i,
        padding: a
      }).fn(o) : {};
    }
  };
}, EM = (e, n) => ({
  ...hM(e),
  options: [e, n]
}), kM = (e, n) => ({
  ...pM(e),
  options: [e, n]
}), PM = (e, n) => ({
  ...vM(e),
  options: [e, n]
}), TM = (e, n) => ({
  ...mM(e),
  options: [e, n]
}), RM = (e, n) => ({
  ...gM(e),
  options: [e, n]
}), NM = (e, n) => ({
  ...yM(e),
  options: [e, n]
}), DM = (e, n) => ({
  ...bM(e),
  options: [e, n]
});
var AM = "Arrow", iw = y.forwardRef((e, n) => {
  const { children: o, width: i = 10, height: a = 5, ...l } = e;
  return /* @__PURE__ */ C.jsx(
    We.svg,
    {
      ...l,
      ref: n,
      width: i,
      height: a,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? o : /* @__PURE__ */ C.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
iw.displayName = AM;
var MM = iw;
function LM(e) {
  const [n, o] = y.useState(void 0);
  return vr(() => {
    if (e) {
      o({ width: e.offsetWidth, height: e.offsetHeight });
      const i = new ResizeObserver((a) => {
        if (!Array.isArray(a) || !a.length)
          return;
        const l = a[0];
        let c, d;
        if ("borderBoxSize" in l) {
          const h = l.borderBoxSize, p = Array.isArray(h) ? h[0] : h;
          c = p.inlineSize, d = p.blockSize;
        } else
          c = e.offsetWidth, d = e.offsetHeight;
        o({ width: c, height: d });
      });
      return i.observe(e, { box: "border-box" }), () => i.unobserve(e);
    } else
      o(void 0);
  }, [e]), n;
}
var zf = "Popper", [sw, aw] = Pf(zf), [jM, lw] = sw(zf), uw = (e) => {
  const { __scopePopper: n, children: o } = e, [i, a] = y.useState(null);
  return /* @__PURE__ */ C.jsx(jM, { scope: n, anchor: i, onAnchorChange: a, children: o });
};
uw.displayName = zf;
var cw = "PopperAnchor", dw = y.forwardRef(
  (e, n) => {
    const { __scopePopper: o, virtualRef: i, ...a } = e, l = lw(cw, o), c = y.useRef(null), d = ln(n, c), h = y.useRef(null);
    return y.useEffect(() => {
      const p = h.current;
      h.current = i?.current || c.current, p !== h.current && l.onAnchorChange(h.current);
    }), i ? null : /* @__PURE__ */ C.jsx(We.div, { ...a, ref: d });
  }
);
dw.displayName = cw;
var Bf = "PopperContent", [OM, IM] = sw(Bf), fw = y.forwardRef(
  (e, n) => {
    const {
      __scopePopper: o,
      side: i = "bottom",
      sideOffset: a = 0,
      align: l = "center",
      alignOffset: c = 0,
      arrowPadding: d = 0,
      avoidCollisions: h = !0,
      collisionBoundary: p = [],
      collisionPadding: g = 0,
      sticky: v = "partial",
      hideWhenDetached: x = !1,
      updatePositionStrategy: S = "optimized",
      onPlaced: E,
      ...b
    } = e, k = lw(Bf, o), [R, T] = y.useState(null), A = ln(n, (ee) => T(ee)), [F, O] = y.useState(null), B = LM(F), V = B?.width ?? 0, z = B?.height ?? 0, q = i + (l !== "center" ? "-" + l : ""), ne = typeof g == "number" ? g : { top: 0, right: 0, bottom: 0, left: 0, ...g }, se = Array.isArray(p) ? p : [p], be = se.length > 0, we = {
      padding: ne,
      boundary: se.filter(FM),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: be
    }, { refs: xe, floatingStyles: Ee, placement: ge, isPositioned: te, middlewareData: j } = CM({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: q,
      whileElementsMounted: (...ee) => fM(...ee, {
        animationFrame: S === "always"
      }),
      elements: {
        reference: k.anchor
      },
      middleware: [
        EM({ mainAxis: a + z, alignmentAxis: c }),
        h && kM({
          mainAxis: !0,
          crossAxis: !1,
          limiter: v === "partial" ? PM() : void 0,
          ...we
        }),
        h && TM({ ...we }),
        RM({
          ...we,
          apply: ({ elements: ee, rects: he, availableWidth: ye, availableHeight: De }) => {
            const { width: ve, height: Je } = he.reference, Yt = ee.floating.style;
            Yt.setProperty("--radix-popper-available-width", `${ye}px`), Yt.setProperty("--radix-popper-available-height", `${De}px`), Yt.setProperty("--radix-popper-anchor-width", `${ve}px`), Yt.setProperty("--radix-popper-anchor-height", `${Je}px`);
          }
        }),
        F && DM({ element: F, padding: d }),
        VM({ arrowWidth: V, arrowHeight: z }),
        x && NM({ strategy: "referenceHidden", ...we })
      ]
    }), [J, G] = mw(ge), L = Uo(E);
    vr(() => {
      te && L?.();
    }, [te, L]);
    const D = j.arrow?.x, U = j.arrow?.y, X = j.arrow?.centerOffset !== 0, [W, oe] = y.useState();
    return vr(() => {
      R && oe(window.getComputedStyle(R).zIndex);
    }, [R]), /* @__PURE__ */ C.jsx(
      "div",
      {
        ref: xe.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Ee,
          transform: te ? Ee.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: W,
          "--radix-popper-transform-origin": [
            j.transformOrigin?.x,
            j.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...j.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ C.jsx(
          OM,
          {
            scope: o,
            placedSide: J,
            onArrowChange: O,
            arrowX: D,
            arrowY: U,
            shouldHideArrow: X,
            children: /* @__PURE__ */ C.jsx(
              We.div,
              {
                "data-side": J,
                "data-align": G,
                ...b,
                ref: A,
                style: {
                  ...b.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: te ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
fw.displayName = Bf;
var hw = "PopperArrow", _M = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, pw = y.forwardRef(function(n, o) {
  const { __scopePopper: i, ...a } = n, l = IM(hw, i), c = _M[l.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ C.jsx(
      "span",
      {
        ref: l.onArrowChange,
        style: {
          position: "absolute",
          left: l.arrowX,
          top: l.arrowY,
          [c]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[l.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[l.placedSide],
          visibility: l.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ C.jsx(
          MM,
          {
            ...a,
            ref: o,
            style: {
              ...a.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
pw.displayName = hw;
function FM(e) {
  return e !== null;
}
var VM = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(n) {
    const { placement: o, rects: i, middlewareData: a } = n, c = a.arrow?.centerOffset !== 0, d = c ? 0 : e.arrowWidth, h = c ? 0 : e.arrowHeight, [p, g] = mw(o), v = { start: "0%", center: "50%", end: "100%" }[g], x = (a.arrow?.x ?? 0) + d / 2, S = (a.arrow?.y ?? 0) + h / 2;
    let E = "", b = "";
    return p === "bottom" ? (E = c ? v : `${x}px`, b = `${-h}px`) : p === "top" ? (E = c ? v : `${x}px`, b = `${i.floating.height + h}px`) : p === "right" ? (E = `${-h}px`, b = c ? v : `${S}px`) : p === "left" && (E = `${i.floating.width + h}px`, b = c ? v : `${S}px`), { data: { x: E, y: b } };
  }
});
function mw(e) {
  const [n, o = "center"] = e.split("-");
  return [n, o];
}
var $M = uw, gw = dw, zM = fw, BM = pw;
// @__NO_SIDE_EFFECTS__
function UM(e) {
  const n = /* @__PURE__ */ WM(e), o = y.forwardRef((i, a) => {
    const { children: l, ...c } = i, d = y.Children.toArray(l), h = d.find(KM);
    if (h) {
      const p = h.props.children, g = d.map((v) => v === h ? y.Children.count(p) > 1 ? y.Children.only(null) : y.isValidElement(p) ? p.props.children : null : v);
      return /* @__PURE__ */ C.jsx(n, { ...c, ref: a, children: y.isValidElement(p) ? y.cloneElement(p, void 0, g) : null });
    }
    return /* @__PURE__ */ C.jsx(n, { ...c, ref: a, children: l });
  });
  return o.displayName = `${e}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function WM(e) {
  const n = y.forwardRef((o, i) => {
    const { children: a, ...l } = o;
    if (y.isValidElement(a)) {
      const c = GM(a), d = YM(l, a.props);
      return a.type !== y.Fragment && (d.ref = i ? Sn(i, c) : c), y.cloneElement(a, d);
    }
    return y.Children.count(a) > 1 ? y.Children.only(null) : null;
  });
  return n.displayName = `${e}.SlotClone`, n;
}
var HM = Symbol("radix.slottable");
function KM(e) {
  return y.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === HM;
}
function YM(e, n) {
  const o = { ...n };
  for (const i in n) {
    const a = e[i], l = n[i];
    /^on[A-Z]/.test(i) ? a && l ? o[i] = (...d) => {
      const h = l(...d);
      return a(...d), h;
    } : a && (o[i] = a) : i === "style" ? o[i] = { ...a, ...l } : i === "className" && (o[i] = [a, l].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function GM(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning;
  return o ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var Tl = "Popover", [yw] = Pf(Tl, [
  aw
]), ms = aw(), [XM, br] = yw(Tl), vw = (e) => {
  const {
    __scopePopover: n,
    children: o,
    open: i,
    defaultOpen: a,
    onOpenChange: l,
    modal: c = !1
  } = e, d = ms(n), h = y.useRef(null), [p, g] = y.useState(!1), [v, x] = mx({
    prop: i,
    defaultProp: a ?? !1,
    onChange: l,
    caller: Tl
  });
  return /* @__PURE__ */ C.jsx($M, { ...d, children: /* @__PURE__ */ C.jsx(
    XM,
    {
      scope: n,
      contentId: xn(),
      triggerRef: h,
      open: v,
      onOpenChange: x,
      onOpenToggle: y.useCallback(() => x((S) => !S), [x]),
      hasCustomAnchor: p,
      onCustomAnchorAdd: y.useCallback(() => g(!0), []),
      onCustomAnchorRemove: y.useCallback(() => g(!1), []),
      modal: c,
      children: o
    }
  ) });
};
vw.displayName = Tl;
var xw = "PopoverAnchor", QM = y.forwardRef(
  (e, n) => {
    const { __scopePopover: o, ...i } = e, a = br(xw, o), l = ms(o), { onCustomAnchorAdd: c, onCustomAnchorRemove: d } = a;
    return y.useEffect(() => (c(), () => d()), [c, d]), /* @__PURE__ */ C.jsx(gw, { ...l, ...i, ref: n });
  }
);
QM.displayName = xw;
var ww = "PopoverTrigger", Sw = y.forwardRef(
  (e, n) => {
    const { __scopePopover: o, ...i } = e, a = br(ww, o), l = ms(o), c = ln(n, a.triggerRef), d = /* @__PURE__ */ C.jsx(
      We.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a.open,
        "aria-controls": a.contentId,
        "data-state": Pw(a.open),
        ...i,
        ref: c,
        onClick: Lt(e.onClick, a.onOpenToggle)
      }
    );
    return a.hasCustomAnchor ? d : /* @__PURE__ */ C.jsx(gw, { asChild: !0, ...l, children: d });
  }
);
Sw.displayName = ww;
var Uf = "PopoverPortal", [ZM, qM] = yw(Uf, {
  forceMount: void 0
}), Cw = (e) => {
  const { __scopePopover: n, forceMount: o, children: i, container: a } = e, l = br(Uf, n);
  return /* @__PURE__ */ C.jsx(ZM, { scope: n, forceMount: o, children: /* @__PURE__ */ C.jsx(qo, { present: o || l.open, children: /* @__PURE__ */ C.jsx(Nf, { asChild: !0, container: a, children: i }) }) });
};
Cw.displayName = Uf;
var Ho = "PopoverContent", bw = y.forwardRef(
  (e, n) => {
    const o = qM(Ho, e.__scopePopover), { forceMount: i = o.forceMount, ...a } = e, l = br(Ho, e.__scopePopover);
    return /* @__PURE__ */ C.jsx(qo, { present: i || l.open, children: l.modal ? /* @__PURE__ */ C.jsx(eL, { ...a, ref: n }) : /* @__PURE__ */ C.jsx(tL, { ...a, ref: n }) });
  }
);
bw.displayName = Ho;
var JM = /* @__PURE__ */ UM("PopoverContent.RemoveScroll"), eL = y.forwardRef(
  (e, n) => {
    const o = br(Ho, e.__scopePopover), i = y.useRef(null), a = ln(n, i), l = y.useRef(!1);
    return y.useEffect(() => {
      const c = i.current;
      if (c) return Rx(c);
    }, []), /* @__PURE__ */ C.jsx(Df, { as: JM, allowPinchZoom: !0, children: /* @__PURE__ */ C.jsx(
      Ew,
      {
        ...e,
        ref: a,
        trapFocus: o.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Lt(e.onCloseAutoFocus, (c) => {
          c.preventDefault(), l.current || o.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Lt(
          e.onPointerDownOutside,
          (c) => {
            const d = c.detail.originalEvent, h = d.button === 0 && d.ctrlKey === !0, p = d.button === 2 || h;
            l.current = p;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: Lt(
          e.onFocusOutside,
          (c) => c.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), tL = y.forwardRef(
  (e, n) => {
    const o = br(Ho, e.__scopePopover), i = y.useRef(!1), a = y.useRef(!1);
    return /* @__PURE__ */ C.jsx(
      Ew,
      {
        ...e,
        ref: n,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (l) => {
          e.onCloseAutoFocus?.(l), l.defaultPrevented || (i.current || o.triggerRef.current?.focus(), l.preventDefault()), i.current = !1, a.current = !1;
        },
        onInteractOutside: (l) => {
          e.onInteractOutside?.(l), l.defaultPrevented || (i.current = !0, l.detail.originalEvent.type === "pointerdown" && (a.current = !0));
          const c = l.target;
          o.triggerRef.current?.contains(c) && l.preventDefault(), l.detail.originalEvent.type === "focusin" && a.current && l.preventDefault();
        }
      }
    );
  }
), Ew = y.forwardRef(
  (e, n) => {
    const {
      __scopePopover: o,
      trapFocus: i,
      onOpenAutoFocus: a,
      onCloseAutoFocus: l,
      disableOutsidePointerEvents: c,
      onEscapeKeyDown: d,
      onPointerDownOutside: h,
      onFocusOutside: p,
      onInteractOutside: g,
      ...v
    } = e, x = br(Ho, o), S = ms(o);
    return xx(), /* @__PURE__ */ C.jsx(
      Rf,
      {
        asChild: !0,
        loop: !0,
        trapped: i,
        onMountAutoFocus: a,
        onUnmountAutoFocus: l,
        children: /* @__PURE__ */ C.jsx(
          Tf,
          {
            asChild: !0,
            disableOutsidePointerEvents: c,
            onInteractOutside: g,
            onEscapeKeyDown: d,
            onPointerDownOutside: h,
            onFocusOutside: p,
            onDismiss: () => x.onOpenChange(!1),
            children: /* @__PURE__ */ C.jsx(
              zM,
              {
                "data-state": Pw(x.open),
                role: "dialog",
                id: x.contentId,
                ...S,
                ...v,
                ref: n,
                style: {
                  ...v.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), kw = "PopoverClose", nL = y.forwardRef(
  (e, n) => {
    const { __scopePopover: o, ...i } = e, a = br(kw, o);
    return /* @__PURE__ */ C.jsx(
      We.button,
      {
        type: "button",
        ...i,
        ref: n,
        onClick: Lt(e.onClick, () => a.onOpenChange(!1))
      }
    );
  }
);
nL.displayName = kw;
var rL = "PopoverArrow", oL = y.forwardRef(
  (e, n) => {
    const { __scopePopover: o, ...i } = e, a = ms(o);
    return /* @__PURE__ */ C.jsx(BM, { ...a, ...i, ref: n });
  }
);
oL.displayName = rL;
function Pw(e) {
  return e ? "open" : "closed";
}
var iL = vw, sL = Sw, aL = Cw, lL = bw;
function uL({
  ...e
}) {
  return /* @__PURE__ */ C.jsx(iL, { "data-slot": "popover", ...e });
}
function cL({
  ...e
}) {
  return /* @__PURE__ */ C.jsx(sL, { "data-slot": "popover-trigger", ...e });
}
function dL({
  className: e,
  align: n = "center",
  sideOffset: o = 4,
  ...i
}) {
  return /* @__PURE__ */ C.jsx(aL, { children: /* @__PURE__ */ C.jsx(
    lL,
    {
      "data-slot": "popover-content",
      align: n,
      sideOffset: o,
      className: $n(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        e
      ),
      ...i
    }
  ) });
}
function fL({ value: e, onChange: n, className: o }) {
  const [i, a] = y.useState(!1);
  return /* @__PURE__ */ C.jsxs(uL, { open: i, onOpenChange: a, modal: !0, children: [
    /* @__PURE__ */ C.jsx(cL, { asChild: !0, children: /* @__PURE__ */ C.jsxs(
      hx,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": i,
        className: $n("w-full justify-between font-normal", !e && "text-muted-foreground", o),
        children: [
          e ? Fc.find((l) => l.value === e)?.label + ` (${Fc.find((l) => l.value === e)?.offset})` : "Select timezone...",
          /* @__PURE__ */ C.jsx(gb, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ C.jsx(dL, { className: "w-[400px] p-0", side: "bottom", align: "start", children: /* @__PURE__ */ C.jsxs(m2, { children: [
      /* @__PURE__ */ C.jsx(g2, { placeholder: "Search timezone..." }),
      /* @__PURE__ */ C.jsxs(y2, { children: [
        /* @__PURE__ */ C.jsx(v2, { children: "No timezone found." }),
        /* @__PURE__ */ C.jsx(x2, { children: Fc.map((l) => /* @__PURE__ */ C.jsxs(
          w2,
          {
            value: `${l.label} ${l.keywords}`,
            onSelect: () => {
              n(l.value), a(!1);
            },
            children: [
              /* @__PURE__ */ C.jsx(
                td,
                {
                  className: $n(
                    "mr-2 h-4 w-4",
                    e === l.value ? "opacity-100" : "opacity-0"
                  )
                }
              ),
              l.label,
              " (",
              l.offset,
              ")"
            ]
          },
          l.value
        )) })
      ] })
    ] }) })
  ] });
}
const $y = window.__BOOKING_WIDGET_API_URL__ || "http://localhost:5289";
function hL() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}
const zy = [
  {
    label: "In Person",
    value: "InPerson",
    icon: Bd,
    description: "Meet at our office",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    label: "Phone Call",
    value: "Phone",
    icon: Tb,
    description: "Call on your phone",
    gradient: "from-emerald-500 to-emerald-600"
  },
  {
    label: "Zoom",
    value: "Zoom",
    icon: Ob,
    description: "Video conference",
    gradient: "from-indigo-500 to-indigo-600"
  }
], By = [
  { name: "Credit Card", icon: "💳", description: "Visa, Mastercard" },
  { name: "Debit Card", icon: "💳", description: "Bank debit" },
  { name: "PayPal", icon: "🔵", description: "PayPal account" },
  { name: "Bank Transfer", icon: "🏦", description: "Direct transfer" }
], Jc = [
  { number: 1, name: "Service", icon: dv },
  { number: 2, name: "Location", icon: Bd },
  { number: 3, name: "Schedule", icon: ub },
  { number: 4, name: "Details", icon: Ab },
  { number: 5, name: "Payment", icon: Wa }
], Uy = ({
  id: e,
  options: n,
  value: o,
  onChange: i,
  isLoading: a = !1,
  placeholder: l = "Select an option...",
  disabled: c = !1,
  error: d = null
}) => {
  const [h, p] = y.useState(!1), [g, v] = y.useState(""), x = y.useRef(null), S = y.useRef(null), E = n.find((k) => k.value === o), b = n.filter(
    (k) => !g || k.label.toLowerCase().includes(g.toLowerCase()) || k.subLabel && k.subLabel.toLowerCase().includes(g.toLowerCase())
  );
  return y.useEffect(() => {
    const k = (R) => {
      x.current && !x.current.contains(R.target) && (p(!1), v(""));
    };
    return document.addEventListener("mousedown", k), () => document.removeEventListener("mousedown", k);
  }, []), y.useEffect(() => {
    if (!h) return;
    const k = (R) => {
      if (R.key === "Escape") {
        v(""), p(!1);
        return;
      }
      if (R.key === "Backspace") {
        v((T) => T.slice(0, -1));
        return;
      }
      R.key.length === 1 && /^[\w\s]$/i.test(R.key) && (R.key === " " && R.preventDefault(), v((T) => T + R.key), S.current && clearTimeout(S.current), S.current = setTimeout(() => {
        v("");
      }, 2e3));
    };
    return window.addEventListener("keydown", k), () => {
      window.removeEventListener("keydown", k), S.current && clearTimeout(S.current);
    };
  }, [h]), /* @__PURE__ */ C.jsxs("div", { className: "relative", ref: x, children: [
    /* @__PURE__ */ C.jsxs(
      "button",
      {
        id: e,
        type: "button",
        onClick: () => !c && p(!h),
        disabled: c,
        className: `w-full px-4 py-3 border-2 rounded-lg text-left flex items-center justify-between transition-all duration-200 bg-white ${c ? "bg-slate-100 cursor-not-allowed border-slate-200 text-slate-400" : d ? "border-rose-300 hover:border-rose-400" : h ? "border-indigo-500 ring-4 ring-indigo-500/10" : "border-slate-300 hover:border-slate-400"}`,
        children: [
          /* @__PURE__ */ C.jsx("span", { className: `block truncate ${E?.label ? "text-slate-900" : "text-slate-500"}`, children: a ? "Loading..." : E?.label || l }),
          /* @__PURE__ */ C.jsx(fb, { className: `w-5 h-5 text-slate-400 transition-transform duration-200 ${h ? "rotate-180" : ""}` })
        ]
      }
    ),
    h && !c && !a && /* @__PURE__ */ C.jsx("div", { className: "absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-[500px] overflow-y-auto custom-scrollbar", children: n.length === 0 ? /* @__PURE__ */ C.jsx("div", { className: "px-4 py-3 text-sm text-slate-500 italic", children: "No options available" }) : b.length === 0 ? /* @__PURE__ */ C.jsxs("div", { className: "px-4 py-3 text-sm text-slate-500 italic", children: [
      'No matches for "',
      g,
      '"'
    ] }) : /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
      /* @__PURE__ */ C.jsxs("ul", { className: "py-1 group/list", children: [
        g && /* @__PURE__ */ C.jsxs("li", { className: "px-4 py-1 text-xs text-indigo-500 font-medium bg-indigo-50 border-b border-indigo-100", children: [
          'Filtering: "',
          g,
          '"'
        ] }),
        b.map((k) => /* @__PURE__ */ C.jsx("li", { children: /* @__PURE__ */ C.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              i(k.value), p(!1), v("");
            },
            className: `
                        w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 group/item
                        ${k.value === o ? "bg-indigo-600 text-white group-hover/list:bg-white group-hover/list:text-slate-700 hover:!bg-indigo-600 hover:!text-white" : "text-slate-700 hover:bg-indigo-600 hover:text-white"}
                      `,
            children: [
              /* @__PURE__ */ C.jsx("span", { className: "font-medium block", children: k.label }),
              k.subLabel && /* @__PURE__ */ C.jsx("span", { className: `text-xs block mt-0.5 ${k.value === o ? "text-indigo-200 group-hover/list:text-slate-500 hover:!text-indigo-200" : "text-slate-500 group-hover/item:text-indigo-200"}`, children: k.subLabel })
            ]
          }
        ) }, k.value))
      ] }),
      /* @__PURE__ */ C.jsxs("div", { className: "px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 sticky bottom-0", children: [
        "Showing ",
        b.length,
        " option",
        b.length !== 1 ? "s" : ""
      ] })
    ] }) }),
    d && /* @__PURE__ */ C.jsx("p", { className: "text-rose-600 text-sm mt-2 font-medium animate-fadeIn", children: d })
  ] });
};
function pL({ onComplete: e }) {
  const [n, o] = y.useState(1), [i, a] = y.useState(null), [l, c] = y.useState(null), [d, h] = y.useState([]), [p, g] = y.useState(!0), [v, x] = y.useState(null), [S, E] = y.useState(null), [b, k] = y.useState([]), [R, T] = y.useState(!1), [A, F] = y.useState(null), [O, B] = y.useState(null), [V, z] = y.useState(""), [q, ne] = y.useState("InPerson"), [se, be] = y.useState(null), [we, xe] = y.useState(""), [Ee, ge] = y.useState(""), [te, j] = y.useState(""), [J, G] = y.useState(""), [L, D] = y.useState(""), [U, X] = y.useState(""), [W, oe] = y.useState("now"), [ee, he] = y.useState(!1), [ye, De] = y.useState(null), [ve, Je] = y.useState({}), [Yt, eo] = y.useState([]), [gs, to] = y.useState([]), [ni, ri] = y.useState(!1), [Tt, Er] = y.useState(hL()), [Un, oi] = y.useState(zy), [ys, vs] = y.useState(By), [Rl, xs] = y.useState(!0), [ii, no] = y.useState(!0), si = () => {
    const Q = {};
    switch (n) {
      case 4:
        Ee.trim() ? Ee.trim().length < 3 && (Q.firstName = "Must be at least 3 characters") : Q.firstName = "First name is required", te.trim() ? te.trim().length < 3 && (Q.lastName = "Must be at least 3 characters") : Q.lastName = "Last name is required", L.trim() ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(L) || (Q.email = "Please enter a valid email") : Q.email = "Email is required", J.trim() ? /^[\d\s\-()+]{7,20}$/.test(J.trim()) || (Q.phone = "Please enter a valid phone number") : Q.phone = "Phone number is required";
        break;
      case 2:
        q || (Q.meetingType = "Please select a meeting location"), V && V.length > 500 && (Q.description = "Description cannot exceed 500 characters");
        break;
    }
    return Je(Q), Object.keys(Q).length === 0;
  }, { slug: kn } = lC();
  y.useEffect(() => {
    (async () => {
      try {
        g(!0), x(null);
        let fe = null;
        if (kn) {
          const Le = await rN(kn);
          c(Le.id), fe = Le.id, Le.logoUrl && a(`${$y}${Le.logoUrl}`);
        } else {
          const pt = new URLSearchParams(window.location.search).get("companyId");
          if (pt) {
            fe = parseInt(pt, 10), c(fe);
            const xt = await nN(fe);
            xt.logoUrl && a(`${$y}${xt.logoUrl}`);
          }
        }
        if (!fe) {
          x("No company specified. Please use a valid booking link.");
          return;
        }
        const Me = await bR(fe, void 0, 1, 100);
        h(Me.items);
      } catch (fe) {
        console.error("Error loading services:", fe), x("Failed to load services. Please refresh the page.");
      } finally {
        g(!1);
      }
    })();
  }, [kn]), y.useEffect(() => {
    (async () => {
      try {
        if (l) {
          try {
            const Le = await wR(), pt = By.filter(
              (xt) => Le.enabledPaymentMethods.includes(xt.name)
            );
            vs(pt), xs(Le.showPayNow), no(Le.showPayLater);
          } catch {
            console.log("Using default payment settings");
          }
          const fe = await SR(l), Me = zy.filter(
            (Le) => fe.enabledMeetingLocations.includes(Le.value)
          );
          oi(Me);
        }
      } catch (fe) {
        console.error("Error loading settings:", fe);
      }
    })();
  }, [l]), y.useEffect(() => {
    (async () => {
      if (!S) {
        k([]), B(null);
        return;
      }
      try {
        T(!0), F(null);
        const fe = await kR(S);
        k(fe), B(-1);
      } catch (fe) {
        console.error("Error loading staff:", fe), F("Failed to load staff members."), k([]), B(null);
      } finally {
        T(!1);
      }
    })();
  }, [S]), y.useEffect(() => {
    (async () => {
      if (!O || O === -1) {
        eo([]);
        return;
      }
      try {
        const fe = await tN(O), Me = [];
        fe.forEach((Le) => {
          const pt = new Date(Le.startDateTimeUtc), xt = new Date(Le.endDateTimeUtc);
          let It = new Date(pt);
          for (; It <= xt; )
            Me.push(new Date(It)), It = new Date(It.getFullYear(), It.getMonth(), It.getDate() + 1);
        }), eo(Me);
      } catch (fe) {
        console.error("Error loading time offs:", fe);
      }
    })();
  }, [O]), y.useEffect(() => {
    (async () => {
      if (!se || !S || O === null) {
        to([]);
        return;
      }
      try {
        ri(!0);
        const fe = (it) => {
          const Yn = it.getFullYear(), ui = String(it.getMonth() + 1).padStart(2, "0"), Dl = String(it.getDate()).padStart(2, "0");
          return `${Yn}-${ui}-${Dl}`;
        }, Me = fe(se), Le = new Date(se);
        Le.setDate(se.getDate() - 1);
        const pt = fe(Le), xt = new Date(se);
        xt.setDate(se.getDate() + 1);
        const It = fe(xt), Kn = async (it) => {
          try {
            return O === -1 ? await eN(S, it) : await JR(O, S, it);
          } catch {
            return [];
          }
        }, [Gt, ro, Pn] = await Promise.all([
          Kn(pt),
          Kn(Me),
          Kn(It)
        ]), Pr = [...Gt, ...ro, ...Pn], ot = Me, Nl = Pr.filter((it) => it.isAvailable).filter((it) => new Date(it.startTime).toLocaleDateString("en-CA", {
          timeZone: Tt
        }) === ot).map((it) => new Date(it.startTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: Tt,
          hour12: !0
        }).toLowerCase().replace(" ", "")), Tr = Array.from(new Set(Nl));
        to(Tr);
      } catch (fe) {
        console.error("Error loading slots:", fe), to([]);
      } finally {
        ri(!1);
      }
    })();
  }, [se, S, O, Tt]);
  const Ot = () => S === null || !Array.isArray(d) ? null : d.find((Q) => Q.id === S) || null, Wn = () => {
    switch (n) {
      case 1:
        return S !== null && O !== null;
      case 2:
        return q !== null;
      case 3:
        return se && we;
      case 4:
        return Ee && te && J && L;
      case 5:
        return W === "later" || U;
      default:
        return !1;
    }
  }, ws = () => {
    Wn() && si() && (o(n + 1), Je({}));
  }, Ss = () => {
    o(n - 1);
  }, Cs = q === "InPerson" && ii, kr = () => Ot()?.price || 0, ai = () => Ot()?.currency || "USD", Hn = () => Xg(ai()), li = async () => {
    if (!(!Wn() || !si())) {
      he(!0), De(null);
      try {
        if (!l)
          throw new Error("Company not resolved");
        if (!se || !we)
          throw new Error("Please select date and time");
        const Q = se.getFullYear(), fe = String(se.getMonth() + 1).padStart(2, "0"), Me = String(se.getDate()).padStart(2, "0"), Le = `${Q}-${fe}-${Me}`, pt = ZR(
          Le,
          we,
          Tt
        ), xt = (ot) => ot === "Credit Card" || ot === "Debit Card" ? "Card" : ot === "PayPal" ? "PayPal" : W === "later" ? "Cash" : "Card", Kn = {
          companyId: l,
          firstName: Ee,
          lastName: te,
          email: L,
          phone: J,
          serviceId: S,
          staffId: O === -1 ? null : O,
          startTime: pt,
          meetingType: ((ot) => ot === "InPerson" ? "InPerson" : ot === "Phone" ? "Phone" : ot === "Zoom" ? "Zoom" : "InPerson")(q),
          paymentMethod: xt(U),
          notes: V || void 0
        }, Gt = await NR(Kn), ro = Ot(), Pn = O === -1 ? { id: -1, fullName: "Any Staff" } : b.find((ot) => ot.id === O), Pr = {
          id: Gt.id,
          serviceId: S,
          serviceName: ro?.name || Gt.serviceName,
          staffId: O,
          staffName: Gt.staffName || Pn?.fullName || "To be assigned",
          description: V,
          location: q,
          meetingType: q,
          date: XR(pt, Tt, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          }),
          time: QR(pt, Tt),
          duration: `${Ot()?.serviceDuration || 60} min`,
          price: `${Hn()}${Gt.price}`,
          paymentMethod: W === "later" ? "Pay Later" : U,
          paymentTiming: W,
          status: Gt.status
        };
        e(Pr);
      } catch (Q) {
        console.error("Booking error:", Q), De(Q instanceof Error ? Q.message : "Failed to create booking. Please try again.");
      } finally {
        he(!1);
      }
    }
  };
  return /* @__PURE__ */ C.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ C.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ C.jsx("div", { className: "bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-lg", children: /* @__PURE__ */ C.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6", children: [
      i && /* @__PURE__ */ C.jsx(
        "img",
        {
          src: i,
          alt: "Company Logo",
          className: "w-14 h-14 sm:w-20 sm:h-20 object-contain rounded-lg flex-shrink-0"
        }
      ),
      /* @__PURE__ */ C.jsxs("div", { children: [
        /* @__PURE__ */ C.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-slate-900 mb-1", children: "Book Your Appointment" }),
        /* @__PURE__ */ C.jsx("p", { className: "text-slate-600 text-xs sm:text-sm", children: "Complete the form to schedule your session" })
      ] })
    ] }) }),
    /* @__PURE__ */ C.jsx("div", { className: "bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6", children: /* @__PURE__ */ C.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ C.jsx("div", { className: "absolute top-4 sm:top-6 left-0 right-0 h-0.5 sm:h-1 bg-slate-200 -z-10", children: /* @__PURE__ */ C.jsx(
        "div",
        {
          className: "h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out",
          style: { width: `${(n - 1) / (Jc.length - 1) * 100}%` }
        }
      ) }),
      /* @__PURE__ */ C.jsx("div", { className: "flex items-center justify-between", children: Jc.map((Q) => {
        const fe = n === Q.number, Me = n > Q.number, Le = Q.icon;
        return /* @__PURE__ */ C.jsxs(
          "div",
          {
            className: "flex flex-col items-center relative z-10",
            role: "progressbar",
            "aria-valuenow": n,
            "aria-valuemin": 1,
            "aria-valuemax": Jc.length,
            "aria-label": `Step ${Q.number}: ${Q.name}`,
            children: [
              /* @__PURE__ */ C.jsx(
                "div",
                {
                  className: `
                        w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mb-1.5 sm:mb-3 transition-all duration-300 border-2
                        ${Me ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105 sm:scale-110" : fe ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105 sm:scale-110" : "bg-white border-slate-300 text-slate-400"}
                      `,
                  children: Me ? /* @__PURE__ */ C.jsx(td, { className: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6", "aria-hidden": "true" }) : /* @__PURE__ */ C.jsx(Le, { className: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ C.jsx(
                "span",
                {
                  className: `
                        text-[10px] sm:text-xs lg:text-sm font-medium transition-colors duration-300 text-center
                        ${fe ? "text-indigo-700" : Me ? "text-emerald-700" : "text-slate-500"}
                      `,
                  children: Q.name
                }
              )
            ]
          },
          Q.number
        );
      }) })
    ] }) }),
    /* @__PURE__ */ C.jsxs(
      "div",
      {
        className: "bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6",
        role: "main",
        "aria-live": "polite",
        children: [
          n === 1 && /* @__PURE__ */ C.jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
            /* @__PURE__ */ C.jsxs("div", { children: [
              /* @__PURE__ */ C.jsxs(
                "label",
                {
                  htmlFor: "service-select",
                  className: "flex items-center gap-2 mb-3 text-slate-900 font-semibold text-lg",
                  children: [
                    /* @__PURE__ */ C.jsx(dv, { className: "w-5 h-5 text-indigo-600", "aria-hidden": "true" }),
                    "Select Service"
                  ]
                }
              ),
              /* @__PURE__ */ C.jsx(
                Uy,
                {
                  id: "service-select",
                  value: S,
                  onChange: (Q) => E(Number(Q)),
                  options: Array.isArray(d) ? d.map((Q) => ({
                    value: Q.id,
                    label: Q.name,
                    subLabel: `${Xg(Q.currency)}${Q.price} (${Q.serviceDuration} min)`
                  })) : [],
                  isLoading: p,
                  placeholder: "Choose a service...",
                  error: v
                }
              )
            ] }),
            /* @__PURE__ */ C.jsxs("div", { children: [
              /* @__PURE__ */ C.jsxs(
                "label",
                {
                  htmlFor: "staff-select",
                  className: "flex items-center gap-2 mb-3 text-slate-900 font-semibold text-lg",
                  children: [
                    /* @__PURE__ */ C.jsx(Lb, { className: "w-5 h-5 text-indigo-600", "aria-hidden": "true" }),
                    "Select Staff Member"
                  ]
                }
              ),
              /* @__PURE__ */ C.jsx(
                Uy,
                {
                  id: "staff-select",
                  value: O,
                  onChange: (Q) => B(Number(Q)),
                  options: [
                    ...b.length > 0 ? [{ value: -1, label: "Any Available Staff", subLabel: "Maximum availability" }] : [],
                    ...b.map((Q) => ({
                      value: Q.id,
                      label: Q.fullName,
                      subLabel: Q.position || void 0
                    }))
                  ],
                  isLoading: R,
                  disabled: !S,
                  placeholder: S ? "Choose a staff member..." : "Please select a service first...",
                  error: A
                }
              )
            ] })
          ] }),
          n === 2 && /* @__PURE__ */ C.jsx("div", { className: "space-y-6 animate-fadeIn", children: /* @__PURE__ */ C.jsxs("div", { children: [
            /* @__PURE__ */ C.jsxs("label", { className: "flex items-center gap-2 mb-4 text-slate-900 font-semibold text-lg", children: [
              /* @__PURE__ */ C.jsx(Bd, { className: "w-5 h-5 text-indigo-600", "aria-hidden": "true" }),
              "Meeting Location"
            ] }),
            /* @__PURE__ */ C.jsx(
              "div",
              {
                className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                role: "radiogroup",
                "aria-label": "Meeting location options",
                children: Un.map((Q) => {
                  const fe = Q.icon;
                  return /* @__PURE__ */ C.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        if (ne(Q.value), ve.meetingType) {
                          const Me = { ...ve };
                          delete Me.meetingType, Je(Me);
                        }
                      },
                      role: "radio",
                      "aria-checked": q === Q.value,
                      "aria-label": `${Q.label}: ${Q.description}`,
                      className: `
                          relative p-6 rounded-xl border-2 transition-all duration-300 text-center flex flex-col items-center justify-center gap-3 min-h-[140px]
                          focus:outline-none focus:ring-4 focus:ring-indigo-300
                          ${q === Q.value ? `border-indigo-600 bg-gradient-to-br ${Q.gradient} text-white shadow-lg scale-105` : ve.meetingType ? "border-rose-500 hover:border-rose-400 bg-white" : "border-slate-200 hover:border-indigo-300 bg-white hover:shadow-md"}
                        `,
                      children: [
                        q === Q.value && /* @__PURE__ */ C.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ C.jsx(vb, { className: "w-6 h-6", "aria-hidden": "true" }) }),
                        /* @__PURE__ */ C.jsx("div", { className: `
                          p-4 rounded-lg transition-all duration-300
                          ${q === Q.value ? "bg-white/20 backdrop-blur-sm" : "bg-slate-50"}
                        `, children: /* @__PURE__ */ C.jsx(fe, { className: `w-8 h-8 ${q === Q.value ? "text-white" : "text-indigo-600"}`, "aria-hidden": "true" }) }),
                        /* @__PURE__ */ C.jsxs("div", { children: [
                          /* @__PURE__ */ C.jsx("p", { className: `font-bold text-base mb-1 ${q === Q.value ? "text-white" : "text-slate-900"}`, children: Q.label }),
                          /* @__PURE__ */ C.jsx("p", { className: `text-sm ${q === Q.value ? "text-white/90" : "text-slate-600"}`, children: Q.description })
                        ] })
                      ]
                    },
                    Q.value
                  );
                })
              }
            ),
            ve.meetingType && /* @__PURE__ */ C.jsx("p", { className: "text-rose-600 text-sm mt-2", role: "alert", children: ve.meetingType })
          ] }) }),
          n === 3 && /* @__PURE__ */ C.jsxs("div", { className: "animate-fadeIn", children: [
            /* @__PURE__ */ C.jsxs("div", { className: "mb-6 p-5 bg-slate-50 rounded-xl border border-slate-200", children: [
              /* @__PURE__ */ C.jsxs(
                "label",
                {
                  htmlFor: "timezone-select",
                  className: "flex items-center gap-2 mb-3 text-slate-900 font-semibold",
                  children: [
                    /* @__PURE__ */ C.jsx(Cb, { className: "w-5 h-5 text-indigo-600", "aria-hidden": "true" }),
                    "Your Timezone"
                  ]
                }
              ),
              /* @__PURE__ */ C.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ C.jsx(
                fL,
                {
                  value: Tt,
                  onChange: Er,
                  className: "flex-1"
                }
              ) }),
              /* @__PURE__ */ C.jsxs("p", { className: "text-xs text-slate-600 mt-2", children: [
                "Times shown below are in your selected timezone. Current offset: ",
                Q0(Tt)
              ] })
            ] }),
            /* @__PURE__ */ C.jsx(
              gR,
              {
                selectedDate: se,
                onSelectDate: be,
                selectedTime: we,
                onSelectTime: xe,
                timezone: Tt,
                unavailableDates: Yt,
                timeSlots: gs,
                isLoadingSlots: ni
              }
            )
          ] }),
          n === 4 && /* @__PURE__ */ C.jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
            /* @__PURE__ */ C.jsxs("div", { className: "bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5", children: [
              /* @__PURE__ */ C.jsx("h3", { className: "text-indigo-900 font-semibold mb-3 text-lg", children: "You are booking:" }),
              /* @__PURE__ */ C.jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ C.jsxs("p", { className: "text-slate-900", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Date:" }),
                  " ",
                  se?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })
                ] }),
                /* @__PURE__ */ C.jsxs("p", { className: "text-slate-900", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Time:" }),
                  " ",
                  we
                ] }),
                /* @__PURE__ */ C.jsxs("p", { className: "text-slate-900", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Price:" }),
                  " ",
                  Hn(),
                  kr()
                ] })
              ] })
            ] }),
            /* @__PURE__ */ C.jsx("p", { className: "text-slate-700 font-medium", children: "Please provide your details in the form below to proceed with booking." }),
            /* @__PURE__ */ C.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ C.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                /* @__PURE__ */ C.jsxs("div", { children: [
                  /* @__PURE__ */ C.jsxs("label", { htmlFor: "first-name", className: "block mb-2 text-slate-900 font-medium", children: [
                    "First Name ",
                    /* @__PURE__ */ C.jsx("span", { className: "text-rose-600", children: "*" })
                  ] }),
                  /* @__PURE__ */ C.jsx(
                    "input",
                    {
                      id: "first-name",
                      type: "text",
                      value: Ee,
                      onChange: (Q) => {
                        if (ge(Q.target.value), ve.firstName) {
                          const fe = { ...ve };
                          delete fe.firstName, Je(fe);
                        }
                      },
                      placeholder: "John",
                      "aria-invalid": !!ve.firstName,
                      "aria-describedby": ve.firstName ? "first-name-error" : void 0,
                      className: `w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ${ve.firstName ? "border-rose-500 focus:ring-rose-300 focus:border-rose-500" : "border-slate-300 focus:ring-indigo-300 focus:border-indigo-500"}`
                    }
                  ),
                  ve.firstName && /* @__PURE__ */ C.jsx("p", { id: "first-name-error", className: "text-rose-600 text-sm mt-1", role: "alert", children: ve.firstName })
                ] }),
                /* @__PURE__ */ C.jsxs("div", { children: [
                  /* @__PURE__ */ C.jsxs("label", { htmlFor: "last-name", className: "block mb-2 text-slate-900 font-medium", children: [
                    "Last Name ",
                    /* @__PURE__ */ C.jsx("span", { className: "text-rose-600", children: "*" })
                  ] }),
                  /* @__PURE__ */ C.jsx(
                    "input",
                    {
                      id: "last-name",
                      type: "text",
                      value: te,
                      onChange: (Q) => {
                        if (j(Q.target.value), ve.lastName) {
                          const fe = { ...ve };
                          delete fe.lastName, Je(fe);
                        }
                      },
                      placeholder: "Doe",
                      "aria-invalid": !!ve.lastName,
                      "aria-describedby": ve.lastName ? "last-name-error" : void 0,
                      className: `w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ${ve.lastName ? "border-rose-500 focus:ring-rose-300 focus:border-rose-500" : "border-slate-300 focus:ring-indigo-300 focus:border-indigo-500"}`
                    }
                  ),
                  ve.lastName && /* @__PURE__ */ C.jsx("p", { id: "last-name-error", className: "text-rose-600 text-sm mt-1", role: "alert", children: ve.lastName })
                ] })
              ] }),
              /* @__PURE__ */ C.jsxs("div", { children: [
                /* @__PURE__ */ C.jsxs("label", { htmlFor: "phone", className: "block mb-2 text-slate-900 font-medium", children: [
                  "Phone ",
                  /* @__PURE__ */ C.jsx("span", { className: "text-rose-600", children: "*" })
                ] }),
                /* @__PURE__ */ C.jsx(
                  "input",
                  {
                    id: "phone",
                    type: "tel",
                    value: J,
                    onChange: (Q) => {
                      if (G(Q.target.value.replace(/[^\d+\s\-()]/g, "")), ve.phone) {
                        const fe = { ...ve };
                        delete fe.phone, Je(fe);
                      }
                    },
                    placeholder: "+1 (555) 123-4567",
                    "aria-invalid": !!ve.phone,
                    "aria-describedby": ve.phone ? "phone-error" : void 0,
                    className: `w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ${ve.phone ? "border-rose-500 focus:ring-rose-300 focus:border-rose-500" : "border-slate-300 focus:ring-indigo-300 focus:border-indigo-500"}`
                  }
                ),
                ve.phone && /* @__PURE__ */ C.jsx("p", { id: "phone-error", className: "text-rose-600 text-sm mt-1", role: "alert", children: ve.phone })
              ] }),
              /* @__PURE__ */ C.jsxs("div", { children: [
                /* @__PURE__ */ C.jsxs("label", { htmlFor: "email", className: "block mb-2 text-slate-900 font-medium", children: [
                  "Email ",
                  /* @__PURE__ */ C.jsx("span", { className: "text-rose-600", children: "*" })
                ] }),
                /* @__PURE__ */ C.jsx(
                  "input",
                  {
                    id: "email",
                    type: "email",
                    value: L,
                    onChange: (Q) => {
                      if (D(Q.target.value), ve.email) {
                        const fe = { ...ve };
                        delete fe.email, Je(fe);
                      }
                    },
                    placeholder: "john.doe@example.com",
                    "aria-invalid": !!ve.email,
                    "aria-describedby": ve.email ? "email-error" : void 0,
                    className: `w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ${ve.email ? "border-rose-500 focus:ring-rose-300 focus:border-rose-500" : "border-slate-300 focus:ring-indigo-300 focus:border-indigo-500"}`
                  }
                ),
                ve.email && /* @__PURE__ */ C.jsx("p", { id: "email-error", className: "text-rose-600 text-sm mt-1", role: "alert", children: ve.email })
              ] }),
              /* @__PURE__ */ C.jsxs("div", { children: [
                /* @__PURE__ */ C.jsx("label", { htmlFor: "description", className: "flex items-center gap-2 mb-2 text-slate-900 font-medium", children: "Description (Optional)" }),
                /* @__PURE__ */ C.jsx(
                  "textarea",
                  {
                    id: "description",
                    value: V,
                    onChange: (Q) => {
                      if (z(Q.target.value), ve.description) {
                        const fe = { ...ve };
                        delete fe.description, Je(fe);
                      }
                    },
                    placeholder: "Tell us more about your requirements...",
                    rows: 3,
                    maxLength: 500,
                    "aria-invalid": !!ve.description,
                    "aria-describedby": "description-counter",
                    className: `w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 resize-none ${ve.description ? "border-rose-500 focus:ring-rose-300 focus:border-rose-500" : "border-slate-300 focus:ring-indigo-300 focus:border-indigo-500"}`
                  }
                ),
                ve.description && /* @__PURE__ */ C.jsx("p", { className: "text-rose-600 text-sm mt-1", role: "alert", children: ve.description }),
                /* @__PURE__ */ C.jsxs("p", { id: "description-counter", className: "text-slate-500 text-xs mt-1", children: [
                  V.length,
                  "/500 characters"
                ] })
              ] })
            ] })
          ] }),
          n === 5 && /* @__PURE__ */ C.jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
            /* @__PURE__ */ C.jsx("div", { className: "bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6", children: /* @__PURE__ */ C.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ C.jsxs("div", { children: [
                /* @__PURE__ */ C.jsx("p", { className: "text-sm text-slate-700 font-medium mb-1", children: "Service Price" }),
                /* @__PURE__ */ C.jsxs("p", { className: "text-3xl font-bold text-indigo-700", children: [
                  Hn(),
                  kr()
                ] })
              ] }),
              /* @__PURE__ */ C.jsx("div", { className: "p-4 bg-white rounded-xl shadow-sm", children: /* @__PURE__ */ C.jsx(Om, { className: "w-8 h-8 text-indigo-600", "aria-hidden": "true" }) })
            ] }) }),
            /* @__PURE__ */ C.jsxs("div", { children: [
              /* @__PURE__ */ C.jsxs("label", { className: "flex items-center gap-2 mb-4 text-slate-900 font-semibold text-lg", children: [
                /* @__PURE__ */ C.jsx(Wa, { className: "w-5 h-5 text-indigo-600", "aria-hidden": "true" }),
                "When would you like to pay?"
              ] }),
              /* @__PURE__ */ C.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ C.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      oe("now"), X("");
                    },
                    className: `
                      py-4 px-6 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300
                      ${W === "now" ? "border-indigo-600 bg-indigo-50 shadow-md" : "border-slate-300 hover:border-indigo-300 bg-white hover:shadow-sm"}
                    `,
                    children: [
                      /* @__PURE__ */ C.jsx(Wa, { className: `w-6 h-6 mx-auto mb-2 ${W === "now" ? "text-indigo-600" : "text-slate-600"}`, "aria-hidden": "true" }),
                      /* @__PURE__ */ C.jsx("span", { className: `font-semibold ${W === "now" ? "text-indigo-900" : "text-slate-900"}`, children: "Pay Now" })
                    ]
                  }
                ),
                Cs && /* @__PURE__ */ C.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      oe("later"), X("");
                    },
                    className: `
                        py-4 px-6 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300
                        ${W === "later" ? "border-indigo-600 bg-indigo-50 shadow-md" : "border-slate-300 hover:border-indigo-300 bg-white hover:shadow-sm"}
                      `,
                    children: [
                      /* @__PURE__ */ C.jsx(Om, { className: `w-6 h-6 mx-auto mb-2 ${W === "later" ? "text-indigo-600" : "text-slate-600"}`, "aria-hidden": "true" }),
                      /* @__PURE__ */ C.jsx("span", { className: `font-semibold ${W === "later" ? "text-indigo-900" : "text-slate-900"}`, children: "Pay Later" })
                    ]
                  }
                )
              ] }),
              !Cs && /* @__PURE__ */ C.jsx("p", { className: "text-amber-700 text-sm mt-3 flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-200", children: /* @__PURE__ */ C.jsx("span", { children: "Pay Later option is only available for In Person appointments" }) })
            ] }),
            W === "now" && /* @__PURE__ */ C.jsxs("div", { children: [
              /* @__PURE__ */ C.jsxs("label", { className: "flex items-center gap-2 mb-4 text-slate-900 font-semibold text-lg", children: [
                /* @__PURE__ */ C.jsx(Wa, { className: "w-5 h-5 text-indigo-600", "aria-hidden": "true" }),
                "Select Payment Method"
              ] }),
              /* @__PURE__ */ C.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: ys.map((Q) => /* @__PURE__ */ C.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => X(Q.name),
                  className: `
                          py-4 px-3 rounded-xl border-2 transition-all duration-300 text-center focus:outline-none focus:ring-4 focus:ring-indigo-300
                          ${U === Q.name ? "border-indigo-600 bg-indigo-50 shadow-md scale-105" : "border-slate-300 hover:border-indigo-300 bg-white hover:shadow-sm"}
                        `,
                  children: [
                    /* @__PURE__ */ C.jsx("div", { className: "text-2xl mb-2", children: Q.icon }),
                    /* @__PURE__ */ C.jsx("p", { className: `text-sm font-semibold mb-1 ${U === Q.name ? "text-indigo-900" : "text-slate-900"}`, children: Q.name }),
                    /* @__PURE__ */ C.jsx("p", { className: "text-xs text-slate-600", children: Q.description })
                  ]
                },
                Q.name
              )) })
            ] }),
            /* @__PURE__ */ C.jsxs("div", { className: "bg-slate-50 border-2 border-slate-200 rounded-xl p-6", children: [
              /* @__PURE__ */ C.jsx("h3", { className: "text-slate-900 font-bold mb-4 text-lg", children: "Booking Summary" }),
              /* @__PURE__ */ C.jsxs("div", { className: "space-y-3 text-sm", children: [
                /* @__PURE__ */ C.jsxs("div", { className: "flex justify-between py-2 border-b border-slate-200", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Service:" }),
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-900 font-semibold", children: Ot()?.name || "Service not found" })
                ] }),
                /* @__PURE__ */ C.jsxs("div", { className: "flex justify-between py-2 border-b border-slate-200", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Duration:" }),
                  /* @__PURE__ */ C.jsxs("span", { className: "text-slate-900 font-semibold", children: [
                    Ot()?.serviceDuration || 60,
                    " mins"
                  ] })
                ] }),
                /* @__PURE__ */ C.jsxs("div", { className: "flex justify-between py-2 border-b border-slate-200", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Staff:" }),
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-900 font-semibold", children: O === -1 ? "Any Staff" : b.find((Q) => Q.id === O)?.fullName || "No staff selected" })
                ] }),
                /* @__PURE__ */ C.jsxs("div", { className: "flex justify-between py-2 border-b border-slate-200", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Location:" }),
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-900 font-semibold", children: q })
                ] }),
                /* @__PURE__ */ C.jsxs("div", { className: "flex justify-between py-2 border-b border-slate-200", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Date:" }),
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-900 font-semibold", children: se?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })
                ] }),
                /* @__PURE__ */ C.jsxs("div", { className: "flex justify-between py-2 border-b border-slate-200", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-700 font-medium", children: "Time:" }),
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-900 font-semibold", children: we })
                ] }),
                /* @__PURE__ */ C.jsxs("div", { className: "flex justify-between py-3 mt-3 bg-white rounded-lg px-3", children: [
                  /* @__PURE__ */ C.jsx("span", { className: "text-slate-900 font-bold text-base", children: "Total:" }),
                  /* @__PURE__ */ C.jsxs("span", { className: "text-indigo-600 font-bold text-xl", children: [
                    Hn(),
                    kr()
                  ] })
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ C.jsxs("div", { className: "bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 flex items-center justify-between gap-3", children: [
      n > 1 ? /* @__PURE__ */ C.jsxs(
        "button",
        {
          type: "button",
          onClick: Ss,
          className: "flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 border-2 border-slate-300 font-medium focus:outline-none focus:ring-4 focus:ring-slate-300 min-h-[44px] sm:min-h-[48px] text-sm sm:text-base",
          "aria-label": "Go back to previous step",
          children: [
            /* @__PURE__ */ C.jsx(fv, { className: "w-4 h-4 sm:w-5 sm:h-5", "aria-hidden": "true" }),
            "Back"
          ]
        }
      ) : /* @__PURE__ */ C.jsx("div", {}),
      n < 5 ? /* @__PURE__ */ C.jsxs(
        "button",
        {
          type: "button",
          onClick: ws,
          disabled: !Wn(),
          "aria-label": "Continue to next step",
          className: `
                flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-semibold min-h-[44px] sm:min-h-[48px] text-sm sm:text-base focus:outline-none focus:ring-4
                ${Wn() ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg focus:ring-indigo-300 transform hover:scale-105" : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"}
              `,
          children: [
            "Next",
            /* @__PURE__ */ C.jsx(hv, { className: "w-4 h-4 sm:w-5 sm:h-5", "aria-hidden": "true" })
          ]
        }
      ) : /* @__PURE__ */ C.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
        ye && /* @__PURE__ */ C.jsx("p", { className: "text-rose-600 text-sm", role: "alert", children: ye }),
        /* @__PURE__ */ C.jsx(
          "button",
          {
            type: "button",
            onClick: li,
            disabled: !Wn() || ee,
            "aria-label": ee ? "Processing booking..." : "Confirm booking",
            className: `
                  flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-4
                  ${Wn() && !ee ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg focus:ring-emerald-300 transform hover:scale-105" : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"}
                `,
            children: ee ? /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
              /* @__PURE__ */ C.jsx(Eb, { className: "w-5 h-5 animate-spin", "aria-hidden": "true" }),
              "Processing..."
            ] }) : /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
              /* @__PURE__ */ C.jsx(td, { className: "w-5 h-5", "aria-hidden": "true" }),
              W === "now" ? "Proceed to Payment" : "Confirm Booking"
            ] })
          }
        )
      ] })
    ] })
  ] }) });
}
let Gr = {
  root: null,
  config: null
};
function mL({ config: e }) {
  const n = (o) => {
    e.onBookingComplete && e.onBookingComplete(o);
  };
  return /* @__PURE__ */ C.jsx(CC, { initialEntries: [`/book/${e.companySlug}`], children: /* @__PURE__ */ C.jsx(EC, { children: /* @__PURE__ */ C.jsx(
    rv,
    {
      path: "/book/:slug",
      element: /* @__PURE__ */ C.jsx(pL, { onComplete: n })
    }
  ) }) });
}
function Tw(e) {
  if (!e.companySlug) {
    console.error("[BookingWidget] Error: companySlug is required");
    return;
  }
  const n = e.containerId || "booking-widget";
  let o = document.getElementById(n);
  if (!o) {
    console.error(`[BookingWidget] Error: Container element #${n} not found`);
    return;
  }
  Gr.root && Rw(), e.theme === "dark" && o.classList.add("dark"), e.apiBaseUrl && (window.__BOOKING_WIDGET_API_URL__ = e.apiBaseUrl);
  const i = D1.createRoot(o);
  i.render(
    /* @__PURE__ */ C.jsx(Wy.StrictMode, { children: /* @__PURE__ */ C.jsx(mL, { config: e }) })
  ), Gr = {
    root: i,
    container: o,
    config: e
  }, console.log("[BookingWidget] Initialized for company:", e.companySlug);
}
function Rw() {
  Gr.root && (Gr.root.unmount(), console.log("[BookingWidget] Destroyed")), Gr = {
    root: null,
    container: null,
    config: null
  };
}
function gL() {
  return Gr.root !== null;
}
function yL() {
  return Gr.config;
}
const vL = {
  init: Tw,
  destroy: Rw,
  isInitialized: gL,
  getConfig: yL,
  version: "1.0.0"
};
window.BookingWidget = vL;
typeof document < "u" && document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("script[data-company]").forEach((n) => {
    const o = n.getAttribute("data-company"), i = n.getAttribute("data-container") || "booking-widget", a = n.getAttribute("data-theme") || "light";
    o && Tw({
      companySlug: o,
      containerId: i,
      theme: a
    });
  });
});
export {
  vL as BookingWidgetAPI,
  Rw as destroy,
  yL as getConfig,
  Tw as init,
  gL as isInitialized
};
//# sourceMappingURL=booking-widget.js.map
