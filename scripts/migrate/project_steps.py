"""Einmalige Migration: Schritte, Kundenlinks und Bilder der 14 Projektseiten in data/projekte.json ergänzen.

Aufruf: python3 scripts/migrate/project_steps.py <CRAWL_DIR>   (nach fetch_images.py)
Texte bleiben Originale der Live-Site, die Überarbeitung nach BRAND-VOICE folgt separat.
"""
import html as H, json, os, re, sys
CRAWL = sys.argv[1]
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
data = json.load(open(os.path.join(ROOT, 'data', 'projekte.json')))
imgs = json.load(open(os.path.join(ROOT, 'data', 'images.json')))

# Titelbild je Projekt (echte Fotos bevorzugt). Ohne Eintrag zeigt die Karte das Logo des Kunden.
COVER = {'bc-trogen-speicher': 'VdqRHU4PjKxr2cvDqpKIUolqES4', 'regina-massagen': 'NdUBVnfB4BQkp9DF5AndVDmKc2M',
         'lifeboost': 'MbQsQKSpdpjTlcR5XFJ8ZxNHwnA', 'klartext-von-zwei-kanten': 'EhDKdyORXKoylUDOIxI7ExueQ',
         'alex-breitenmoser': 'Ev66oFlB9S75ZwJiX6iJd23d8w', 'whitetail-fever': 'M8HG0TVfF7tUFE8s4SK4shN7k',
         'boostraft': 'BOs4lplaZQhm043RRasr1woiU4', 'pocket-properties-app': 'IbmpNhWUDMl3Rmnp1CRwgcuAc4',
         'beyond-borders-daydance': 'ZaXKWLbaeDZY2DWl4kyMGX6hZf8', 'i-love-zero': 'UjOrSF53Ye1TZ8ovxnKsrLwIo',
         'appenzellerland-sport': 'j7BETm17HfWAsqe6OOZ6lZNu8'}
STOP = {'AUS DER PRODUKTION', 'EINBLICK', 'EINDRÜCKE', 'Alperna', 'Partner für deinen Digitalen Aufstieg.'}
for p in data['projekte']:
    slug = p['slug']
    lines = open(os.path.join(CRAWL, f'projekte__{slug}.txt')).read().split('\n')
    i = lines.index('AUSGANGSLAGE') + 1
    # Ausgangslage kann über mehrere Zeilen laufen, bis die erste Schrittnummer kommt
    while i < len(lines) and not re.fullmatch(r'0\d', lines[i]) and lines[i] not in STOP and not lines[i].startswith('## '): i += 1
    steps = []; zusatz = []
    while i < len(lines) and lines[i] not in STOP:
        if re.fullmatch(r'0\d', lines[i]) and i + 1 < len(lines) and lines[i + 1].startswith('## '):
            st = dict(titel=lines[i + 1][3:].strip(), wert=None, label=None, text=[], punkte=[])
            i += 2
            if i + 1 < len(lines) and len(lines[i]) <= 14 and len(lines[i + 1]) <= 40 and not lines[i].endswith('.') and not lines[i + 1].endswith('.') and not re.fullmatch(r'0\d', lines[i]):
                st['wert'], st['label'] = lines[i], lines[i + 1]; i += 2
            while i < len(lines) and lines[i] not in STOP and not (re.fullmatch(r'0\d', lines[i]) and i + 1 < len(lines) and lines[i + 1].startswith('## ')) and not lines[i].startswith('## '):
                (st['text'] if lines[i].endswith(('.', '!', '?', '“', '«')) else st['punkte']).append(lines[i]); i += 1
            steps.append(st)
        elif lines[i].startswith('## '):
            zusatz.append(lines[i][3:]); i += 1
            while i < len(lines) and lines[i] not in STOP and not lines[i].startswith('## ') and not (re.fullmatch(r'0\d', lines[i])): zusatz.append(lines[i]); i += 1
        else: i += 1
    p['schritte'] = steps
    if zusatz:
        txt = re.sub(r'\s+([,.])', r'\1', ' '.join(zusatz[1:]))
        p['zusatz'] = dict(titel=zusatz[0], text=txt)
    # Kundenlinks
    h = open(os.path.join(CRAWL, f'projekte__{slug}.html')).read()
    links = []
    for m in re.finditer(r'<a\b[^>]*href="(https?://[^"]+)"[^>]*>(.*?)</a>', h, flags=re.S):
        href, inner = H.unescape(m.group(1)), re.sub(r'<[^>]+>', '', m.group(2)).strip()
        if re.search(r'alperna\.ch|framer|calendly|tiktok\.com/@alperna|linkedin\.com/company/alperna|instagram\.com/alperna', href): continue
        if inner in ('Instagram', 'Website', 'LinkedIn', 'Facebook', 'TikTok', 'Beyond Borders', 'Sinno', 'Joshua Broger', 'X', 'Threads') and href not in [l['url'] for l in links]:
            links.append(dict(label=inner, url=href))
    p['kundenLinks'] = links
    pi = imgs['projekte'][slug]
    p['cover'] = COVER.get(slug); p['logo'] = pi['logo']; p['bilder'] = pi['bilder']
json.dump(data, open(os.path.join(ROOT, 'data', 'projekte.json'), 'w'), ensure_ascii=False, indent=2); open(os.path.join(ROOT, 'data', 'projekte.json'), 'a').write('\n')
for p in data['projekte']:
    print(p['slug'], len(p['schritte']), 'Schritte', len(p['kundenLinks']), 'Links', len(p['bilder']), 'Bilder', 'cover' if p['cover'] else 'KEIN COVER')
