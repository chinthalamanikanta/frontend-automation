import {Fragment, useEffect} from 'react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { PlusIcon, UsersIcon } from "@heroicons/react/16/solid";
import {useNavigate} from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const people = [
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
    },
    {
        name: 'John Doe',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Tester',
        email: 'john.doe@example.com',
    },
    {
        name: 'Veronica Lodge',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Software Engineer',
        email: 'veronica.lodge@example.com',
    },
];

export default function Employee() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('email');
        if (!isLoggedIn) {
            // If user is not logged in, redirect to login page
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div className="flex flex-col">
            <div className="pt-5 p-6">
                <h2 className="text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                    Employees
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-2xl text-gray-500">
                        <UsersIcon className="mr-1.5 h-8 w-8 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                        Below is a list of all accessible employees. You can rearrange the order of display by clicking
                        on the column headers at the top.
                    </div>
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="sm:ml-3">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-8 w-8" aria-hidden="true"/>
                        Add Employee
                    </button>
                </span>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Role
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {people.map(person => (
                                    <tr key={person.email}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={person.image} alt=""/>
                                                </div>
                                                <div className="ml-4">
                                                    <div
                                                        className="text-xl font-medium text-gray-900">{person.name}</div>
                                                    <div className="text-xl text-gray-500">{person.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xl text-gray-900">{person.title}</div>
                                            <div className="text-xl text-gray-500">{person.department}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5
                                                font-semibold rounded-full bg-green-100 text-green-800"
                                                >
                                                    Active
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                                            {person.role}
                                        </td>
                                        <td className="px-2 py-0 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </a>
                                        </td>
                                        <td className="px-5 py-0 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-red-600 hover:text-indigo-900">
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
