/*
AUTHOR: https://github.com/prismagraphql/graphql-request
MIT License

Copyright (c) 2017 Graphcool

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */


import { ClientError, GraphQLError, Headers as HttpHeaders, Options, Variables } from './types'
export { ClientError } from './types'
import 'cross-fetch/polyfill'
import { print } from 'graphql'
export class GraphQLClient {
    private url: string
    private options: Options

    constructor(url: string, options?: Options) {
    this.url = url
    this.options = options || {}
}

async rawRequest<T extends any>(
    query: string,
    variables?: Variables,
): Promise<{ data?: T, extensions?: any, headers: Headers, status: number, errors?: GraphQLError[] }> {
    const { headers, ...others } = this.options

    const body = JSON.stringify({
        query,
        variables: variables ? variables : undefined,
    })

    const response = await fetch(this.url, {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
    body,
    ...others,
})

const result = await getResult(response)

if (response.ok && !result.errors && result.data) {
    const { headers, status } = response
    return { ...result, headers, status }
} else {
    const errorResult =
        typeof result === 'string' ? { error: result } : result
    throw new ClientError(
        { ...errorResult, status: response.status, headers: response.headers },
        { query, variables },
    )
}
}

async request<T extends any>(
    query: string | object,
    variables?: Variables,
): Promise<T> {
    const { headers, ...others } = this.options
    const printedQuery = typeof query === 'object' ? print(query) : query
    const body = JSON.stringify({
        query: printedQuery,
        variables: variables ? variables : undefined,
    })

    const response = await fetch(this.url, {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
    body,
    ...others,
})

const result = await getResult(response)

if (response.ok && !result.errors && result.data) {
    return result.data
} else {
    const errorResult =
        typeof result === 'string' ? { error: result } : result
    throw new ClientError(
        { ...errorResult, status: response.status },
        { query: printedQuery, variables },
    )
}
}

setHeaders(headers: HttpHeaders): GraphQLClient {
    this.options.headers = headers

    return this
}

setHeader(key: string, value: string): GraphQLClient {
    const { headers } = this.options

    if (headers) {
        headers[key] = value
    } else {
        this.options.headers = { [key]: value }
    }
    return this
}
}

export async function rawRequest<T extends any>(
    url: string,
    query: string,
    variables?: Variables,
): Promise<{ data?: T, extensions?: any, headers: Headers, status: number, errors?: GraphQLError[] }> {
    const client = new GraphQLClient(url)

    return client.rawRequest<T>(query, variables)
}

export async function request<T extends any>(
    url: string,
    query: string,
    variables?: Variables,
): Promise<T> {
    const client = new GraphQLClient(url)

    return client.request<T>(query, variables)
}

export default request

async function getResult(response: Response): Promise<any> {
    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.startsWith('application/json')) {
        return response.json()
    } else {
        return response.text()
    }
}