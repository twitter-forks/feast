#!/bin/bash

cd build/static/js

# find `(type|icon|iconType): "..."` in code
icon_types=$(
  grep -ro '\b\(type\|icon\(Type\)\?\):\s*['\''"][[:alnum:]_-]\+' . |
  awk -F '['\''"]' '{print $2}' |
  sort -u
)

# EUI maps icon types to differently spelled file labels in an object, so look for
# `(icon1|icon2|...): "..."` in code
icon_file_types=$(
  grep -ro '\('"$(echo $icon_types | sed 's/ /\\|/g')"'\):\s*['\''"][[:alnum:]_-]\+' . |
  awk -F '['\''"]' '{print $2}' |
  sort -u
)

# Find icon.* files that don't match the above file types and remove
ls -d icon.* |
    grep -v '\.\('"$(echo $icon_file_types | sed 's/ /\\|/g')"'\)\.' |
    xargs rm
