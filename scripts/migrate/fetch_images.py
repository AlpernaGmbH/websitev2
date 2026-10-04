"""Einmalige Migration: Bilder der Live-Site (Framer) herunterladen, verkleinern, als WebP ablegen.

Liest die vorher gecrawlten HTML-Seiten (CRAWL_DIR), schreibt public/images/** und data/images.json.
Framer wird nur gelesen. Aufruf: python3 scripts/migrate/fetch_images.py <CRAWL_DIR>
"""
import html as H, json, os, re, subprocess, sys
from collections import OrderedDict

CRAWL = sys.argv[1]
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'public', 'images')
LOGO_MARK = 'uXM9bddLaeFs92jvtvniEQANJkg'
ENV = dict(os.environ, SSL_CERT_FILE='/root/.ccr/ca-bundle.crt')

def page_imgs(fname):
    h = open(os.path.join(CRAWL, fname)).read()
    h = re.sub(r'<(script|style|noscript)[^>]*>.*?</\1>', '', h, flags=re.S)
    out = OrderedDict()
    for m in re.finditer(r'<img\b[^>]*>', h):
        t = m.group(0)
        src = re.search(r'\ssrc="([^"]+)"', t)
        if not src: continue
        mm = re.match(r'https://framerusercontent\.com/images/([A-Za-z0-9]+)\.(\w+)', H.unescape(src.group(1)))
        if not mm: continue
        alt = re.search(r'\salt="([^"]*)"', t)
        out.setdefault(mm.group(1), (mm.group(2).lower(), H.unescape(alt.group(1)).strip() if alt else ''))
    return out

def meta_og(fname):
    h = open(os.path.join(CRAWL, fname)).read()
    m = re.search(r'<meta[^>]+property="og:image"[^>]+content="([^"]+)"', h) or re.search(r'<meta[^>]+content="([^"]+)"[^>]+property="og:image"', h)
    if not m: return None
    mm = re.match(r'https://framerusercontent\.com/images/([A-Za-z0-9]+)\.(\w+)', H.unescape(m.group(1)))
    return (mm.group(1), mm.group(2).lower()) if mm else None

wanted = OrderedDict()   # id -> dict(group, maxw, alt, ext)
def want(i, ext, alt, group, maxw):
    if i not in wanted: wanted[i] = dict(group=group, maxw=maxw, alt=alt, ext=ext)

# Marke und Team
want(LOGO_MARK, 'png', 'Alperna Logo', 'brand', 512)
home = page_imgs('home.html'); ueber = page_imgs('ueber-uns.html')
want('iwaqIdZLeZXZJMqidnD3bSMSHY', 'jpg', 'Andrej Good, Mitgründer der Alperna GmbH', 'team', 1000)
want('hWvlDZcWO7blpdESrjYFvjl9mIM', 'png', 'Leander Züst, Mitgründer der Alperna GmbH', 'team', 1000)

# Logos der Vertrauensleiste (Reihenfolge: regional zuerst)
logos = ['hZzhL8EF2npTgCspCmutUpq60','XCtrvTrIrBubLsLsJOcKgLmjezA','mGiMLVVpxno84gaBqaw5sgbRhBE','Ujep2EiySv7TRI6flfvn5YINg','7SDzcwUSokXCUZ6lyRQ36pRw9Q','W4cz3Eja958cyzs6A5PpQ81fh8o','XrS0vqYWXyjDJIZa7UeC1y3NOo','SlH9ijItf6adStZ9chlGVWxYCRQ','7ocC4v8VGyJgVTx2WIDfRm0BegY']
for i, (ext, alt) in home.items():
    if i in logos: want(i, ext, alt, 'logos', 320)

# Problem-Illustrationen (eigene Alt-Texte ohne Reichweiten-Jargon)
ill = {'VWayyyI0JBgIr8dWcrhggdW9v0': 'Illustration eines Windsacks: ein Auftritt ohne klare Richtung',
       'FfK5CrGjxv3bOybGic2kWub54o': 'Illustration einer Sanduhr: zu wenig Zeit für Beiträge',
       'nWVLpPcuSduOMRMJzC3nJm9PaY': 'Illustration eines Gehirns: das Wissen fehlt',
       'htHkYPlkWbM5ZTSrgQnLxMks': 'Balkendiagramm mit stark schwankenden Werten: kein klarer Beleg'}
