"""Einmalige Migration: Blogbeiträge der Live-Site (gecrawlte HTML-Seiten) in Markdown mit Frontmatter.

Aufruf: python3 scripts/migrate/blog_to_md.py <CRAWL_DIR>
Slug, Titel, Datum, Teaser, Text bleiben unverändert (Sie/Du-Mix wird in Release 1 nicht angefasst).
Kategorien stehen nicht im HTML und sind vorläufig nach Thema zugeordnet.
"""
import html as H, json, os, re, sys
from datetime import datetime
from html.parser import HTMLParser

CRAWL = sys.argv[1]
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'content', 'blog')
os.makedirs(OUT, exist_ok=True)

CAT = {
 'google-unternehmensprofil-und-social-media':'Plattformen','wie-oft-instagram-posten-kmu':'Planung & Messung',
 'fotos-mit-dem-handy-fuer-social-media':'Content erstellen','lokale-reichweite-ostschweiz-kmu':'Lokal & Region',
 'content-ideen-fuer-handwerksbetriebe':'Content erstellen','gute-hooks-fuer-kurzvideos':'Content erstellen',
 'saisonale-anlaesse-ostschweiz-content':'Lokal & Region','instagram-insights-richtig-lesen':'Planung & Messung',
 'kundenanfragen-als-content-quelle':'Content erstellen','redaktionsplan-social-media-kmu':'Planung & Messung',
 'content-saeulen-kmu-vier-themenbereiche':'Planung & Messung','facebook-fuer-lokale-betriebe':'Plattformen',
 'social-media-ziele-fuer-kmu-festlegen':'Planung & Messung','social-media-neben-dem-tagesgeschaeft':'Planung & Messung',
 'produkte-dienstleistungen-im-video-zeigen':'Content erstellen','lokale-hashtags-fuer-die-ostschweiz':'Lokal & Region',
 'stories-richtig-einsetzen-kmu-taegliche-einblicke':'Plattformen','kundenbewertungen-als-content-kmu-feedback':'Content erstellen',
 'gutes-licht-ohne-studio-aufnahmen-im-betrieb':'Content erstellen','kooperationen-lokale-betriebe-sichtbarkeit-region':'Lokal & Region',
 'linkedin-schweizer-kmu-lokale-betriebe':'Plattformen','instagram-bio-kmu-optimieren':'Plattformen',
 'aus-followern-kunden-kmu-anfragen':'Planung & Messung','reels-lokale-unternehmen-videoformate':'Content erstellen',
 'standort-region-verschlagworten-ostschweiz':'Lokal & Region','social-media-im-team-aufteilen-kmu':'Planung & Messung',
 'regionale-veranstaltungen-sichtbarkeit-ostschweiz':'Lokal & Region','tiktok-lokale-kmu-deutschschweiz':'Plattformen',
 'zielgruppen-lokale-kmu-definieren-social-media':'Planung & Messung','vorher-nachher-videos-lokale-betriebe':'Content erstellen',
 'content-ideen-sammeln-archivieren-kmu':'Content erstellen','social-media-erfolge-messen-kmu':'Planung & Messung',
 'lokale-presse-social-media-ostschweiz':'Lokal & Region','kurzvideos-schneiden-smartphone-kmu':'Content erstellen',
 'whatsapp-business-lokale-betriebe':'Plattformen','anfragen-nachrichten-beantworten-kmu':'Plattformen',
 'instagram-highlights-gliedern-kmu':'Plattformen','posting-mix-beitraege-stories-reels-kmu':'Planung & Messung',
 'ortsmarkierungen-standort-tags-ostschweiz':'Lokal & Region','ton-untertitel-kurzvideos-kmu':'Content erstellen'}

class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.blocks=[]; s.kind=None; s.buf=''; s.in_li=0; s.skip=0; s.started=False; s.a=[]
    def flush(s):
        t=re.sub(r'[ \t\r\n]+',' ',s.buf).strip()
        t=re.sub(r'\*\*\s+','**',t) if False else t
        if s.kind and t: s.blocks.append((s.kind,t))
        s.kind=None; s.buf=''
    def handle_starttag(s,tag,a):
        a=dict(a)
        if tag in('script','style','svg','noscript'): s.skip+=1; return
        if s.skip: return
        if tag=='h1': s.started=True
        if not s.started: return
        if tag in('h1','h2','h3','h4'): s.flush(); s.kind=tag
        elif tag=='p' and not s.in_li: s.flush(); s.kind='p'
        elif tag=='li': s.flush(); s.in_li+=1; s.kind='li'
        elif tag=='ul': s.flush()
        elif tag in('strong','b'): s.buf+='**'
        elif tag=='a' and s.kind: s.buf+='['; s.a.append(a.get('href',''))
        elif tag=='br' and s.kind: s.buf+=' '
        elif tag=='img':
            s.flush()
            src=a.get('src') or ''
            m=re.match(r'https://framerusercontent\.com/images/([A-Za-z0-9]+)\.(\w+)',H.unescape(src))
            if m: s.blocks.append(('img',(m.group(1)+'.'+m.group(2).lower(),a.get('alt',''))))
    def handle_endtag(s,tag):
        if tag in('script','style','svg','noscript'): s.skip=max(0,s.skip-1); return
        if s.skip or not s.started: return
        if tag in('strong','b') and s.kind: s.buf+='**'
        elif tag=='a' and s.kind and s.a:
            href=s.a.pop()
            if href.startswith('./'): href='/blog/'+href[2:]
            elif href=='../': href='/'
            elif href.startswith('../'): href='/'+href[3:]
            s.buf+=f']({href})'
        elif tag=='li': s.flush(); s.in_li=max(0,s.in_li-1)
        elif tag in('h1','h2','h3','h4') or (tag=='p' and not s.in_li): s.flush()
    def handle_data(s,d):
        if s.skip or not s.started or not s.kind: return
        s.buf+=d

