import base64

with open('d:/Nebulyx/public/nebulyx-logo-transparent.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 429 599" width="100%" height="100%">
  <image width="429" height="599" href="data:image/png;base64,{b64}" />
</svg>'''

with open('d:/Nebulyx/public/logo-mark.svg', 'w') as f:
    f.write(svg_content)

favicon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#05060a" />
  <g transform="translate(85, 46) scale(0.8)">
    <image width="429" height="599" href="data:image/png;base64,{b64}" />
  </g>
</svg>'''

with open('d:/Nebulyx/public/favicon.svg', 'w') as f:
    f.write(favicon_svg)

print('logo-mark.svg and favicon.svg written successfully.')
