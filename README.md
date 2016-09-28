# Fetch FileMaker Server

Intended to download and archive FileMaker Layouts for reading with other programs.

## Install

```
$ npm instal fetch-fms
```

## Usage

```
$ fetch-fms --help

-- Get layout foo from foobar@location.com using user and password hello and world
$ fetch-fms --host http://location.com/ --username hello --password world --database foobar foo

-- Save below as defaults in `~/.fetchFms.json`
$ fetch-fms --host http://location.com/ --username hello --password world --database foobar --save-settings

-- Get all layouts' data and make zip at `./archive.zip` with layout.json for each layout
$ fetch-fms --get-all --zip --output archive.zip

-- Get layouts people, jobs, and addresses and put into `/tmp/layouts` directory in minified JSON
$ fetch-fms --output /tmp/layouts people jobs addresses --json

-- find all people with "john" in their name
$ fetch-fms people | grep john

-- save each layout, people, places, things, as an archive in CSV format
$ for LAYOUT in "people" "places" "things" 
$ do 
$   fetch-fms $LAYOUT --zip --output "${LAYOUT}.zip" --csv
$ done


```