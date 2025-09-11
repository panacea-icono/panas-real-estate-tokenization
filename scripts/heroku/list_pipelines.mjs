#!/usr/bin/env node
import process from 'node:process';
import fetch from 'node-fetch';

const apiKey = process.env.HEROKU_API_KEY;
if (!apiKey) { console.error('HEROKU_API_KEY is required'); process.exit(1); }

const HEROKU_API = 'https://api.heroku.com';
const headers = {
  Accept: 'application/vnd.heroku+json; version=3',
  Authorization: `Bearer ${apiKey}`,
};

async function getJSON(url){
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.json();
}

async function main(){
  const pipelines = await getJSON(`${HEROKU_API}/pipelines`);
  const enriched = [];
  for (const p of pipelines){
    const couplings = await getJSON(`${HEROKU_API}/pipelines/${p.id}/pipeline-couplings`);
    enriched.push({ pipeline: p, couplings });
  }
  console.log(JSON.stringify(enriched, null, 2));
}

main().catch(err=>{ console.error(err); process.exit(1); });
