import re
import os

admin_path = '/Users/guglielmopiersanti/.gemini/antigravity/scratch/fantaletteratura/admin.html'
index_path = '/Users/guglielmopiersanti/.gemini/antigravity/scratch/fantaletteratura/index.html'

with open(admin_path, 'r', encoding='utf-8') as f:
    admin_html = f.read()

# Extract admin-view-presentazioni
pres_view_match = re.search(r'(<section id="admin-view-presentazioni" class="admin-view" style="display:none;">.*?</section>)', admin_html, re.DOTALL)
pres_view = pres_view_match.group(1).replace('admin-view-presentazioni', 'view-presentazioni').replace('class="admin-view"', 'class="view"')

# Extract presentation-overlay
pres_overlay_match = re.search(r'(<div id="presentation-overlay" style="display: none;">.*?</div>\s*<!-- VIEW: Locandine)', admin_html, re.DOTALL)
# Just get the div, not the Locandine comment
overlay_div = re.sub(r'\s*<!-- VIEW: Locandine.*', '', pres_overlay_match.group(1), flags=re.DOTALL)

with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

# Insert pres_view just before <!-- Final Footer
index_html = index_html.replace('<!-- Final Footer (Desktop & Hidden Area) -->', f'\n{pres_view}\n\n        <!-- Final Footer (Desktop & Hidden Area) -->')

# Insert overlay just before <!-- VIEW: Locandine
index_html = index_html.replace('<!-- VIEW: Locandine (overlay fullscreen come le presentazioni) -->', f'{overlay_div}\n\n    <!-- VIEW: Locandine (overlay fullscreen come le presentazioni) -->')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_html)
