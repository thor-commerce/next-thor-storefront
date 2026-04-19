// lib/request-context.ts
import { THOR_CURRENCY_HEADER, THOR_STORE_HEADER } from '@/lib/thorcommerce/const'
import { headers } from 'next/headers'
import invariant from 'tiny-invariant'

export async function getRequestContext() {
    const h = await headers()

    const store = h.get(THOR_STORE_HEADER)
    const currency = h.get(THOR_CURRENCY_HEADER)
    invariant(store, `Missing ${THOR_STORE_HEADER} header`)
    invariant(currency, `Missing ${THOR_CURRENCY_HEADER} header`)

    return { store, currency }
}