'use client'
import {
    Bars3Icon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    ArrowDownCircleIcon,
    ArrowPathIcon,
    ArrowUpCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, count: '5', current: true },
    { name: 'Transactions', href: '#', icon: ChartPieIcon, current: false },
    { name: 'Spending', href: '#', icon: FolderIcon, count: '12', current: false },
    // { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Bills', href: '#', icon: CalendarIcon, count: '20+', current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
]
const teams = [
    { id: 1, name: 'Goals', href: '#', initial: 'G', current: false },
    { id: 2, name: 'Income', href: '#', initial: 'I', current: false },
    { id: 3, name: 'Budget Analysis', href: '#', initial: 'B', current: false },
]
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const TopNav = () => {
    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                    <div className="flex h-16 shrink-0 items-center justify-center">
                        <Image
                            className=""
                            src={'/assets/budgetIcon.png'}
                            height={36}
                            width={36}
                            alt="Your Company"
                        />
                        <Image
                            className=""
                            height={36}
                            width={36}
                            src={'/assets/b-icon.png'}
                            alt="Your Company"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-50 text-green-600'
                                                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600',
                                                        'h-6 w-6 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <div className="text-xs font-semibold leading-6 text-gray-400">Your account</div>
                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                    {teams.map((team) => (
                                        <li key={team.name}>
                                            <a
                                                href={team.href}
                                                className={classNames(
                                                    team.current
                                                        ? 'bg-gray-50 text-green-600'
                                                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                {/* <span
                                                    className={classNames(
                                                        team.current
                                                            ? 'text-green-600 border-green-600'
                                                            : 'text-gray-400 border-gray-200 group-hover:border-green-600 group-hover:text-green-600',
                                                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                                    )}
                                                >
                                                    {team.initial}
                                                </span> */}
                                                <span className="truncate">{team.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="-mx-6 mt-auto">
                                <a
                                    href="#"
                                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                                >
                                    <img
                                        className="h-8 w-8 rounded-full bg-gray-50"
                                        src="https://img.freepik.com/premium-psd/3d-rendering-cartoon-boy-avatar-illustration_52659-1061.jpg?w=826"
                                        alt=""
                                    />
                                    <span className="sr-only">Your profile</span>
                                    <span aria-hidden="true">Jevon Hill</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => { }}>
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
                <a href="#">
                    <span className="sr-only">Your profile</span>
                    <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </a>
            </div>
        </>
    )
}

export default TopNav