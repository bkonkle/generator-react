export interface Config {
  user: {
    ipAddress?: string | string[],
    userAgent?: string | string[],
  },
  isDev: boolean,
}

/**
 * In-Memory Data Store (safe because it is only used in the browser)
 */

let browserConfig: Config | undefined

export function set (config: Config) {
  browserConfig = config
}

export function get () {
  if (!browserConfig) {
    throw new Error('BrowserConfig has not yet been initialized')
  }

  return browserConfig
}

export function toJson (config: Config) {
  return encodeURIComponent(JSON.stringify(config))
}

export function fromJson (config: string) {
  try {
    set(JSON.parse(decodeURIComponent(config)))
  } catch (err) {
    console.error('Unable to read BrowserConfig:', err)
  }
}

export default {set, get, toJson, fromJson}
