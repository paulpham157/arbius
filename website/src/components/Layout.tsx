import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, Fragment, PropsWithChildren, SVGProps } from 'react';
import { ethers } from 'ethers';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import HeaderLogo from '@/components/HeaderLogo';
import DarkModeToggle from '@/components/DarkModeToggle';
import ConnectWallet from '@/components/ConnectWallet';
import AddToWallet from '@/components/AddToWallet';
import TokenBalance from '@/components/TokenBalance';
import NetworkSwitch from '@/components/NetworkSwitch';
import Config from '@/config.json';

const navigation = [
  // { name: 'Generate', href: '/generate', external: false },
  // {
  //   name: 'Staking',
  //   href: 'https://app.gysr.io/pool/0xf0148b59d7f31084fb22ff969321fdfafa600c02?network=ethereum',
  //   external: true,
  // },
  // { name: 'Bond', href: 'https://app.bondprotocol.finance/#/market/42161/111', external: true, },
  // { name: 'Models', href: '/models', external: false },
  // { name: 'Explorer', href: '/explorer', external: false },
  // { name: 'Governance', href: 'https://www.tally.xyz/gov/arbitrum', external: true, },
  { name: 'Upgrade', href: '/upgrade', external: false },
  { name: 'Docs', href: 'https://docs.arbius.ai', external: true },
];

const social = [
  {
    name: 'GitHub',
    href: 'https://github.com/semperai/arbius',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
        <path
          fillRule='evenodd'
          d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/arbius_ai',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
        <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/arbius_ai',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg
        fill='currentColor'
        className='text-gray-400 m-[1px] h-[22px] w-[22px] fill-current'
        viewBox='0 0 496 512'
      >
        <path d='M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z'></path>
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/eXxXMRCMzZ',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg
        fill='currentColor'
        viewBox='0 0 127.14 96.36'
        className='text-gray-400 m-[1px] h-[22px] w-[22px] fill-current'
      >
        <path d='M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z' />
      </svg>
    ),
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  title: string;
  full?: boolean;
  enableEth?: boolean;
}

export default function Layout({
  children,
  title,
  full,
  enableEth,
}: PropsWithChildren<Props>) {
  const { asPath } = useRouter();

  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(ethers.BigNumber.from(0));
  const [v2TokenBalance, setV2TokenBalance] = useState(
    ethers.BigNumber.from(0)
  );
  const zero = ethers.BigNumber.from(0);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content='Arbius: Decentralized Machine Learning'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <NetworkSwitch enableEth={enableEth} />
      <div className='z-50 min-h-full'>
        <Disclosure
          as='nav'
          className='bg-white border-gray-200 border-b dark:bg-[#16141d]'
        >
          {({ open }) => (
            <>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 justify-between'>
                  <div className='flex'>
                    <div className='flex flex-shrink-0 items-center'>
                      <HeaderLogo />
                    </div>
                    <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                      {navigation.map((item) => (
                        <>
                          {(item.name !== 'Upgrade' || tokenBalance > zero) && (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                asPath === item.href
                                  ? 'text-gray-900 border-indigo-500'
                                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
                                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                              )}
                              aria-current={
                                asPath === item.href ? 'page' : undefined
                              }
                              target={item.external ? '_blank' : '_self'}
                            >
                              {item.name}{' '}
                              {item.external && (
                                <ArrowTopRightOnSquareIcon
                                  className='ml-1 inline h-4 w-4 -translate-y-0.5 align-top'
                                  aria-hidden='true'
                                />
                              )}
                            </Link>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                  <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                    <div className='hidden sm:mr-6 sm:flex sm:items-center'>
                      <DarkModeToggle />
                    </div>
                    <div
                      className={
                        (walletConnected ? '' : 'hidden ') +
                        'text-mono flex-rows text-slate-800 bg-slate-50 flex rounded-md px-3 pb-1 pt-2 text-xs shadow' +
                        (tokenBalance === zero ? '' : 'animate-pulse')
                      }
                    >
                      <Link href='/upgrade' className='flex-rows flex'>
                        <TokenBalance
                          show={false}
                          update={setTokenBalance}
                          token={Config.baseTokenAddress as `0x${string}`}
                        />
                        <TokenBalance
                          show={walletConnected}
                          update={setV2TokenBalance}
                          token={Config.v2_baseTokenAddress as `0x${string}`}
                        />
                        <div className='text-slate-500 m-auto pl-1 text-xs font-semibold'>
                          AIUS
                        </div>
                      </Link>
                      <div className='pl-1'>
                        <AddToWallet />
                      </div>
                    </div>
                    <ConnectWallet update={setWalletConnected} />
                  </div>
                  <div className='-mr-2 flex items-center sm:hidden'>
                    <div className='flex items-center px-4'>
                      <div
                        className={
                          (walletConnected ? '' : 'hidden ') +
                          'text-mono flex-rows m3-4 text-slate-800 bg-slate-50 flex rounded-md px-3 pb-1 pt-2 text-xs shadow' +
                          (tokenBalance === zero ? '' : 'animate-pulse')
                        }
                      >
                        <Link href='/upgrade' className='flex-rows flex'>
                          <TokenBalance
                            show={false}
                            update={setTokenBalance}
                            token={Config.baseTokenAddress as `0x${string}`}
                          />
                          <TokenBalance
                            show={walletConnected}
                            update={setV2TokenBalance}
                            token={Config.v2_baseTokenAddress as `0x${string}`}
                          />
                          <div className='text-slate-500 m-auto pl-1 text-xs font-semibold'>
                            AIUS
                          </div>
                        </Link>
                        <div className='pl-1'>
                          <AddToWallet />
                        </div>
                      </div>
                      <ConnectWallet update={setWalletConnected} />
                    </div>
                    <div className='mr-2 translate-y-1'>
                      <DarkModeToggle />
                    </div>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='bg-white text-gray-400 inline-flex items-center justify-center rounded-md p-2 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='sm:hidden'>
                <div className='space-y-1 pb-3 pt-2'>
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        asPath === item.href
                          ? 'text-gray-700 bg-indigo-50 border-fuchsia-500'
                          : 'text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300',
                        'block border-l-4 py-2 pl-3 pr-4 align-bottom text-base font-medium'
                      )}
                      aria-current={asPath === item.href ? 'page' : undefined}
                      target={item.external ? '_blank' : '_self'}
                    >
                      {item.name}{' '}
                      {item.external && (
                        <ArrowTopRightOnSquareIcon
                          className='inline h-4 w-4 align-top'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main className='bg-white dark:bg-[#16141d]'>
          <div
            className={classNames(
              full ? 'max-w' : 'mx-auto max-w-7xl sm:px-6 lg:px-8'
            )}
          >
            {children}
          </div>
        </main>

        <footer className='bg-white dark:bg-[#16141d]'>
          <div className='mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8'>
            <nav
              className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12'
              aria-label='Footer'
            >
              {navigation.map((item) => (
                <div key={item.name} className='pb-6'>
                  <Link
                    href={item.href}
                    className='text-gray-600 text-sm leading-6 hover:text-gray-900'
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
            <div className='mt-10 flex justify-center space-x-10'>
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-gray-400 hover:text-gray-500'
                  target='_blank'
                >
                  <span className='sr-only'>{item.name}</span>
                  <item.icon className='h-6 w-6' aria-hidden='true' />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
