from BaseHTTPServer import BaseHTTPRequestHandler
import urlparse, json
import logging
import cgi
##
import argparse
import requests
import json
#import visdom
import numpy as np


logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)


class GetHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed_path = urlparse.urlparse(self.path)
        message = '\n'
        self.send_response(200)
        self.end_headers()
        self.wfile.write(message)
        return

    def do_OPTIONS(self):
        self.send_response(200, 'do_OPTIONS_OK')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT')


    def do_POST(self):
        ctype, pdict = cgi.parse_header(self.headers['content-type'])
        content_len = int(self.headers.getheader('content-length'))
        post_body = self.rfile.read(content_len)
        
        endpoint = "api/v1.0/predict"

        data={"sentence":[post_body]}
        r = requests.post("http://10.218.112.25:{}/{}".format(6000, endpoint), json=data)
        data['polarity'] = json.loads(r.text)['prediction']
        if data['polarity'] == 2:
            data['polaType'] = 'Positive'
        elif data['polarity'] == 0:
            data['polaType'] = 'Negative'
        else :
            data['polaType'] = 'Neutral'
        json_data = json.dumps(data)

    
        self.send_response(200, 'do_POST_OK')
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:1230')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json_data)
        

if __name__ == '__main__':
    from BaseHTTPServer import HTTPServer
    #server = HTTPServer(('10.218.112.25', 22), GetHandler)
    server = HTTPServer(('127.0.0.1', 1230), GetHandler)
    server.serve_forever()