for i, alt in ill.items(): want(i, home[i][0], alt, 'illus', 600)

# Über uns: Galerie «Hinter den Kulissen»
gallery = [i for i, (ext, alt) in ueber.items() if alt.startswith('Alperna')]
for i in gallery: want(i, ueber[i][0], ueber[i][1], 'galerie', 1400)

# Projekte
slugs = [re.sub(r'^projekte__|\.html$', '', f) for f in sorted(os.listdir(CRAWL)) if f.startswith('projekte__') and f.endswith('.html')]
proj = {}
for s in slugs:
    f = f'projekte__{s}.html'
    imgs = page_imgs(f)
    og = meta_og(f)
    entry = dict(cover=None, logo=None, bilder=[])
    if og:
        entry['cover'] = og[0]
        want(og[0], og[1], imgs.get(og[0], (og[1], ''))[1], 'projekte', 1400)
    for i, (ext, alt) in imgs.items():
        if i == LOGO_MARK: continue
        if alt.lower().startswith('logo'):
            entry['logo'] = entry['logo'] or i
            want(i, ext, alt, 'logos', 320)
        else:
            want(i, ext, alt, 'projekte', 1400)
            entry['bilder'].append(i)
    proj[s] = entry

# Blog: Titelbild je Beitrag, Bilder im Text
blog = {}
for f in sorted(os.listdir(CRAWL)):
    if not (f.startswith('blog__') and f.endswith('.html')): continue
    s = f[len('blog__'):-5]
    og = meta_og(f)
    if og: want(og[0], og[1], '', 'blog', 1200)
    blog[s] = og[0] if og else None

# Bilder im Text der Blogbeiträge (nach blog_to_md.py)
import glob
for mdf in sorted(glob.glob(os.path.join(ROOT, 'content', 'blog', '*.md'))):
    for m in re.finditer(r'!\[([^\]]*)\]\(img:([A-Za-z0-9]+)\.(\w+)\)', open(mdf).read()):
        want(m.group(2), m.group(3), H.unescape(m.group(1)), 'blog', 1200)

# Falsche Alt-Texte der Live-Site korrigieren
ALT_FIX = {'ZaXKWLbaeDZY2DWl4kyMGX6hZf8': 'Übersicht der Aufnahmen vom Daydance',
           'UjOrSF53Ye1TZ8ovxnKsrLwIo': 'Übersicht der Aufnahmen für I love Zero'}
for i, a in ALT_FIX.items():
    if i in wanted: wanted[i]['alt'] = a

os.makedirs(OUT, exist_ok=True)
meta = OrderedDict()
ok = fail = 0
for i, w in wanted.items():
    d = os.path.join(OUT, w['group']); os.makedirs(d, exist_ok=True)
    src = f"https://framerusercontent.com/images/{i}.{w['ext']}?scale-down-to={w['maxw']}"
    tmp = os.path.join(d, f"{i}.{w['ext']}.tmp")
    dst = os.path.join(d, f"{i}.webp")
    if not os.path.exists(dst):
        r = subprocess.run(['curl', '-sS', '-L', '-m', '60', '-o', tmp, src], env=ENV, capture_output=True)
        if r.returncode != 0 or not os.path.exists(tmp) or os.path.getsize(tmp) < 500:
            print('FEHLER', i, r.stderr.decode()[:100]); fail += 1; continue
        c = subprocess.run(['convert', tmp, '-auto-orient', '-resize', f"{w['maxw']}x{w['maxw']}>", '-strip', '-quality', '78', dst], capture_output=True)
        os.remove(tmp)
        if c.returncode != 0: print('KONVERTIERUNG', i, c.stderr.decode()[:100]); fail += 1; continue
    dim = subprocess.run(['identify', '-format', '%w %h', dst], capture_output=True, text=True).stdout.split()
    meta[i] = dict(file=f"/images/{w['group']}/{i}.webp", alt=w['alt'], w=int(dim[0]), h=int(dim[1]), group=w['group'])
    ok += 1
json.dump(dict(images=meta, projekte=proj, blogCover=blog, logoMark=LOGO_MARK, logos=logos, galerie=gallery,
               hinweis='Erzeugt von scripts/migrate/fetch_images.py. Alt-Texte stammen von der Live-Site.'),
          open(os.path.join(ROOT, 'data', 'images.json'), 'w'), ensure_ascii=False, indent=1)
print('Bilder ok', ok, 'Fehler', fail)
