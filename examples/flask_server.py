import os
import sys
from flask import Flask, request, send_from_directory

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from cloudflare_error_page import get_resources_folder, render as render_cf_error_page

app = Flask(__name__)

# You can use resources from Cloudflare CDN. But in case of changing, you can set use_cdn = False to use bundled resources.
use_cdn = True

if use_cdn:
    res_folder = get_resources_folder()

    # This handler is used to provide stylesheet and icon resources for the error page. If you pass use_cdn=True to render_cf_error_page
    # or if your site is under proxy of Cloudflare (the cdn-cgi folder is already provided by Cloudflare), this handler can be removed.
    @app.route("/cdn-cgi/<path:path>")
    def cdn_cgi(path):
        return send_from_directory(res_folder, path)


@app.route("/")
def index():
    # Get real Ray ID from Cloudflare header
    ray_id = request.headers.get('Http-Cf-Ray', '')

    # Get real client ip from Cloudflare header or request.remote_addr
    client_ip = request.headers.get('Http-X-Forwarded-For')
    if not client_ip:
        client_ip = request.remote_addr

    # Render the error page
    return render_cf_error_page({
        'html_title': '500: Internal server error',
        'title': 'Internal server error',
        'error_code': 500,
        'more_information': {
            "hidden": False,
            "text": "cloudflare.com",
            "link": "https://youtube.com/watch?v=dQw4w9WgXcQ",
        },
        'browser_status': {
            "status": 'ok',
        },
        'cloudflare_status': {
            "status": 'error',
            "status_text": 'Not Working',
        },
        'host_status': {
            "status": 'ok',
            "location": 'example.com',
        },
        'error_source': 'cloudflare',  # 'browser', 'cloudflare', or 'host'
        'what_happened': '<p>There is an internal server error on Cloudflare\'s network.</p>',
        'what_can_i_do': '<p>Please try again in a few minutes.</p>',
        'ray_id': ray_id,
        'client_ip': client_ip,
        'perf_sec_by': {
            "text": "Cloudflare",
            "link": "https://youtube.com/watch?v=dQw4w9WgXcQ",
        },
    }, use_cdn=use_cdn), 500


if __name__ == "__main__":
    app.run(debug=True)
