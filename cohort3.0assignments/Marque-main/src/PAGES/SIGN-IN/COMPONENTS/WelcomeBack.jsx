import React from 'react'
import Logo from '../../../components/Logo'

const WelcomeBack = () => {
  return (
    <div className="relative hidden flex-1 flex-col justify-center overflow-hidden bg-neutral-50 px-12 py-16 lg:flex lg:px-20 dark:bg-neutral-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, #8080801a 1px, transparent 1px), linear-gradient(to bottom, #8080801a 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 30% 40%, black, transparent)',
        }}
      />

      <div className="relative z-10 max-w-xl">
        <Logo size="lg" className="mb-16" />

        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          WELCOME BACK
        </p>

        <h1 className="mb-6 text-5xl font-medium leading-tight text-neutral-900 sm:text-6xl dark:text-white">
          Shop with
          <br />
          <span className="text-indigo-600 dark:text-indigo-400">clarity.</span>
        </h1>

        <p className="mb-14 max-w-md text-lg text-neutral-500 dark:text-neutral-400">
          Thousands of products, fast delivery, and a storefront that gets out of your way.
        </p>

        <div className="grid max-w-xl grid-cols-3 gap-4">
          <div className="rounded-xl border border-neutral-200 py-6 text-center dark:border-neutral-800">
            <p className="text-2xl font-semibold text-neutral-900 dark:text-white">20K+</p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Products</p>
          </div>
          <div className="rounded-xl border border-neutral-200 py-6 text-center dark:border-neutral-800">
            <p className="text-2xl font-semibold text-neutral-900 dark:text-white">50K+</p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Users</p>
          </div>
          <div className="rounded-xl border border-neutral-200 py-6 text-center dark:border-neutral-800">
            <p className="text-2xl font-semibold text-neutral-900 dark:text-white">4.9★</p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBack
