#!/usr/bin/python

import sys, getopt, re

def usage():
    print 'Usage: ' + sys.argv[0] + ' -v [version]'

def main():
    try:
        opts, args = getopt.getopt(sys.argv[1:], 'v:', ['version='])
    except getopt.GetoptError as err:
        print str(err)
        usage()
        sys.exit(1)

    version = 0.0

    for o, a in opts:
        if o in ('-v', '--version'):
            version = a
        else:
            assert False, 'unhandled option'

    if not version:
        assert False, 'invalid version'

    with open('app/js/service/version.service.js', 'r+') as file:
        content = file.read()
        content = re.sub("version:\s?\'(.+)", "version: '" + version + "'", content)
        file.seek(0)
        file.truncate()
        file.write(content)


main()