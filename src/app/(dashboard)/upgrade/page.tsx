'use client';

export default function UpgradePage() {
  return (
    <>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-1'>
          Upgrade Plan
        </h1>
        <p className='text-gray-600'>
          Unlock advanced features and increase your collaboration potential
        </p>
      </div>

      {/* Current Plan */}
      <div className='bg-white rounded-xl border border-gray-200 p-6 mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>
              Current Plan
            </h2>
            <p className='text-gray-600'>Free Plan</p>
          </div>
          <span className='px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium'>
            Free
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='text-center p-4 bg-gray-50 rounded-lg'>
            <div className='text-2xl font-bold text-gray-900'>5</div>
            <div className='text-sm text-gray-600'>Meetings per month</div>
          </div>
          <div className='text-center p-4 bg-gray-50 rounded-lg'>
            <div className='text-2xl font-bold text-gray-900'>1</div>
            <div className='text-sm text-gray-600'>AI Agent</div>
          </div>
          <div className='text-center p-4 bg-gray-50 rounded-lg'>
            <div className='text-2xl font-bold text-gray-900'>30min</div>
            <div className='text-sm text-gray-600'>Meeting duration</div>
          </div>
        </div>
      </div>

      {/* Upgrade Options */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Pro Plan */}
        <div className='bg-white rounded-xl border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Pro Plan</h3>
              <p className='text-gray-600'>Perfect for small teams</p>
            </div>
            <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
              Popular
            </span>
          </div>
          <div className='mb-6'>
            <div className='text-3xl font-bold text-gray-900'>$29</div>
            <div className='text-gray-600'>per month</div>
          </div>
          <ul className='space-y-3 mb-6'>
            <li className='flex items-center'>
              <svg
                className='w-5 h-5 text-green-500 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-gray-700'>Unlimited meetings</span>
            </li>
            <li className='flex items-center'>
              <svg
                className='w-5 h-5 text-green-500 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-gray-700'>5 AI Agents</span>
            </li>
            <li className='flex items-center'>
              <svg
                className='w-5 h-5 text-green-500 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-gray-700'>Advanced analytics</span>
            </li>
            <li className='flex items-center'>
              <svg
                className='w-5 h-5 text-green-500 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-gray-700'>Priority support</span>
            </li>
          </ul>
          <button className='w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium'>
            Upgrade to Pro
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className='bg-white rounded-xl border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>
                Enterprise
              </h3>
              <p className='text-gray-600'>For large organizations</p>
            </div>
            <span className='px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium'>
              Enterprise
            </span>
          </div>
          <div className='mb-6'>
            <div className='text-3xl font-bold text-gray-900'>Custom</div>
            <div className='text-gray-600'>pricing</div>
          </div>
          <ul className='space-y-3 mb-6'>
            <li className='flex items-center'>
              <svg
                className='w-5 h-5 text-green-500 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-gray-700'>Everything in Pro</span>
            </li>
            <li className='flex items-center'>
              <svg
                className='w-5 h-5 text-green-500 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-gray-700'>Unlimited AI Agents</span>
            </li>
            <li className='flex items-center'>
              <svg
                className='w-5 h-5 text-green-500 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-gray-700'>Custom integrations</span>
            </li>
            <li className='flex items-center'>
              <svg
                className='w-5 h-5 text-green-500 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-gray-700'>24/7 dedicated support</span>
            </li>
          </ul>
          <button className='w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'>
            Contact Sales
          </button>
        </div>
      </div>
    </>
  );
}
