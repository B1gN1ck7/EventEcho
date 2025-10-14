#!/usr/bin/env python3
"""
Simple HTTP server for serving the EventEcho frontend
Run this script to serve the frontend on a local server
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuration
PORT = 8080
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Handle client-side routing
        if self.path == '/' or self.path.startswith('/login') or self.path.startswith('/register') or self.path.startswith('/home'):
            self.path = '/index.html'
        return super().do_GET()

def main():
    # Change to the frontend directory
    frontend_dir = Path(__file__).parent
    os.chdir(frontend_dir)
    
    # Check if index.html exists
    if not (frontend_dir / 'index.html').exists():
        print("Error: index.html not found in the frontend directory")
        sys.exit(1)
    
    # Create server
    with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 EventEcho Frontend Server running at:")
        print(f"   http://{HOST}:{PORT}")
        print(f"   http://localhost:{PORT}")
        print("\n📁 Serving files from:", frontend_dir.absolute())
        print("\n🔄 Press Ctrl+C to stop the server")
        print("-" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Goodbye!")
            sys.exit(0)

if __name__ == '__main__':
    main()
