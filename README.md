# Hosting on GDSP
export http_proxy=pkg.proxy.prod.jp.local:10080
export https_proxy=pkg.proxy.prod.jp.local:10080
pip install django
pip install werkzeug
pip install --upgrade pip setuptools wheel


git clone ssh://git@git.rakuten-it.com:7999/rmad/insightsdashboard.git
cd insightsdashboard

unset http_proxy
unset https_proxy

python manage.py runserver 0.0.0.0:5000