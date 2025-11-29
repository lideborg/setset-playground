#!/usr/bin/env python3
import http.server
import os

# Tools that should redirect to main app with sidebar
SIDEBAR_TOOLS = ['generate', 'remix']

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.rstrip('/')

        # Check if this is a tool that should load with sidebar
        tool_name = path.lstrip('/')
        if tool_name in SIDEBAR_TOOLS:
            # Redirect to main app with tool parameter
            self.send_response(302)
            self.send_header('Location', f'/?tool={tool_name}')
            self.end_headers()
            return

        # If path has no extension and isn't a file, try adding .html
        if '.' not in os.path.basename(self.path) and self.path != '/':
            html_path = self.path.rstrip('/') + '.html'
            if os.path.exists(self.translate_path(html_path)):
                self.path = html_path
        return super().do_GET()

if __name__ == '__main__':
    port = 8000
    print(f'Server running at http://localhost:{port}')
    print(f'  /generate → loads with sidebar')
    print(f'  /remix → loads with sidebar')
    http.server.HTTPServer(('', port), CleanURLHandler).serve_forever()
