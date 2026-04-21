// lib/request-context.ts
import { THOR_COUNTRY_COOKIE_NAME, THOR_CURRENCY_HEADER, THOR_STORE_HEADER } from '@/lib/thorcommerce/const'
import { cookies, headers } from 'next/headers'
import invariant from 'tiny-invariant'

export async function getRequestContext() {
    const h = await headers()
    const c = await cookies()

    const store = h.get(THOR_STORE_HEADER)
    const currency = h.get(THOR_CURRENCY_HEADER)
    const country = c.get(THOR_COUNTRY_COOKIE_NAME)?.value
    invariant(store, `Missing ${THOR_STORE_HEADER} header`)
    invariant(currency, `Missing ${THOR_CURRENCY_HEADER} header`)
    invariant(country, `Missing ${THOR_COUNTRY_COOKIE_NAME} cookie`)

    return { store, currency, country }
}