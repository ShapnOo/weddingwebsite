import { NextResponse } from 'next/server';
import fs from 'fs';
export function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/Img_Web')) {
    let out = '';
    for (const [key, val] of req.headers.entries()) {
      out += key + ': ' + val + '\n';
    }
    try {
      fs.appendFileSync('headers-log.txt', out + '\n---\n');
    } catch(e) {}
  }
  return NextResponse.next();
}
