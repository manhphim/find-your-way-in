import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../../contexts/AuthContext';
import { auth } from 'firebase_config';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import AccountSetting from '../../../public/icons/account_settings.svg';
import LoginIcon from '../../../public/icons/login.svg';
import LogoutIcon from '../../../public/icons/logout.svg';
import SignUpIcon from '../../../public/icons/register.svg';
import UserButton from './UserButton';

export default function UserDropdown() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { user, logout } = useAuth();
    const handleLogout = async () => {
        await logout(auth)
            .then(() => router.push('/'))
            .catch((error: any) => console.log(error));
    };
    return (
        <div>
            <Menu as="div" className="relative inline-block text-center">
                <div data-cy="user-dropdown">
                    <Menu.Button>
                        <UserButton />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-green-500 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user ? (
                            <div className="px-1 py-1 divide-y-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'bg-green-800 text-white'
                                                    : 'text-gray-100'
                                            } group flex w-full items-center rounded-md px-3 py-3 text-sm`}
                                            onClick={() =>
                                                router.push('/profile')
                                            }
                                        >
                                            <AccountSetting
                                                className="w-5 h-auto mr-3"
                                                aria-hidden="true"
                                                fill="white"
                                            />
                                            {t('account')}
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            data-cy="logout-button"
                                            className={`${
                                                active
                                                    ? 'bg-green-800 text-white'
                                                    : 'text-gray-100'
                                            } group flex w-full items-center rounded-md px-3 py-3 text-sm`}
                                            onClick={handleLogout}
                                        >
                                            <LogoutIcon
                                                className="w-5 h-5 mr-3"
                                                aria-hidden="true"
                                                fill="white"
                                            />
                                            {t('logout')}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        ) : (
                            <div className="px-1 py-1 divide-y-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'bg-green-800 text-white'
                                                    : 'text-gray-100'
                                            } group flex w-full items-center rounded-md px-3 py-3 text-sm`}
                                            onClick={() =>
                                                router.push('/auth/login')
                                            }
                                        >
                                            <LoginIcon
                                                className="w-5 h-auto mr-3"
                                                aria-hidden="true"
                                                fill="white"
                                            />
                                            {t('login')}
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'bg-green-800 text-white'
                                                    : 'text-gray-100'
                                            } group flex w-full items-center rounded-md px-3 py-3 text-sm`}
                                            onClick={() =>
                                                router.push('/auth/signup')
                                            }
                                        >
                                            <SignUpIcon
                                                className="w-5 h-5 mr-3"
                                                aria-hidden="true"
                                                fill="white"
                                            />
                                            {t('signup')}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
