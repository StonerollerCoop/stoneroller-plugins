import json, re, os, sys
here=os.path.dirname(os.path.abspath(__file__))
VERSION="1.1.0"
LATEST_MAJOR=1
MESSAGE=""  # optional note shown to editors, such as a planned change
src=open(os.path.join(here,'secondary-nav.src.js')).read()
css=open(os.path.join(here,'secondary-nav.css')).read()
css=re.sub(r'/\*.*?\*/','',css,flags=re.S); css=re.sub(r'\s+',' ',css).strip()
icons=open(os.path.join(here,'icons.json')).read()
label_icons=open(os.path.join(here,'label-icons.json')).read()
out=src.replace('__VERSION__',VERSION).replace('__LABEL_ICONS__',label_icons).replace('__ICONS__',icons).replace('__CSS__',json.dumps(css))
outdir=os.path.join(here,'..','..','public','secondary-nav','v1'); os.makedirs(outdir,exist_ok=True)
open(os.path.join(outdir,'secondary-nav.js'),'w').write(out)
latest={"version":VERSION,"latestMajor":LATEST_MAJOR}
if MESSAGE: latest["message"]=MESSAGE
open(os.path.join(outdir,'..','latest.json'),'w').write(json.dumps(latest)+"\n")
print(len(out), latest)
