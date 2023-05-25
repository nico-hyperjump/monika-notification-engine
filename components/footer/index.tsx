import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
export default function FooterDark(props) {
  return (
    <div
      className={`bg-monika-black flex flex-col lg:flex-row justify-around text-white pt-16 pb-16 px-16 ${
        props.className ? props.className : ''
      }`}>
      <a
        className="flex flex-col lg:flex-row"
        href="https://monika.hyperjump.tech/">
        <img
          className="w-16 h-4 mt-1"
          src={'/assets/monika.svg'}
          alt="Monika Logo"
        />
      </a>
      <div className="flex flex-col mt-4 lg:mt-0">
        <p className="font-bold">Resources</p>
        <a
          className="pt-2 text-xs"
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer">
          Privacy Policy
        </a>
        <a
          className="pt-1 text-xs"
          href="https://monika.hyperjump.tech/overview"
          target="_blank"
          rel="noopener noreferrer">
          Documentation
        </a>
        <a
          className="pt-1 text-xs"
          href="https://monika.hyperjump.tech/examples"
          target="_blank"
          rel="noopener noreferrer">
          Example
        </a>
        <a
          className="pt-1 text-xs"
          href="https://monika-config.hyperjump.tech/"
          target="_blank"
          rel="noopener noreferrer">
          Config Generator
        </a>
        <Link className="pt-1 text-xs" href="/">
          WhatsApp Notifier
        </Link>
      </div>
      <div className="flex flex-col mt-2 lg:mt-0">
        <p className="font-bold">Community</p>
        <a
          className="pt-2 text-xs"
          href={'https://github.com/hyperjumptech/monika/discussions'}
          target="_blank"
          rel="noopener noreferrer">
          Discussion
        </a>
        <a
          className="pt-1 text-xs"
          href={'https://github.com/hyperjumptech/monika/releases'}
          target="_blank"
          rel="noopener noreferrer">
          Releases
        </a>
        <a
          className="pt-1 text-xs"
          href="https://www.npmjs.com/package/@hyperjumptech/monika"
          target="_blank"
          rel="noopener noreferrer">
          NPM Homepage
        </a>
      </div>
      <div className="flex flex-col max-w-sm mt-8 lg:mt-0">
        <a
          className="font-bold"
          href="https://hyperjump.tech/"
          target="_blank"
          rel="noopener noreferrer">
          <img src="/assets/hyperjump.svg" alt="Hyperjump Logo" />
        </a>
        <p className="pt-2 text-xs">
          PT Artha Rajamas Mandiri (Hyperjump) is an open-source-first company
          providing engineering excellence service. We aim to build and
          commercialize open-source tools to help companies streamline,
          simplify, and secure the most important aspects of its modern DevOps
          practices.
        </p>
        <p className="pt-2 text-xs">
          Copyright © {new Date().getFullYear()} Hyperjump Tech. All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
}
