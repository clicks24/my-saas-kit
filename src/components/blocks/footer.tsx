import Link from 'next/link';

import {
  Github,
  GithubIcon,
  Instagram,
  InstagramIcon,
  Twitter,
  TwitterIcon,
} from 'lucide-react';

export function Footer() {

  return (
    <div className="dark:border-zinc-800 border-zinc-200 border-y">
    <div className='m-auto max-w-7xl px-4 py-20'>
      <div className='grid gap-x-8 gap-y-12 sm:grid-cols-5'>
        <div className='col-span-2 flex flex-col gap-6'>
          <Link href='/'>
            <img src='/logo.svg' className='h-10 w-10 rounded-full' />
          </Link>
          <p className="text-sm opacity-80">© Acme, Inc. All rights reserved.</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-neutral-600'> PRODUCT</p>
          <Link
            href='/#pricing'
            className='text-base hover:underline'
            >
            <p>Pricing</p>
          </Link>
          <Link
            href='/#features'
            className='text-base hover:underline'
            >
            <p>Features</p>
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-neutral-600'>COMPANY</p>
          <Link
            href='https://discord.gg/sAcvuQACYQ'
            className='text-base hover:underline'
            >
            <p>Discord</p>
          </Link>
          <Link
            href='/blog'
            className='text-base hover:underline'
            >
            <p>Blog</p>
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-neutral-600'>LEGAL</p>
          <Link
            href='/#'
            className='text-base hover:underline'
            >
            <p>Terms of Service</p>
          </Link>
          <Link
            href='/#'
            className='text-base hover:underline'
            >
            <p>Privacy Policy</p>
          </Link>
        </div>
      </div>
    </div>
</div>
    );
}
