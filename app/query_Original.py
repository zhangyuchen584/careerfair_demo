import argparse
import requests
import json
#import visdom
import numpy as np



def main():
        parser = argparse.ArgumentParser()
        #vis = visdom.Visdom()
        parser.add_argument("--query", dest="query", type=str, metavar='<str>', default='this app is awesome!', help="Query / test case")
        parser.add_argument("--port", dest="port", type=int, metavar='<int>', default=6000, help="which port?")
        args = parser.parse_args()

        endpoint = "api/v1.0/predict"
        sentences = []
        sentences.append(args.query)
        # print sentences
        data={"sentence":sentences}
        print data
        post_body = 'you are wrong'
        data1={"sentence":[post_body]}
        print 'data1'
        print data1

        r = requests.post("http://10.218.112.25:{}/{}".format(args.port, endpoint), json=data)
        # print 'r'
        # print r.text
        print('Prediction: {}'.format(json.loads(r.text)['prediction']))


if __name__ == '__main__':
        main()
