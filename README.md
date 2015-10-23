# stevemassey.io

Building:
---------------
1. Increment the version number in ./package.json
2. Run 'grunt' from project root
3. Commit the results (push with: git push --follow-tags)


Building only compiled JS:
---------------------
1. Run 'grunt --requirejs'
2. Commit the results


Tagging with Build Number:
--------------------------
1. (optionally) Increment the version number in ./package.json
2. Run 'grunt --tag'
3. Commit the results and push with --follow-tags