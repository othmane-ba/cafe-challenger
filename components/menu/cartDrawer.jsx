/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import { isEmpty } from "../../utils/Utils";
import CartListItem from "./CartListItem";

export default function CartDrawer({open,onClick,cartitems}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClick}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={onClick}
                      >
                        <span className="sr-only">Close panel</span>
                        <CloseIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-center text-primary text-2xl font-semibold uppercase"> Cart </Dialog.Title>
                    </div>
                    <div className="relative flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                      <div className="grid grid-rows-4 grid-flow-col gap-4" style={{ height: '91vh'}}>
                        <div     className="row-span-3 w-full overflow-y-auto flex-1">
                        {isEmpty(cartitems) &&  cartitems==false && <div className="h-full flex justify-center items-center">
                            <h2 className="text-center font-black text-4xl text-gray-300 drop-shadow-sm">Your cart is empty</h2>
                        </div>}
                        <ul className="w-full ring-1 ring-gray-200 ring-opacity-20 rounded-lg max-w-3xl lg:shadow drop-shadow-sm overflow-hidden lg:order-2">
                        { 
                            !isEmpty(cartitems) && cartitems!==false && cartitems?.map((item,id) => (
                                <CartListItem key={id} item={item}/>
                            ))   
                        }
                        </ul>
                        </div>
                        <div className="xl:right-5 bg-white ring-1 ring-gray-200 ring-opacity-20 rounded-lg flex flex-col justify-center items-center space-y-2 py-2 w-full">
                            <h3 className="text-primary font-black text-xl">Total: </h3>
                            <p className="text-secondary font-bold text-2xl"> 0 DH</p>
                            <Link href='/order' passHref>
                            <a>
                            <button 
                            className="bg-primary hover:bg-secondary relative z-[999] text-white py-1 px-3 text-base rounded-md transition-all whitespace-nowrap max-w-[150px]">
                            Commander
                            </button></a></Link>
                        </div>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
