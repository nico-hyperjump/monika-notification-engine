/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../button';

type HeaderProps = {
  isMobileMenuCollapsed?: boolean;
  onMobileMenuCollapsedChange?: (isMobileMenuCollapsed: boolean) => void;
};

export default function Header({
  isMobileMenuCollapsed,
  onMobileMenuCollapsedChange = () => true,
}: HeaderProps): JSX.Element {
  return (
    <header className="relative text-white bg-monika-black">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex py-6">
          <div className="flex justify-start my-auto ml-4 lg:w-auto">
            <Link href="https://monika.hyperjump.tech/">
              <a>
                <img
                  className="w-auto h-4"
                  src="/assets/monika.svg"
                  alt="Monika Logo"
                />
              </a>
            </Link>
          </div>
          <div className="ml-auto lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center w-8 p-2 text-gray-400 rounded-md bg-monika-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-expanded="false"
              onClick={() =>
                onMobileMenuCollapsedChange(!isMobileMenuCollapsed)
              }>
              <span className="sr-only">Open menu</span>
              {isMobileMenuCollapsed ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
          <div className="items-center justify-end hidden lg:flex md:flex-1 lg:w-0">
            <ul className="flex flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-white hover:opacity-75"
                  href="https://monika.hyperjump.tech/overview">
                  <span className="ml-2">Docs</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-white hover:opacity-75"
                  href="https://monika-config.hyperjump.tech/">
                  <span className="ml-2">Config Generator</span>
                </a>
              </li>
              <li className="nav-item">
                <Link href="/">
                  <a className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-white underline hover:opacity-75">
                    <span className="ml-2">WhatsApp Notifier</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-white hover:opacity-75"
                  href="https://github.com/hyperjumptech/monika/discussions"
                  rel="noreferrer"
                  target="_blank">
                  <span className="ml-2">Discuss</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-white hover:opacity-75"
                  href="https://hyperjump.tech/"
                  rel="noreferrer"
                  target="_blank">
                  <span className="ml-2">Hyperjump</span>
                </a>
              </li>
              <li>
                <Button>
                  <a
                    href="https://github.com/hyperjumptech/monika"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full text-base font-medium rounded-md shadow-sm">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>{' '}
                    Github
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on mobile menu state. */}
      <div
        className={
          isMobileMenuCollapsed
            ? 'absolute top-0 inset-x-0 p-2 transform origin-top-right duration-200 ease-out lg:hidden z-50 mt-16 transition-all'
            : 'transition duration-100 ease-in hidden'
        }>
        <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
          <div className="px-5 py-6 space-y-6">
            <ul>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-monika-black hover:opacity-75"
                  href="https://monika.hyperjump.tech/overview">
                  <span className="ml-2">Docs</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-monika-black hover:opacity-75"
                  href="https://monika-config.hyperjump.tech/">
                  <span className="ml-2">Config Generator</span>
                </a>
              </li>
              <li className="nav-item">
                <Link href="/">
                  <a className="flex items-center px-3 py-2 font-sans font-bold leading-snug underline text-monika-black hover:opacity-75">
                    {' '}
                    <span className="ml-2 undeline">WhatsApp Notifier</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-monika-black hover:opacity-75"
                  href="https://github.com/hyperjumptech/monika/discussions"
                  rel="noreferrer"
                  target="_blank">
                  <span className="ml-2">Discuss</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-sans font-bold leading-snug text-monika-black hover:opacity-75"
                  href="https://hyperjump.tech/"
                  rel="noreferrer"
                  target="_blank">
                  <span className="ml-2">Hyperjump</span>
                </a>
              </li>
              <li>
                <Button className="w-full">
                  <a
                    href="https://github.com/hyperjumptech/monika"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full text-base font-medium rounded-md shadow-sm">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>{' '}
                    Github
                  </a>
                </Button>
              </li>
              <p className="mt-6 text-base font-medium text-center text-gray-500">
                © Hyperjump Technology {new Date().getFullYear()}
              </p>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
