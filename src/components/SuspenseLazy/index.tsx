import React, { Suspense, lazy } from 'react'

const SuspenseLazy = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return <Suspense fallback={<h1>...loding</h1>}>{React.createElement(lazy(props))}</Suspense>
}

export default SuspenseLazy