def tidy(t):
    t=re.sub(r'\*\*\s*\*\*','',t)
    t=re.sub(r'\*\*(\s+)',r'\1**',t) if False else t
    t=re.sub(r'(\*\*)\s+([^*]+?)\s+(\*\*)',r'\1\2\3',t)
    t=re.sub(r'\[\s+','[',t); t=re.sub(r'\s+\]\(',' ](',t).replace(' ](','](')
    return t.strip()

MONTHS={m:i for i,m in enumerate(['January','February','March','April','May','June','July','August','September','October','November','December'],1)}
def parse_date(t):
    m=re.match(r'^([A-Z][a-z]+) (\d{1,2}), (\d{4})$',t)
    if not m or m.group(1) not in MONTHS: return None
    return f'{m.group(3)}-{MONTHS[m.group(1)]:02d}-{int(m.group(2)):02d}'

def meta(h,name,attr='name'):
    m=re.search(rf'<meta[^>]+{attr}="{name}"[^>]+content="([^"]*)"',h) or re.search(rf'<meta[^>]+content="([^"]*)"[^>]+{attr}="{name}"',h)
    return H.unescape(m.group(1)).strip() if m else ''

report=[]
for f in sorted(os.listdir(CRAWL)):
    if not (f.startswith('blog__') and f.endswith('.html')): continue
    slug=f[len('blog__'):-5]
    h=open(os.path.join(CRAWL,f)).read()
    p=P(); p.feed(h[h.find('<body'):]); p.flush()
    bl=p.blocks
    title=next((t for k,t in bl if k=='h1'),'')
    date=None
    for k,t in bl:
        if k=='p' and parse_date(t): date=parse_date(t); break
    desc=meta(h,'description'); ogt=meta(h,'og:title','property'); ogi=meta(h,'og:image','property')
    cover=re.match(r'https://framerusercontent\.com/images/([A-Za-z0-9]+)',ogi); cover=cover.group(1) if cover else None
    # Textbereich: nach Datum, bis zum Abschluss-Block
    start=next((i for i,(k,t) in enumerate(bl) if k=='p' and parse_date(t)),0)+1
    end=len(bl)
    for i,(k,t) in enumerate(bl):
        if k=='h2' and t.startswith('Wann hast du deinen Auftritt'): end=i; break
    else:
        end=next((i for i,(k,t) in enumerate(bl) if k=='p' and t=='Alperna'),len(bl))
    body=bl[start:end]
    if body and body[-1][0]=='img': body=body[:-1]            # Bild des Abschluss-Blocks
    # Bilder: Titelbild und Dekobilder weglassen, Teaser (= Meta-Description) weglassen
    out=[]; seen_teaser=False; imgs=[]
    for k,t in body:
        if k=='img':
            if t[0].split('.')[0]==cover: continue
            imgs.append(t); out.append(('img',t)); continue
        if not seen_teaser and k=='p' and re.sub(r'\W+','',t)[:60]==re.sub(r'\W+','',desc)[:60]: seen_teaser=True; continue
        out.append((k,t))
    lines=[]; prev=None
    for k,t in out:
        if k=='img': lines.append(f'![{t[1]}](img:{t[0]})'); prev=k; continue
        t=tidy(t)
        if k=='h2': lines.append('## '+t)
        elif k=='h3': lines.append('### '+t)
        elif k=='h4': lines.append('#### '+t)
        elif k=='li': lines.append('- '+t)
        else: lines.append(t)
        prev=k
    # Leerzeilen: Listenpunkte zusammenhalten
    md=''
    for i,l in enumerate(lines):
        if i and not (l.startswith('- ') and lines[i-1].startswith('- ')): md+='\n'
        md+=l+'\n'
    fm='---\n'+'\n'.join(f'{k}: {json.dumps(v,ensure_ascii=False)}' for k,v in [
        ('title',title),('slug',slug),('date',date),('category',CAT.get(slug,'Plattformen')),
        ('teaser',desc),('cover',cover),('metaTitle',re.sub(r'\s*\|\s*Alperna GmbH$','',ogt)),('metaDescription',desc)])+'\n---\n\n'
    open(os.path.join(OUT,slug+'.md'),'w').write(fm+md)
    words=len(re.findall(r'\w+',md))
    report.append((slug,date,words,len(imgs),sum(1 for k,t in out if k=='h2'),sum(1 for k,t in out if k=='li')))
for r in report: print(r)
print(len(report),'Beiträge; Wörter min/max',min(r[2] for r in report),max(r[2] for r in report))
