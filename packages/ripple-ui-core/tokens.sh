#!/bin/bash
rm ./tokens/figma.json
# fetch design tokens from JSON bin for now
# Need to make sure you have $JSON_BIN_URL and $JSON_BIN_KEY env vars set
curl --location --request GET "$JSON_BIN_URL" \
--header 'secret-key':"$JSON_BIN_KEY" \
-o ./tokens/figma.json

npx token-transformer ./tokens/figma.json ./tokens/tokens.json 
node ./tokens/processor.js
# cleanup temp file
# rm ./tokens/figma.json


