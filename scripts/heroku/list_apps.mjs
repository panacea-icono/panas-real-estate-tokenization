#!/usr/bin/env node
import process from 'node:process';
import fetch from 'node-fetch';

const apiKey = process.env.HEROKU_API_KEY;
if (!apiKey) {
  console.error('HEROKU_API_KEY is required');
  process.exit(1);
}

const HEROKU_API = 'https://api.heroku.com';
const headers = {
  Accept: 'application/vnd.heroku+json; version=3',
  Authorization: `Bearer ${apiKey}`,
};

async function main(){
  const res = await fetch(`${HEROKU_API}/apps`, { headers });
  if (!res.ok) throw new Error(`Heroku API failed: ${res.status}`);
  const apps = await res.json();
  console.log(JSON.stringify(apps, null, 2));
}

main().catch(err=>{ console.error(err); process.exit(1); });
