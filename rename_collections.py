import os
import re

dir_path = '/Users/guglielmopiersanti/.gemini/antigravity-ide/scratch/fantaletteratura_hub_migration'
collections = ['teams', 'users', 'missions', 'tournaments', 'invites', 'pending_requests', 'archives', 'minigame_logs', 'games_status', 'settings']

for root, _, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.js') or file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
                
            original_content = content
            for coll in collections:
                # Replace 'collection("name")' or "collection('name')"
                content = re.sub(rf'collection\([\'"]{coll}[\'"]\)', f"collection('fanta_{coll}')", content)
                
            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated {filepath}")
